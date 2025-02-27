import { useState } from 'react'
import { useForm } from 'react-hook-form';
import Input from './Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function List() {
    let navigate = useNavigate();
    let [loaderz,setLoading]=useState(false)
    const { handleSubmit, register, reset } = useForm({
        defaultValues: {
            sell: false,
            rent: false,
            parking: false,
            furnished: false,
            offer: false
        }
    });
    let key = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    
    let submit = async (data) => {
        console.log(data);
        
        let { files, ...otherData } = data;
        let getFile = files && files.length > 0 ? Array.from(files) : [];
    
        const formData = new FormData();
    
        // Append other form data
        for (let key in otherData) {
            formData.append(key, otherData[key]);
        }
    
        // Append each file separately
        getFile.forEach((file) => {
            formData.append('imageUrl', file);
        });
    
        try {
            // Send data to the backend using axios
            setLoading(true)
            const response = await axios.post('https://realestae-backened-production.up.railway.app/list/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
                withCredentials: true
            });
            console.log('Response from server:', response.data);
            reset();
            navigate('/showlist');
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error('Error submitting form:', error);
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
    return (
      <div>
         {loaderz? ( <div className="flex items-center justify-center min-h-screen ">
      <div className="w-16 h-16 border-4 border-t-4 border-black border-t-gray-300 rounded-full animate-spin"></div>
    </div>) :(<div className='text-white'>
            <form onSubmit={handleSubmit(submit)}>
                <div className='w-screen overflow-x-hidden text-2xl font-bold text-center my-5'>CREATE LIST</div>
                <div className='w-acreen  h-full px-4  flex flex-col  sm:flex-row  gap-4 justify-center items-center'>
                    <div className='w-1/2 flex flex-col justify-center gap-3 items-center'>
                        <Input  {...register('name', { required: true })}
                            placeholder="Name..." />
                        <Input  {...register('detail', { required: true })}
                            placeholder="Description..." type="text" />
                        <textarea {...register('address', { required: true })}
                            placeholder="Address..." rows="2" cols="50" className='rounded-lg p-2 my-3  bg-white/30 backdrop-blur-lg shadow-md focus:outline-none w-72' />
                        <div className='flex gap-4 flex-wrap'>
                            <input
                                type="checkbox"
                                id="sell"
                                {...register('sell')} // Register the checkbox
                                className="mr-2"
                            />
                            <label htmlFor="sell">Sell</label>

                            <input
                                type="checkbox"
                                id="rent"
                                {...register('rent')} // Register the checkbox
                                className="mr-2"
                            />
                            <label htmlFor="rent">Rent</label>

                            <input
                                type="checkbox"
                                id="parking"
                                {...register('parking')} // Register the checkbox
                                className="mr-2"
                            />
                            <label htmlFor="parking">Parking Spot</label>

                            <input
                                type="checkbox"
                                id="furnished"
                                {...register('furnished')} // Register the checkbox
                                className="mr-2"
                            />
                            <label htmlFor="furnished">Furnished</label>
                            <input
                                type="checkbox"
                                id="offer"
                                {...register('offer')} // Register the checkbox
                                className="mr-2"
                            />
                            <label htmlFor="offer">Offer</label>
                        </div>
                        <div className='flex gap-9'>
                            <div className='flex gap-3'>
                                <select
                                    id="Beds"
                                    {...register('Beds', { required: 'Please select a no of bedrooms' })} // Register select element
                                    className="border p-2 rounded bg-black"
                                >
                                    <option value="">Select...</option>
                                    {key.map((key) => <option value={key} key={key} >{key}</option>)}
                                </select>
                                <label htmlFor="Beds" className='font-bold text-lg'> Beds</label>
                            </div>
                            <div className='flex gap-3'>
                                <select
                                    id="Bath"
                                    {...register('Bath', { required: 'Please select a no of Bathrooms' })} // Register select element
                                    className="border p-2 rounded bg-black"
                                >
                                    <option value="">Select...</option>
                                    {key.map((key) => <option key={key} value={key}>{key}</option>)}
                                </select>
                                <label htmlFor="Bath" className='font-bold text-lg'> Bath</label>
                            </div>
                        </div>
                        <div className='flex gap-2 items-end '>
                            <input type="text" {...register('amount', { required: true })}  className='rounded-lg p-2 my-3 h-8 bg-white/30 backdrop-blur-lg shadow-md focus:outline-none w-20' />
                            <p className='pb-5'>Monthly income ($/month)</p>
                        </div>
                    </div>
                  <div className='w-1/2 flex flex-col justify-center items-center'>
<input
className='rounded-lg p-2 my-3 h-12 bg-white/30 backdrop-blur-lg shadow-md focus:outline-none w-72'
type="file"
id="file"
{...register('files')} 
multiple
/>
<button type="submit" className='w-32 h-10 bg-black rounded-lg'>Create</button>
</div>
                 </div>


             </form>
         </div>)}
      </div>
    )
}

export default List
