import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createPost, singlePost, updatePost } from "../../../store/actions/post";
import Editor from './Editor';
let postData = new FormData();
const CreatePost = ({ isAuthenticated, match, user, createPost, history, singlePost, updatePost }) => {
    const [values, setValues] = useState({
        title: "",
        body: "",
        photo: ""
    });
    const [show, setShow] = useState(false);
    const [err, setErr] = useState("");
    useEffect(() => {
        if (match.params.postId) {
            singlePost(match.params.postId, (err, data) => {
                if (err) {
                    setErr(err);
                } else {
                    setValues({ ...values, ...data })
                }
            })

        }
    }, [isAuthenticated, match.params.postId, singlePost]);
    const handleChange = (evt) => {
        postData.set([evt.target.name], evt.target.value);
        setValues({ ...values, [evt.target.name]: evt.target.value });
    };
    const bodyChange = (text) => {
        postData.set("body", text);
        setValues({
            ...values,
            body: text
        })
    }
    const handleFileChange = (evt) => {
        postData.set([evt.target.name], evt.target.files[0]);
        if (evt.target.files[0].size > 1048575) {
            setErr("file must not grather than 1 mb");
            setShow(true);
            setTimeout(() => {
                setErr("");
                setShow(false);
            }, 2000);
        }
        setValues({ ...values, [evt.target.name]: evt.target.files[0] });
    };
    const submitHandler = (evt) => {
        const { title, body } = values;
        evt.preventDefault();
        if (!title || !body) {
            setErr("please fill all field");
            setShow(true);
            setTimeout(() => {
                setErr("");
                setShow(false);
            }, 2000);
        }
        else {
            if (match.params.postId) {
                postData._id = values._id
                updatePost(postData, localStorage.jwt, (err) => {
                    if (err) {
                        setErr(err);
                        setShow(true);
                        setTimeout(() => {
                            setErr("");
                            setShow(false);
                        }, 2000);
                    } else {
                        setShow(true);
                        setTimeout(() => {
                            setErr("");
                            setShow(false);
                        }, 2000);
                    }
                });
            } else {
                createPost(postData, localStorage.jwt, (err) => {
                    if (err) {
                        setErr(err);
                        setShow(true);
                        setTimeout(() => {
                            setErr("");
                            setShow(false);
                        }, 2000);
                    } else {
                        setShow(true);
                        history.push(`/user/${user._id}`)
                        setValues({});
                        setTimeout(() => {
                            setErr("");
                            setShow(false);
                        }, 2000);
                    }
                });
            }
        }
    };
    const { title, body } = values;

    return (
        <div className="container">
            <h2 className="mt-5 mb-5"> {match.params.postId ? "Update" : "Create"} New Post </h2>{" "}
            {show ? (
                <div
                    className={`alert ${
                        err ? "alert-danger" : "alert-success"
                        } alert-dismissible fade show`}
                    role="alert"
                >
                    {" "}
                    {err ? err : "updated successfully"}{" "}
                    <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                    >
                        <span aria-hidden="true"> &times; </span>{" "}
                    </button>{" "}
                </div>
            ) : null}
            <img className="img-thumbnail" style={{
                width: "200",
                height: "20vw",
                objectFit: "cover"
            }}
                src={`/api/post/photo/${values._id}`} alt={`${title}'s Image`} />
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label className="text-muted">profile Photo </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        name="photo"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Title </label>{" "}
                    <input
                        type="text"
                        value={title}
                        onChange={handleChange}
                        name="title"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">body</label>
                    <Editor name="body" value={body} onChange={bodyChange} className="form-control" />
                </div>

                <button className={`btn btn-raised btn-primary`} disabled={show}>
                    {" "}
                    {match.params.postId ? "Update" : "create "} post{" "}
                </button>{" "}
            </form>{" "}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
    };
};
export default connect(mapStateToProps, { createPost, singlePost, updatePost })(CreatePost);
