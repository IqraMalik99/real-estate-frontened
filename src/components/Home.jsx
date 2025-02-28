// import { motion, useAnimation } from 'framer-motion';
// import hero from './hero.jpg';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useInView } from 'react-intersection-observer';
// import { MdLocationOn } from 'react-icons/md';
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Social media icons
// import { useDispatch } from 'react-redux';
// import { userLogin, userLogout } from '../store/reducer.js';
// import { userState } from '../store/reducer.js';
// import { persistor } from '../store/store.js'; 
// function Home() {
//   let [page1, setpage1] = useState(0);
//   let [page2, setpage2] = useState(0); // New state for Page 3
//   let [list1, setlist1] = useState([]);
//   let [list2, setlist2] = useState([]); // New state for Page 3 data
//   let navigate = useNavigate();
//   let dispatch = useDispatch();

//   let automatedLogin = async () => {
//     let res = await axios.get('https://realestae-backened-production.up.railway.app/user/automatedlogin', { withCredentials: true });
//     console.log(res.data.data ,res.data,"res from automated");
    
//     if (!res.data.data) {
//        persistor.purge();
//         dispatch(userLogout());

//     } else {
//                   let userdata={
//                       username:res.data.data.user.username,
//                       email:res.data.data.user.email,
//                       avatar:res.data.data.user.avatar,
//                       _id:res.data.data.user._id
//                   }
//                   dispatch(userLogin())
//                   dispatch(userState(userdata ))
//                   navigate('/')
//     }
//   };

//   useEffect(() => {
//     automatedLogin();
//   }, []);

//   // Fetch data for Page 2
//   let getList1 = async () => {
//     setpage1((prev) => prev + 1);
//     let res = await axios.get(`https://realestae-backened-production.up.railway.app/list/getsalelist/${page1}`, {
//       withCredentials: true,
//     });
//     setlist1((prev) => [...prev, ...res.data.data.list]);
//     console.log(res.data.data.list);
//   };

//   // Fetch data for Page 3
//   let getList2 = async () => {
//     setpage2((prev) => prev + 1);
//     let res = await axios.get(`https://realestae-backened-production.up.railway.app/list/getrentlist/${page2}`, {
//       withCredentials: true,
//     });
//     setlist2((prev) => [...prev, ...res.data.data.list]);
//     console.log(res.data.data.list);
//   };

//   let detailHandler = (id) => {
//     console.log(id);
//     navigate(`/all/${id}`);
//   };

//   useEffect(() => {
//     getList1(); // Fetch data for Page 2
//     getList2(); // Fetch data for Page 3
//   }, []);

//   let viewMore1 = () => {
//     getList1();
//   };
//   let viewMore2 = () => {
//     getList2();
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div id="main" className="relative h-screen w-screen text-white bg-gray-950">
//       {/* Background image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: `url(${hero})` }}
//       ></div>

//       {/* Animated Overlay */}
//       <motion.div
//         className="absolute inset-0 bg-black opacity-50"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.5 }}
//         transition={{ duration: 1, ease: 'easeOut' }}
//       ></motion.div>

//       {/* Page 1 Content */}
//       <motion.div
//         id="page1"
//         className="relative flex flex-col justify-center items-center h-screen w-screen z-10"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
//       >
//         {/* Animated Main Heading */}
//         <motion.b
//           className="text-[4vw] uppercase"
//           initial={{ y: 100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1, ease: 'easeOut', delay: 0.8 }}
//           whileHover={{ scale: 1.1, color: '#3b82f6' }} // Hover effect
//         >
//           New Properties
//         </motion.b>

//         {/* Animated Subtitle */}
//         <motion.p
//           className="uppercase text-[2vw] mt-4"
//           initial={{ y: 100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1, ease: 'easeOut', delay: 1 }}
//           whileHover={{ scale: 1.05, color: '#3b82f6' }} // Hover effect
//         >
//           Your Dream Awaits
//         </motion.p>
//       </motion.div>

//       {/* Page 2 Content */}
//       <div id="page2" className="flex items-center flex-col relative h-auto w-screen bg-gray-950 py-10">
//         {/* Animated Heading */}
//         <motion.h2
//           className="mt-3 text-[3vw]"
//           initial={{ opacity: 0, x: -100 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1, ease: 'easeOut' }}
//           viewport={{ once: true }}
//         >
//           NEW PROPERTIES
//         </motion.h2>

//         {/* Animated Subheading */}
//         <motion.h2
//           className="mt-3 text-[3vw] font-bold"
//           initial={{ opacity: 0, x: 100 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
//           viewport={{ once: true }}
//         >
//           For Sale
//         </motion.h2>

//         <div className="overflow-y-hidden w-10/12 h-auto overflow-x-hidden flex flex-wrap gap-4 justify-center items-center px-4">
//           {list1.length > 0 &&
//             list1.map((obj, index) => (
//               <Card key={obj._id} obj={obj} index={index} detailHandler={detailHandler} />
//             ))}
//         </div>
//         <button
//           onClick={viewMore1}
//           className="bg-blue-500 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 active:bg-blue-700 active:translate-y-0 active:shadow-md mt-8"
//         >
//           Explore Properties
//         </button>
//       </div>

//       {/* Page 3 Content */}
//       <div id="page3" className="flex items-center flex-col relative h-auto w-screen bg-gray-950 py-10">
//         {/* Animated Heading */}
//         <motion.h2
//           className="mt-3 text-[3vw]"
//           initial={{ opacity: 0, x: -100 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1, ease: 'easeOut' }}
//           viewport={{ once: true }}
//         >
//           MORE PROPERTIES
//         </motion.h2>

//         {/* Animated Subheading */}
//         <motion.h2
//           className="mt-3 text-[3vw] font-bold"
//           initial={{ opacity: 0, x: 100 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
//           viewport={{ once: true }}
//         >
//           For Rent
//         </motion.h2>

//         <div className="overflow-y-hidden w-10/12 h-auto overflow-x-hidden flex flex-wrap gap-4 justify-center items-center px-4">
//           {list2.length > 0 &&
//             list2.map((obj, index) => (
//               <Card key={obj._id} obj={obj} index={index} detailHandler={detailHandler} />
//             ))}
//         </div>
//         <button
//           onClick={viewMore2}
//           className="bg-blue-500 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 active:bg-blue-700 active:translate-y-0 active:shadow-md mt-8"
//         >
//           Explore Properties
//         </button>
//       </div>

//       {/* Footer Section */}
//       <Footer />
//     </div>
//   );
// }

// // Card Component with Scroll-Triggered Animations
// const Card = ({ obj, index, detailHandler }) => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({ triggerOnce: true });

//   useEffect(() => {
//     if (inView) {
//       controls.start({
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         transition: { duration: 0.5, delay: index * 0.1 },
//       });
//     }
//   }, [controls, inView, index]);

//   return (
//     <motion.div
//       ref={ref}
//       className="w-full md:w-1/2 lg:w-1/3 h-auto p-6 border border-gray-300 rounded-lg shadow-lg flex flex-col items-center text-center bg-gray-800 cursor-pointer overflow-hidden" // Added overflow-hidden
//       initial={{ opacity: 0, y: 50, scale: 0.9 }}
//       animate={controls}
//       whileHover={{ scale: 1.02, boxShadow: '0px 10px 20px rgba(255, 255, 255, 0.2)' }} // Reduced scale
//       transition={{ duration: 0.3 }}
//       onClick={() => detailHandler(obj._id)}
//     >
//       {/* Image */}
//       <motion.img
//         src={obj.imageUrl[0]}
//         alt="Card Image"
//         className="w-full h-48 object-cover rounded-md mb-4"
//         whileHover={{ scale: 1.05 }} // Reduced scale
//         transition={{ duration: 0.3 }}
//       />

//       {/* Title */}
//       <h3 className="text-xl text-white font-semibold mb-2">{obj.name}</h3>

//       {/* Content */}
//       <p className="text-white mb-4">{obj.detail.substring(0, 100)}...</p>
//       <p>
//         <span className="font-bold">{obj.amount}</span>$/month
//       </p>
//       <p>
//         <span className="animate-pulse">
//           <MdLocationOn size={24} color="black" className="inline-block" />{' '}
//         </span>
//         <span className="font-semibold text-[1.5vw]">{obj.address}</span>
//       </p>
//     </motion.div>
//   );
// };

// // Footer Component
// const Footer = () => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({ triggerOnce: true });

//   useEffect(() => {
//     if (inView) {
//       controls.start({
//         opacity: 1,
//         y: 0,
//         transition: { duration: 1, ease: 'easeOut' },
//       });
//     }
//   }, [controls, inView]);

//   return (
//     <motion.footer
//       ref={ref}
//       className="w-full text-white py-10 mt-20"
//       initial={{ opacity: 0, y: 50 }}
//       animate={controls}
//     >
//       <div className="container mx-auto text-center">
//         {/* Animated Text */}
//         <motion.p
//           className="text-lg"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
//           viewport={{ once: true }}
//         >
//           © Copy Right . All rights reserved.
//         </motion.p>

//         {/* Animated Email Text */}
//         <motion.p
//           className="mt-2"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
//           viewport={{ once: true }}
//         >
//           realestate@mysite.com
//         </motion.p>

//         {/* Social Media Icons */}
//         <motion.div
//           className="flex justify-center gap-6 mt-4"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//             <motion.div
//               whileHover={{ scale: 1.2, color: '#3b82f6' }}
//               transition={{ duration: 0.3 }}
//             >
//               <FaFacebook size={24} />
//             </motion.div>
//           </a>
//           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//             <motion.div
//               whileHover={{ scale: 1.2, color: '#1da1f2' }}
//               transition={{ duration: 0.3 }}
//             >
//               <FaTwitter size={24} />
//             </motion.div>
//           </a>
//           <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//             <motion.div
//               whileHover={{ scale: 1.2, color: '#e1306c' }}
//               transition={{ duration: 0.3 }}
//             >
//               <FaInstagram size={24} />
//             </motion.div>
//           </a>
//           <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//             <motion.div
//               whileHover={{ scale: 1.2, color: '#0077b5' }}
//               transition={{ duration: 0.3 }}
//             >
//               <FaLinkedin size={24} />
//             </motion.div>
//           </a>
//         </motion.div>
//       </div>
//     </motion.footer>
//   );
// };

// export default Home;           

import { motion, useAnimation } from 'framer-motion';
import hero from './hero.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { MdLocationOn } from 'react-icons/md';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Social media icons
import { useDispatch } from 'react-redux';
import { userLogin, userLogout } from '../store/reducer.js';
import { userState } from '../store/reducer.js';
import { persistor } from '../store/store.js';

function Home() {
  let [page1, setpage1] = useState(0);
  let [page2, setpage2] = useState(0); // New state for Page 3
  let [list1, setlist1] = useState([]);
  let [list2, setlist2] = useState([]); // New state for Page 3 data
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let automatedLogin = async () => {
    let res = await axios.get('https://realestae-backened-production.up.railway.app/user/autoLogin', { withCredentials: true });
    console.log(res.data.data, res.data, "res from automated");

    if (!res.data.data) {
      persistor.purge();
      dispatch(userLogout());
    } else {
      let userdata = {
        username: res.data.data.user.username,
        email: res.data.data.user.email,
        avatar: res.data.data.user.avatar,
        _id: res.data.data.user._id
      };
      dispatch(userLogin());
      dispatch(userState(userdata));
      navigate('/');
    }
  };

  useEffect(() => {
    automatedLogin();
  }, []);

  // Fetch data for Page 2
  let getList1 = async () => {
    setpage1((prev) => prev + 1);
    let res = await axios.get(`https://realestae-backened-production.up.railway.app/list/getsalelist/${page1}`, {
      withCredentials: true,
    });
    setlist1((prev) => [...prev, ...res.data.data.list]);
    console.log(res.data.data.list);
  };

  // Fetch data for Page 3
  let getList2 = async () => {
    setpage2((prev) => prev + 1);
    let res = await axios.get(`https://realestae-backened-production.up.railway.app/list/getrentlist/${page2}`, {
      withCredentials: true,
    });
    setlist2((prev) => [...prev, ...res.data.data.list]);
    console.log(res.data.data.list);
  };

  let detailHandler = (id) => {
    console.log(id);
    navigate(`/all/${id}`);
  };

  useEffect(() => {
    getList1(); // Fetch data for Page 2
    getList2(); // Fetch data for Page 3
  }, []);

  let viewMore1 = () => {
    getList1();
  };
  let viewMore2 = () => {
    getList2();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="main" className="relative h-screen w-screen text-white bg-gray-950">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})` }}
      ></div>

      {/* Animated Overlay */}
      <motion.div
        className="absolute inset-0 bg-black opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      ></motion.div>

      {/* Page 1 Content */}
      <motion.div
        id="page1"
        className="relative flex flex-col justify-center items-center h-screen w-screen z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
      >
        {/* Animated Main Heading */}
        <motion.b
          className="text-4xl md:text-6xl lg:text-8xl uppercase"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.8 }}
          whileHover={{ scale: 1.1, color: '#3b82f6' }} // Hover effect
        >
          New Properties
        </motion.b>

        {/* Animated Subtitle */}
        <motion.p
          className="uppercase text-xl md:text-2xl lg:text-4xl mt-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 1 }}
          whileHover={{ scale: 1.05, color: '#3b82f6' }} // Hover effect
        >
          Your Dream Awaits
        </motion.p>
      </motion.div>

      {/* Page 2 Content */}
      <div id="page2" className="flex items-center flex-col relative h-auto w-screen bg-gray-950 py-10">
        {/* Animated Heading */}
        <motion.h2
          className="mt-3 text-2xl md:text-4xl lg:text-6xl"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          NEW PROPERTIES
        </motion.h2>

        {/* Animated Subheading */}
        <motion.h2
          className="mt-3 text-2xl md:text-4xl lg:text-6xl font-bold"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          viewport={{ once: true }}
        >
          For Sale
        </motion.h2>

        <div className="overflow-y-hidden w-10/12 h-auto overflow-x-hidden flex flex-wrap gap-4 justify-center items-center px-4">
          {list1.length > 0 &&
            list1.map((obj, index) => (
              <Card key={obj._id} obj={obj} index={index} detailHandler={detailHandler} />
            ))}
        </div>
        <button
          onClick={viewMore1}
          className="bg-blue-500 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 active:bg-blue-700 active:translate-y-0 active:shadow-md mt-8"
        >
          Explore Properties
        </button>
      </div>

      {/* Page 3 Content */}
      <div id="page3" className="flex items-center flex-col relative h-auto w-screen bg-gray-950 py-10">
        {/* Animated Heading */}
        <motion.h2
          className="mt-3 text-2xl md:text-4xl lg:text-6xl"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          MORE PROPERTIES
        </motion.h2>

        {/* Animated Subheading */}
        <motion.h2
          className="mt-3 text-2xl md:text-4xl lg:text-6xl font-bold"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          viewport={{ once: true }}
        >
          For Rent
        </motion.h2>

        <div className="overflow-y-hidden w-10/12 h-auto overflow-x-hidden flex flex-wrap gap-4 justify-center items-center px-4">
          {list2.length > 0 &&
            list2.map((obj, index) => (
              <Card key={obj._id} obj={obj} index={index} detailHandler={detailHandler} />
            ))}
        </div>
        <button
          onClick={viewMore2}
          className="bg-blue-500 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 active:bg-blue-700 active:translate-y-0 active:shadow-md mt-8"
        >
          Explore Properties
        </button>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

// Card Component with Scroll-Triggered Animations
const Card = ({ obj, index, detailHandler }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, delay: index * 0.1 },
      });
    }
  }, [controls, inView, index]);

  return (
    <motion.div
      ref={ref}
      className="w-full md:w-1/2 lg:w-1/3 h-auto p-6 border border-gray-300 rounded-lg shadow-lg flex flex-col items-center text-center bg-gray-800 cursor-pointer overflow-hidden" // Added overflow-hidden
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={controls}
      whileHover={{ scale: 1.02, boxShadow: '0px 10px 20px rgba(255, 255, 255, 0.2)' }} // Reduced scale
      transition={{ duration: 0.3 }}
      onClick={() => detailHandler(obj._id)}
    >
      {/* Image */}
      <motion.img
        src={obj.imageUrl[0]}
        alt="Card Image"
        className="w-full h-48 object-cover rounded-md mb-4"
        whileHover={{ scale: 1.05 }} // Reduced scale
        transition={{ duration: 0.3 }}
      />

      {/* Title */}
      <h3 className="text-xl text-white font-semibold mb-2">{obj.name}</h3>

      {/* Content */}
      <p className="text-white mb-4">{obj.detail.substring(0, 100)}...</p>
      <p>
        <span className="font-bold">{obj.amount}</span>$/month
      </p>
      <p>
        <span className="animate-pulse">
          <MdLocationOn size={24} color="black" className="inline-block" />{' '}
        </span>
        <span className="font-semibold text-lg">{obj.address}</span>
      </p>
    </motion.div>
  );
};

// Footer Component
const Footer = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: 'easeOut' },
      });
    }
  }, [controls, inView]);

  return (
    <motion.footer
      ref={ref}
      className="w-full text-white py-10 mt-20"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
    >
      <div className="container mx-auto text-center">
        {/* Animated Text */}
        <motion.p
          className="text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
        >
          © Copy Right . All rights reserved.
        </motion.p>

        {/* Animated Email Text */}
        <motion.p
          className="mt-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
          viewport={{ once: true }}
        >
          realestate@mysite.com
        </motion.p>

        {/* Social Media Icons */}
        <motion.div
          className="flex justify-center gap-6 mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
          viewport={{ once: true }}
        >
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <motion.div
              whileHover={{ scale: 1.2, color: '#3b82f6' }}
              transition={{ duration: 0.3 }}
            >
              <FaFacebook size={24} />
            </motion.div>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <motion.div
              whileHover={{ scale: 1.2, color: '#1da1f2' }}
              transition={{ duration: 0.3 }}
            >
              <FaTwitter size={24} />
            </motion.div>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <motion.div
              whileHover={{ scale: 1.2, color: '#e1306c' }}
              transition={{ duration: 0.3 }}
            >
              <FaInstagram size={24} />
            </motion.div>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <motion.div
              whileHover={{ scale: 1.2, color: '#0077b5' }}
              transition={{ duration: 0.3 }}
            >
              <FaLinkedin size={24} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Home;