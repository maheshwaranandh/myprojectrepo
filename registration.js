// Import the Auth module from aws-amplify
import { Auth } from 'aws-amplify';

// Function to register a new user
async function registerUser(username, password, email) {
  try {
    // Use Amplify Auth.signUp to register the user
    const signUpResponse = await Auth.signUp({
      username,
      password,
      attributes: {
        email, // You can add additional attributes if needed
      },
    });

    console.log('User registration successful', signUpResponse);

    // You can add redirection or other actions here after successful registration
    // Example: window.location.href = 'login.html'; // Redirect to the login page
  } catch (error) {
    console.error('Error registering user', error);
    // Handle the registration error, display an error message, etc.
  }
}

// Add an event listener for the registration form submission
document.getElementById('registration-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;
  await registerUser(username, password, email);
  // Redirect to the login page or perform other actions after registration
});
