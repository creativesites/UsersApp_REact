import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Footer extends PureComponent {
    static propTypes = {

    }

    render() {
        return (
            <footer className="main-footer">
                <div className="pull-right hidden-xs">
                    <b>Version</b> 0.01
                </div>
            </footer>
        )
    }
}
