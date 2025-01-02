import React, { useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import Notifications from './Sub_component/Notificaion';



function Header({id,name,dp}) {
  const {sponsorId} = useParams();
   
  const [profile,setprofile]=useState(false);
  const [notify,setnotify]=useState(false)
  
  const handleClick = () => {
    setnotify(!notify);
  }
  

  return (
    <div className='h-[10%] p-6 flex justify-end items-center border-b-2 border-black '>

<div className='mx-6' onClick={() => setnotify(!notify)}>
    <IoNotifications size={30} />
    {
      notify && <div className=' absolute top-16 right-4 p-6 min-h-[80%] rounded-xl '>

      <Notifications/>
      </div>
    }
</div>

    
     <img className='w-12  h-12 mx-2 rounded-full' src="https://cdnb.artstation.com/p/assets/images/images/026/142/657/large/sleepy-jhin-roronoa-zoro-portrait.jpg?1587999560" alt="pic"  onClick={() => setprofile(!profile)} />
     { 
     profile && <div className='absolute top-24 right-14 p-6 bg-slate-100 rounded-xl flex flex-col justify-center items-center'>
         <Link to={`/dashboard/profile`}>
         <div className='font-semibold hover:bg-gray-300  py-2 rounded-xl flex gap-2'><FaRegUser className='ml-4' size={18}/><h1>My Profile</h1></div>
         </Link> 
          <div className='font-semibold hover:bg-gray-300 px-4 py-2 rounded-xl flex gap-2'><IoSettingsOutline  size={20}/><h1>Settings</h1></div>
          <div className='font-semibold hover:bg-gray-300 px-4 py-2 rounded-xl flex gap-2'><RiLogoutCircleRLine  size={20}/><h1>Log Out</h1></div>
     </div>   
       }
      
    </div>
  )
}

export default Header