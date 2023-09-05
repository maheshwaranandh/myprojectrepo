// Import the Auth module from aws-amplify
import { Auth } from 'aws-amplify';

// Function to log in a user
async function loginUser(username, password) {
  try {
    // Use Amplify Auth.signIn to authenticate the user
    await Auth.signIn(username, password);

    console.log('User login successful');

    // You can add redirection or other actions here after successful login
    // Example: window.location.href = 'main.html'; // Redirect to the main page
  } catch (error) {
    console.error('Error logging in', error);
    // Handle the login error, display an error message, etc.
  }
}

// Add an event listener for the login form submission
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  await loginUser(username, password);
  // Redirect to the main page or perform other actions after login
});
