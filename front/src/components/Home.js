import React from 'react';

import Button from 'react-bootstrap/Button';

export default function Home() {
    return (
        <div style={{
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: "url(/static/assets/banner-1.jpg)",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }}>
            <div style={{ display: 'flex' }}>
                <div id="title" style={{
                    textAlign: 'center'
                }}>
                    <h1 style={{
                        fontSize: 72,
                        animation: "splash 1s normal forwards ease-in-out",
                    }}>
                        "Rad Route, Dude"
                    </h1>
                    <br/>
                    <Button variant="dark">Random Climb</Button>
                    
                </div>
                <div style={{ minWidth: '33vw' }}/>
            </div>
        </div>
    )
}