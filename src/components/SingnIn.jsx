import React, { useState } from 'react'
import Input from './Input.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { userState ,userLogin } from '../store/reducer.js';
import OAuth from './OAuth.jsx';
function SignIn() {
    let dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const navigate = useNavigate();
    let onSubmit = async (data) => {
        try {
            // Send data to the backend using axios
            const response = await axios.post('https://realestae-backened-production.up.railway.app/user/sign-in', data, { withCredentials: true });
            console.log('Response from server:', response.data.data.user);
            reset();
            let userdata={
                username:response.data.data.user.username,
                email:response.data.data.user.email,
                avatar:response.data.data.user.avatar,
                _id:response.data.data.user._id
            }
            dispatch(userState(userdata ))
            dispatch(userLogin())
            navigate('/')

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mt-4 h-full">
                <div className=" mt-24 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg p-6  h-3/5 w-5/6 mx-auto flex justify-center items-center flex-col lg:w-1/3">
                    <p className="text-2xl font-bold text-gray-800 text-[2.5vw]">Log In</p>

                    {/* Username input */}
                    <Input
                        name="username"
                        {...register('username', { required: true })}
                        placeholder="Username..."
                    />

                    {/* Email input */}
                    <Input
                        name="email"
                        {...register('email', { required: true })}
                        placeholder="Email..."
                    />


                    {/* Password input */}
                    <Input
                        {...register('password', { required: true })}
                        placeholder="Password..."
                        type="password" // Added password type
                    />
                    {errors.password && (
                        <div className="text-red-600">Password is required!</div>
                    )}

                    {/* Submit button */}
                    <button
                        type="submit" // Added submit type
                        className="p-1 mb-3 h-8 bg-blue-300 w-72 hover:bg-blue-200 text-gray-700 font-semibold"
                    >
                        Log In
                    </button>
                    <OAuth/>
                    <p className='text-white'>
                        Don't have an account?{' '}
                        <Link className="text-blue-500" to={'/sign-up'}>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </form>
    );
}

export default SignIn;

