import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { editProfile } from '../../../store/actions/user';
const EditProfile = ({ isAuthenticated, user, editProfile }) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [show, setShow] = useState(false);
    // const [isAuth, setisAuth] = useState(null)
    const [err, setErr] = useState("");
    useEffect(() => {
        console.log(isAuthenticated)
        if (isAuthenticated) {
            const { name, email } = user;
            setValues({ name, email });
        }
    }, [isAuthenticated])
    const handleChange = (evt) => {
        setValues({ ...values, [evt.target.name]: evt.target.value })
    }
    const submitHandler = (evt) => {
        const { name, email, password } = values;
        evt.preventDefault();
        if (password &&  password.length >= 1 && password.length <= 5) {
            setErr("password must be greater than 6 character")
            setShow(true);
            setTimeout(() => {
                setErr("");
                setShow(false)
            }, 2000);
        }
        if (!name || !email) {
            setErr("name and email must required to perform this actions")
            setShow(true);
            setTimeout(() => {
                setErr("");
                setShow(false)
            }, 2000);
        }
        else {
            editProfile(user._id, { name, email, password }, localStorage.jwt, (err) => {
                if (err) {
                    setErr(err);
                    setShow(true);
                    setTimeout(() => {
                        setErr("");
                        setShow(false)
                    }, 2000);
                }
                else {
                    setShow(true);
                    setTimeout(() => {
                        setErr("");
                        setShow(false)
                    }, 2000);
                    console.log("user updated");
                }
            })
        }



    }
    const { name, email, password } = values;
    const render = () => {
        console.log(isAuthenticated);
        switch (isAuthenticated) {
            case null:
                return (
                    <div>
                        <h1 className="mt-5 mb-5">Loading</h1>
                    </div>
                )
            case false:
                return <Redirect to="/" />
            case true:
                return (
                    <div className="container">
                        <h2 className="mt-5 mb-5">EditProfile</h2>
                        {show ? (
                            <div class={`alert ${err ? "alert-danger" : "alert-success"} alert-dismissible fade show`} role="alert">
                                {err ? err : "updated successfully"}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        ) : null}

                        <form onSubmit={submitHandler} >
                            <div className="form-group">
                                <label className="text-muted">
                                    Name
                                </label>
                                <input type="text" value={name} onChange={handleChange} name="name" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="text-muted">
                                    Email
                                </label>
                                <input type="email" value={email} onChange={handleChange} name="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="text-muted">
                                    Password
                                </label>
                                <input type="password" value={password} onChange={handleChange} name="password" className="form-control" />
                            </div>
                            <button className={`btn btn-raised btn-primary`} disabled={show} >{show ? "Updating Profile" : "Update Profile"} </button>
                        </form>
                    </div>
                );
            default:
                return "nothing"

        }
    }
    return render();
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
    }
}
export default connect(mapStateToProps, { editProfile })(EditProfile);