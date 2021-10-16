import React from 'react';
import { Button } from 'react-bootstrap';

const PageNotFound = () => {
    return (
        <div
            id="page-not-found-component"
            style={{ height: '100%', width: '100%', margin: '300px auto' }}
        >
            <div style={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
                <h1>Page not found</h1>
                <p>Click button below to take you to home page</p>
                <Button href="/">Home</Button>
            </div>
        </div>
    );
};

export default PageNotFound;
