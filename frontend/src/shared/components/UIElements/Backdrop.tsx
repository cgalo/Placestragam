import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

interface BackdropProps{
    onClick: () => void;
}

const Backdrop:React.FC<BackdropProps> = (props) => {
    const content = <div className="backdrop" onClick={props.onClick}></div>;
    const backdropPortal = document.getElementById('backdrop-hook');
    
    return backdropPortal ? ReactDOM.createPortal(content, backdropPortal) : null;
}

export default Backdrop;