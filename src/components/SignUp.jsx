import React from 'react'
import Input from './Input.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { userState } from '../store/reducer.js';
import OAuth from './OAuth.jsx';
function SignUp() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let onSubmit = async (data) => {
        try {
            // Send data to the backend using axios
            const response = await axios.post('https://realestae-backened-production.up.railway.app/user/sign-up', data, { withCredentials: true });
            console.log('Response from server:', response.data);
            reset();
            dispatch(userState(data))
            navigate('/sign-in')
        } catch (error) {
            console.error('Error submitting form:', error);
        }
        
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mt-4 h-full ">
                <div className=" mt-24 p-8 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg h-3/5 w-5/6 mx-auto flex justify-center items-center flex-col lg:w-1/3">
                    <p className="text-2xl font-bold text-gray-800 text-[2.5vw]">Sign Up</p>

                    {/* Username input */}
                    <Input
                        {...register('username', { required: true })}
                        placeholder="Username..."
                    />
                    {errors.username && (
                        <div className="text-red-600">Username is required!</div>
                    )}

                    {/* Email input */}
                    <Input
                        {...register('email', { required: true })}
                        placeholder="Email..."
                    />
                    {errors.email && (
                        <div className="text-red-600">Email is required!</div>
                    )}

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
                        className="p-1 mb-3 h-8 bg-blue-300 w-64 hover:bg-blue-200 text-gray-700 font-semibold"
                    >
                        Sign Up
                    </button>
                    <OAuth />
                    <p className='text-white'>
                        Have an account?{' '}
                        <Link className="text-blue-500" to={'/sign-in'}>
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </form>
    );
}

export default SignUp;
