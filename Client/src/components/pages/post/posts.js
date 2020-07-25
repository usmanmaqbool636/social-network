import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllPost } from '../../../store/actions/post';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
import { getRandomColor } from '../../helper';
import "./post.css";
const GetAllPost = ({ posts, getAllPost }) => {
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    useEffect(() => {
        getAllPost((err) => {
            if (err) {
                setLoading(false)
                setErr(err);
            } else {
                setLoading(false)
            }
        })
    }, [getAllPost])
    const changeHandler = (evt) => {
        setSearch(evt.target.value)
    }
    const imgError = async (evt) => {
        evt.target.style.backgroundColor = getRandomColor()
        evt.target.className+=" postImgErr";
        console.log(evt.target.className)
    }
    const filterPost = posts ? posts.filter(c => {
        const regex = new RegExp(`${search}`, "gi");
        return c.title.match(regex) || c.body.match(regex);
    }) : []
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center mt-5">
                <div className="form-group w-75">
                    <input placeholder="search from posts" onChange={changeHandler} value={search} name="search" className="form-control" />
                </div>
            </div>
            <h2 className="my-5 text-center">
                Recent Posts
            </h2>
            {err && <div className="alert alert-warning">{err}</div>}
            {posts && (
                <div className="row justify-content-center">
                    {filterPost.map(post => {
                        return (
                            <div className="col-md-4 card m-1 p-1 singlePost" style={{ width: "18rem" }} key={`Users ${post._id}`}>
                                <img className="card-image-top"
                                    src={`/api/post/photo/${post._id}`}
                                    onError={imgError}
                                    alt={`${post.name}'s Image`} />
                                <div className="card-body p-2">
                                    <h2 className="card-title">{post.title}</h2>
                                    <div className="card-text" dangerouslySetInnerHTML={{ __html: post.body.substring(0, 100) }} />
                                    <hr />
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
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/posts/${post._id}`} className="btn btn-raised btn-sm btn-primary">Read more</Link>
                                        <h6 style={{ cursor: "pointer" }} className="d-inline-block"  >
                                            {post.likes.length}{" "}
                                            <i className="fa fa-thumbs-o-up ml-1 " aria-hidden="true"></i>
                                            {" "}
                                            {post.likes.length}
                                            <i className="fa fa-comments-o ml-1" aria-hidden="true"></i>
                                        </h6>
                                    </div>
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