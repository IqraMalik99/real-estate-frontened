import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MdLocationOn } from 'react-icons/md';
import { FaBed, FaBath } from 'react-icons/fa';
import { MdLocalParking } from 'react-icons/md';
import { FaCouch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Input from './Input';
// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// Import Swiper modules if needed
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

function FullList() {
    const [sdata, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const User = useSelector((state) => state.user);
    useEffect(() => {
        const loader = async () => {
            try {
                const response = await axios.get(`https://realestae-backened-production.up.railway.app/list/${id}`, { withCredentials: true });
                console.log(response.data.data[0]);
                
                setData(response.data.data[0]);
                setLoading(false);
            } catch (error) {
                console.error(`Error is in list: ${error}`);
                setLoading(false);
            }
        };
        loader();
    }, [id]);
    const showContact = (e) => {
        e.preventDefault();
        btnref.current.style.display = "none";
        contactref.current.style.display = "block"
        console.log("done");

    }
    const haveContact = (e) => {
        const message = inputref.current.value;
        const email = sdata.user.email;
        const subject = `Regarding ${sdata.name}`;
        const body = `Message: ${message}`;
        
        // Construct the mailto URL
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open the email client with the constructed mailto URL
        window.location.href = mailtoLink;
        
        console.log(message)
    }
    const btnref = useRef();
    const contactref = useRef();
    const inputref=useRef();
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
    return (
        <>
            {loading ? (
                <div>Loading .....</div>
            ) : (
                <div>
                    <div className="w-full h-[60vh] mt-16">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar]} // Use necessary modules
                            spaceBetween={10} // Space between slides
                            slidesPerView={1} // Number of slides to show
                            navigation // Navigation arrows
                            pagination={{ clickable: true }} // Pagination dots
                            scrollbar={{ draggable: true }} // Draggable scrollbar
                            className="h-full"
                        >
                            {sdata.imageUrl && sdata.imageUrl.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={image}
                                        alt={`Slide ${index}`}
                                        className="w-full h-full object-cover" // Adjust to cover container dimensions
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className='w-2/3 mx-auto h-auto flex-col flex justify-center items-center'>
                        <div className='mt-4' >
                            <p className='text-3xl font-bold text-white inline-block'>{sdata.name}</p>
                            <p className=' text-3xl  font-bold text-white inline-block'>&nbsp; {sdata.amount}$/Month</p>
                        </div>
                        <div>
                            <MdLocationOn size={24} color="green" className=' inline-block' />
                            <p className=' text-lg font-bold text-white inline-block'> &nbsp; {sdata.address}</p>
                        </div>
                        <div>
                            {sdata.sell && <div><button className=' text-lg bg-green-700  p-1 px-4 mt-2  rounded font-bold text-white inline-block'>For Sale</button></div>}
                            {sdata.rent && <div><button className=' text-lg bg-green-700  rounded p-1 px-4 font-bold text-white inline-block'>For Rent</button></div>}
                        </div>
                        <div className='mt-2'>
                            <p className='text-white font-bold inline-block'>Description :</p>
                            <p className='text-white  inline-block'>{sdata.detail}</p>
                        </div>
                        <div className='flex gap-10 mb-4'>
                            <div className='inline-block text-green-600 '> <FaBed size={24} color='green' className='inline-block' />   {sdata.Beds} Beds </div>
                            <div className='inline-block text-green-600 '> <FaBath size={24} color='green' className='inline-block' />  {sdata.Bath} Bath</div>
                            {sdata.parking ? <div className='inline-block text-green-600 '> <MdLocalParking size={24} color='green' className='inline-block' />   Parking </div> : <div className='inline-block text-green-600 '> <MdLocalParking size={24} color='green' className='inline-block' />  No Parking </div>}
                            {sdata.furnished ? <div className='inline-block text-green-600 '> <FaCouch size={24} color='green' className='inline-block' />   Furnished </div> : <div className='inline-block text-green-600 '> <FaCouch size={24} color='green' className='inline-block' />   No Furnished </div>}
                        </div>
                    </div>
                    <div >

                        {User.login ? (<div className='w-full h-auto flex justify-center items-center'>
                            <button type='button' className='w-1/4 bg-green-700 rounded-2xl text-xl sm:text-2xl text-white font-bold p-1 md:p-2 mb-4' ref={btnref} onClick={(e) => showContact(e)}>Contact</button>
                        </div>) : ""}
                        {
                            User.login ? 
                            (<div ref={contactref} className='hidden'>
                                <div className='  w-full h-auto flex justify-center items-center flex-col'>
                                    <Input type="text" placeholder="Message" className='  sm:w-[30rem] w-[10rem] p-5 ' ref={inputref}/>
                                <button type='button'   className='w-1/4 bg-green-700 rounded-2xl text-xl sm:text-2xl text-white font-bold p-1 md:p-2 mb-4  text-center'   onClick={(e) => haveContact(e)} >Send</button>
                                </div>
                            </div>) : ""
                        }
                    </div>
                </div>
            )}
        </>
    );
}

export default FullList;
