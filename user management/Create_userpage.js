const createUser = document.querySelector('#create-user-section');
const viewUser = document.querySelector('#view-users-section');
const updateUser = document.querySelector('#update-user-section');
const successMessage = document.querySelector('#success-message');
const updateSuccessMessage = document.querySelector('#update-success-message');
const selectUser = document.querySelector('#select-user');
const updateForm = document.querySelector('#update-user-form');
const updateUsername = document.querySelector('#update-username');
const updateEmail = document.querySelector('#update-email');
const updateFirstName = document.querySelector('#update-first-name');
const updateLastName = document.querySelector('#update-last-name');
const updateIndexInput = document.querySelector('#update-index');
const deleteMsg = document.querySelector('#deletemsg');
const createGroupSection = document.querySelector('#create-group-section');
const viewGroupsSection = document.querySelector('#view-groups-section');
const RoleManagementSection = document.querySelector('#role-management-section');
let users = [];
let groups = [];

// Load users and section state on page load
document.addEventListener('DOMContentLoaded', () => {
  loadUsers();
  restoreSectionState();
  populateUserSelect();  // Ensure dropdown is populated after users are loaded
  displayUsers();        // Ensure user list is displayed with current data
  populateGroupSelect();
  populateUpdateForm();
   // Ensure group dropdowns are populated
});

// Save users to localStorage
function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

// Load users from localStorage
function loadUsers() {
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  users = [...storedUsers];
}

// Save groups to localStorage
function saveGroups() {
  localStorage.setItem('groups', JSON.stringify(groups));
}

// Load groups from localStorage
function loadGroups() {
  const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
  groups = [...storedGroups];
}

// Save the current section state to localStorage
function saveSectionState(section) {
  localStorage.setItem('currentSection', section);
}

// Restore the section state on page load
function restoreSectionState() {
  const currentSection = localStorage.getItem('currentSection');
  if (currentSection === 'view') {
      showViewUsers();
  } else if (currentSection === 'update') {
      showUpdateUser();
  } else if (currentSection === 'createGroup') {
      showCreateGroup();
  } else if (currentSection === 'viewGroups') {
      showViewGroups();
  } else if (currentSection === 'roleManagement') {
      showRoleManagement(); // New case for Role Management
  } else {
      showCreateUser();
  }
}

// Show Create User section
function showCreateUser() {
  createUser.style.display = 'block';
  viewUser.style.display = 'none';
  updateUser.style.display = 'none';
  createGroupSection.style.display = 'none';
  viewGroupsSection.style.display = 'none';
  RoleManagementSection.style.display = 'none';
  saveSectionState('create');
}

// Show View Users section
function showViewUsers() {
  createUser.style.display = 'none';
  viewUser.style.display = 'block';
  updateUser.style.display = 'none';
  createGroupSection.style.display = 'none';
  viewGroupsSection.style.display = 'none';
  RoleManagementSection.style.display = 'none';
  displayUsers();
  saveSectionState('view');
}

// Show Update User section
function showUpdateUser() {
  createUser.style.display = 'none';
  viewUser.style.display = 'none';
  updateUser.style.display = 'block';
  createGroupSection.style.display = 'none';
  viewGroupsSection.style.display = 'none';
  RoleManagementSection.style.display = 'none';
  populateUserSelect();  // Ensure dropdown is populated
  saveSectionState('update');
}

// Show Create Group section
function showCreateGroup() {
  createUser.style.display = 'none';
  viewUser.style.display = 'none';
  updateUser.style.display = 'none';
  createGroupSection.style.display = 'block';
  viewGroupsSection.style.display = 'none';
  RoleManagementSection.style.display = 'none';
  loadGroups(); // Load groups to populate the select dropdowns
  saveSectionState('createGroup');
}

// Show View Groups section
function showViewGroups() {
  createUser.style.display = 'none';
  viewUser.style.display = 'none';
  updateUser.style.display = 'none';
  createGroupSection.style.display = 'none';
  viewGroupsSection.style.display = 'block';
  RoleManagementSection.style.display = 'none';
  saveSectionState('viewGroups');
}

// Show Role Management section
function showRoleManagement() {
  createUser.style.display = 'none';
  viewUser.style.display = 'none';
  updateUser.style.display = 'none';
  createGroupSection.style.display = 'none';
  viewGroupsSection.style.display = 'none';
  RoleManagementSection.style.display = 'block'; // Show Role Management section
  saveSectionState('roleManagement'); // Save the state
}

// Handle form submission for creating a user
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;

  // Trim and validate fields
  const username = form.querySelector('#username').value.trim();
  const email = form.querySelector('#email').value.trim();
  const firstName = form.querySelector('#first-name').value.trim();
  const lastName = form.querySelector('#last-name').value.trim();

  if (!username || !email || !firstName || !lastName) {
      alert('All fields are required and cannot be empty spaces.');
      return;
  }

  const newUser = { username, email, firstName, lastName };
  users.push(newUser);
  saveUsers();
  successMessage.style.display = 'block';
  setTimeout(() => successMessage.style.display = 'none', 3000);
  form.reset();
  localStorage.removeItem('createFormState');
  displayUsers();
  populateUserSelect(); // Update dropdown with new user
}

// Handle form submission for updating a user
function handleUpdateSubmit(event) {
  event.preventDefault();

  const selectedIndex = parseInt(selectUser.value, 10);
  if (selectedIndex >= 0 && selectedIndex < users.length) {
      users[selectedIndex] = {
          username: updateUsername.value,
          email: updateEmail.value,
          firstName: updateFirstName.value,
          lastName: updateLastName.value
      };
      
      saveUsers();

      // Show success message
      updateSuccessMessage.style.display = 'block';
      setTimeout(() => {
          updateSuccessMessage.style.display = 'none';
      }, 3000);

      // Refresh user list and dropdown
      displayUsers();
      populateUserSelect();
  } else {
      console.error('Selected index is out of bounds.');
  }
}

// Handle form submission for creating a group
function handleCreateGroupSubmit(event) {
  event.preventDefault();
  const form = event.target;

  const groupName = form.querySelector('#group-name').value.trim();

  if (!groupName) {
    alert('Group Name is required.');
    return;
  }

  const newGroup = { name: groupName };
  groups.push(newGroup);
  saveGroups();
  document.querySelector('#create-group-success').style.display = 'block';
  setTimeout(() => document.querySelector('#create-group-success').style.display = 'none', 3000);
  form.reset();
  populateGroupSelect(); // Update dropdown with new group
}

// Handle form submission for adding users to a group
function handleAddUsersToGroupSubmit(event) {
  event.preventDefault();
  const form = event.target;

  const selectedGroupIndex = form.querySelector('#group-select').value;
  const selectedUsers = Array.from(form.querySelector('#user-select').selectedOptions).map(option => option.value);

  if (selectedGroupIndex === '' || selectedUsers.length === 0) {
    alert('Both Group and Users are required.');
    return;
  }

  const groupIndex = parseInt(selectedGroupIndex, 10);
  const group = groups[groupIndex];
  
  if (!group) {
    console.error('Selected group does not exist.');
    return;
  }

  group.users = group.users || []; // Ensure users array is initialized
  
  selectedUsers.forEach(userIndex => {
    const user = users[userIndex];
    if (user && !group.users.includes(user)) {
      group.users.push(user);
    }
  });

  saveGroups();
  document.querySelector('#add-users-success').style.display = 'block';
  setTimeout(() => document.querySelector('#add-users-success').style.display = 'none', 3000);
  form.reset();
  displayGroups(); // Refresh the group list to show updated user assignments
}


// Populate the user select dropdown with options
function populateUserSelect() {
  const selectUser = document.getElementById('select-user');
  selectUser.innerHTML = '<option value="">Select a user</option>'; // Reset options
  users.forEach((user, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = user.username;
      selectUser.appendChild(option);
  });
}

// Populate the group select dropdowns with options
function populateGroupSelect() {
  const groupSelect = document.getElementById('group-select');
  const userSelect = document.getElementById('user-select');
  groupSelect.innerHTML = '<option value="">Select a group</option>'; // Reset options
  userSelect.innerHTML = ''; // Reset options

  groups.forEach((group, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = group.name;
      groupSelect.appendChild(option);
  });

  users.forEach((user, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = user.username;
      userSelect.appendChild(option);
  });
}
// Populate the update form with selected user details
function populateUpdateForm() {
  const selectedIndex = parseInt(selectUser.value, 10);
  const selectedUser = users[selectedIndex] || {};

  updateUsername.value = selectedUser.username || '';
  updateEmail.value = selectedUser.email || '';
  updateFirstName.value = selectedUser.firstName || '';
  updateLastName.value = selectedUser.lastName || '';
}


// Display users in the table
function displayUsers() {
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';
  users.forEach((user, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${user.firstName}</td>
          <td>${user.lastName}</td>
          <td>
              <button onclick="deleteUser(${index})" class="delete-button"><i class="fa-regular fa-trash-can"></i></button>
          </td>
      `;
      userList.appendChild(row);
  });
}

// Delete a user with confirmation
function deleteUser(index) {
  if (index >= 0 && index < users.length) {
      const confirmed = window.confirm('Are you sure you want to delete this user?');

      if (confirmed) {
          users.splice(index, 1);
          localStorage.setItem('users', JSON.stringify(users)); // Save updated users
          deleteMsg.textContent = 'User deleted successfully!';
          deleteMsg.style.visibility = 'visible';
          setTimeout(() => deleteMsg.style.visibility = 'hidden', 3000);
          displayUsers(); // Update the display
          populateUserSelect(); // Update dropdown after deletion
      }
  }
}

// Add event listeners to the forms
document.querySelector('#create-groupsection-form').addEventListener('submit', handleCreateGroupSubmit);
document.querySelector('#add-users-form').addEventListener('submit', handleAddUsersToGroupSubmit);

module.exports = {
  saveUsers,
  loadUsers,
  saveGroups,
  loadGroups,
  saveSectionState,
  restoreSectionState,
  showCreateUser,
  showViewUsers,
  showUpdateUser,
  showCreateGroup,
  showViewGroups,
  showRoleManagement,
  handleSubmit,
  handleUpdateSubmit,
  handleCreateGroupSubmit,
  handleAddUsersToGroupSubmit,
  displayUsers,
  deleteUser,
  populateUpdateForm,
  populateUserSelect,
  populateGroupSelect
};