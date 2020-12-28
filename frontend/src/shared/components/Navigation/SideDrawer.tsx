import React from 'react';
import ReactDOM from 'react-dom';

import './SideDrawer.css';

const SideDrawer:React.FC<{}> = (props) => {
    const content = <aside className="side-drawer"> {props.children} </aside>;
    const drawerPortal = document.getElementById('drawer-hook');        // Look for the portal in the index.html

    return drawerPortal ? ReactDOM.createPortal(content, drawerPortal) : null;
}

export default SideDrawer;