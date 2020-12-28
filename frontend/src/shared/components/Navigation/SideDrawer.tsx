import React from 'react';
import ReactDOM from 'react-dom';

import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';
interface SideDrawerProp {
    show: boolean;
    onClick: () => void;
}

const SideDrawer:React.FC<SideDrawerProp> = (props) => {
    const content = (
        <CSSTransition 
            in={props.show} 
            timeout={200} 
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
            >
            <aside className="side-drawer" onClick={props.onClick}> 
                {props.children} 
            </aside>
        </CSSTransition>
    );
    const drawerPortal = document.getElementById('drawer-hook');        // Look for the portal in the index.html

    return drawerPortal ? ReactDOM.createPortal(content, drawerPortal) : null;
}

export default SideDrawer;