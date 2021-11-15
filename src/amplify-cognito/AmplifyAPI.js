import Amplify, { Auth, Hub, API } from 'aws-amplify'
import * as AmplifyAuth from "./AmplifyAuth";

/** AmplifyAPI contains API functions using AWS Amplify library */

/** testAPI() calls backend API endpoint that does not require authentication */
export function testAPI() {
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

/** gets user details for the current logged in user */
export async function getUser() {
    const apiName = 'backend-api';
    const email = await AmplifyAuth.getCurrentEmail();
    const path = '/users/' + email;
    const myInit = {
      headers: {
        Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
      },
    };

    return API.get(apiName, path, myInit);
}

/** adds new user */
export async function addUser(email) {
    const apiName = 'backend-api';
    const path = '/users';
    const myInit = {
      headers: {
        Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
      },
      body: {
        email: email,
      }
    };

    return API.post(apiName, path, myInit);
}

/** update user profile */
export async function updateUserProfile(name, telegramHandle) {
    const apiName = 'backend-api';
    const email = await AmplifyAuth.getCurrentEmail();
    const path = '/users/email/' + email;
    const myInit = {
      headers: {
        Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
      },
      body: {
          name: name,
          telegramHandle: telegramHandle,
      }
    };

    return API.put(apiName, path, myInit);
}

/** adds news articles */
export async function addNewsArticle(newArticle) {
  const apiName = 'backend-api';
  const path = '/newsArticle';
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
    body: newArticle
  };

  return API.post(apiName, path, myInit);
}

/** add new user (supervisor or employee) */
export async function addNewUser(newUser) {
  const apiName = 'backend-api';
  const path = '/users';
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
    body: newUser
  };

  return API.post(apiName, path, myInit);
}

/** deletes user  */
export async function deleteUser(email) {
  const apiName = 'backend-api';
  const path = '/users/' + email;
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    }
  };

  return API.del(apiName, path, myInit);
}

/** updates user */
export async function updateUser(email, updatedUser) {
  const apiName = 'backend-api';
  const path = '/users/' + email;
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
    body: updatedUser
  };

  return API.put(apiName, path, myInit);
}

/** adds shop */
export async function addShop(newShop) {
  const apiName = 'backend-api';
  const path = '/shops';
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
    body: newShop
  };

  return API.post(apiName, path, myInit);
}

/** deletes shop */
export async function deleteShop(shopID) {
  const apiName = 'backend-api';
  const path = '/shops/' + shopID;
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
  };

  return API.del(apiName, path, myInit);
}

/** updates existing shop */
export async function updateShop(shopID, updatedShop) {
  const apiName = 'backend-api';
  const path = '/shops/' + shopID;
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
    body: updatedShop
  };

  return API.put(apiName, path, myInit);
}

/** get users by the shop they work at and authority type */
export async function getByShopIdAndAuthorities(id, authorities) {
  const apiName = 'backend-api';
  const path = '/users/id/' + id + '/authorities/' + authorities;
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
  };

  return API.get(apiName, path, myInit);
}

/** gets users by authority type */
export async function getByAuthorities(authorities) {
  const apiName = 'backend-api';
  const path = '/users/authorities/' + authorities;
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
  };

  return API.get(apiName, path, myInit);
}

/** update footfall data */
export async function updateFootFallData() {
  const apiName = 'backend-api';
  const path = '/footfallData';
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
  };

  return API.post(apiName, path, myInit);
}

/** updates measures */
export async function updateMeasures(updatedMeasures) {
  const apiName = 'backend-api';
  const path = '/measures';
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
    body: updatedMeasures
  };

  return API.put(apiName, path, myInit);
}

/** gets shops */
export async function getShops() {
  const apiName = 'backend-api';
  const path = '/shops';
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
  };

  return API.get(apiName, path, myInit);
}

/** posts table layout request */
export async function addTableLayout(shopConfiguration) {
  const apiName = 'backend-api';
  const path = '/tablelayout/';
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
    body: shopConfiguration
  };

  return API.post(apiName, path, myInit);
}
