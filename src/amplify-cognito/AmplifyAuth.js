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

/** getCurrentEmail() returns the email of current user */
export async function getCurrentEmail() {
    console.log("AmplifyAuth: getCurrentEmail()");
    const user = (await Auth.currentAuthenticatedUser());
    const email = user.attributes.email;
    return email;
}

export async function createCognitoAccount(email) {
    console.log("AmplifyAuth: createCognitoAccount");

    const { user } = await Auth.signUp({
        username: email,
        password: generateRandomPassword(),
        attributes: {
            email: email
        }
    });
}

function generateRandomPassword() {
    let length = 16,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        symbols = "!@#$%^&*()-_+=",
        retVal = "";
    for (let i = 0; i < length / 2; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * charset.length));
        retVal += symbols.charAt(Math.floor(Math.random() * symbols.length))
    }
    return retVal;
}
