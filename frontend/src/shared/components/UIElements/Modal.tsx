import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.css'

interface ModalProp {
    show: Boolean;
    onCancel: () => any;
    // Following are for the ModalOverlay
    className?: String;
    style?: React.CSSProperties;
    headerClass?: String;
    header: String;
    onSubmit?: () => any;
    contentClass?: String;
    footerClass?: String;
    footer: any;
}

const ModalOverlay: React.FC<ModalProp> = (props) => {
    const content = (
        <div className={`modal ${props.className}`} style={props.style}>
            <header className={`modal__header ${props.headerClass}`}>
                <h2> {props.header} </h2>
            </header>
            <form 
                onSubmit={
                    props.onSubmit ? props.onSubmit : event => event.preventDefault
                }
            >
                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    );
    const modalPortal = document.getElementById('modal-hook');
    
    return modalPortal ? ReactDOM.createPortal(content, modalPortal) : null;
}

const Modal:React.FC<ModalProp> = (props) => {
    return (
        <React.Fragment>
            {props.show && <Backdrop onClick={props.onCancel} />}
            <CSSTransition 
                in={props.show.valueOf()}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames="modal"
            >
                <ModalOverlay {...props}/>
            </CSSTransition>
        </React.Fragment>
    );
}

export default Modal; 