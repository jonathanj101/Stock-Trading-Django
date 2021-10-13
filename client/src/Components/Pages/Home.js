import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import News from '../../Components/News-Stream/News';
import Banner from '../Banner-Component/Banner';

const Home = () => {
    return (
        <div
            id="home"
            style={{ height: '100%', width: '100%', margin: '100px auto' }}
        >
            <Banner />
            {/* <div style={{ margin: '100px auto' }}> */}
            <News />
        </div>
    );
};

export default Home;
