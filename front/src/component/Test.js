import React, { Component } from 'react'
import { Test1 } from '.';
import '../App.css'

export default class Test extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: []
        }

        this.test1Ref = {};

        this.requestBody = {
            ctk_email: "",
            ctk_password: ""
        }
    }

    onPress = () => {
        this.setState(function (prevState) {
            return ({
                like: prevState.like + 1
            });
        });
    }

    onChangeText = (e) => {
        this.requestBody[e.target.name] = e.target.value;
    }

    /** On submit */
    submit = (e) => {
        e.preventDefault();

        this.validate(Object.keys(this.requestBody), this.requestBody, (status, response) => {
            if(status){

                this.setState({ errors: [] });
            }else {
                this.setState({
                    errors: response
                });
            }
        });
    }

    _validateEmail = (value) => {
        var pattern = RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return pattern.test(value);
    }

    getError = (key) => {
        const { errors } = this.state;

        if(!errors || (errors && !errors.length)) return;

        const index = errors.findIndex(ele => ele.fieldName.toLowerCase() === key.toLowerCase());

        if(index === -1) return {};

        return errors[index];
    }

    validate = (keys, requestBody, cb) => {
        const emptyFields = [];

        if (!keys || (keys && !keys.length)) return;

        keys.forEach((ele, index) => {

            switch (ele) {
                case 'ctk_email':
                    if (requestBody[ele] && !this._validateEmail(requestBody[ele])) {
                        emptyFields.push({
                            fieldName: ele,
                            message: "Email is invalid."
                        });
                    }
                    break;
            }

            if (!requestBody[ele]) {
                const index = emptyFields.findIndex(value => value.fieldName.toLowerCase() === ele.toLowerCase());

                if (index === -1)
                    emptyFields.push({
                        fieldName: ele,
                        message: "Field is required."
                    })
            }
        });

        cb(emptyFields.length ? false : true, emptyFields);
    }



    render() {

        return (
            <div className="ctk-wrapper">
                <div className="ctk-sub-container">
                    {/* <input type="text" placeholder="Enter email" />
                    <input type="text" placeholder="Enter password" /> */}
                    <form onSubmit={this.submit.bind(this)}>
                        <Test1
                            onChange={this.onChangeText}
                            name={"ctk_email"}
                            error={this.getError('ctk_email')}
                            placeholder={"Enter email"} />
                        <Test1
                            type={"password"}
                            name={"ctk_password"}
                            error={this.getError("ctk_password")}
                            onChange={this.onChangeText}
                            placeholder={"Enter password"} />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}