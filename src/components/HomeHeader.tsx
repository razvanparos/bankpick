import * as React from "react";
import { FaUser } from "react-icons/fa";
function HomeHeader({ fullName }) {
  return <header className='flex items-center gap-x-4'>
    <div className='w-[55px] h-[55px] bg-lightGray rounded-full flex items-center justify-center'>
        <FaUser className='text-2xl'/>
    </div>
    <div>
        <p className='text-sm text-gray'>Welcome back,</p>
        <h2 className='text-2xl'>{fullName}</h2>
    </div>
    </header>;
}

export default HomeHeader;
