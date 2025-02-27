import axios from 'axios'
import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../store/reducer.js';
function Delete() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    let deleteUser= async()=>{
     try {
       const response = await axios.post('https://realestae-backened-production.up.railway.app/user/delete',{}, { withCredentials: true });
       dispatch(userLogout());
       console.log(response)
     } catch (error) {
      console.log(`Having error in delete ${error}`); 
     }
    }
    deleteUser();
    navigate('/sign-up')
  },[])
  return (
    <div>

    </div>
  )
}

export default Delete
