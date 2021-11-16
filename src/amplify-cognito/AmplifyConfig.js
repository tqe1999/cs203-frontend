import React, { Component } from "react";
import Amplify, { Auth, Hub, API } from 'aws-amplify'
import awsconfig from './.aws-config/awsconfig'
import awsauth from './.aws-config/awsauth'

/** AmplifyConfig is a class to configure AWS Amplify library 
 *  "userPoolId" and "userPoolWebClientId" are NOT sensitive
*/
class AmplifyConfig extends Component {
    componentDidMount() {
        Amplify.configure(awsconfig);
        Auth.configure({ oauth: awsauth });

        Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                    // console.log('sign in', event, data)
                    // this.setState({ user: data })
                    break
                case 'signOut':
                    // console.log('sign out')
                    // this.setState({ user: null })
                    break
            }
        });
    }

    render() {
        return (null);
    }
}

export default AmplifyConfig;
