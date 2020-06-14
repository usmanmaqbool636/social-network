import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { allUser } from '../../../store/actions/user';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
const Users = ({ allUser, users }) => {
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        allUser((err) => {
            if (err) {
                setLoading(false)
                setErr(err);
            } else {
                setLoading(false)
            }
        })
    }, [])
    return (
        <div className="container">

            <h2 className="my-5">
                Users
            </h2>
            {err && <div className="alert alert-warning">{err}</div>}
            {users && (
                <div className="row no-gutters justify-content-center">
                    {users.map(user => {
                        return (
                            <div className="col-md-3 card m-1" style={{ width: "18rem" }} key={`Users ${user._id}`}>
                                <img className="card-image-top" style={{
                                    width: "100%",
                                    height: "15vw",
                                    objectFit: "cover"
                                }} src="https://via.placeholder.com/150" alt={`${user.name}'s Image`} />
                                <div className="card-body">
                                    <h2 className="card-title">{user.name}</h2>
                                    <p className="card-text">{user.email} </p>
                                    <Link to={`/user/${user._id}`} className="btn btn-raised btn-sm btn-primary">View Profile </Link>
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
        users: state.auth.userList
    }
}
export default connect(mapStateToProps, { allUser })(Users);