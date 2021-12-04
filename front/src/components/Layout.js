import React from 'react';
import RadNavbar from './RadNavbar';

export default function Layout({children}){
    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            {/* side drawer */}
            <RadNavbar/>

            <div style={{flexGrow: 1}}>
                {children}
            </div>
        </div>
    )
}