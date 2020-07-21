import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../store/actions/user';
import { connect } from 'react-redux';
import { getRandomColor } from './helper';
const Menu = ({ history, logout, isAuthenticated, user },) => {
    const signOut = () => {
        logout(() => {
            localStorage.removeItem('jwt');
            history.push('/signin');
        })
    }
    const renderPrivateNav = () => {
        switch (isAuthenticated) {
            case false:
                return (
                    <>
                        <li className={`nav-item ${history.location.pathname === "/signup" && "active"}`}>
                            <Link className="nav-link" to="/signup">SignUp</Link>
                        </li>

                        <li className={`nav-item ${history.location.pathname === "/signin" && "active"}`}>
                            <Link className="nav-link" to="/signin">SignIn</Link>
                        </li>

                    </>
                )
            case true:
                return
            default:
                return
        }
    }
    const imgError = async (evt) => {
        // evt.target.src = "https://source.unsplash.com/random";
        evt.target.style.backgroundColor = getRandomColor()
        evt.target.style.overflow = "hidden"
    }
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Social Network</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className={`nav-item ${history.location.pathname === "/" && "active"}`}>
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className={`nav-item ${history.location.pathname === "/users" && "active"}`}>
                        <Link className="nav-link" to="/users">Users <span className="sr-only">(current)</span></Link>
                    </li>
                    {renderPrivateNav()}
                    {isAuthenticated && (
                        <>
                            <li className={`nav-item ${history.location.pathname === "/findpeople" && "active"}`}>
                                <Link className="nav-link" to="/findpeople">Find People</Link>
                            </li>
                            <li className={`nav-item ${history.location.pathname === "/post/create" && "active"}`}>
                                <Link className="nav-link" to="/post/create">Create Post</Link>
                            </li>
                        </>
                    )}
                </ul>
                {isAuthenticated && <ul className="navbar-nav  mt-2 mt-lg-0 justify-content-end">
                    <li className="nav-item dropdown">
                        <img
                            src={`/user/photo/${user._id}`}
                            onError={imgError}
                            className="float-left mr-2"
                            height="35px"
                            width="35px"

                            style={{
                                borderRadius: "50%",
                            }}
                        />
                        <Link to={`/user/${user._id}`} type="button" className="btn text-light">{user.name}</Link>
                        <button type="button" className="btn dropdown-toggle dropdown-toggle-split text-light" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {/* <span class="sr-only">Toggle Dropdown</span> */}
                        </button>
                        <div className="dropdown-menu dropdown-menu-right   ">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#" onClick={signOut}>Signout</a>

                        </div>
                    </li>
                </ul>}
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
}
export default connect(mapStateToProps, { logout })(withRouter(Menu));