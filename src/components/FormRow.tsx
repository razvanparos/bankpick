import * as React from 'react';
import LabelComponent from './LabelComponent.tsx';
import InputComponent from './InputComponent.tsx';

interface FormRowType{
    type:string,
    labelText?:string
    onChangeFunction?:Function,
    placeholder?:string
}

function FormRow({type, labelText, onChangeFunction, placeholder}:FormRowType) {
    return ( 
        <div className='flex flex-col'>
            <LabelComponent text={labelText}/>
            <InputComponent placeholder={placeholder} type={type} onChangeFunction={onChangeFunction}/>
        </div>
     );
}

export default FormRow;