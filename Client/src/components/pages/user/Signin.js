import React, { useState } from 'react';
import { signin } from '../../../store/actions/user';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const Signin = (props) => {
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);
    const { email, password } = values;
    const [errors, setErrors] = useState({})
    const handleChange = (evt) => {
        setValues({ ...values, [evt.target.name]: evt.target.value })
        const newerrors = { ...errors }
        delete newerrors[evt.target.name];
        setErrors({ ...newerrors })
    }
    const submitHandler = (evt) => {
        evt.preventDefault();
        setLoading(true)
        props.signin(values, (err) => {
            setLoading(false)
            if (err) {
                setErrors(err)
            }
            else {
                setValues({
                    email: "",
                    password: ""
                })
                props.history.push('/')
            }

        })

    }
    return (
        <div className="container">
            <h2 className="mt-5 mb-5">
                SignIn Form
                </h2>
            {Object.keys(errors).length > 0 && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <ul>
                        {Object.keys(errors).map(err => {
                            if (errors[err]) {
                                return (
                                    <li key={`signin ${err}`}>
                                        {errors[err]}
                                    </li>
                                )
                            }
                            else {
                                return null
                            }

                        })}
                    </ul>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    
                </div>
            )}

            <form onSubmit={submitHandler} >
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
                <button className={`btn btn-raised btn-primary`} disabled={loading} >{loading ? "Loading" : "Login"} </button>

            </form>
            <div className="alert alert-dark" role="alert">
                        Not have an account <Link to="/signup">Signup</Link> instead.
                    </div>
        </div>
    );
}

export default connect(null, { signin })(Signin);