import React, { useState } from "react";
import { Button, Card } from "react-bootstrap"
import News from "../../Components/News-Stream/News"
import Banner from "../Banner-Component/Banner";

const Home = () => {

    return (
        <div id="home" style={{ height: "1000px", width: "100%", margin: "100px auto" }}>
            <Banner />
            <News />
        </div>
    );
};

export default Home;
