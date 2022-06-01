import React, { Component } from 'react'
import PropTyeps from 'prop-types'

export default class Test1 extends Component {

    static propTypes = {
        type: PropTyeps.string,
        placeholder: PropTyeps.string,
        name: PropTyeps.string,
        onChange: PropTyeps.func,
        error: PropTyeps.oneOfType([PropTyeps.object, PropTyeps.string])
    }

    static defaultProps = {
        type: "text",
        placeholder: "Enter value"
    }

    showMessage = () => {
        const { error } = this.props;

        if(!error || (error && !error.message)) return null;
        
        return <p className="ctk-form-error">{error.message}</p>
    }

    render() {
        const { type, placeholder, onChange, name } = this.props;

        return (
            <div className="ctk-form-input-wrapper">
                <input type={type} placeholder={placeholder} onChange={onChange} name={name} />
                {
                    this.showMessage()
                }
            </div>
        )
    }
}