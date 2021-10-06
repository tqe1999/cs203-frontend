import React, { Component } from "react";
import * as AmplifyAPI from "./AmplifyAPI";
import { Auth } from 'aws-amplify'
import './css/Amplify.css';

/** AmplifySample is a sample class just to test out the Amplify functions */
class AmplifySample extends Component {
    render() {
        return (
            <div>
                <button onClick={() => Auth.federatedSignIn()}>Login with Cognito Hosted UI</button>
                <button onClick={() => AmplifyAPI.testAPI()}>Always Works</button>
                <button onClick={() => AmplifyAPI.testAuthenticatedAPI()}>Authenticated Works</button>
                <button onClick={() => AmplifyAPI.returnIdToken().then(token => {
                    console.log(token);
                })}>Print Info</button>
            </div>
        );
    }
};

export default AmplifySample;
