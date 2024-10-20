import React, { Component } from 'react';
    import { Redirect } from "react-router";
    
    export default class Reedirect extends Component {
        state = {
            redirect: false
        }
        redirectHandler = () => {
            this.setState({ redirect: true })
            this.renderRedirect();
        }
        renderRedirect = () => {
            if (this.state.redirect) {
                return <Redirect to='/' />
            }
        }
        render() {
            return (
                <>
                    <button onClick={this.redirectHandler}>click me</button>
                    {this.renderRedirect()}
                </>
            )
        }
    }