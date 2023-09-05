// Example GraphQL query to fetch study groups
const GET_STUDY_GROUPS = /* GraphQL */ `
  query GetStudyGroups {
    listStudyGroups {
      items {
        id
        name
        subject
        description
      }
    }
  }
`;


// Example code to populate study groups on the page
async function loadStudyGroups() {
    try {
      const response = await API.graphql({ query: GET_STUDY_GROUPS });
      const studyGroups = response.data.listStudyGroups.items;
  
      const studyGroupsContainer = document.getElementById('study-groups-container');
  
      studyGroups.forEach((group) => {
        const groupElement = document.createElement('div');
        groupElement.classList.add('study-group');
        groupElement.innerHTML = `
          <h2>${group.name}</h2>
          <p><strong>Subject:</strong> ${group.subject}</p>
          <p>${group.description}</p>
          <button onclick="joinStudyGroup('${group.id}')">Join</button>
        `;
        studyGroupsContainer.appendChild(groupElement);
      });
    } catch (error) {
      console.error('Error fetching study groups:', error);
    }
  }

  
  async function joinStudyGroup(groupId) {
    try {
      await API.graphql({
        query: /* GraphQL mutation to join a study group */,
        variables: { groupId },
      });
      // Optionally, update the UI to reflect that the user has joined the group
    } catch (error) {
      console.error('Error joining study group:', error);
    }
  }
  