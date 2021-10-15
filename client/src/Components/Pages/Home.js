import React from 'react';
import News from '../../Components/News-Stream/News';
import Banner from '../Banner-Component/Banner';

const Home = () => {
    return (
        <div
            id="home"
            style={{ height: '100%', width: '100%', margin: '100px auto' }}
        >
            <Banner />
            <News />
        </div>
    );
};

export default Home;
