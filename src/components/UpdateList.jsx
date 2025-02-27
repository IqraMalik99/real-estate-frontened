import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Input from './Input';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
function UpdateList() {
    let navigate = useNavigate();
    let [sdata, setData] = useState({});
    const [loading, setLoading] = useState(true);
    let [think,setThink]=useState(false)
    let { id } = useParams();
    useEffect(() => {
        let loader = async () => {
            try {
                setThink(true)
                const response = await axios.post(`https://realestae-backened-production.up.railway.app/list/update/${id}`, {}, { withCredentials: true });
                console.log(`my res for update  ${JSON.stringify(response.data.data)}`);
                console.log(response);
                setData(response.data.data.list)
                setLoading(false);
                setThink(false)
            } catch (error) {
                console.log(`Having error in update list ${error}`);
                setLoading(false);
                setThink(false)
            }
        };
        loader();
    }, [])
    const { handleSubmit, register, reset, formState: { errors } } = useForm({
        defaultValues: {}
    });
    useEffect(() => {
        if (!loading) {
            // Reset form values once data is loaded
            reset({
                sell: sdata.sell,
                rent: sdata.rent,
                parking: sdata.parking,
                furnished: sdata.furnished,
                offer: sdata.offer,
                name: sdata.name,
                detail: sdata.detail,
                address: sdata.address,
                Beds: sdata.Beds,
                Bath: sdata.Bath,
                amount: sdata.amount,
                imageUrl:sdata.imageUrl
            });
        }
    }, [loading, reset,sdata]);
    let key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let handleDelete= async(e,urls)=>{
    e.preventDefault();
    setData((prev)=> {
        const updatedImageUrls = prev.imageUrl.filter(value => value !== urls.url);
    console.log(`Updated imageUrl array length: ${updatedImageUrls.length}`);
    return { ...prev, imageUrl: updatedImageUrls }
    }
);
console.log(`My images ${sdata.imageUrl}`);
    
}
    let submit = async (data) => {
        let { files, ...otherData } = data;
        let getFile = files && files.length > 0 ? Array.from(files) : [];

        const formData = new FormData();

        // Append other form data
        for (let key in otherData) {
            formData.append(key, otherData[key]);
        }
        formData.append("imageUrl", sdata.imageUrl);
        // Append each file separately
        getFile.forEach((file) => {
            formData.append('updateImage', file);
        });
        console.log(formData);

        try {
            setThink(true)
            // Send data to the backend using axios
            const response = await axios.post('https://realestae-backened-production.up.railway.app/list/updataData', formData, { withCredentials: true });
            console.log('Response from server:', response.data);
            const response2 = await axios.post(`https://realestae-backened-production.up.railway.app/list/delete/${id}`, {}, { withCredentials: true });
            console.log(response2);
            reset();
            navigate('/showlist');
            setThink(false)
        } catch (error) {
            console.error('Error submitting form:', error);
            setThink(false)
        }
    };

    return (
        <>
            {think? ( <div className="flex items-center justify-center min-h-screen ">
      <div className="w-16 h-16 border-4 border-t-4 border-black border-t-gray-300 rounded-full animate-spin"></div>
    </div>) : (<div className='text-white'>
                <form onSubmit={handleSubmit(submit)}>
                    <div className='w-screen overflow-x-hidden text-2xl font-bold text-center my-5'>Update LIST</div>
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
                                        {key.map((key) => <option value={key}>{key}</option>)}
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
                                        {key.map((key) => <option value={key}>{key}</option>)}
                                    </select>
                                    <label htmlFor="Bath" className='font-bold text-lg'> Bath</label>
                                </div>
                            </div>
                            <div className='flex gap-2 items-end '>
                                <input type="text" {...register('amount', { required: true })} className='rounded-lg p-2 my-3 h-8 bg-white/30 backdrop-blur-lg shadow-md focus:outline-none w-20' />
                                <p className='pb-5'>Monthly ($/month)</p>
                            </div>
                        </div>
                        <div className='w-1/2 flex flex-col justify-center items-center'>
                           {sdata.imageUrl&& sdata.imageUrl.map((url,index)=> <div key={index} className='flex flex-col '>
                            <div className=' w-96 mt-4 h-40 flex justify-around items-center rounded backdrop-blur-lg bg-white/30 shadow-lg'><img className=' h-32 w-52' src={url} alt="image" /> <button onClick={(e)=> handleDelete(e,{url})} className='w-32 h-10 rounded p-1 bg-red-600' type='button'> DELETE </button> </div>
                           </div>)}

                            <input
                                className='rounded-lg p-2 my-3 h-12 bg-white/30 backdrop-blur-lg shadow-md focus:outline-none w-72'
                                type="file"
                                id="file"
                                {...register('files')} t
                                multiple
                            />
                            <button type="submit" className='w-32 h-10 bg-black rounded-lg border-2 border-white'>Create</button>
                        </div>
                    </div>


                </form>
            </div>)}
        </>
    )
}

export default UpdateList
