import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../store/actions/user';
import { connect } from 'react-redux';
const Menu = ({ history, logout, isAuthenticated, user }, ) => {
    const signOut = () => {
        logout(() => {
            localStorage.removeItem('jwt');
            history.push('/signin')
        })
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
                    {!isAuthenticated &&
                        <>
                            <li className={`nav-item ${history.location.pathname === "/signup" && "active"}`}>
                                <Link className="nav-link" to="/signup">SignUp</Link>
                            </li>

                            <li className={`nav-item ${history.location.pathname === "/signin" && "active"}`}>
                                <Link className="nav-link" to="/signin">SignIn</Link>
                            </li>
                        </>
                    }

                </ul>
                {isAuthenticated && <ul className="navbar-nav  mt-2 mt-lg-0 justify-content-end">
                    <li className="nav-item dropdown">
                        <Link to={`/user/${user._id}`} type="button" className="btn">{user.name}</Link>
                        <button type="button" className="btn dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {/* <span class="sr-only">Toggle Dropdown</span> */}
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
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