import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { UnAuthRoute, AuthRoute, AdminRoute } from './routes';
import { Loading } from './common';
import { EventEmitter } from 'events';
import { USER_DATA, AUTH_CHANGE } from '../storage/Constant';
import { Storage } from '../storage/Storage';

export default class Root extends PureComponent {
    static propTypes = {

    }

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isLoggedIn: Storage.getUser(USER_DATA) ? true : false,
            isAdmin: false
        }

        this.eventEmitter = new EventEmitter();
    }

    componentDidMount = () => {
        const { isLoggedIn } = this.state;
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 300);
        if(isLoggedIn == true){
            let usr = Storage.getUser(USER_DATA)
            console.log('init userdata')
            console.log(usr)
            if(usr.userType === "user_management_root_user"){
                this.setState({isAdmin: true})
            }
        }
        this.eventEmitter.on(AUTH_CHANGE, ({ isLoggedIn }) => {
            this.setState({ isLoggedIn });
        })
    }

    componentWillUnmount = () => {
        this.eventEmitter.removeListener(AUTH_CHANGE, () => {

        })
    }

    render() {
        const { isLoading, isLoggedIn, isAdmin } = this.state;

        if (isLoading) {
            return <Loading />;
        }
        
        if (isLoggedIn) {
            return (
                <div>
                    <AdminRoute eventEmitter={this.eventEmitter} />
                </div>
            );
            
        }

        return (
            <div>
                <UnAuthRoute eventEmitter={this.eventEmitter} />
            </div>
        )
    }
}
