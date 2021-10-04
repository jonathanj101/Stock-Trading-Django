import React from 'react'

const Footer = () => {
    return (
        <div id="footer" style={{ backgroundColor: "#343a40", width: "100%", height: "100vh" }}>
            <div id="container" style={{ textAlign: "center" }}>
                <div id="column-div">
                    <div>
                        <p style={{ color: "white" }}>Social</p>
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
                <div id="author-div" style={{ margin: "50px auto" }}>
                    <a href="https://www.jonathanjimenez.tech">@Jonathan J || Full Stack Developer</a>
                </div>
            </div>
        </div>
    )
}

export default Footer
