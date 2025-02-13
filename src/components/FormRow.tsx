import * as React from 'react';
import LabelComponent from './LabelComponent.tsx';

interface FormRowType{
    labelText?:string
    children?:any
}

function FormRow({labelText,children}:FormRowType) {
    return ( 
        <div className='flex flex-col'>
            <LabelComponent text={labelText}/>
            {children}
        </div>
     );
}

export default FormRow;