import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { allUser } from '../../../store/actions/user';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';
import { getRandomColor } from '../../helper';

const Users = ({ allUser, users, socket }) => {
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(true)
    const [socketConnected, setSocketConnected] = useState(false);
    const [dt, setDt] = useState('');
    useEffect(() => {
        allUser((err) => {
            if (err) {
                setLoading(false)
                setErr(err);
            } else {
                setLoading(false)
            }
        })
    }, [allUser])
    useEffect(() => {
        if (socket) {
            socket.emit('neweve', "neweve called");
            socket.on("hi", (data) => {
                console.log("data=>", data)
            })
            socket.on("postall", data => {
                console.log("asd=>",data)
                setDt(data.some)
            });
            // socket.on("getData1", data => {
            //     setDt(data);
            // });
        }
    }, [socket])



    const imgError = async (evt) => {
        // evt.target.src = "https://source.unsplash.com/random";
        evt.target.style.backgroundColor = getRandomColor()
        evt.target.style.overflow = "hidden"
    }


    return (
        <div className="container">

            <h2 className="my-5 text-center">
                Users
            </h2>
            {err && <div className="alert alert-warning">{err}</div>}
            {users && (
                <div className="row no-gutters justify-content-center">
                    {users.map(user => {
                        return (
                            <div className="col-sm-12 col-md-3 card m-1 singlePost" style={{ width: "18rem" }} key={`Users ${user._id}`}>
                                <img className="card-image-top "
                                    src={`/api/user/photo/${user._id}`}
                                    onError={imgError}
                                    alt={`${user.name}'s Image`} />
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
        users: state.auth.userList,
        socket: state.socket
    }
}
export default connect(mapStateToProps, { allUser })(Users);