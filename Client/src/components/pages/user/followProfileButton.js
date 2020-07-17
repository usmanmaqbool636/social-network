import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { userfollow, unFollow } from "../../../store/actions/user"


const ProfileFollowButton = ({ followingList, followingId, userfollow,unFollow,extraclass }) => {
    const [checkFollowing, setCheckFollowing] = useState(false);
    useEffect(() => {
        setCheckFollowing(followingList ? followingList.find(follow => follow._id === followingId) : false)
        console.log("follow")
    }, [followingList, followingId])

    return (

        <div className="d-inline-block">
            {!checkFollowing ? (
                <button className={`btn btn-success btn-raised ${extraclass}`} onClick={() => {
                    userfollow(followingId, localStorage.jwt, (err) => {
                        if (!err) {
                            setCheckFollowing(!checkFollowing);
                        }
                    })
                }}>
                    Follow
                </button>
            ) :

                (<button className={`btn btn-warning btn-raised ${extraclass}`}
                onClick={() => {
                    unFollow(followingId, localStorage.jwt, (err) => {
                        if (!err) {
                            setCheckFollowing(!checkFollowing);
                        }
                    })
                }}
                >
                    UnFollow
                </button>)
            }
        </div>
    )
}
export default connect(null, { userfollow,unFollow })(ProfileFollowButton);