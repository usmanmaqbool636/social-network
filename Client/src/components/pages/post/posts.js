import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllPost } from '../../../store/actions/post';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
const GetAllPost = ({ posts, getAllPost }) => {
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getAllPost((err) => {
            if (err) {
                setLoading(false)
                setErr(err);
            } else {
                setLoading(false)
            }
        })
    }, [])

    const imgError = async (evt) => {
        evt.target.src = "https://source.unsplash.com/random";
    }
    return (
        <div className="container-fluid">

            <h2 className="my-5 text-center">
                Recent Posts
            </h2>
            {err && <div className="alert alert-warning">{err}</div>}
            {posts && (
                <div className="row justify-content-center">
                    {posts.map(post => {
                        return (
                            <div className="col-md-3 card m-1 p-1" style={{ width: "18rem" }} key={`Users ${post._id}`}>
                                <img className="card-image-top" style={{
                                    width: "100%",
                                    height: "15vw",
                                    objectFit: "contain"
                                }}
                                    src={`http://localhost:8080/post/photo/${post._id}`}
                                    // onError={imgError}
                                    alt={`${post.name}'s Image`} />
                                <div className="card-body p-2">
                                    <h2 className="card-title">{post.title}</h2>
                                    <p className="card-text">{post.body.substring(0,100)} </p>
                                    <hr/>
                                    <p className="font-italic ">
                                        Posted By
                                        <Link to={`/user/${post.postedBy._id}`}>
                                            <span className="mark">
                                                {post.postedBy.name}
                                            </span>
                                        </Link>
                                        <br />
                                        on {new Date(post.createdAt).toDateString()}
                                    </p>
                                    <Link to={`/posts/${post._id}`} className="btn btn-raised btn-sm btn-primary">Read more</Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
            {loading && <Spinner />}

        </div>
    );
}
const mapStateToProps = state => {
    return {
        posts: state.post.posts
    }
}
export default connect(mapStateToProps, { getAllPost })(GetAllPost);