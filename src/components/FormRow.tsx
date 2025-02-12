import * as React from 'react';
import LabelComponent from './LabelComponent.tsx';
import InputComponent from './InputComponent.tsx';

interface FormRowType{
    type:string,
    labelText?:string
    onChangeFunction?:Function,
    placeholder?:string,
    value?:any
}

function FormRow({type, labelText, onChangeFunction, placeholder,value}:FormRowType) {
    return ( 
        <div className='flex flex-col'>
            <LabelComponent text={labelText}/>
            <InputComponent value={value} placeholder={placeholder} type={type} onChangeFunction={onChangeFunction}/>
        </div>
     );
}

export default FormRow;