import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

import { Auth } from 'aws-amplify';

async function registerUser(username, password, email) {
  try {
    await Auth.signUp({
      username,
      password,
      attributes: {
        email, // You can add additional attributes if needed
      },
    });
    console.log('User registration successful');
  } catch (error) {
    console.error('Error registering user', error);
  }
}


async function loginUser(username, password) {
    try {
      await Auth.signIn(username, password);
      console.log('User login successful');
    } catch (error) {
      console.error('Error logging in', error);
    }
  }
  

  async function logoutUser() {
    try {
      await Auth.signOut();
      console.log('User logout successful');
    } catch (error) {
      console.error('Error logging out', error);
    }
  }

  
  import { Auth } from 'aws-amplify';

  async function checkAuthenticationStatus() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log('User is authenticated:', user);
    } catch (error) {
      console.log('User is not authenticated');
    }
  }
  
