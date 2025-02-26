// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Signup = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState({
//         username: "",
//         email: "",
//         phone: "",
//         password: "",
//     });

//     const handleInput = (e) => {
//         const { name, value } = e.target;
//         setUser({
//             ...user,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { username, email, password, phone } = user;
        
//         if (!email || !password || !username || !phone) {
//             return toast.error('All fields are required', { position: "top-right" });
//         }
//         if (!/^\d{10}$/.test(phone)) {
//             return toast.error('Phone number must be 10 digits', { position: "top-right" });
//         }
    
//         if (password.length < 6) {
//             return toast.error('Password must be at least 6 characters', { position: "top-right" });
//         }    

//         try {
//             const response = await fetch(`http://localhost:8000/api/auth/signup`, {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': "application/json"
//                 },
//                 body: JSON.stringify(user)
//             });

//             const result = await response.json();
//             console.log("API Response:", result); // Debugging

//             const { success, message, error } = result;
//             if (success) {
//                 toast.success(message || "User registered successfully", { position: "top-right" });
//                 setTimeout(() => navigate('/home'), 1500); // Navigate after 1.5 sec
//             } else if (error) {
//                 const details = error?.details?.[0]?.message || "Registration failed";
//                 toast.error(details, { position: "top-right" });
//             } else {
//                 toast.error(message || "Something went wrong", { position: "top-right" });
//             }
//         } catch (err) {
//             toast.error("Network error! Please try again.", { position: "top-right" });
//         }
//     };

//     return (
//         <>
//             <div className="flex items-center justify-center min-h-screen ">
//                 <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
//                     <h2 className="text-2xl font-bold text-center">Sign Up</h2>
//                     <p className="text-sm text-gray-500 text-center mb-6">Create your account</p>
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             name='username'
//                             placeholder='Username'
//                             value={user.username}
//                             onChange={handleInput}
//                             className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
//                         />
//                         <input
//                             type="email"
//                             name='email'
//                             value={user.email}
//                             onChange={handleInput}
//                             placeholder='Email'
//                             className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
//                         />
//                         <input
//                             type="number"
//                             name='phone'
//                             value={user.phone}
//                             placeholder='Phone Number'
//                             onChange={handleInput}
//                             className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
//                         />
//                         <input
//                             type="password"
//                             name='password'
//                             value={user.password}
//                             onChange={handleInput}
//                             placeholder='Password'
//                             className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
//                         />
//                         <button
//                             type='submit'
//                             className="w-full bg-purple-700 text-white py-3 rounded-lg font-bold hover:bg-purple-800"
//                         >
//                             Sign Up
//                         </button>
//                         <p className="text-center text-sm mt-4">
//                             Already have an account?{" "}
//                             <span
//                                 className="text-orange-500 cursor-pointer"
//                                 onClick={() => navigate('/login')}
//                             >
//                                 Login
//                             </span>
//                         </p>
//                     </form>
//                     <ToastContainer />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Signup;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { User, Mail, Phone, Lock, LogIn, UserPlus } from 'lucide-react';

// const Signup = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState({
//         username: "",
//         email: "",
//         phone: "",
//         password: "",
//     });
//     const [loading, setLoading] = useState(false);

//     const handleInput = (e) => {
//         const { name, value } = e.target;
//         setUser({
//             ...user,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { username, email, password, phone } = user;
        
//         if (!email || !password || !username || !phone) {
//             return toast.error('All fields are required', { position: "top-right" });
//         }
//         if (!/^\d{10}$/.test(phone)) {
//             return toast.error('Phone number must be 10 digits', { position: "top-right" });
//         }
    
//         if (password.length < 6) {
//             return toast.error('Password must be at least 6 characters', { position: "top-right" });
//         }    

//         setLoading(true);
//         try {
//             const response = await fetch(`http://localhost:8000/api/auth/signup`, {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': "application/json"
//                 },
//                 body: JSON.stringify(user)
//             });

//             const result = await response.json();
//             console.log("API Response:", result); // Debugging

//             const { success, message, error } = result;
//             if (success) {
//                 toast.success(message || "User registered successfully", { position: "top-right" });
//                 setTimeout(() => navigate('/home'), 1500); // Navigate after 1.5 sec
//             } else if (error) {
//                 const details = error?.details?.[0]?.message || "Registration failed";
//                 toast.error(details, { position: "top-right" });
//             } else {
//                 toast.error(message || "Something went wrong", { position: "top-right" });
//             }
//         } catch (err) {
//             toast.error("Network error! Please try again.", { position: "top-right" });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8">
//                 <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
//                     <div className="text-center mb-6 transition-transform duration-300 transform hover:scale-105">
//                         <h2 className="text-2xl font-bold text-center">Sign Up</h2>
//                         <p className="text-sm text-gray-500 text-center">Create your account</p>
//                     </div>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="relative transition-all duration-200 hover:translate-y-[-2px]">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
//                                 <User size={18} />
//                             </div>
//                             <input
//                                 type="text"
//                                 name='username'
//                                 placeholder='Username'
//                                 value={user.username}
//                                 onChange={handleInput}
//                                 className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-200"
//                             />
//                         </div>
                        
//                         <div className="relative transition-all duration-200 hover:translate-y-[-2px]">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
//                                 <Mail size={18} />
//                             </div>
//                             <input
//                                 type="email"
//                                 name='email'
//                                 value={user.email}
//                                 onChange={handleInput}
//                                 placeholder='Email'
//                                 className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-200"
//                             />
//                         </div>
                        
//                         <div className="relative transition-all duration-200 hover:translate-y-[-2px]">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
//                                 <Phone size={18} />
//                             </div>
//                             <input
//                                 type="number"
//                                 name='phone'
//                                 value={user.phone}
//                                 placeholder='Phone Number'
//                                 onChange={handleInput}
//                                 className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-200"
//                             />
//                         </div>
                        
//                         <div className="relative transition-all duration-200 hover:translate-y-[-2px]">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
//                                 <Lock size={18} />
//                             </div>
//                             <input
//                                 type="password"
//                                 name='password'
//                                 value={user.password}
//                                 onChange={handleInput}
//                                 placeholder='Password'
//                                 className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-200"
//                             />
//                         </div>
                        
//                         <button
//                             type='submit'
//                             className="w-full bg-purple-700 text-white py-3 rounded-lg font-bold hover:bg-purple-800 transition-all duration-300 transform hover:scale-[1.02] flex justify-center items-center gap-2"
//                             disabled={loading}
//                         >
//                             {loading ? (
//                                 <>
//                                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                     </svg>
//                                     Processing...
//                                 </>
//                             ) : (
//                                 <>
//                                     Sign Up
//                                     <UserPlus size={18} className="animate-pulse" />
//                                 </>
//                             )}
//                         </button>
                        
//                         <p className="text-center text-sm mt-4">
//                             Already have an account?{" "}
//                             <span
//                                 className="text-orange-500 cursor-pointer transition-colors duration-200 hover:text-orange-600 flex items-center justify-center gap-1 mt-2 font-medium"
//                                 onClick={() => navigate('/login')}
//                             >
//                                 <LogIn size={16} />
//                                 Login
//                             </span>
//                         </p>
//                     </form>
//                     <ToastContainer />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Signup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User, Mail, Phone, Lock, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, phone } = user;
        
        if (!email || !password || !username || !phone) {
            return toast.error('All fields are required', { position: "top-right" });
        }
        if (!/^\d{10}$/.test(phone)) {
            return toast.error('Phone number must be 10 digits', { position: "top-right" });
        }
    
        if (password.length < 6) {
            return toast.error('Password must be at least 6 characters', { position: "top-right" });
        }    

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/auth/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(user)
            });

            const result = await response.json();
            console.log("API Response:", result); // Debugging

            const { success, message, error } = result;
            if (success) {
                toast.success(message || "User registered successfully", { position: "top-right" });
                setTimeout(() => navigate('/home'), 1500); // Navigate after 1.5 sec
            } else if (error) {
                const details = error?.details?.[0]?.message || "Registration failed";
                toast.error(details, { position: "top-right" });
            } else {
                toast.error(message || "Something went wrong", { position: "top-right" });
            }
        } catch (err) {
            toast.error("Network error! Please try again.", { position: "top-right" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8">
                <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
                    <div className="text-center mb-6 transition-transform duration-300 transform hover:scale-105">
                        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                        <p className="text-sm text-gray-500 text-center">Create your account</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative transition-all duration-200 hover:translate-y-[-2px]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <User size={18} />
                            </div>
                            <input
                                type="text"
                                name='username'
                                placeholder='Username'
                                value={user.username}
                                onChange={handleInput}
                                className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-200"
                            />
                        </div>
                        
                        <div className="relative transition-all duration-200 hover:translate-y-[-2px]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                name='email'
                                value={user.email}
                                onChange={handleInput}
                                placeholder='Email'
                                className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-200"
                            />
                        </div>
                        
                        <div className="relative transition-all duration-200 hover:translate-y-[-2px]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <Phone size={18} />
                            </div>
                            <input
                                type="number"
                                name='phone'
                                value={user.phone}
                                placeholder='Phone Number'
                                onChange={handleInput}
                                className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-200"
                            />
                        </div>
                        
                        <div className="relative transition-all duration-200 hover:translate-y-[-2px]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <Lock size={18} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name='password'
                                value={user.password}
                                onChange={handleInput}
                                placeholder='Password'
                                className="w-full p-3 pl-10 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-200"
                            />
                            <div 
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </div>
                        </div>
                        
                        <button
                            type='submit'
                            className="w-full bg-purple-700 text-white py-3 rounded-lg font-bold hover:bg-purple-800 transition-all duration-300 transform hover:scale-[1.02] flex justify-center items-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Sign Up
                                    <UserPlus size={18} className="animate-pulse" />
                                </>
                            )}
                        </button>
                        
                        <p className="text-center text-sm mt-4">
                            Already have an account?{" "}
                            <span
                                className="text-orange-500 cursor-pointer transition-colors duration-200 hover:text-orange-600 flex items-center justify-center gap-1 mt-2 font-medium"
                                onClick={() => navigate('/login')}
                            >
                                <LogIn size={16} />
                                Login
                            </span>
                        </p>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
};

export default Signup;