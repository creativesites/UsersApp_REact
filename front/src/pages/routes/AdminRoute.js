import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { adminRoutes } from './AdminRouteConfig';

export default class AdminRoute extends PureComponent {
    static propTypes = {

    }

    render() {
        return (
            <Switch>
                {
                    adminRoutes.map((ele, index) => {
                        const { component: Component } = ele;

                        return (
                            <Route
                                path={ele.path}
                                key={`auth-route-${index}`}
                                render={(props) => <Component {...props} {...this.props}/>}
                                exact={ele.exact} />
                        );
                    })
                }
            </Switch>
        )
    }
}
