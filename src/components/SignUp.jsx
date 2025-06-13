import React from 'react';
import Input from './Input.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userState, userLogin } from '../store/reducer.js';
import OAuth from './OAuth.jsx';

function SignUp() {
    let dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const navigate = useNavigate();

    let onSubmit = async (data) => {
        try {
            console.log(data);
            const response = await axios.post('https://realestae-backened-production.up.railway.app/user/sign-up', data, { withCredentials: true });
            console.log('Response from server:', response.data);
            reset();
            let userdata = {
                username: response.data.data.user.username,
                email: response.data.data.user.email,
                avatar: response.data.data.user.avatar,
                _id: response.data.data.user._id
            };
            dispatch(userState(userdata));
            dispatch(userLogin());
            navigate('/');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-9 min-h-screen flex items-center justify-center bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg p-4">
                <div className="w-full max-w-md bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg p-8">
                    {/* Heading */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800">Sign Up</h2>
                    </div>

                    {/* Form Fields */}
                    <div className="mt-6 space-y-4">
                        {/* Username input */}
                        <Input
                            name="username"
                            {...register('username', { required: true })}
                            placeholder="Username"
                            className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent placeholder-gray-600"
                        />
                        
                        {/* Email input */}
                        <Input
                            name="email"
                            {...register('email', { required: true })}
                            placeholder="Email"
                            className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent placeholder-gray-600"
                        />

                        {/* Password input */}
                        <Input
                            {...register('password', { required: true })}
                            placeholder="Password"
                            type="password"
                            className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent placeholder-gray-600"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">Password is required!</p>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-300 hover:bg-blue-200 text-gray-800 font-semibold rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Sign Up
                        </button>

                        {/* OAuth Component */}
{/*                         <OAuth /> */}

                        {/* Sign-in link */}
                        <div className="text-center">
                            <p className="text-sm text-gray-700">
                                Already have an account?{' '}
                                <Link
                                    to="/sign-in"
                                    className="font-medium text-blue-500 hover:text-blue-400"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default SignUp;
