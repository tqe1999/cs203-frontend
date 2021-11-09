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

export async function getUserProfile() {
    console.log("AmplifyAPI: getUserProfile()");
    const apiName = 'backend-api';
    const email = await AmplifyAuth.getCurrentEmail();
    const path = '/users/email/' + email;
    const myInit = {
      headers: {
        Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
      },
    };

    return API.get(apiName, path, myInit);
}

export async function addUser(email) {
    console.log("AmplifyAPI: addUser()");
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

export async function updateUserProfile(name, telegramHandle) {
    console.log("AmplifyAPI: updateUserProfile()");
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

export async function addNewsArticle(title, description, date, url, imageUrl) {
  console.log("AmplifyAPI: addNewsArticle()");
  const apiName = 'backend-api';
  const path = '/newsArticle';
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
    body: {
      title,
      description,
      date,
      url,
      imageUrl,
    }
  };

  return API.post(apiName, path, myInit);
}

export async function addNewUser(newUser) {
  console.log("AmplifyAPI: addNewUser()");
  const apiName = 'backend-api';
  const path = '/employees';
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
    body: newUser
  };

  return API.post(apiName, path, myInit);
}

export async function deleteUser(email) {
  console.log("AmplifyAPI: deleteUser()");
  const apiName = 'backend-api';
  const path = '/employees/' + email;
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    }
  };

  return API.del(apiName, path, myInit);
}

export async function updateUser(email, updatedUser) {
  console.log("AmplifyAPI: updateUser()");
  const apiName = 'backend-api';
  const path = '/employees/' + email;
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
    body: updatedUser
  };

  return API.put(apiName, path, myInit);
}

export async function addShop(newShop) {
  console.log("AmplifyAPI: addShop()");
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

export async function deleteShop(shopName) {
  console.log("AmplifyAPI: deleteShop()");
  const apiName = 'backend-api';
  const path = '/shops/' + shopName;
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
  };

  return API.del(apiName, path, myInit);
}

export async function updateShop(shopName, updatedShop) {
  console.log("AmplifyAPI: updateShop()");
  const apiName = 'backend-api';
  const path = '/shops/' + shopName;
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
    body: updatedShop
  };

  return API.put(apiName, path, myInit);
}

export async function getEmployeesUnderCompany(company) {
  console.log("AmplifyAPI: getEmployeesUnderCompany()");
  const apiName = 'backend-api';
  const path = '/employees/' + company;
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
  };

  return API.get(apiName, path, myInit);
}

export async function getEmployeesAndAdminsUnderCompany(company) {
  console.log("AmplifyAPI: getEmployeesAndAdminsUnderCompany()");
  const apiName = 'backend-api';
  const path = '/employees/administrator/' + company;
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
  };

  return API.get(apiName, path, myInit);
}

export async function updateFootFallData() {
  console.log("AmplifyAPI: updateFootFallData()");
  const apiName = 'backend-api';
  const path = '/footfallData';
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
  };

  return API.post(apiName, path, myInit);
}

export async function updateMeasures(updatedMeasures) {
  console.log("AmplifyAPI: updateMeasures()");
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

export async function getShops() {
  console.log("AmplifyAPI: getShops()");
  const apiName = 'backend-api';
  const path = '/shops';
  const myInit = {
    headers: {
      Authorization: `Bearer ${await AmplifyAuth.returnIdToken()}`,
    },
  };

  return API.get(apiName, path, myInit);
}

export async function addTableLayout(shopConfiguration) {
  console.log("AmplifyAPI: addTableLayout()");
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
