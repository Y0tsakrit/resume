import React from "react";
import Navbar from "./component/navbar";
import Show from "./component/show";
import Shelf from "./component/shelf";
const Home = () => {

    return (
        <div >
            <Navbar />
            <Show/>
            <Shelf/>
        </div>
    );
};

export default Home;