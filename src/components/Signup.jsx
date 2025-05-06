import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User, Mail, Phone, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleError = (message) => {
        toast.error(message, { position: "top-right" });
    };

    const handleSuccess = (message) => {
        toast.success(message, { position: "top-right" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, phone } = user;
        
        if (!email || !password || !username || !phone) {
            return handleError('All fields are required');
        }
        if (!/^\d{10}$/.test(phone)) {
            return handleError('Phone number must be 10 digits');
        }
    
        if (password.length < 6) {
            return handleError('Password must be at least 6 characters');
        }    

        setLoading(true);
        try {
            const response = await fetch(`https://mentalhealth-2bzt.onrender.com/api/auth/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(user)
            });

            const result = await response.json();

            const { success, message, error } = result;
            if (success) {
                handleSuccess(message || "User registered successfully");
                setTimeout(() => navigate('/login'), 1500);
            } else if (error) {
                const details = error?.details?.[0]?.message || "Registration failed";
                handleError(details);
            } else {
                handleError(message || "Something went wrong");
            }
        } catch (err) {
            handleError("Network error! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Panel - Image */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-700 to-indigo-900 relative">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542353436-312f0e1f67ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-60"></div>
                <div className="relative z-10 flex flex-col justify-between w-full p-12 text-white">
                    <div>
                        <h1 className="text-3xl font-bold">Menta Health</h1>
                        <p className="mt-2 text-gray-200">Your mental wellness companion</p>
                    </div>
                    <div>
                        <h2 className="text-4xl font-extrabold leading-tight">Start your journey to better mental health today</h2>
                        <p className="mt-6 text-lg">Join our community and get access to professional support and resources.</p>
                    </div>
                    <div className="flex gap-2 mt-6">
                        <div className="w-2 h-2 rounded-full bg-white opacity-60"></div>
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                        <div className="w-2 h-2 rounded-full bg-white opacity-60"></div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Signup Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 px-6">
                <div className="w-full max-w-md p-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-gray-800">Create Account</h2>
                        <p className="mt-3 text-gray-600">Sign up to get started</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-5">
                            {/* Username field */}
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">Username</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        id="username"
                                        type="text"
                                        name="username"
                                        value={user.username}
                                        onChange={handleInput}
                                        placeholder="Your username"
                                        className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                    />
                                </div>
                            </div>
                            
                            {/* Email field */}
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
                            
                            {/* Phone field */}
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        value={user.phone}
                                        onChange={handleInput}
                                        placeholder="10-digit phone number"
                                        className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                    />
                                </div>
                            </div>
                            
                            {/* Password field */}
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
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

                        {/* Submit button */}
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
                                    <span>Creating account...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign Up</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>

                        {/* Login link */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                Already have an account? <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Signup;