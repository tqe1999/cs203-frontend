import Amplify, { Auth, Hub, API } from 'aws-amplify'

/** AmplifyAPI is a collection of API functions using AWS Amplify library */

/** federatedSignIn() directs the user to Cognito Hosted UI sign-in */
export async function federatedSignIn() {
    console.log("AmplifyAPI: federatedSignIn()");
    Auth.federatedSignIn();
}

/** signOut() signs the user out */
export async function signOut() {
    console.log("AmplifyAPI: signOut()");
    Auth.signOut();
}

/** returnIdToken() returns the AWS Cognito idToken */
export async function returnIdToken() {
    console.log("AmplifyAPI: returnIdToken()");
    const idToken = (await Auth.currentSession()).getIdToken().getJwtToken();
    return idToken;
}

/** testAPI() calls backend API endpoint that does not require authentication */
export function testAPI() {
    console.log("AmplifyAPI: testAPI()");
    const apiName = 'backend-api';
    const path = '/cognito/all-allow';
    API.get(apiName, path).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error.response)
    });
}

/** testAPI() calls backend API endpoint that requires authentication */
export async function testAuthenticatedAPI() {
    console.log("AmplifyAPI: testAuthenticatedAPI()");
    const apiName = 'backend-api';
    const path = '/cognito/only-authenticated';
    const myInit = { 
      headers: { 
        Authorization: `Bearer ${await returnIdToken()}`,
      },
    };

    API.get(apiName, path, myInit).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error.response)
    });
}
