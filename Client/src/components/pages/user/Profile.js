import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { singleUser, deleteProfile, likesAndcomments, likesReceive } from '../../../store/actions/user';
import { postByUser } from '../../../store/actions/post';
import Modal from '../../Modal';
import ProfileFollowButton from './followProfileButton';
import ProfileTabs from './ProfileTabs';
import { getRandomColor } from '../../helper';

const Profile = ({ match, user, isAuthenticated, singleUser, totalComments, totalLikes, commentsreceive, likesreceive, userProfile, deleteProfile, history, postByUser, postbyUserList, likesAndcomments, likesReceive }) => {
    const [id, setId] = useState(null);
    const [err, setErr] = useState(null);
    useEffect(() => {
        if (!id) {
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
        if (isAuthenticated) {
            likesAndcomments(localStorage.jwt, () => {
            });
            likesReceive(localStorage.jwt, () => {

            });
        }

    }, [id,isAuthenticated, singleUser, postByUser ])


    const imgError = async (evt) => {
        // evt.target.src = "https://source.unsplash.com/random";
        evt.target.style.backgroundColor = getRandomColor()
        evt.target.style.overflow = "hidden"
    }

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
                            }} src={`/api/user/photo/${userProfile._id}?${new Date().getTime()}`} onError={imgError} alt={`${userProfile.name}'s Image`} />

                        </div>

                        <div className="col-md-8">
                            {/* {isAuthenticated && } */}
                            <div className="lead mt-2">

                                <p>hello: {userProfile.name}</p>
                                <p>Email: {userProfile.email}</p>
                                <p>joined on:{new Date(userProfile.createdAt).toDateString()} </p>
                            </div>
                            <hr />
                            {isAuthenticated &&
                                <>
                                    <div className="d-flex my-3">
                                        <h5 className="mr-3">Likes Receive <span class="badge badge-primary">{likesreceive}</span></h5>
                                        <h5 className="">Coments Receive <span class="badge badge-primary">{commentsreceive}</span></h5>
                                    </div>
                                    <div className="d-flex my-3">
                                        <h5 className="mr-3">Likes post <span class="badge badge-secondary">{totalLikes}</span></h5>
                                        <h5 className="">coments post <span class="badge badge-secondary">{totalComments}</span></h5>
                                    </div>
                                </>
                            }

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
        postbyUserList: state.post.postbyUser,
        totalLikes: state.auth.totalLikes,
        totalComments: state.auth.totalComments,
        likesreceive: state.auth.likesreceive,
        commentsreceive: state.auth.commentsreceive

    }
}
export default connect(mapStateToPtops, { singleUser, deleteProfile, postByUser, likesAndcomments, likesReceive })(Profile);