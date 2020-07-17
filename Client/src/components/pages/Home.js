import React from 'react';
import Posts from "./post/posts";
const Home = () => {
    return (
        <>
            <div className="jumbotron">
                <h2>Home</h2>
                <p>React Front End</p>
            </div>
            <Posts />
        </>
    )
}
export default Home;