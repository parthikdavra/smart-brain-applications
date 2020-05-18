import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange,onButtonSubmit}) =>{
    return (
        <div className='ma4 mt0'>
            <p className='f3'>
                {'This Magic Brain wil detect  faces in your picture. Give it a try.'}
            </p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-5'>
                    <input type='text' onChange={onInputChange} className='f4 btn pa2 w-70 center'/>
                    <button onClick={onButtonSubmit} className='w-30 grow f4  link ph3 pv2 dib white bg-light-purple bc'>Detect</button>
                </div>
            </div>
        </div>
    
    )
}

export default ImageLinkForm;