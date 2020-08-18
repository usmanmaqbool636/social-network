import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { editProfile } from "../../../store/actions/user";

let userData = new FormData();
const EditProfile = ({ isAuthenticated, user, editProfile }) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        about: ""
    });
    const [img, setImg] = useState(null);
    const [show, setShow] = useState(false);
    const [err, setErr] = useState("");
    useEffect(() => {
        if (isAuthenticated) {
            const { name, email, about } = user;
            setValues({ ...values, name, email, about });
        }
    }, [isAuthenticated]);
    const handleChange = (evt) => {
        userData.set([evt.target.name], evt.target.value);
        setValues({ ...values, [evt.target.name]: evt.target.value });
    };
    const handleFileChange = (evt) => {
        const link = URL.createObjectURL(evt.target.files[0])
        setImg(link)
        userData.set([evt.target.name], evt.target.files[0]);
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
        const { name, email, password, about } = values;
        evt.preventDefault();
        if (password && password.length >= 1 && password.length <= 5) {
            setErr("password must be greater than 6 character");
            setShow(true);
            setTimeout(() => {
                setErr("");
                setShow(false);
            }, 2000);
        }
        if (!name || !email) {
            setErr("name and email must required to perform this actions");
            setShow(true);
            setTimeout(() => {
                setErr("");
                setShow(false);
            }, 2000);
        } else {
            editProfile(user._id, userData, localStorage.jwt, (err) => {
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
        }
    };
    const { name, email, password, about } = values;
    return (
        <div className="container">
            <h2 className="mt-5 mb-5"> EditProfile </h2>{" "}
            {show ? (
                <div
                    class={`alert ${
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
                        <span aria-hidden="true"> & times; </span>{" "}
                    </button>{" "}
                </div>
            ) : null}
            {img ?
                <img className="img-thumbnail" style={{
                    width: "200",
                    height: "20vw",
                    objectFit: "cover"
                }}
                    src={img} alt={`${user.name}'s Image`} />
                :
            <img className="img-thumbnail" style={{
                width: "200",
                height: "20vw",
                objectFit: "cover"
            }}
                src={`/api/user/photo/${user._id}?date=${new Date().getTime()}`} alt={`${user.name}'s Image`} />
            }
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
                    <label className="text-muted">Name </label>{" "}
                    <input
                        type="text"
                        value={name}
                        onChange={handleChange}
                        name="name"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleChange}
                        name="email"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password </label>
                    <input
                        type="password"
                        value={password}
                        onChange={handleChange}
                        name="password"
                        className="form-control"
                    />
                    <div className="form-group">
                        <label className="text-muted">About </label>{" "}
                        <textarea
                            type="text"
                            value={about}
                            onChange={handleChange}
                            name="about"
                            className="form-control"
                        />
                    </div>
                </div>{" "}
                <button className={`btn btn-raised btn-primary`} disabled={show}>
                    {" "}
                    {show ? "Updating Profile" : "Update Profile"}{" "}
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
export default connect(mapStateToProps, { editProfile })(EditProfile);
