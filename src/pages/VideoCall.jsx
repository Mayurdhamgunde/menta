import React, { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

// Using the remote server URL instead of localhost
const SERVER_URL = 'https://mental-health-prediction-video-call.onrender.com';
// const SERVER_URL = 'http://localhost:5000';

// Helper function to debounce function calls
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default function VideoCall() {
  const [socket, setSocket] = useState(null);
  const [stream, setStream] = useState(null);
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [peers, setPeers] = useState({});
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [error, setError] = useState('');
  const [isInitializing, setIsInitializing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  
  const userVideo = useRef(null);
  const peersRef = useRef({});
  const streamRef = useRef();
  // Adding state tracking for each peer connection
  const peerStates = useRef({});
  // Add a timestamp to track when peer connections were last created
  const peerTimestamps = useRef({});
  // Track incoming calls to prevent loops
  const incomingCallsRef = useRef({});
  
  // Enhanced ICE servers configuration with TURN servers
  const iceServers = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    // Public TURN servers for better NAT traversal
    {
      urls: 'turn:openrelay.metered.ca:80',
      username: 'openrelayproject',
      credential: 'openrelayproject'
    },
    {
      urls: 'turn:openrelay.metered.ca:443',
      username: 'openrelayproject',
      credential: 'openrelayproject'
    }
  ];

  // Define createPeer function first
  const createPeer = useCallback((target, caller, stream) => {
    try {
      // Add a debug message
      console.log(`Creating new peer connection to ${target} with ICE servers:`, iceServers);
      
      const peer = new Peer({
        initiator: true,
        trickle: true,  // Changed to true for better NAT traversal
        stream,
        config: {
          iceServers,
          iceTransportPolicy: 'all',
          sdpSemantics: 'unified-plan'
        },
        offerOptions: {
          offerToReceiveAudio: true,
          offerToReceiveVideo: true
        }
      });

      peer.on('signal', signal => {
        console.log(`Signaling to: ${target} (type: ${signal.type || 'unknown'})`);
        if (socket) {
          socket.emit('call-user', {
            userToCall: target,
            signalData: signal,
            from: caller,
            name: userName
          });
        } else {
          console.error('Socket is not initialized when trying to signal');
        }
      });

      peer.on('connect', () => {
        console.log(`Peer connected to: ${target}`);
        if (peerStates.current[target]) {
          peerStates.current[target].connected = true;
        }
      });

      peer.on('stream', (remoteStream) => {
        console.log(`Received stream from peer: ${target}`);
        if (peerStates.current[target]) {
          peerStates.current[target].hasStream = true;
        }
      });

      peer.on('error', err => {
        console.error(`Peer error with ${target}:`, err);
        if (peerStates.current[target]) {
          peerStates.current[target].error = err.message;
        }
      });

      peer.on('close', () => {
        console.log(`Peer connection closed with: ${target}`);
        if (peerStates.current[target]) {
          peerStates.current[target].connected = false;
        }
      });
      
      peer.on('iceStateChange', (state) => {
        console.log(`ICE state for peer ${target} changed to: ${state}`);
        if (peerStates.current[target]) {
          peerStates.current[target].iceState = state;
        }
        
        if (state === 'disconnected' || state === 'failed') {
          console.log(`ICE connection ${state} for peer ${target}, may need reconnection`);
          
          // If we get repeated failures, wait and try to reconnect
          if (state === 'failed') {
            console.log(`ICE connection failed for ${target}, scheduling reconnection`);
            
            // Use the debounced create peer to prevent rapid recreation
            // Don't destroy the current peer immediately - let the new one take over if successful
            const peerUserName = peersRef.current[target]?.userName || 'unknown';
            if (debouncedCreatePeer) {
              debouncedCreatePeer(target, socket?.id, stream, peerUserName);
            }
          }
        }
      });

      return peer;
    } catch (err) {
      console.error('Error creating peer:', err);
      return null;
    }
  }, [socket, userName, iceServers]);

  // Define addPeer function
  const addPeer = useCallback((incomingSignal, caller, stream) => {
    try {
      console.log(`Creating new peer for incoming connection from ${caller}`);
      
      const peer = new Peer({
        initiator: false,
        trickle: true,  // Changed to true for better NAT traversal
        stream,
        config: {
          iceServers,
          iceTransportPolicy: 'all', 
          sdpSemantics: 'unified-plan'
        },
        offerOptions: {
          offerToReceiveAudio: true,
          offerToReceiveVideo: true
        }
      });

      peer.on('signal', signal => {
        console.log(`Answering call to: ${caller} (signal type: ${signal.type || 'unknown'})`);
        if (socket) {
          socket.emit('answer-call', { signal, to: caller, from: socket.id });
        } else {
          console.error('Socket is not initialized when trying to answer call');
        }
      });

      peer.on('connect', () => {
        console.log(`Peer connection established with: ${caller}`);
        if (peerStates.current[caller]) {
          peerStates.current[caller].connected = true;
        }
      });

      peer.on('stream', (remoteStream) => {
        console.log(`Received stream from peer: ${caller}`);
        if (peerStates.current[caller]) {
          peerStates.current[caller].hasStream = true;
        }
      });

      peer.on('error', err => {
        console.error(`Peer error with ${caller}:`, err);
        if (peerStates.current[caller]) {
          peerStates.current[caller].error = err.message;
        }
      });

      peer.on('close', () => {
        console.log(`Peer connection closed with: ${caller}`);
        if (peerStates.current[caller]) {
          peerStates.current[caller].connected = false;
        }
      });
      
      peer.on('iceStateChange', (state) => {
        console.log(`ICE state for peer ${caller} changed to: ${state}`);
        if (peerStates.current[caller]) {
          peerStates.current[caller].iceState = state;
        }
        
        if (state === 'disconnected' || state === 'failed') {
          console.log(`ICE connection ${state} for peer ${caller}, may need reconnection`);
        }
      });

      // Wrap in a try-catch to handle potential errors
      try {
        console.log(`Signaling with incoming data from: ${caller}`);
        peer.signal(incomingSignal);
      } catch (err) {
        console.error('Error signaling incoming peer:', err);
        return null;
      }

      return peer;
    } catch (err) {
      console.error('Error adding peer:', err);
      return null;
    }
  }, [socket, iceServers]);

  // Now declare debouncedCreatePeer after createPeer is defined
  const debouncedCreatePeer = useCallback(
    debounce((target, caller, stream, userName) => {
      console.log(`Creating debounced peer for: ${target}`);
      const newPeer = createPeer(target, caller, stream);
      
      if (newPeer) {
        peersRef.current[target] = { peer: newPeer, userName };
        peerStates.current[target] = { hasOffer: true, hasAnswer: false };
        peerTimestamps.current[target] = Date.now();
        
        setPeers(prev => ({
          ...prev,
          [target]: { peer: newPeer, userName }
        }));
      }
    }, 2000),
    [createPeer]
  );

  // Handle setting up the video stream when component mounts and userVideo ref is available
  useEffect(() => {
    if (stream && userVideo.current) {
      userVideo.current.srcObject = stream;
    }
  }, [stream, userVideo.current]);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(SERVER_URL, {
      withCredentials: true,
      reconnectionAttempts: 10,       // Increased from 5
      reconnectionDelay: 2000,        // Increased from 1000
      timeout: 20000,                 // Increased from 10000
      transports: ['websocket', 'polling'],
      forceNew: true,                 // Force a new connection
      autoConnect: true               // Automatically connect
    });
    
    // Add socket event listeners for connection status
    newSocket.on('connect', () => {
      console.log('Socket connected successfully');
      setConnectionStatus('connected');
      setError('');
    });
    
    newSocket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
      setConnectionStatus('error');
      setError(`Connection error: ${err.message}`);
      
      // Try to use local server if the remote one fails repeatedly
      if (SERVER_URL.includes('render.com') && newSocket.io.backoff.attempts > 5) {
        console.log('Too many connection failures to remote server, consider using local development server');
        // You could switch to local server here if needed:
        // setError('Remote server connection failed - consider using a local server');
      }
    });
    
    newSocket.on('connect_timeout', () => {
      console.error('Socket connection timeout');
      setConnectionStatus('timeout');
      setError('Connection timeout - trying again...');
      setTimeout(() => newSocket.connect(), 3000); // Try to reconnect after 3 seconds
    });
    
    newSocket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      setConnectionStatus('disconnected');
      if (reason === 'io server disconnect') {
        setError('You were disconnected by the server');
      } else {
        setError('Disconnected from server - trying to reconnect...');
        setTimeout(() => newSocket.connect(), 2000); // Attempt manual reconnection
      }
    });
    
    setSocket(newSocket);

    return () => {
      // Clean up media tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      // Destroy all peer connections
      Object.values(peersRef.current).forEach(({ peer }) => {
        if (peer) {
          peer.destroy();
        }
      });
      
      // Disconnect socket
      newSocket.disconnect();
    };
  }, []);

  // Handle socket events for existing users and new joiners only when joined and stream is available
  useEffect(() => {
    if (!socket || !stream || !isJoined) return;

    // Handle existing users in the room
    socket.on('room-users', (users) => {
      console.log('Existing users in room:', users);
      
      // Clean up any existing peers first
      Object.values(peersRef.current).forEach(({ peer }) => {
        if (peer) {
          peer.destroy();
        }
      });
      
      peersRef.current = {};
      peerStates.current = {};
      peerTimestamps.current = {};
      incomingCallsRef.current = {};
      setPeers({});
      
      // Create peer connections with all existing users
      users.forEach(({ userId, userName: remoteUserName }) => {
        console.log(`Creating peer for existing user: ${remoteUserName} (${userId})`);
        const peer = createPeer(userId, socket.id, stream);
        if (peer) {
          peersRef.current[userId] = { peer, userName: remoteUserName };
          peerStates.current[userId] = { hasOffer: true, hasAnswer: false };
          peerTimestamps.current[userId] = Date.now();
        }
      });
      
      setPeers(peersRef.current);
    });

    // Handle new user joining
    socket.on('user-joined', ({ userId, userName: remoteUserName }) => {
      console.log('User joined:', remoteUserName, userId);
      
      // Only create a peer if we don't already have one for this user
      // or if the existing one was created more than 10 seconds ago
      const now = Date.now();
      const peerExists = peersRef.current[userId];
      const peerAge = peerTimestamps.current[userId] ? now - peerTimestamps.current[userId] : Infinity;
      
      if (!peerExists || peerAge > 10000) {
        console.log(`Creating peer for new user: ${remoteUserName} (${userId})`);
        
        // If a peer already exists, destroy it first
        if (peerExists && peerExists.peer) {
          console.log(`Destroying stale peer for: ${remoteUserName} (${userId})`);
          peerExists.peer.destroy();
        }
        
        const peer = createPeer(userId, socket.id, stream);
        if (peer) {
          peersRef.current[userId] = { peer, userName: remoteUserName };
          peerStates.current[userId] = { hasOffer: true, hasAnswer: false };
          peerTimestamps.current[userId] = now;
          
          setPeers(prev => ({
            ...prev,
            [userId]: { peer, userName: remoteUserName }
          }));
        }
      } else {
        console.log(`Skipping peer creation for: ${remoteUserName} (${userId}) - peer already exists and is recent`);
      }
    });

    // Handle incoming call
    socket.on('incoming-call', ({ signal, from, name }) => {
      console.log('Incoming call from:', name, from);
      
      // Skip if we've received a call from this peer in the last 2 seconds to avoid loops
      const now = Date.now();
      const lastCall = incomingCallsRef.current[from] || 0;
      
      if (now - lastCall < 2000) {
        console.log(`Ignoring call from ${name} (${from}) - received another call recently`);
        return;
      }
      
      // Update the timestamp for this caller
      incomingCallsRef.current[from] = now;
      
      // If we already have a connection with this peer, destroy it only if it's not working
      if (peersRef.current[from]) {
        const peerState = peerStates.current[from] || {};
        const isConnectedPeer = peerState.connected;
        const hasStream = peerState.hasStream;
        
        if (isConnectedPeer && hasStream) {
          console.log(`Keeping existing working peer for: ${name} (${from})`);
          return;
        }
        
        console.log(`Destroying non-working peer for: ${name} (${from})`);
        if (peersRef.current[from].peer) {
          peersRef.current[from].peer.destroy();
        }
      }
      
      // Create a new peer connection
      console.log(`Adding peer for incoming call: ${name} (${from})`);
      const peer = addPeer(signal, from, stream);
      
      if (peer) {
        peersRef.current[from] = { peer, userName: name };
        peerStates.current[from] = { hasOffer: true, hasAnswer: true };
        peerTimestamps.current[from] = now;
        
        setPeers(prev => ({
          ...prev,
          [from]: { peer, userName: name }
        }));
      }
    });

    // Handle accepted call
    socket.on('call-accepted', ({ signal, to, from }) => {
      console.log('Call accepted from:', from || to);
      
      // Use either 'from' or 'to' as the peer identifier - this is the key fix
      const peerId = from || to;
      
      if (!peerId) {
        console.warn('Received call-accepted but peer ID is undefined');
        return;
      }
      
      if (!peersRef.current[peerId] || !peersRef.current[peerId].peer) {
        console.warn(`Received call-accepted from ${peerId} but no peer exists`);
        return;
      }
      
      // Check if we're in the right state to receive an answer
      if (!peerStates.current[peerId] || !peerStates.current[peerId].hasOffer) {
        console.warn(`Received answer from ${peerId} but no offer was sent`);
        return;
      }
      
      // Check if we've already processed an answer for this peer
      if (peerStates.current[peerId].hasAnswer) {
        console.warn(`Already received an answer from ${peerId}, ignoring duplicate`);
        return;
      }
      
      try {
        console.log(`Signaling peer: ${peerId}`);
        peersRef.current[peerId].peer.signal(signal);
        peerStates.current[peerId].hasAnswer = true;
      } catch (err) {
        console.error('Error signaling peer:', err);
        
        // Only recreate the peer if it's a fatal error
        if (err.message.includes('InvalidStateError') || err.name === 'InvalidStateError') {
          console.log('State error occurred, ignoring duplicate signal');
        } else {
          // For other errors, recreate the peer
          console.log(`Recreating peer after error: ${peerId}`);
          if (peersRef.current[peerId]) {
            peersRef.current[peerId].peer.destroy();
            const peer = createPeer(peerId, socket.id, stream);
            const userName = peersRef.current[peerId].userName;
            peersRef.current[peerId] = { peer, userName };
            peerStates.current[peerId] = { hasOffer: true, hasAnswer: false };
            peerTimestamps.current[peerId] = Date.now();
            setPeers(prev => ({
              ...prev,
              [peerId]: { peer, userName }
            }));
          }
        }
      }
    });

    // Handle user leaving
    socket.on('user-left', userId => {
      console.log('User left:', userId);
      if (peersRef.current[userId]) {
        peersRef.current[userId].peer.destroy();
        delete peersRef.current[userId];
        delete peerStates.current[userId];
        delete peerTimestamps.current[userId];
        delete incomingCallsRef.current[userId];
        setPeers(prev => {
          const newPeers = { ...prev };
          delete newPeers[userId];
          return newPeers;
        });
      }
    });

    // Handle errors
    socket.on('error-message', ({ message }) => {
      console.error('Socket error:', message);
      setError(`Server error: ${message}`);
    });

    return () => {
      socket.off('room-users');
      socket.off('user-joined');
      socket.off('incoming-call');
      socket.off('call-accepted');
      socket.off('user-left');
      socket.off('error-message');
    };
  }, [socket, stream, isJoined]);

  const joinRoom = async () => {
    if (!userName.trim() || !roomId.trim() || !socket) {
      setError('Please enter your name and room ID');
      return;
    }

    if (isInitializing) return;
    
    try {
      setError('');
      setIsInitializing(true);
      
      // Try first with ideal constraints for good quality
      const constraints = {
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        },
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"
        }
      };
      
      let mediaStream;
      
      try {
        console.log('Requesting media with ideal constraints');
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (err) {
        console.error('Error with ideal constraints:', err);
        
        // First fallback - try with simpler video constraints
        try {
          console.log('Falling back to simple video constraints');
          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          });
        } catch (err2) {
          console.error('Error with simple constraints:', err2);
          
          // Second fallback - try audio only if video fails completely
          console.log('Falling back to audio only');
          mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true
          });
          setIsVideoOff(true);
        }
      }
      
      console.log('Got media stream:', mediaStream.getTracks().map(t => `${t.kind} (${t.enabled ? 'enabled' : 'disabled'})`).join(', '));
      streamRef.current = mediaStream;
      setStream(mediaStream);
      
      // Reset any existing peer connections before joining
      Object.values(peersRef.current).forEach(({ peer }) => {
        if (peer) peer.destroy();
      });
      peersRef.current = {};
      peerStates.current = {};
      setPeers({});
      
      console.log(`Joining room: ${roomId} as ${userName}`);
      socket.emit('join-room', { userName, roomId });
      setIsJoined(true);
    } catch (err) {
      console.error('Error accessing media devices:', err);
      setError(err.name === 'NotAllowedError' 
        ? 'Please allow camera and microphone access'
        : `Error accessing camera or microphone: ${err.message}`);
    } finally {
      setIsInitializing(false);
    }
  };

  const toggleMute = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      if (audioTracks.length > 0) {
        const audioTrack = audioTracks[0];
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      if (videoTracks.length > 0) {
        const videoTrack = videoTracks[0];
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  const leaveRoom = () => {
    if (socket) {
      socket.emit('leave-room');
    }
    
    // Stop all tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setStream(null);
    }
    
    // Destroy all peer connections
    Object.values(peersRef.current).forEach(({ peer }) => {
      if (peer) peer.destroy();
    });
    peersRef.current = {};
    peerStates.current = {};
    setPeers({});
    
    setIsJoined(false);
  };

  // Restart all connections - useful when connections aren't working
  const restartConnections = () => {
    if (!socket || !streamRef.current) return;
    
    // Destroy all current peer connections
    Object.values(peersRef.current).forEach(({ peer }) => {
      if (peer) peer.destroy();
    });
    
    // Reset tracking objects
    peersRef.current = {};
    peerStates.current = {};
    setPeers({});
    
    // Request room users again to trigger new connections
    socket.emit('request-room-users', { roomId });
  };

  return (
    <div className="min-h-screen p-8 mt-12">
      {!isJoined ? (
        <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-purple-700 mb-6">Join Video Call</h1>
          
          {connectionStatus !== 'connected' && (
            <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded">
              Connection status: {connectionStatus}. {connectionStatus !== 'connected' && 'Waiting to connect...'}
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full mb-4 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full mb-4 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={joinRoom}
            disabled={!userName.trim() || !roomId.trim() || isInitializing || connectionStatus !== 'connected'}
            className="w-full bg-purple-700 text-white font-bold p-2 rounded hover:bg-purple-600 disabled:bg-gray-400"
          >
            {isInitializing ? 'Initializing...' : 'Join Room'}
          </button>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Tips:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>Make sure you allow camera and microphone access</li>
              <li>Use the same Room ID on all devices to connect</li>
              <li>Try a different browser if you have connection issues</li>
              <li>Mobile users: Safari works best on iOS</li>
              <li>Make sure you're connected to the same network or have good internet</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Room: {roomId}</h2>
            <div className="text-sm text-gray-600">
              {Object.keys(peers).length} other participant(s)
            </div>
          </div>
          
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded flex justify-between items-center">
              <span>{error}</span>
              <button 
                onClick={restartConnections}
                className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                Restart Connections
              </button>
            </div>
          )}
          
          {/* Improved video grid with better responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Local video always shown first */}
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video shadow-lg border-2 border-purple-500">
              <video
                ref={userVideo}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : ''}`}
              />
              {isVideoOff && (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <div className="text-white text-xl">Camera Off</div>
                </div>
              )}
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded flex items-center">
                <span className="inline-block w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
                {userName} (You)
              </div>
            </div>
            
            {/* Render peer videos only if they exist */}
            {Object.entries(peers).length > 0 ? (
              Object.entries(peers).map(([peerId, { peer, userName: peerName }]) => {
                if (!peer) return null;
                
                return (
                  <PeerVideo 
                    key={peerId} 
                    peer={peer} 
                    userName={peerName} 
                    peerId={peerId}
                  />
                );
              })
            ) : (
              <div className="col-span-1 sm:col-span-2 lg:col-span-2 bg-gray-100 rounded-lg p-4 flex items-center justify-center text-gray-500 shadow-inner">
                <div className="text-center">
                  <p className="text-xl mb-2">Waiting for others to join...</p>
                  <p className="text-sm">Share room ID: <span className="font-bold">{roomId}</span> with others</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center space-x-2 space-y-2 md:space-y-0">
            <button
              onClick={toggleMute}
              className={`p-3 rounded-full ${
                isMuted ? 'bg-red-500' : 'bg-gray-700'
              } text-white hover:opacity-90 flex items-center justify-center w-14 h-14`}
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full ${
                isVideoOff ? 'bg-red-500' : 'bg-gray-700'
              } text-white hover:opacity-90 flex items-center justify-center w-14 h-14`}
            >
              {isVideoOff ? 'Start Video' : 'Stop Video'}
            </button>
            <button
              onClick={restartConnections}
              className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center w-14 h-14"
            >
              Reconnect
            </button>
            <button
              onClick={leaveRoom}
              className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 flex items-center justify-center w-14 h-14"
            >
              Leave
            </button>
          </div>
          
          {/* Room info for sharing */}
          <div className="fixed top-4 right-4 bg-white p-3 rounded-lg shadow-lg text-sm">
            <p className="font-bold">Share Room ID:</p>
            <div className="flex items-center mt-1">
              <span className="bg-gray-100 p-1 rounded mr-2 font-mono">{roomId}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(roomId);
                  alert('Room ID copied to clipboard!');
                }}
                className="p-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Improved PeerVideo component for better error handling and autoplay experience
const PeerVideo = ({ peer, userName, peerId }) => {
  const videoRef = useRef();
  const [hasVideo, setHasVideo] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [errorState, setErrorState] = useState(null);
  const [connectedTimestamp, setConnectedTimestamp] = useState(null);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);
  
  useEffect(() => {
    if (!peer) return;
    
    console.log(`Setting up video for peer: ${userName} (${peerId})`);
    
    // Function to handle incoming stream
    const handleStream = (stream) => {
      console.log(`Received stream from: ${userName} (${peerId})`);
      
      // Check if the stream has video tracks
      const hasVideoTracks = stream.getVideoTracks().length > 0;
      setHasVideo(hasVideoTracks);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Try to play the video automatically
        videoRef.current.play().catch(err => {
          console.warn(`Autoplay failed for peer ${peerId}:`, err);
          setNeedsManualPlay(true);
        });
      }
    };
    
    // Add event listeners
    peer.on('stream', handleStream);
    
    peer.on('connect', () => {
      console.log(`Connected to peer: ${userName} (${peerId})`);
      setIsConnected(true);
      setConnectedTimestamp(new Date());
      setErrorState(null);
    });
    
    peer.on('error', (err) => {
      console.error(`Error with peer ${userName} (${peerId}):`, err);
      setErrorState(err.message);
    });
    
    peer.on('close', () => {
      console.log(`Connection closed with peer: ${userName} (${peerId})`);
      setIsConnected(false);
    });
    
    // Check if stream is already available
    if (peer.streams && peer.streams[0]) {
      handleStream(peer.streams[0]);
    }
    
    return () => {
      // Clean up if needed
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        videoRef.current.srcObject = null;
      }
    };
  }, [peer, userName, peerId]);
  
  const handleManualPlay = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.play()
        .then(() => setNeedsManualPlay(false))
        .catch(err => console.error(`Manual play failed for peer ${peerId}:`, err));
    }
  };
  
  return (
    <div className="relative bg-black rounded-lg overflow-hidden aspect-video shadow-lg border-2 border-blue-500">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={`w-full h-full object-cover ${(!hasVideo || !isConnected || needsManualPlay) ? 'hidden' : ''}`}
      />
      
      {/* Manual play button overlay */}
      {needsManualPlay && isConnected && (
        <div 
          className="w-full h-full flex flex-col items-center justify-center bg-gray-800 cursor-pointer"
          onClick={handleManualPlay}
        >
          <div className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="mt-3 text-white font-medium">Click to play video</div>
        </div>
      )}
      
      {/* Show connecting or no video message */}
      {(!isConnected || (!hasVideo && !needsManualPlay)) && (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800">
          <div className="text-white text-xl">
            {!isConnected ? 'Connecting...' : 'No Video'}
          </div>
          {errorState && (
            <div className="text-red-300 text-sm mt-2 px-4 text-center">
              {errorState}
            </div>
          )}
        </div>
      )}
      
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded flex items-center">
        <span className={`inline-block w-2 h-2 mr-2 ${isConnected ? 'bg-green-500' : 'bg-yellow-500'} rounded-full`}></span>
        {userName} {!isConnected && '(Connecting...)'}
      </div>
      {connectedTimestamp && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {`Connected ${Math.floor((new Date() - connectedTimestamp)/1000)}s ago`}
        </div>
      )}
    </div>
  );
};