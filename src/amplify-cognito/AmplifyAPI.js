import Amplify, { Auth, Hub, API } from 'aws-amplify'

/** AmplifyAPI is a collection of API functions using AWS Amplify library */

/** returnIdToken() returns the AWS Cognito idToken */
export async function returnIdToken() {
    console.log("Function called: returnIdToken()");
    const idToken = (await Auth.currentSession()).getIdToken().getJwtToken();
    return idToken;
}

/** testAPI() calls backend API endpoint that does not require authentication */
export function testAPI() {
    console.log("Function called: testAPI()");
    const apiName = 'backend';
    const path = '/cognito/all-allow';
    API.get(apiName, path).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error.response)
    });
}

/** testAPI() calls backend API endpoint that requires authentication */
export async function testAuthenticatedAPI() {
    console.log("Function called: testAuthenticatedAPI()");
    const apiName = 'backend';
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
