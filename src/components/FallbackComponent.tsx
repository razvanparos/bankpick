import * as React from 'react'
import img1 from '../assets/logo.png'
function FallbackComponent() {
    return ( 
        <div className='flex flex-col gap-y-4'>
            <img src={img1} alt="" />
            <h2 className='text-xl font-semibold'>BANKPICK</h2>
        </div>
        
     );
}

export default FallbackComponent;