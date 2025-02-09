import * as React from 'react';

interface FormRowType{
    type:string,
    labelText?:string
    onChangeFunction?:Function
}

function FormRow({type, labelText, onChangeFunction}:FormRowType) {
    return ( 
        <div className='flex flex-col'>
            <label className='text-gray text-sm'>{labelText}</label>
            <input
            onChange={onChangeFunction}
             className={`
                ${type==='checkbox'?'scale-125':''}
                border-b border-gray outline-none p-2 bg-transparent 
                `} type={type} />
        </div>
     );
}

export default FormRow;