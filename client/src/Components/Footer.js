import React from 'react'

const Footer = () => {
    return (
        <div id="footer">
            <div id="container">
                <div id="column-div">
                    <div>
                        <p>Social</p>
                    </div>
                    <div id="row-items">
                        <a
                            className="lindkedIn_div"
                            href="https://www.linkedin.com/in/jonathan-jimenez101/"
                        >
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div id="author-div">
                <a href="https://www.jonathanjimenez.tech">@Jonathan J || Full Stack Developer</a>
            </div>
        </div>
    )
}

export default Footer
