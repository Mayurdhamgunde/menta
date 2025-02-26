// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import { handleError, handleSuccess } from '../utils';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState({ email: "", password: "" });
//     const [loading, setLoading] = useState(false);

//     const handleInput = (e) => {
//         const { name, value } = e.target;
//         setUser(prev => ({ ...prev, [name]: value }));
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { email, password } = user;
//         if (!email || !password) {
//             return handleError('Email and password are required');
//         }
//         setLoading(true);
    
//         try {
//             const response = await fetch(`http://localhost:8000/api/auth/login`, {
//                 method: "POST",
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(user)
//             });
    
//             if (!response.ok) {
//                 throw new Error("Invalid email or password");
//             }
    
//             const results = await response.json();
            
//             const { success, message, error } = results;
//             if (success) {
//                 console.log("Before navigation");
//                 toast.success(message || "Login successful", { position: "top-right" });
//                 setTimeout(() => {
//                     console.log("Navigating to /home");
//                     navigate('/');
//                 }, 1000);
//             }
//             else if (error) {
//                 const details = error?.details?.[0]?.message || "Login failed";
//                 toast.error(details, { position: "top-right" });
//             } else {
//                 toast.error(message || "Invalid email or password", { position: "top-right" });
//             }
//         } catch (err) {
//             handleError(err.message || "Invalid email or password");
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <div className="flex items-center justify-center min-h-screen ">
//             <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
//                 <form onSubmit={handleSubmit}>
//                     <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
//                     <p className="text-sm text-gray-500 text-center mb-6">Enter your credentials to login</p>
//                     <input
//                         type="email"
//                         name='email'
//                         value={user.email}
//                         onChange={handleInput}
//                         placeholder='Email'
//                         className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
//                     />
//                     <input
//                         type="password"
//                         name='password'
//                         value={user.password}
//                         onChange={handleInput}
//                         placeholder='Password'
//                         className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
//                     />

//                     <button
//                         type='submit'
//                         disabled={loading}
//                         className={`w-full text-white py-3 rounded-lg font-bold ${loading ? "bg-gray-400" : "bg-purple-700 hover:hover:bg-purple-800"}`}
//                     >
//                         {loading ? "Logging in..." : "Login Now"}
//                     </button>

//                     <p className="text-center text-sm mt-4">
//                         Don't have an account?{" "}
//                         <Link to="/signup" className="text-orange-500 cursor-pointer ">Sign Up</Link>
//                     </p>
//                 </form>
//                 <ToastContainer />
//             </div>
//         </div>
//     )
// }

// export default Login;

// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import { handleError, handleSuccess } from '../utils';
// import 'react-toastify/dist/ReactToastify.css';
// import { Mail, Lock, ArrowRight,Eye,EyeOff } from 'lucide-react';

// const Login = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState({ email: "", password: "" });
//     const [loading, setLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);

//     const handleInput = (e) => {
//         const { name, value } = e.target;
//         setUser(prev => ({ ...prev, [name]: value }));
//     }

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { email, password } = user;
//         if (!email || !password) {
//             return handleError('Email and password are required');
//         }
//         setLoading(true);
    
//         try {
//             const response = await fetch(`http://localhost:8000/api/auth/login`, {
//                 method: "POST",
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(user)
//             });
    
//             if (!response.ok) {
//                 throw new Error("Invalid email or password");
//             }
    
//             const results = await response.json();
            
//             const { success, message, error } = results;
//             if (success) {
//                 console.log("Before navigation");
//                 toast.success(message || "Login successful", { position: "top-right" });
//                 setTimeout(() => {
//                     console.log("Navigating to /home");
//                     navigate('/');
//                 }, 1000);
//             }
//             else if (error) {
//                 const details = error?.details?.[0]?.message || "Login failed";
//                 toast.error(details, { position: "top-right" });
//             } else {
//                 toast.error(message || "Invalid email or password", { position: "top-right" });
//             }
//         } catch (err) {
//             handleError(err.message || "Invalid email or password");
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8">
//             <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="text-center mb-6 transition-transform duration-300 transform hover:scale-105">
//                         <h2 className="text-2xl font-bold">Welcome Back</h2>
//                         <p className="text-sm text-gray-500">Enter your credentials to login</p>
//                     </div>
                    
//                     <div className="relative transition-all duration-200 hover:translate-y-[-2px]">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
//                             <Mail size={18} />
//                         </div>
//                         <input
//                             type="email"
//                             name='email'
//                             value={user.email}
//                             onChange={handleInput}
//                             placeholder='Email'
//                             className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-200"
//                         />
//                     </div>
                    
//                     <div className="relative transition-all duration-200 hover:translate-y-[-2px]">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
//                             <Lock size={18} />
//                         </div>
//                         <input
//                             type={showPassword ? "text" : "password"}
//                             name='password'
//                             value={user.password}
//                             onChange={handleInput}
//                             placeholder='Password'
//                             className="w-full p-3 pl-10 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-200"
//                         />
//                         <div 
//                             className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200"
//                             onClick={togglePasswordVisibility}
//                          >
//                             {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                         </div>
//                     </div>

//                     <button
//                         type='submit'
//                         disabled={loading}
//                         className={`w-full text-white py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-[1.02] flex justify-center items-center gap-2 ${loading ? "bg-gray-400" : "bg-purple-700 hover:bg-purple-800"}`}
//                     >
//                         {loading ? (
//                             <>
//                                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                 </svg>
//                                 Logging in...
//                             </>
//                         ) : (
//                             <>
//                                 Login Now
//                                 <ArrowRight size={18} className="animate-pulse" />
//                             </>
//                         )}
//                     </button>

//                     <p className="text-center text-sm mt-4">
//                         Don't have an account?{" "}
//                         <Link to="/signup" className="text-orange-500 cursor-pointer transition-colors duration-200 hover:text-orange-600 font-medium">Sign Up</Link>
//                     </p>
//                 </form>
//                 <ToastContainer />
//             </div>
//         </div>
//     )
// }

// export default Login;





// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Mail, Lock, ArrowRight, Eye, EyeOff, LogIn } from 'lucide-react';

// const Login = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState({ email: "", password: "" });
//     const [loading, setLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);

//     const handleInput = (e) => {
//         const { name, value } = e.target;
//         setUser(prev => ({ ...prev, [name]: value }));
//     }

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     }

//     const handleError = (message) => {
//         toast.error(message, { position: "top-right" });
//     };

//     const handleSuccess = (message) => {
//         toast.success(message, { position: "top-right" });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { email, password } = user;
//         if (!email || !password) {
//             return handleError('Email and password are required');
//         }
//         setLoading(true);
    
//         try {
//             const response = await fetch(`http://localhost:8000/api/auth/login`, {
//                 method: "POST",
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(user)
//             });
    
//             if (!response.ok) {
//                 throw new Error("Invalid email or password");
//             }
    
//             const results = await response.json();
            
//             const { success, message, error } = results;
//             if (success) {
//                 handleSuccess(message || "Login successful");
//                 setTimeout(() => {
//                     navigate('/');
//                 }, 1000);
//             }
//             else if (error) {
//                 const details = error?.details?.[0]?.message || "Login failed";
//                 handleError(details);
//             } else {
//                 handleError(message || "Invalid email or password");
//             }
//         } catch (err) {
//             handleError(err.message || "Invalid email or password");
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 bg-gray-50">
//             <div className="w-full max-w-md overflow-hidden bg-white rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
//                 <div className="relative h-32 sm:h-40 bg-gradient-to-r from-purple-600 to-indigo-600">
//                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')] opacity-20 bg-cover bg-center"></div>
//                     <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center transform translate-y-1/2">
//                         <div className="p-3 sm:p-4 bg-white rounded-full shadow-lg">
//                             <LogIn size={24} className="text-purple-600 sm:hidden" />
//                             <LogIn size={32} className="text-purple-600 hidden sm:block" />
//                         </div>
//                     </div>
//                 </div>
                
//                 <div className="px-4 sm:px-6 md:px-8 pt-12 sm:pt-16 pb-6 sm:pb-8">
//                     <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
//                         <div className="text-center mb-6 sm:mb-8 transition-transform duration-300 transform hover:scale-105">
//                             <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800">Welcome Back</h2>
//                             <p className="mt-2 text-xs sm:text-sm text-gray-600">Enter your credentials to continue</p>
//                         </div>
                        
//                         <div className="space-y-3 sm:space-y-4">
//                             <div className="relative group transition-all duration-200 hover:translate-y-[-2px]">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors">
//                                     <Mail size={16} className="sm:hidden" />
//                                     <Mail size={18} className="hidden sm:block" />
//                                 </div>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={user.email}
//                                     onChange={handleInput}
//                                     placeholder="Email"
//                                     className="w-full p-2 sm:p-3 pl-9 sm:pl-10 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 group-hover:border-purple-300"
//                                 />
//                             </div>
//                             <div className="relative group transition-all duration-200 hover:translate-y-[-2px]">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors">
//                                     <Lock size={16} className="sm:hidden" />
//                                     <Lock size={18} className="hidden sm:block" />
//                                 </div>
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     name="password"
//                                     value={user.password}
//                                     onChange={handleInput}
//                                     placeholder="Password"
//                                     className="w-full p-2 sm:p-3 pl-9 sm:pl-10 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 group-hover:border-purple-300"
//                                 />
//                                 <button 
//                                     type="button" 
//                                     onClick={togglePasswordVisibility} 
//                                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-600 transition-colors"
//                                 >
//                                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                                 </button>
//                             </div>
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg font-bold text-white shadow-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:scale-[1.02] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 flex justify-center items-center gap-2"
//                         >
//                             {loading ? (
//                                 <>
//                                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                     </svg>
//                                     Logging in...
//                                 </>
//                             ) : (
//                                 <>
//                                     Sign In
//                                     <ArrowRight size={18} className="animate-pulse" />
//                                 </>
//                             )}
//                         </button>
//                     </form>

//                     <div className="mt-6 pt-4 sm:mt-8 sm:pt-6 border-t border-gray-200 text-center">
//                         <p className="text-xs sm:text-sm text-gray-600">
//                             Don't have an account? <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-700 transition-colors">Create account</Link>
//                         </p>
//                     </div>
//                 </div>
//                 <ToastContainer />
//             </div>
//         </div>
//     );
// }

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Mail, Lock, ArrowRight, Eye, EyeOff, LogIn } from 'lucide-react';

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
        <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-4 ">
            <div className="w-full max-w-md overflow-hidden bg-white rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
                <div className="relative h-32 sm:h-40 bg-gradient-to-r from-purple-600 to-indigo-600">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')] opacity-20 bg-cover bg-center"></div>
                    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center transform translate-y-1/2">
                        <div className="p-3 sm:p-4 bg-white rounded-full shadow-lg">
                            <LogIn size={24} className="text-purple-600 sm:hidden" />
                            <LogIn size={32} className="text-purple-600 hidden sm:block" />
                        </div>
                    </div>
                </div>
                
                <div className="px-4 sm:px-6 md:px-8 pt-12 sm:pt-16 pb-6 sm:pb-8">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="text-center mb-6 sm:mb-8 transition-transform duration-300 transform hover:scale-105">
                            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800">Welcome Back</h2>
                            <p className="mt-2 text-xs sm:text-sm text-gray-600">Enter your credentials to continue</p>
                        </div>
                        
                        <div className="space-y-3 sm:space-y-4">
                            <div className="relative group transition-all duration-200 hover:translate-y-[-2px]">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors">
                                    <Mail size={16} className="sm:hidden" />
                                    <Mail size={18} className="hidden sm:block" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInput}
                                    placeholder="Email"
                                    className="w-full p-2 sm:p-3 pl-9 sm:pl-10 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 group-hover:border-purple-300"
                                />
                            </div>
                            <div className="relative group transition-all duration-200 hover:translate-y-[-2px]">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors">
                                    <Lock size={16} className="sm:hidden" />
                                    <Lock size={18} className="hidden sm:block" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={user.password}
                                    onChange={handleInput}
                                    placeholder="Password"
                                    className="w-full p-2 sm:p-3 pl-9 sm:pl-10 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 group-hover:border-purple-300"
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg font-bold text-white shadow-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:scale-[1.02] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={18} className="animate-pulse" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-4 sm:mt-8 sm:pt-6 border-t border-gray-200 text-center">
                        <p className="text-xs sm:text-sm text-gray-600">
                            Don't have an account? <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-700 transition-colors">Create account</Link>
                        </p>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;

