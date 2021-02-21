import React, { useRef, useState, useEffect } from 'react';
import Button from './Button';

import './ImageUpload.css';

interface ImageUploadProps {
    id: string;
    center: boolean;
    errorText?: string;
    onInput: (id: string, pickedFile: File | undefined, isValid: boolean) => void;
}

const ImageUpload:React.FC<ImageUploadProps> = (props) => {
    const [file, setFile] = useState<File| undefined>(undefined);
    const [previewUrl, setPreviewUrl] = useState<string| ArrayBuffer| null>(null);
    const [isValid, setIsValid] = useState(false);
    const filePickerRef = useRef<any>();

    useEffect(() => {
        // This occurs everytime the state(file) changes
        if (!file){
            return;
        }
        // We get here if we know we have a file
        const fileReader = new FileReader();        // Baked in the browser/JS
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file])
    
    const pickImageHandler = () =>{
        filePickerRef.current.click();
    }

    const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let pickedFile;
        let isFileValid = isValid;
        // Generate in order to preview the pic picked 
        if (event.target.files && event.target.files.length === 1){
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            isFileValid = true;
        } else{
            isFileValid = false;
        }
        setIsValid(isFileValid);
        props.onInput(props.id, pickedFile, isFileValid);
    }

    return (
        <div className="form-control">
            <input 
                id={props.id} 
                ref={filePickerRef}
                style={{display: 'none'}} 
                type="file" 
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewUrl && typeof(previewUrl) === 'string' && <img src={previewUrl} />} 
                    {!previewUrl && <p>Please pick an image. </p>}
                </div>
                <Button type="button" onClick={pickImageHandler}>
                    PICK IMAGE
                </Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
}

export default ImageUpload;