import Amplify, { Auth, Hub, API } from 'aws-amplify'
import * as AmplifyAuth from "./AmplifyAuth";

/** AmplifyAPI contains API functions using AWS Amplify library */

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
        Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
      },
    };

    API.get(apiName, path, myInit).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error.response)
    });
}

/** gets user email */
export async function getUserInfo() {
    const user = await Auth.currentAuthenticatedUser();
    console.log('attributes:', user.attributes);
    // console.log('email', user.attributes.email)
    return user.attributes.email;
}