import React from 'react';

const About = () => {
    return (
        <div id="about">
            <div
                style={{ height: '100%', width: '100%', margin: '100px auto' }}
            >
                <div style={{ width: '50%', margin: 'auto' }}>
                    <p style={{ fontSize: '2.75rem', fontWeight: 'bold' }}>
                        About
                    </p>
                </div>
                <div style={{ width: '50%', margin: 'auto' }}>
                    <p style={{ fontSize: '2rem' }}>
                        This application was previously built using ReactJS and
                        Python/Flask.That particular project can be found{' '}
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/jonathanj101/Stock-Trading-App"
                        >
                            Github Repository
                        </a>
                    </p>
                    <p style={{ fontSize: '2rem' }}>
                        Furthermore, for the user experience and design;
                        ReactJS, Bootstrap, Reactstrap, and React-Router was
                        used.
                    </p>
                    <p style={{ fontSize: '2rem' }}>
                        For this time around, Django framework was used to
                        handle the back-end; Python, Django
                        (Django-Restframework, Views, Hashers, Decorators),
                        Requests to handle communication to the IEX Cloud API.
                    </p>
                    <p style={{ fontSize: '2rem' }}>
                        As for the external API used for this application;{' '}
                        <a
                            rel="noreferrer"
                            href="https://www.iexcloud.io"
                            target="_blank"
                        >
                            IEX
                        </a>
                        Cloud to get Stock Exchange Market data.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
