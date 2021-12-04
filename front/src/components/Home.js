import React from 'react';

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
                <h1 style={{
                    fontSize: 72,
                    animation: "splash 1s normal forwards ease-in-out"
                }}>
                    "Sick Route, Dude"
                </h1>
                <div style={{ minWidth: '33vw' }}/>
            </div>
        </div>
    )
}