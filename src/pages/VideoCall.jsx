// import React, { useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';
// import Peer from 'simple-peer';

// // const SERVER_URL = 'https://mental-health-prediction-video-call.onrender.com';
// const SERVER_URL = 'http://localhost:5000';

// export default function VideoCall() {
//   const [socket, setSocket] = useState(null);
//   const [stream, setStream] = useState(null);
//   const [userName, setUserName] = useState('');
//   const [roomId, setRoomId] = useState('');
//   const [peers, setPeers] = useState({});
//   const [isJoined, setIsJoined] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);
//   const [error, setError] = useState('');
//   const [isInitializing, setIsInitializing] = useState(false);
  
//   const userVideo = useRef(null);
//   const peersRef = useRef({});
//   const streamRef = useRef();

//   // Handle setting up the video stream when component mounts and userVideo ref is available
//   useEffect(() => {
//     if (stream && userVideo.current) {
//       userVideo.current.srcObject = stream;
//     }
//   }, [stream, userVideo.current]);

//   // Initialize socket connection
//   useEffect(() => {
//     const newSocket = io(SERVER_URL, {
//       withCredentials: true
//     });
//     setSocket(newSocket);

//     return () => {
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(track => track.stop());
//       }
      
//       // Destroy all peer connections
//       Object.values(peersRef.current).forEach(({ peer }) => {
//         if (peer) {
//           peer.destroy();
//         }
//       });
      
//       newSocket.close();
//     };
//   }, []);

//   // Handle socket events for existing users and new joiners only when joined and stream is available
//   useEffect(() => {
//     if (!socket || !stream || !isJoined) return;

//     // Handle existing users in the room
//     socket.on('room-users', (users) => {
//       console.log('Existing users in room:', users);
      
//       // Clean up any existing peers first
//       Object.values(peersRef.current).forEach(({ peer }) => {
//         if (peer) {
//           peer.destroy();
//         }
//       });
      
//       peersRef.current = {};
//       setPeers({});
      
//       // Create peer connections with all existing users
//       users.forEach(({ userId, userName: remoteUserName }) => {
//         const peer = createPeer(userId, socket.id, stream);
//         peersRef.current[userId] = { peer, userName: remoteUserName };
//       });
      
//       setPeers(peersRef.current);
//     });

//     // Handle new user joining
//     socket.on('user-joined', ({ userId, userName: remoteUserName }) => {
//       console.log('User joined:', remoteUserName);
//       // Only create a peer if we don't already have one for this user
//       if (!peersRef.current[userId]) {
//         const peer = createPeer(userId, socket.id, stream);
//         peersRef.current[userId] = { peer, userName: remoteUserName };
//         setPeers(prev => ({
//           ...prev,
//           [userId]: { peer, userName: remoteUserName }
//         }));
//       }
//     });

//     // Handle incoming call
//     socket.on('incoming-call', ({ signal, from, name }) => {
//       console.log('Incoming call from:', name);
      
//       // If we already have a connection with this peer, destroy it
//       if (peersRef.current[from]) {
//         peersRef.current[from].peer.destroy();
//       }
      
//       // Create a new peer connection
//       const peer = addPeer(signal, from, stream);
//       peersRef.current[from] = { peer, userName: name };
//       setPeers(prev => ({
//         ...prev,
//         [from]: { peer, userName: name }
//       }));
//     });

//     // Handle accepted call
//     socket.on('call-accepted', ({ signal, from }) => {
//       console.log('Call accepted from:', from);
//       if (peersRef.current[from] && peersRef.current[from].peer) {
//         try {
//           peersRef.current[from].peer.signal(signal);
//         } catch (err) {
//           console.error('Error signaling peer:', err);
//           // If there's an error, recreate the peer
//           if (peersRef.current[from]) {
//             peersRef.current[from].peer.destroy();
//             const peer = createPeer(from, socket.id, stream);
//             const userName = peersRef.current[from].userName;
//             peersRef.current[from] = { peer, userName };
//             setPeers(prev => ({
//               ...prev,
//               [from]: { peer, userName }
//             }));
//           }
//         }
//       }
//     });

//     // Handle user leaving
//     socket.on('user-left', userId => {
//       console.log('User left:', userId);
//       if (peersRef.current[userId]) {
//         peersRef.current[userId].peer.destroy();
//         delete peersRef.current[userId];
//         setPeers(prev => {
//           const newPeers = { ...prev };
//           delete newPeers[userId];
//           return newPeers;
//         });
//       }
//     });

//     return () => {
//       socket.off('room-users');
//       socket.off('user-joined');
//       socket.off('incoming-call');
//       socket.off('call-accepted');
//       socket.off('user-left');
//     };
//   }, [socket, stream, isJoined]);

//   const createPeer = (target, caller, stream) => {
//     try {
//       const peer = new Peer({
//         initiator: true,
//         trickle: false,
//         stream,
//         config: {
//           iceServers: [
//             { urls: 'stun:stun.l.google.com:19302' },
//             { urls: 'stun:stun1.l.google.com:19302' },
//             { urls: 'stun:stun2.l.google.com:19302' }
//           ]
//         }
//       });

//       peer.on('signal', signal => {
//         socket.emit('call-user', {
//           userToCall: target,
//           signalData: signal,
//           from: caller,
//           name: userName
//         });
//       });

//       peer.on('error', err => {
//         console.error('Peer error:', err);
//       });

//       return peer;
//     } catch (err) {
//       console.error('Error creating peer:', err);
//       return null;
//     }
//   };

//   const addPeer = (incomingSignal, caller, stream) => {
//     try {
//       const peer = new Peer({
//         initiator: false,
//         trickle: false,
//         stream,
//         config: {
//           iceServers: [
//             { urls: 'stun:stun.l.google.com:19302' },
//             { urls: 'stun:stun1.l.google.com:19302' },
//             { urls: 'stun:stun2.l.google.com:19302' }
//           ]
//         }
//       });

//       peer.on('signal', signal => {
//         socket.emit('answer-call', { signal, to: caller });
//       });

//       peer.on('error', err => {
//         console.error('Peer error:', err);
//       });

//       // Wrap in a try-catch to handle potential errors
//       try {
//         peer.signal(incomingSignal);
//       } catch (err) {
//         console.error('Error signaling incoming peer:', err);
//       }

//       return peer;
//     } catch (err) {
//       console.error('Error adding peer:', err);
//       return null;
//     }
//   };

//   const joinRoom = async () => {
//     if (!userName.trim() || !roomId.trim() || !socket) {
//       setError('Please enter your name and room ID');
//       return;
//     }

//     if (isInitializing) return;
    
//     try {
//       setError('');
//       setIsInitializing(true);
      
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true
//       });
      
//       streamRef.current = mediaStream;
//       setStream(mediaStream);
      
//       // Reset any existing peer connections before joining
//       Object.values(peersRef.current).forEach(({ peer }) => {
//         if (peer) peer.destroy();
//       });
//       peersRef.current = {};
//       setPeers({});
      
//       socket.emit('join-room', { userName, roomId });
//       setIsJoined(true);
//     } catch (err) {
//       console.error('Error accessing media devices:', err);
//       setError(err.name === 'NotAllowedError' 
//         ? 'Please allow camera and microphone access'
//         : 'Error accessing camera or microphone');
//     } finally {
//       setIsInitializing(false);
//     }
//   };

//   const toggleMute = () => {
//     if (streamRef.current) {
//       const audioTracks = streamRef.current.getAudioTracks();
//       if (audioTracks.length > 0) {
//         const audioTrack = audioTracks[0];
//         audioTrack.enabled = !audioTrack.enabled;
//         setIsMuted(!audioTrack.enabled);
//       }
//     }
//   };

//   const toggleVideo = () => {
//     if (streamRef.current) {
//       const videoTracks = streamRef.current.getVideoTracks();
//       if (videoTracks.length > 0) {
//         const videoTrack = videoTracks[0];
//         videoTrack.enabled = !videoTrack.enabled;
//         setIsVideoOff(!videoTrack.enabled);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen p-8 mt-12">
//       {!isJoined ? (
//         <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg">
//           <h1 className="text-2xl font-bold text-purple-700 mb-6">Join Video Call</h1>
//           {error && (
//             <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
//               {error}
//             </div>
//           )}
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             className="w-full mb-4 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//           <input
//             type="text"
//             placeholder="Room ID"
//             value={roomId}
//             onChange={(e) => setRoomId(e.target.value)}
//             className="w-full mb-4 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500d"
//           />
//           <button
//             onClick={joinRoom}
//             disabled={!userName.trim() || !roomId.trim() || isInitializing}
//             className="w-full bg-purple-700 text-white font-bold p-2 rounded hover:bg-purple-600 disabled:bg-gray-400"
//           >
//             {isInitializing ? 'Initializing...' : 'Join Room'}
//           </button>
//         </div>
//       ) : (
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//             <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
//               <video
//                 ref={userVideo}
//                 autoPlay
//                 playsInline
//                 muted
//                 className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : ''}`}
//               />
//               {isVideoOff && (
//                 <div className="w-full h-full flex items-center justify-center bg-gray-800">
//                   <div className="text-white text-xl">Camera Off</div>
//                 </div>
//               )}
//               <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
//                 {userName} (You)
//               </div>
//             </div>
            
//             {Object.entries(peers).map(([peerId, { peer, userName: peerName }]) => {
//               if (!peer) return null;
              
//               return (
//                 <div key={peerId} className="relative bg-black rounded-lg overflow-hidden aspect-video">
//                   <video
//                     ref={(ref) => {
//                       if (ref && peer && peer.streams && peer.streams[0]) {
//                         ref.srcObject = peer.streams[0];
//                       }
//                     }}
//                     autoPlay
//                     playsInline
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
//                     {peerName}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
          
//           <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
//             <button
//               onClick={toggleMute}
//               className={`p-3 rounded-full ${
//                 isMuted ? 'bg-red-500' : 'bg-gray-700'
//               } text-white hover:opacity-90`}
//             >
//               {isMuted ? 'Unmute' : 'Mute'}
//             </button>
//             <button
//               onClick={toggleVideo}
//               className={`p-3 rounded-full ${
//                 isVideoOff ? 'bg-red-500' : 'bg-gray-700'
//               } text-white hover:opacity-90`}
//             >
//               {isVideoOff ? 'Start Video' : 'Stop Video'}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

// const SERVER_URL = 'https://mental-health-prediction-video-call.onrender.com';
const SERVER_URL = 'http://localhost:5000';

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
  
  const userVideo = useRef(null);
  const peersRef = useRef({});
  const streamRef = useRef();

  // Handle setting up the video stream when component mounts and userVideo ref is available
  useEffect(() => {
    if (stream && userVideo.current) {
      userVideo.current.srcObject = stream;
    }
  }, [stream, userVideo.current]);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(SERVER_URL, {
      withCredentials: true
    });
    setSocket(newSocket);

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      // Destroy all peer connections
      Object.values(peersRef.current).forEach(({ peer }) => {
        if (peer) {
          peer.destroy();
        }
      });
      
      newSocket.close();
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
      setPeers({});
      
      // Create peer connections with all existing users
      users.forEach(({ userId, userName: remoteUserName }) => {
        const peer = createPeer(userId, socket.id, stream);
        peersRef.current[userId] = { peer, userName: remoteUserName };
      });
      
      setPeers(peersRef.current);
    });

    // Handle new user joining
    socket.on('user-joined', ({ userId, userName: remoteUserName }) => {
      console.log('User joined:', remoteUserName);
      // Only create a peer if we don't already have one for this user
      if (!peersRef.current[userId]) {
        const peer = createPeer(userId, socket.id, stream);
        peersRef.current[userId] = { peer, userName: remoteUserName };
        setPeers(prev => ({
          ...prev,
          [userId]: { peer, userName: remoteUserName }
        }));
      }
    });

    // Handle incoming call
    socket.on('incoming-call', ({ signal, from, name }) => {
      console.log('Incoming call from:', name);
      
      // If we already have a connection with this peer, destroy it
      if (peersRef.current[from]) {
        peersRef.current[from].peer.destroy();
      }
      
      // Create a new peer connection
      const peer = addPeer(signal, from, stream);
      peersRef.current[from] = { peer, userName: name };
      setPeers(prev => ({
        ...prev,
        [from]: { peer, userName: name }
      }));
    });

    // Handle accepted call
    socket.on('call-accepted', ({ signal, from }) => {
      console.log('Call accepted from:', from);
      if (peersRef.current[from] && peersRef.current[from].peer) {
        try {
          peersRef.current[from].peer.signal(signal);
        } catch (err) {
          console.error('Error signaling peer:', err);
          // If there's an error, recreate the peer
          if (peersRef.current[from]) {
            peersRef.current[from].peer.destroy();
            const peer = createPeer(from, socket.id, stream);
            const userName = peersRef.current[from].userName;
            peersRef.current[from] = { peer, userName };
            setPeers(prev => ({
              ...prev,
              [from]: { peer, userName }
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
        setPeers(prev => {
          const newPeers = { ...prev };
          delete newPeers[userId];
          return newPeers;
        });
      }
    });

    return () => {
      socket.off('room-users');
      socket.off('user-joined');
      socket.off('incoming-call');
      socket.off('call-accepted');
      socket.off('user-left');
    };
  }, [socket, stream, isJoined]);

  const createPeer = (target, caller, stream) => {
    try {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' }
          ]
        }
      });

      peer.on('signal', signal => {
        socket.emit('call-user', {
          userToCall: target,
          signalData: signal,
          from: caller,
          name: userName
        });
      });

      peer.on('error', err => {
        console.error('Peer error:', err);
      });

      return peer;
    } catch (err) {
      console.error('Error creating peer:', err);
      return null;
    }
  };

  const addPeer = (incomingSignal, caller, stream) => {
    try {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' }
          ]
        }
      });

      peer.on('signal', signal => {
        socket.emit('answer-call', { signal, to: caller });
      });

      peer.on('error', err => {
        console.error('Peer error:', err);
      });

      // Wrap in a try-catch to handle potential errors
      try {
        peer.signal(incomingSignal);
      } catch (err) {
        console.error('Error signaling incoming peer:', err);
      }

      return peer;
    } catch (err) {
      console.error('Error adding peer:', err);
      return null;
    }
  };

  const joinRoom = async () => {
    if (!userName.trim() || !roomId.trim() || !socket) {
      setError('Please enter your name and room ID');
      return;
    }

    if (isInitializing) return;
    
    try {
      setError('');
      setIsInitializing(true);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      streamRef.current = mediaStream;
      setStream(mediaStream);
      
      // Reset any existing peer connections before joining
      Object.values(peersRef.current).forEach(({ peer }) => {
        if (peer) peer.destroy();
      });
      peersRef.current = {};
      setPeers({});
      
      socket.emit('join-room', { userName, roomId });
      setIsJoined(true);
    } catch (err) {
      console.error('Error accessing media devices:', err);
      setError(err.name === 'NotAllowedError' 
        ? 'Please allow camera and microphone access'
        : 'Error accessing camera or microphone');
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

  return (
    <div className="min-h-screen p-8 mt-12">
      {!isJoined ? (
        <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-purple-700 mb-6">Join Video Call</h1>
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
            className="w-full mb-4 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500d"
          />
          <button
            onClick={joinRoom}
            disabled={!userName.trim() || !roomId.trim() || isInitializing}
            className="w-full bg-purple-700 text-white font-bold p-2 rounded hover:bg-purple-600 disabled:bg-gray-400"
          >
            {isInitializing ? 'Initializing...' : 'Join Room'}
          </button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
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
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                {userName} (You)
              </div>
            </div>
            
            {Object.entries(peers).map(([peerId, { peer, userName: peerName }]) => {
              if (!peer) return null;
              
              return (
                <PeerVideo 
                  key={peerId} 
                  peer={peer} 
                  userName={peerName} 
                />
              );
            })}
          </div>
          
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button
              onClick={toggleMute}
              className={`p-3 rounded-full ${
                isMuted ? 'bg-red-500' : 'bg-gray-700'
              } text-white hover:opacity-90`}
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full ${
                isVideoOff ? 'bg-red-500' : 'bg-gray-700'
              } text-white hover:opacity-90`}
            >
              {isVideoOff ? 'Start Video' : 'Stop Video'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Separate component for peer videos
const PeerVideo = ({ peer, userName }) => {
  const videoRef = useRef();
  
  useEffect(() => {
    if (!peer) return;
    
    // Function to handle incoming stream
    const handleStream = (stream) => {
      console.log('Setting stream to video element for', userName);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };
    
    // Add event listener
    peer.on('stream', handleStream);
    
    // Check if stream is already available (might be the case with existing peers)
    if (peer.streams && peer.streams[0]) {
      handleStream(peer.streams[0]);
    }
    
    return () => {
      // Don't use peer.off as it may not work properly with simple-peer
      // The peer will be destroyed by the parent component when needed
    };
  }, [peer, userName]);
  
  return (
    <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
        {userName}
      </div>
    </div>
  );
};