import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { MdLocationOn } from 'react-icons/md';

function Search() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const initialSearchTerm = queryParams.get('searchTerm') || '';
    const [data, setData] = useState([]);
    let [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let loader = async () => {
            try {
                console.log("coming");

                const response = await axios.get(`https://realestae-backened-production.up.railway.app/lists/all?searchTerm=${initialSearchTerm}`);
                console.log(response.data.data);
                setData(response.data.data);
            } catch (error) {
                console.log(`Having error in searching ${error}`);
            }
        };
        loader();
    }, [])

    const { register, handleSubmit } = useForm({
        defaultValues: {
            category: "all",
            searchTerm: initialSearchTerm,
            furnished: false,
            parking: false,
            sortType: "-1",
        }
    });

    const submitForm = async (Formdata) => {
        console.log(Formdata);
        try {
            setLoader(true)
            let searchTerm = Formdata.searchTerm || '';
            let category = Formdata.category || 'all';
            let sortType = Formdata.sortType || '';
            let furnished = Formdata.furnished || false;
            let parking = Formdata.parking || false;
            let url = `https://realestae-backened-production.up.railway.app/lists/all?searchTerm=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}&sortType=${encodeURIComponent(sortType)}&furnished=${encodeURIComponent(furnished)}&parking=${encodeURIComponent(parking)}`;
            const response = await axios.get(url);
            setData(response.data.data);
            console.log("My data", data);

            console.log("Done");
            setLoader(false);
            navigate(`/search?searchTerm=${encodeURIComponent(Formdata.searchTerm)}&category=${encodeURIComponent(Formdata.category)}&sortType=${encodeURIComponent(Formdata.sortType)}&furnished=${encodeURIComponent(Formdata.furnished)}&parking=${encodeURIComponent(Formdata.parking)}`);
        } catch (error) {
            setLoader(false);
            console.error("Error fetching data:", error);
        }
    };

    let detailHandler = (id) => {
        console.log(id);
        navigate(`/all/${id}`);
    };
    // useEffect(() => {
    //     if (initialSearchTerm) {
    //         setValue('searchTerm', initialSearchTerm);
    //     }
    // }, [initialSearchTerm]);
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
    return (
        <>
            {loader ? (<div className="flex items-center justify-center min-h-screen ">
                <div className="w-16 h-16 border-4 border-t-4 border-black border-t-gray-300 rounded-full animate-spin"></div>
            </div>) : (

                <div className="flex flex-row m-0 w-screen h-auto mt-20"> 
                   <div style={{ background: 'linear-gradient(to bottom, #3c4049, #000000)' }} className="  w-1/3  ">
                        <div className='w-full h-full'>
                            <form onSubmit={handleSubmit(submitForm)}>
                                <div className='flex gap-4 flex-wrap justify-center items-center mt-4'>
                                    <p className='sm:font-bold text-sm sm:text-lg text-white mt-5'>Search Term :</p>
                                    <input {...register("searchTerm")} type="text" className='w-2/3 rounded p-1 mt-5' />
                                </div>
                                <div className='flex gap-4 flex-wrap justify-center items-center mt-4'>
                                    <p className='sm:font-bold text-sm  font-normal sm:text-lg text-white ml-2'>Type :</p>
                                    <div className='text-white'>
                                        <input {...register("category")} id='all' type="radio" value="all" />
                                        <label htmlFor='all'> Rent & Sale </label>
                                    </div>
                                    <div className='text-white'>
                                        <input {...register("category")} id='rent' type="radio" value="rent" />
                                        <label htmlFor='rent'> Rent </label>
                                    </div>
                                    <div className='text-white'>
                                        <input {...register("category")} id='sale' type="radio" value="sale" />
                                        <label htmlFor='sale'> Sale</label>
                                    </div>
                                </div>
                                <div className='flex gap-4 flex-wrap justify-center items-center mt-4'>
                                    <p className='sm:font-bold text-sm sm:text-lg text-white ml-2'>Amenities :</p>
                                    <div className='text-white'>
                                        <input {...register("parking")} id='parking' type="checkbox" />
                                        <label htmlFor='parking'> Parking </label>
                                    </div>
                                    <div className='text-white'>
                                        <input {...register("furnished")} id='furnished' type="checkbox" />
                                        <label htmlFor='furnished'> Furnished</label>
                                    </div>
                                </div>
                                <div className='flex gap-4 flex-wrap justify-center items-center mt-4'>
                                    <p className='sm:font-bold text-sm sm:text-lg text-white ml-2'>Sort By :</p>
                                    <select className='p-2 rounded' {...register("sortType")}>
                                        <option value="">Select...</option>
                                        <option value="1">Latest</option>
                                        <option value="-1">Oldest</option>
                                    </select>
                                </div>
                                <div className='w-full flex mt-3 justify-center items-center'>
                                    <button className="mt-2 inline-flex items-center justify-center px-6 py-2 mx-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-medium rounded-lg shadow-md hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105" type="submit">Search</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="w-2/3 h-screen">
                        <div className="h-auto mt-4 overflow-x-hidden flex lg:flex-row  flex-col  flex-wrap gap-6 justify-center items-center px-4 ">
                            {data.length > 0 ? data.map((obj) => (
                                <div
                                    key={obj._id}
                                    className="lg:w-2/5 w-11/12 h-1/4 text-sm border border-gray-300 rounded-lg shadow-lg flex flex-wrap p-3 flex-col  text-center"
 
                                >
                                    {/* Image */}
                                    <img
                                        src={obj.imageUrl[0]}
                                        alt="Card Image"
                                        className="w-full h-48 object-cover rounded-md mb-1"
                                        onClick={() => detailHandler(obj._id)}
                                    />

                                    {/* Title */}
                                    <h3 className="text-xl text-white font-semibold" onClick={() => detailHandler(obj._id)}>{obj.name}</h3>

                                    {/* Content */}
                                    <p  style={{ textAlign: 'left' }} className="text-white " onClick={() => detailHandler(obj._id)}>{obj.detail.substring(0, 70)} ....</p>
                                    {/* Address*/ }
                                    <p style={{ textAlign: 'left' }} className="text-white " >  <MdLocationOn size={24} color="green" className=' inline-block' />  {obj.address} </p>
                                    <p style={{ color: '#ECDFCC' , textAlign: 'left' }} className="pl-2  font-semibold  mb-1" > {obj.amount} $/Month </p>

                                </div>
                            )) : <div> No Matching data </div>}
                        </div>
                    </div>
                </div>)}
        </>
    );
}

export default Search;
