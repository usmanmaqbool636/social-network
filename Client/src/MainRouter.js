import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/pages/Home';
import SignUp from './components/pages/user/Signup';
import Signin from './components/pages/user/Signin';
import Menu from './components/menu';
import Profile from './components/pages/user/Profile';
import Users from './components/pages/user/Users';
import EditProfile from './components/pages/user/EditProfile';
const MainRouter = () => {
    useEffect(() => {
        
    })
    return (
        <div>
            <Menu />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/user/:userId" component={Profile} />
                <Route exact path="/user/edit/:userId" component={EditProfile} />

                <Redirect to="/" />

            </Switch>
        </div>
    )
}
export default MainRouter;