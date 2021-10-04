import React, { useState } from "react";
import { Button, Card } from "react-bootstrap"
import axios from 'axios'
import SearchComponent from "../Search-Component/SearchComponent";

const Home = () => {

    return (
        <div id="home" style={{ padding: "20px" }}>
            <SearchComponent />
        </div>
    );
};

export default Home;
