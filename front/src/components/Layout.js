import React from 'react';
import RadNavbar from './RadNavbar';

export default function Layout({ children, loggedIn, setLoggedIn }){
    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            {/* side drawer */}
            <RadNavbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>

            <div style={{flexGrow: 1}}>
                {children}
            </div>
        </div>
    )
}