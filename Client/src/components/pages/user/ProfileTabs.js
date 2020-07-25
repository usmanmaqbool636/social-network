import React from 'react';
import { Link } from 'react-router-dom';
import { getRandomColor } from '../../helper';

const ProfileTabs = ({ follower, following, posts }) => {
    const imgError = async (evt) => {
        // evt.target.src = "https://source.unsplash.com/random";
        evt.target.style.backgroundColor = getRandomColor()
        evt.target.style.overflow="hidden"
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-4">
                    <h3 className="text-primary">Followers ({follower.length})</h3>
                    <hr />
                    {follower.map(person => (
                        <div key={`tabfollowing${person._id}`}>
                            <div className="row  mt-2 p-2">
                                <div>
                                    <Link to={`/user/${person._id}`}>
                                        <img
                                            className="float-left mr-2"
                                            height="40px"
                                            width="40px"

                                            style={{
                                                borderRadius: "50%",
                                                border: ".8px solid #707070"
                                            }}
                                            src={`/api/user/photo/${person._id}?${new Date().getTime()}`}
                                            alt={`${person.name}`}
                                            onError={imgError}
                                        />
                                        <div className="float-left">
                                            <h3>{person.name}</h3>
                                        </div>

                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-md-4">
                    <h3 className="text-primary">Following ({following.length})</h3>
                    <hr />
                    {following.map(person => (
                        <div key={`tabfollower${person._id}`}>
                            <div className="row  mt-2 p-2">
                                <div className="">
                                    <Link to={`/user/${person._id}`}>
                                        <img
                                            className="float-left mr-2"
                                            height="40px"
                                            width="40px"

                                            style={{
                                                borderRadius: "50%",
                                                border: ".8px solid #707070"
                                            }}
                                            src={`/api/user/photo/${person._id}?${new Date().getTime()}`}
                                            alt={`${person.name}`}
                                            onError={imgError}
                                        />
                                        <div className="float-left">
                                            <h3>{person.name}</h3>
                                        </div>

                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-4">
                    <h3 className="text-primary">Post ({posts.length})</h3>
                    <hr />

                    {posts.map(post => (
                        <div key={`tabfollower${post._id}`}>
                            <div className="row  mt-2 p-2">
                                <div className="">
                                    <Link to={`/posts/${post._id}`}>
                                        <img
                                            className="float-left mr-2"
                                            height="40px"
                                            width="40px"

                                            style={{
                                                borderRadius: "50%",
                                                border: ".8px solid #707070"
                                            }}
                                            src={`/api/post/photo/${post._id}?${new Date().getTime()}`}
                                            alt={`${post.name}`}
                                            onError={imgError}
                                        />
                                        <div className="float-left">
                                            <h3>{post.title}</h3>
                                        </div>

                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    );
}

export default ProfileTabs;