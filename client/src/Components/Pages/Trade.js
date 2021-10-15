import React from 'react';
import SearchComponent from '../Search-Component/SearchComponent';
import News from '../../Components/News-Stream/News';

const Trade = () => {
    return (
        <div id="trade">
            <SearchComponent />
            <div style={{ margin: '200px auto' }}>
                <News />
            </div>
        </div>
    );
};

export default Trade;
