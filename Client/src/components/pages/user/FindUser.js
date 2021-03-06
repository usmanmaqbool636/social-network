import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { findPeople, singleUser } from '../../../store/actions/user';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
import ProfileFollowButton from './followProfileButton';
import { getRandomColor } from '../../helper';

const FindUser = ({ findPeople, users,authuser }) => {
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        findPeople(localStorage.jwt, (err) => {
            if (err) {
                setLoading(false)
                setErr(err);
            } else {
                setLoading(false)
            }
        })
    }, [localStorage.jwt])

    const imgError = async (evt) => {
        // evt.target.src = "https://source.unsplash.com/random";
        evt.target.style.backgroundColor = getRandomColor()
        evt.target.style.overflow="hidden"
    }


    return (
        <div className="container">

            <h2 className="my-5 text-center">
                Find People
            </h2>
            {err && <div className="alert alert-warning">{err}</div>}
            {users && (
                <div className="row no-gutters justify-content-center">
                    {users.map(user => {
                        return (
                            <div className="col-md-3 card m-1" style={{ width: "18rem" }} key={`Users ${user._id}`}>
                                <div className="card-body">
                                    <h2 className="card-title">{user.name}</h2>
                                    <p className="card-text">{user.email} </p>
                                    <Link to={`/user/${user._id}`} className="btn btn-raised btn-sm btn-primary">View Profile </Link>
                                    <ProfileFollowButton extraclass="ml-1" followingList={authuser ? authuser.following : []} followingId={user._id} />
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
        users: state.auth.findPeople,
        authuser: state.auth.user,
    }
}
export default connect(mapStateToProps, { findPeople })(FindUser);