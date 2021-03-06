import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Header, Footer, NotFoundPage } from '../common';
import SideBar from '../common/SideBar';
import NonAdminSideBar from '../common/NonAdminSideBar';
import { EditProfile, Users, Profile } from '.';
import { Route, Link, Switch } from 'react-router-dom'
import { USER_PROFILE, ADD_USER, USER_LIST, EDIT_PROFILE } from '../../storage/Constant';

const routes = [
    {
        path: "/",
        exact: true,
        main: (props) => <Profile {...props} screenType={USER_PROFILE}/>
    },
    
    {
        path: "/user/edit/:userId",
        exact: true,
        main: (props) => <EditProfile {...props} screenType={EDIT_PROFILE}/>
    },
    {
        path: "*",
        main: () => <NotFoundPage />
    }
];

export default class NoneAdmin extends PureComponent {
    static propTypes = {

    }

    render() {
        const { match: { url } } = this.props;
        console.log("match ===> ", this.props);
        return (
            <div className="hold-transition skin-blue sidebar-mini">
                <div className="wrapper">
                    {/* Header start */}
                   
                    {/* Header End */}

                    {/* Sidebar start */}
                    <NonAdminSideBar
                        {...this.props}
                    />
                    {/* Sidebar end */}

                    {/* Dynamic pages start */}
                    <div className="content-wrapper">
                        <Switch>
                            {routes.map((route, index) => {
                                const { main: Component } = route;

                                return (
                                    <Route
                                        key={`home-route-${index}`}
                                        path={`${url}${route.path}`}
                                        exact={route.exact}
                                        render={(props) => <Component {...props} />}
                                    />
                                )
                            }
                            )}
                        </Switch>
                    </div>
                    {/* Dynamic pages end */}

                    {/* Footer start */}
                    <Footer />
                    {/* Footer end */}

                    
                </div>
            </div>
        )
    }
}
