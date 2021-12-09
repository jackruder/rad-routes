import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';

import { fetchFromApi } from '../util';

import ClimbCard from './Card/ClimbCard';

export default function Home({ loggedIn }) {
    const [climbs, setClimbs] = useState(null);

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
                        animation: '1s ease-out 0s 1 slideInLeft'
                    }}>
                        "Rad Route, Dude"
                    </h1>
                    <br/>
                    <Button variant="dark"
                        onClick={() => {
                            fetchFromApi("/climbs", setClimbs);
                        }}
                    >
                        Random Climb
                    </Button>
                </div>
                <div style={{ minWidth: '40vw', minHeight: '100%', display: 'grid', placeItems: 'center' }}>
                    <div style={{position: 'absolute'}}>
                        { climbs !== null ? <>
                            { climbs.length > 0 ?
                                <ClimbCard data={climbs[Math.floor(Math.random() * climbs.length)]}/>
                            : 
                                <div style={{ color: '#fdd' }}>
                                    {loggedIn ? "No climbs available :(" : "Log in to see available climbs!"} 
                                </div>
                            }
                        </> 
                        :
                        <></> }
                    </div>
                </div>
            </div>
        </div>
    )
}