import React from 'react';

const Banner = () => {
    return (
        <div id="banner-component" style={{ width: '50%', margin: 'auto' }}>
            <div>
                <p
                    id="banner-title"
                    style={{
                        fontSize: '2.75rem',
                        width: 'fit-content',
                        margin: 'auto',
                    }}
                >
                    Start Investing
                </p>
            </div>
            <div id="banner-catchphrase" style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1.25rem' }}>
                    If not registered, what are you waiting for?
                </p>
                <p style={{ fontSize: '1.25rem' }}>Create an account now</p>
                <p style={{ fontSize: '1.25rem' }}>
                    And start investing with no real currency, worry free!
                </p>
            </div>
        </div>
    );
};

export default Banner;
