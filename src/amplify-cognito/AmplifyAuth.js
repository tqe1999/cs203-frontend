import Amplify, { Auth, Hub, API } from 'aws-amplify'

/** AmplifyAuth contains Authentication functions using AWS Amplify library */

/** federatedSignIn() directs the user to Cognito Hosted UI sign-in */
export async function federatedSignIn() {
    console.log("AmplifyAuth: federatedSignIn()");
    Auth.federatedSignIn();
}

/** signOut() signs the user out */
export async function signOut() {
    console.log("AmplifyAuth: signOut()");
    Auth.signOut();
}

/** returnIdToken() returns the AWS Cognito idToken */
export async function returnIdToken() {
    console.log("AmplifyAuth: returnIdToken()");
    const idToken = (await Auth.currentSession()).getIdToken().getJwtToken();
    return idToken;
}