import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { singleUser, deleteProfile } from '../../../store/actions/user';
import Modal from '../../Modal';

const Profile = ({ match, user, isAuthenticated, singleUser, userProfile, deleteProfile, history }) => {
    const [id, setId] = useState(null);
    const [err, setErr] = useState(null);
    useEffect(() => {
        // isAuthenticated ? setUser(user) : props.singleUser(match.params.userId)
        if (match.params.userId) {
            console.log("user Profile", match.params.userId)
            console.log("token", localStorage.jwt)
            setId(match.params.userId)
            singleUser(match.params.userId, (err) => {
                if (err) {
                    setErr(err)
                }
            })
        }

    }, [match.params.userId])
    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Profile</h2>
            {err && (
                <div className="alert alert-danger">{err}</div>
            )}
            {userProfile && user && (
                <>
                    <div className="row">
                        <div className="col-md-6">

                            <img className="card-image-top" style={{
                                width: "100%",
                                height: "20vw",
                                objectFit: "cover"
                            }} src="https://via.placeholder.com/150" alt={`${user.name}'s Image`} />

                        </div>

                        <div className="col-md-6">
                            {/* {isAuthenticated && } */}
                            <div className="lead mt-2">

                                <p>hello: {userProfile.name}</p>
                                <p>Email: {userProfile.email}</p>
                                <p>joined on:{new Date(userProfile.createdAt).toDateString()} </p>
                            </div>
                            {isAuthenticated && (user._id === id) && (
                                <div className="d-inline-block">
                                    <Link className="btn btn-raised btn-success mr-5"
                                        to={`/user/edit/${userProfile._id}`}
                                    >
                                        Edit Profile
                                    </Link>
                                    <button className="btn btn-raised btn-danger" data-toggle="modal" data-target="#myModal">Delete </button>
                                    <Modal deleteProfile={() => {
                                        console.log("delete")
                                        deleteProfile(user._id, localStorage.jwt, (err) => {
                                            if (err) {
                                                console.log(err)
                                            }
                                            else {
                                                console.log("user deleted")
                                                history.push('/signin')
                                            }
                                        })
                                        // console.log("delete click")
                                    }} />
                                </div>
                            )}
                        </div>

                    </div>

                </>
            )}
        </div>
    )

}
const mapStateToPtops = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        users: state.auth.userList,
        user: state.auth.user,
        userProfile: state.auth.userProfile
    }
}
export default connect(mapStateToPtops, { singleUser, deleteProfile })(Profile);