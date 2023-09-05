// Import the necessary AWS Amplify modules and Auth from auth.js
import { Auth } from 'aws-amplify';

// Function to display user information on the profile page
async function displayUserInfo() {
    try {
        // Fetch the current authenticated user's information
        const user = await Auth.currentAuthenticatedUser();

        // Display the user's name, email, and areas of study
        document.getElementById('user-name').textContent = user.attributes.name || 'N/A';
        document.getElementById('user-email').textContent = user.attributes.email || 'N/A';
        document.getElementById('user-study-areas').textContent = user.attributes['custom:study_areas'] || 'N/A';

        // Display the user's profile picture if available
        const profilePic = document.getElementById('user-profile-pic');
        if (user.attributes.picture) {
            profilePic.src = user.attributes.picture;
            profilePic.style.display = 'block';
        } else {
            profilePic.style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching user information:', error);
    }
}

// Function to update user profile information
async function updateUserProfile(newName, newEmail, newStudyAreas, newProfilePic) {
    try {
        // Fetch the current authenticated user
        const user = await Auth.currentAuthenticatedUser();

        // Update the user's attributes
        const updatedAttributes = {
            name: newName,
            email: newEmail,
            'custom:study_areas': newStudyAreas,
        };

        // If a new profile picture is provided, update the 'picture' attribute
        if (newProfilePic) {
            updatedAttributes.picture = newProfilePic;
        }

        // Update the user's attributes in Cognito
        await Auth.updateUserAttributes(user, updatedAttributes);

        // Display a success message
        console.log('User profile updated successfully');

        // Refresh the displayed user information
        displayUserInfo();
    } catch (error) {
        console.error('Error updating user profile:', error);
    }
}

// Add event listener for the profile form submission
document.getElementById('edit-profile-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newName = document.getElementById('new-name').value;
    const newEmail = document.getElementById('new-email').value;
    const newStudyAreas = document.getElementById('new-study-areas').value;
    const newProfilePicFile = document.getElementById('new-profile-pic').files[0];

    // Convert the profile picture file to a data URL (base64) for storage
    let newProfilePic = null;
    if (newProfilePicFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
            newProfilePic = event.target.result;
            // Call the function to update user profile
            updateUserProfile(newName, newEmail, newStudyAreas, newProfilePic);
        };
        reader.readAsDataURL(newProfilePicFile);
    } else {
        // If no new profile picture is selected, update the profile without it
        updateUserProfile(newName, newEmail, newStudyAreas, newProfilePic);
    }
});

// Add event listener for the "Logout" button
document.getElementById('logout-button').addEventListener('click', async () => {
    try {
        // Call the logout function from auth.js
        await logoutUser();
        // Redirect to the login page or perform other actions after logout
    } catch (error) {
        console.error('Error logging out:', error);
    }
});

// Display user information when the page loads
displayUserInfo();
