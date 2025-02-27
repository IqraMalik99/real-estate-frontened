import { useRef } from 'react';
import Input from './Input.jsx';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { userState } from '../store/reducer.js';
import { Trash2, PlusCircle, List } from "lucide-react";
import LOgoUtBUttonUI from './LOgoUtBUttonUI.jsx';
import { useEffect } from 'react';

function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: currentUser.username,
      email: currentUser.email,
    },
  });

  const Submit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post('https://realestae-backened-production.up.railway.app/user/update', data, { withCredentials: true });
      console.log('Response from server:', response.data);
      dispatch(userState(data));
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fileref = useRef();
  const handleFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const response = await axios.post('https://realestae-backened-production.up.railway.app/user/updateDp', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      console.log('Response from server:', response.data);
      dispatch(userState(response.data.data));
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="w-full min-h-screen mt-7 overflow-x-hidden overflow-y-auto flex flex-col items-center">
      {/* Sign Up Button - Positioned to Left */}
      <div className="w-full flex">
        <Link
          to="/sign-up"
          className="ml-5 px-6 py-2 border border-white text-white rounded-lg transition duration-300 ease-in-out hover:bg-gray-800 active:bg-black"
        >
          Sign Up
        </Link>
      </div>

      <div className="p-6 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg min-h-[500px] w-5/6 mx-auto lg:w-1/3 flex flex-col items-center mt-4">
        {/* Profile Picture */}
        <div className="w-full flex justify-center">
          <input type="file" ref={fileref} className="hidden" onChange={handleFile} />
          <img
            onClick={() => fileref.current.click()}
            className="w-28 h-28 object-cover rounded-full cursor-pointer"
            src={currentUser.avatar}
            alt=" User Avatar "
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(Submit)} className="w-full flex flex-col items-center mt-4">
          <Input placeholder="Username" {...register('username', { required: true })} />
          <Input placeholder="Email" {...register('email', { required: true })} />
          <Input type="password" placeholder="Password" {...register('password', { required: true })} />

          {/* Update Button */}
          <button
            type="submit"
            className="group relative w-72 h-10 mb-3 overflow-hidden rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 text-lg text-white font-semibold shadow-lg transition-all duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Update
          </button>

          {/* Create Listing Button */}
          <Link to="/createlist">
            <button
              type="submit"
              className="group relative w-72 h-10 mb-3 overflow-hidden rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 text-lg text-white font-semibold shadow-lg transition-all duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-700 to-gray-800 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"></span>
              <span className="relative flex items-center justify-center">
                <PlusCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                Create Listing
              </span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-500 to-gray-600 transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </button>
          </Link>

          {/* Buttons Row */}
          <div className="flex justify-between w-full mt-2">
            <Link to="/sign-out" className="font-bold text-red-600">
              <LOgoUtBUttonUI />
            </Link>

            <Link
              to="/delete"
              className="flex items-center px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Delete account
            </Link>
          </div>

          {/* Show Listing Button */}
          <Link
            to="/showlist"
            className="mt-4 inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-medium rounded-lg shadow-md hover:from-gray-700 hover:to-gray-800 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <List className="w-5 h-5 mr-2" />
            Show Listing
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Profile;