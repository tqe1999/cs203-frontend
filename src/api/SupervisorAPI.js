import * as AmplifyAuth from "../amplify-cognito/AmplifyAuth";
import Amplify, { Auth, Hub, API } from 'aws-amplify'


export async function updateUsersInCompany(name) {
    console.log("AmplifyAPI: updateUserProfile()");
    const apiName = 'backend-api';
    // const email = await AmplifyAuth.getCurrentEmail();
    const path = '/users/email/' + "KFC";
    const myInit = {
      headers: {
        // Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
      },
      body: {
          name: name,
      }
    };

    return API.put(apiName, path, myInit);
}