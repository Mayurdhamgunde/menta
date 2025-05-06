import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleError = (message) => {
        toast.error(message, { position: "top-right" });
    };

    const handleSuccess = (message) => {
        toast.success(message, { position: "top-right" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = user;
        if (!email || !password) {
            return handleError('Email and password are required');
        }
        setLoading(true);
    
        // Check for specific credentials
        if (email === "mindguardai@gmail.com" && password === "mindguardai123") {
            // Store login state in localStorage
            localStorage.setItem('isLoggedIn', 'true');
            
            // Dispatch a storage event so other components can listen for the change
            window.dispatchEvent(new Event('storage'));
            
            handleSuccess("Login successful");
            setTimeout(() => {
                navigate('/');
            }, 1000);
            setLoading(false);
            return;
        }
    
        try {
            const response = await fetch(`https://mentalhealth-2bzt.onrender.com/api/auth/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
    
            if (!response.ok) {
                throw new Error("Invalid email or password");
            }
    
            const results = await response.json();
            
            const { success, message, error } = results;
            if (success) {
                // Store login state in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                
                // Dispatch a storage event so other components can listen for the change
                window.dispatchEvent(new Event('storage'));
                
                handleSuccess(message || "Login successful");
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
            else if (error) {
                const details = error?.details?.[0]?.message || "Login failed";
                handleError(details);
            } else {
                handleError(message || "Invalid email or password");
            }
        } catch (err) {
            handleError(err.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Banner - Shown on both mobile and desktop */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-700 to-indigo-900 relative h-[25vh] md:min-h-screen shadow-lg">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-60"></div>
                <div className="relative z-10 flex flex-col justify-center md:justify-between items-center md:items-start w-full h-full p-6 md:p-12 text-white">
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl md:text-3xl font-bold">Menta Health</h1>
                        <p className="mt-1 md:mt-2 text-sm md:text-base text-gray-200">Your mental wellness companion</p>
                    </div>
                    <div className="hidden md:block">
                        <h2 className="text-lg md:text-4xl font-extrabold leading-tight">Begin your journey to better mental health today</h2>
                        <p className="mt-1 md:mt-6 text-xs md:text-lg">Connect with professionals and resources designed to support your wellbeing.</p>
                    </div>
                    <div className="hidden md:flex gap-2 mt-4 md:mt-6">
                        <div className="w-2 h-2 rounded-full bg-white opacity-60"></div>
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                        <div className="w-2 h-2 rounded-full bg-white opacity-60"></div>
                    </div>
                </div>
            </div>

            {/* Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-8 md:py-0">
                <div className="w-full max-w-md p-4 md:p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">Welcome Back</h2>
                        <p className="mt-3 text-gray-600">Please sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleInput}
                                        placeholder="you@example.com"
                                        className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-500">Forgot password?</a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={user.password}
                                        onChange={handleInput}
                                        placeholder="••••••••"
                                        className="w-full py-3 pl-10 pr-10 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={togglePasswordVisibility} 
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md transition duration-200 transform hover:translate-y-[-2px] flex justify-center items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>

                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                Don't have an account? <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500">Create one now</Link>
                            </p>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;

