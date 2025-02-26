import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
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
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen ">
                <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                    <p className="text-sm text-gray-500 text-center mb-6">Create your account</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name='username'
                            placeholder='Username'
                            value={user.username}
                            onChange={handleInput}
                            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <input
                            type="email"
                            name='email'
                            value={user.email}
                            onChange={handleInput}
                            placeholder='Email'
                            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <input
                            type="number"
                            name='phone'
                            value={user.phone}
                            placeholder='Phone Number'
                            onChange={handleInput}
                            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <input
                            type="password"
                            name='password'
                            value={user.password}
                            onChange={handleInput}
                            placeholder='Password'
                            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <button
                            type='submit'
                            className="w-full bg-purple-700 text-white py-3 rounded-lg font-bold hover:bg-purple-800"
                        >
                            Sign Up
                        </button>
                        <p className="text-center text-sm mt-4">
                            Already have an account?{" "}
                            <span
                                className="text-orange-500 cursor-pointer"
                                onClick={() => navigate('/login')}
                            >
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