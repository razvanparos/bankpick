import * as React from 'react';

interface FormRowType{
    type:string,
    labelText?:string
    onChangeFunction?:Function,
    placeholder?:string
}

function FormRow({type, labelText, onChangeFunction, placeholder}:FormRowType) {
    return ( 
        <div className='flex flex-col'>
            <label className='text-gray text-sm'>{labelText}</label>
            <input
            step='.01'
            placeholder={placeholder}
            onChange={onChangeFunction}
             className={`
                ${type==='checkbox'?'scale-125':''}
                border-b border-gray outline-none p-2 bg-transparent w-full
                `} type={type} />
        </div>
     );
}

export default FormRow;