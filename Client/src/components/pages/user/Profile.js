import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { singleUser, deleteProfile } from '../../../store/actions/user';
import { postByUser } from '../../../store/actions/post';
import Modal from '../../Modal';
import ProfileFollowButton from './followProfileButton';
import ProfileTabs from './ProfileTabs';

const Profile = ({ match, user, isAuthenticated, singleUser, userProfile, deleteProfile, history, postByUser, postbyUserList }) => {
    const [id, setId] = useState(null);
    const [err, setErr] = useState(null);
    useEffect(() => {
        if (match.params.userId) {
            setId(match.params.userId)
            postByUser(match.params.userId, (err) => {
                setErr(err);
            })
            singleUser(match.params.userId, (err) => {
                if (err) {
                    setErr(err)
                }
            })
        }

    }, [match.params.userId])


    const imgError = async (evt) => {
        evt.target.src = "https://source.unsplash.com/random";
    }

    console.log(postbyUserList);
    return (
        <div className="container-fluid px-5">
            <h2 className="mt-5 mb-5">Profile</h2>
            {err && (
                <div className="alert alert-danger">{err}</div>
            )}
            {userProfile && (
                <>
                    <div className="row">
                        <div className="col-md-4">

                            <img className="card-image-top" style={{
                                width: "100%",
                                height: "20vw",
                                objectFit: "contain"
                            }} src={`/user/photo/${userProfile._id}?${new Date().getTime()}`} onError={imgError} alt={`${userProfile.name}'s Image`} />

                        </div>

                        <div className="col-md-8">
                            {/* {isAuthenticated && } */}
                            <div className="lead mt-2">

                                <p>hello: {userProfile.name}</p>
                                <p>Email: {userProfile.email}</p>
                                <p>joined on:{new Date(userProfile.createdAt).toDateString()} </p>
                            </div>
                            {isAuthenticated && (user._id === id) ? (
                                <div className="d-inline-block">
                                    <Link className="btn btn-raised btn-info mr-3"
                                        to={`/post/create`}
                                    >
                                        Create Post
                                    </Link>
                                    <Link className="btn btn-raised btn-success mr-3"
                                        to={`/user/edit/${userProfile._id}`}
                                    >
                                        Edit Profile
                                    </Link>
                                    <button className="btn btn-raised btn-danger" data-toggle="modal" data-target={`#profile${user._id}`}>Delete </button>
                                    <Modal text="profile" modelId={`profile${user._id}`} deleteHandler={() => {
                                        deleteProfile(user._id, localStorage.jwt, (err) => {
                                            if (err) {
                                                console.log(err)
                                            }
                                            else {
                                                history.push('/signin')
                                            }
                                        })
                                    }} />
                                </div>
                            ) : <ProfileFollowButton followingList={user ? user.following : []} followingId={userProfile._id} />}
                            <hr />

                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-12 my-5">
                            <hr />
                            <div className="lead">{userProfile.about}</div>
                            <hr />
                            <ProfileTabs posts={postbyUserList} follower={userProfile.follower} following={userProfile.following} />
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
        userProfile: state.auth.userProfile,
        postbyUserList: state.post.postbyUser
    }
}
export default connect(mapStateToPtops, { singleUser, deleteProfile, postByUser })(Profile);