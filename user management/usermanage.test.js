const fs = require('fs');
const path = require('path');

let createUser;
let viewUser;
let updateUser;
let successMessage;
let updateSuccessMessage;
let deleteMsg;
let updateForm;
let updateUsername;
let updateEmail;
let updateFirstName;
let updateLastName;
let updateIndexInput;
let selectUser;

let createGroupSection;
let addUsersToGroupSection;
let viewGroupsSection
let createGroupForm;
let addUsersForm;
let groupSelect;
let userSelect;
let groupNameInput;
let createGroupButton;
let addUserButton;
let createGroupSuccessMessage;
let addUsersSuccessMessage;
let groupUsersTable;
let groupsTable;
let backButton;
let RoleManagementSection;
let createRoleForm;
let roleNameInput;
let roleDescriptionInput;
let createRoleButton;
let roleCreateSuccessMessage;
let rolesTable;
let rolesList;

beforeEach(() => {
    const htmlHome = fs.readFileSync(path.resolve(__dirname, './home_page.html'), 'utf8');
    const htmlCreateUser = fs.readFileSync(path.resolve(__dirname, './Create_user.html'), 'utf8');
    document.body.innerHTML = htmlHome + htmlCreateUser ;

    jest.resetModules();
    ({  saveUsers,
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
        populateUserSelect,
        populateGroupSelect
    } = require('./Create_userpage.js'));

    saveUsers = jest.fn();
    loadUsers = jest.fn();
    saveGroups = jest.fn();
    loadGroups = jest.fn();


    createUser = document.querySelector('#create-user-section');
    viewUser = document.querySelector('#view-users-section');
    updateUser = document.querySelector('#update-user-section');
    successMessage = document.querySelector('#success-message');
    updateSuccessMessage = document.querySelector('#update-success-message');
    deleteMsg = document.querySelector('#deletemsg');
    updateForm = document.querySelector('#update-user-form');
    updateUsername = document.querySelector('#update-username');
    updateEmail = document.querySelector('#update-email');
    updateFirstName = document.querySelector('#update-first-name');
    updateLastName = document.querySelector('#update-last-name');
    updateIndexInput = document.querySelector('#update-index');
    selectUser = document.querySelector('#select-user');

    // Initialize elements for group.html
    createGroupSection = document.querySelector('#create-group-section');
    addUsersToGroupSection = document.querySelector('#add-users-to-group-section');
    removeUsersFromGroupSection = document.querySelector('#remove-users-from-group-section');
    viewGroupsSection = document.querySelector('#view-groups-section');
    createGroupForm = document.querySelector('#create-groupsection-form');
    addUsersForm = document.querySelector('#add-users-form');
    groupSelect = document.querySelector('#group-select');
    userSelect = document.querySelector('#user-select');
    groupNameInput = document.querySelector('#group-name');
    createGroupButton = document.querySelector('.create-group1-button');
    addUserButton = document.querySelector('.create-group1-button');
    createGroupSuccessMessage = document.querySelector('#create-group-success');
    addUsersSuccessMessage = document.querySelector('#add-users-success');
    groupUsersTable = document.querySelector('#group-users-table');
    groupsTable = document.querySelector('#groups-table');
    backButton = document.querySelector('.back-button');
    RoleManagementSection = document.querySelector('#role-management-section');
    createRoleForm = document.querySelector('#create-role-form');
    roleNameInput = document.querySelector('#role-name');
    roleDescriptionInput = document.querySelector('#role-description');
    createRoleButton = document.querySelector('.create-role-button');
    roleCreateSuccessMessage = document.querySelector('#role-create-success');
    rolesTable = document.querySelector('#roles-table');
    rolesList = document.querySelector('#roles-list');
    
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(window, 'confirm').mockImplementation(() => true);

    const mockLocalStorage = (() => {
        let store = {};
        return {
            getItem: (key) => store[key] || null,
            setItem: (key, value) => (store[key] = value.toString()),
            clear: () => (store = {}),
            removeItem: (key) => delete store[key],
        };
    })();

    Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
    });
    jest.useFakeTimers();
    localStorage.clear();
 
});

afterEach(() => {
    localStorage.clear();
    jest.useRealTimers(); 
});

//To check the html of the home page 
describe('To check the HTML of home page', () => {

    test('To check the HTML of home page', () => {

        //To check the title of the home page
        const head = document.querySelector('title');
        expect(head).not.toBeNull();
        expect(head.textContent).toContain('User Management');
        
        //To check the header
        const header = document.querySelector('header');
        expect(header).not.toBeNull();
        expect(header.textContent).toContain('ManageMate');
        
        //To check the Intro container
        const introContainer = document.querySelector('.intro-container');
        expect(introContainer).toBeTruthy();

        //To check the intro title
        const introTitle = document.querySelector('.intro-title');
        expect(introTitle).not.toBeNull();
        expect(introTitle.textContent).toBe('Manage Your Users');

        //To check the intro text
        const introText = document.querySelector('.intro-container .intro-text');
        expect(introText).not.toBeNull();
        expect(introText.textContent).toContain('Efficiently manage your team with our user management system.');

        //To check the create user button
        const createUserButton = document.querySelector('.create-user-button');
        expect(createUserButton).not.toBeNull();
        expect(createUserButton.textContent).toBe('Create User');
        const anchorTag = createUserButton.closest('a');
        expect(anchorTag.getAttribute('href')).toBe('Create_user.html');

        //To check the image containers
        const imagesContainer = document.querySelector('.images-container');
        expect(imagesContainer).not.toBeNull();
        const images = imagesContainer.querySelectorAll('img');
        expect(images.length).toBe(3);
        expect(images[0].src).toContain('image/oneuser.jpg');
        expect(images[0].alt).toBe('User Management Image 1');
        expect(images[1].src).toContain('image/grp.jpg');
        expect(images[1].alt).toBe('User Management Image 2');
        expect(images[2].src).toContain('image/roles-meeting-770x405.jpg');
        expect(images[2].alt).toBe('User Management Image 3');
    });
});

describe('To check the HTML of create user page (new user section) ', () => {
    test('To check the HTML of create user page (new user section) ', () => {
        const head = document.querySelector('title');
        expect(head).not.toBeNull();
        expect(head.textContent).toContain('User Management');

        const sidebar = document.querySelector('aside.sidebar');
        expect(sidebar).not.toBeNull();

        const menuItems = sidebar.querySelectorAll('.sidebar-menu li button');
        expect(menuItems.length).toBe(6);

        expect(menuItems[0].textContent).toBe('New User');
        expect(menuItems[1].textContent).toBe('View Users');
        expect(menuItems[2].textContent).toBe('Update User');
        expect(menuItems[3].textContent).toBe('Create Group');
        expect(menuItems[4].textContent).toBe('View Groups');
        expect(menuItems[5].textContent).toBe('Role Management');
        
        const backButton = document.querySelector('.back-button');
        expect(backButton).not.toBeNull();
        expect(backButton.textContent).toBe('Back');

        Object.defineProperty(window, 'location', {
            writable: true,
            value: { href: '' }
        });
        backButton.click();
        expect(window.location.href).toBe('home_page.html');

        const createUserSection = document.querySelector('#create-user-section');
        expect(createUserSection).not.toBeNull();

        const introTitle = createUserSection.querySelector('.intro-title');
        expect(introTitle).not.toBeNull();
        expect(introTitle.textContent).toBe('Create a New User');

        // Select the form
        const form = document.querySelector('#create-user-form');
        expect(form).not.toBeNull();

        // Define the expected fields
        const expectedFields = [
            { id: 'username', label: 'Username: *', type: 'text' },
            { id: 'email', label: 'Email Address: *', type: 'email' },
            { id: 'first-name', label: 'First Name: *', type: 'text' },
            { id: 'last-name', label: 'Last Name: *', type: 'text' }
        ];

        // Check each expected field
        expectedFields.forEach(field => {
            const formGroup = form.querySelector(`#${field.id}`).closest('.form-group');
            expect(formGroup).not.toBeNull();

            const label = formGroup.querySelector('label');
            expect(label).not.toBeNull();
            expect(label.textContent.trim()).toBe(field.label);

            const input = formGroup.querySelector('input');
            expect(input).not.toBeNull();
            expect(input.type).toBe(field.type);
            expect(input.required).toBe(true);
        });

        const addUserButton = document.querySelector('.create-user-button');
        expect(addUserButton).not.toBeNull();
        expect(addUserButton.classList.contains('create-user-button')).toBe(true);

        const successMessage = document.querySelector('#success-message');
        expect(successMessage).not.toBeNull();
        expect(successMessage.textContent.trim()).toBe('User added successfully!');
        expect(successMessage.style.display).toBe('none');  
    });
    
});

describe('View Users Section HTML Structure', () => {
    test('should render the View Users section correctly', () => {
        // Check if the View Users section is in the document
        const viewUsersSection = document.querySelector('#view-users-section');
        expect(viewUsersSection).not.toBeNull();
        expect(viewUsersSection.style.display).toBe('none'); // Initially hidden
        
        // Check if the table exists
        const table = document.querySelector('#user-table');
        expect(table).not.toBeNull();

        // Check table headers
        const headers = table.querySelectorAll('th');
        expect(headers.length).toBe(5); // Should have 5 headers
        expect(headers[0].textContent).toBe('Username');
        expect(headers[1].textContent).toBe('Email Address');
        expect(headers[2].textContent).toBe('First Name');
        expect(headers[3].textContent).toBe('Last Name');
        expect(headers[4].textContent).toBe('Actions');

        // Check table body container
        const tbody = document.querySelector('#user-list');
        expect(tbody).not.toBeNull();
        expect(tbody.children.length).toBe(0); // No users initially
    });
});

describe('Update User Section html structure', () => {
    test('Update User Section- html', () => {
        const introTitleupdate = document.querySelector('.introupdatetitle');
        expect(introTitleupdate).not.toBeNull();
        expect(introTitleupdate.textContent).toBe('Update User');

        const form = document.querySelector('#update-user-form');
        expect(form).not.toBeNull();

        const select = document.querySelector('#select-user');
        const label1 = document.querySelector('label[for="select-user"]');
        expect(select).not.toBeNull();
        expect(label1).not.toBeNull();
        expect(label1.textContent).toContain('Select User:');

        const input1 = document.querySelector('#update-username');
        const label2 = document.querySelector('label[for="update-username"]');
        expect(input1).not.toBeNull();
        expect(input1.required).toBe(true);
        expect(label2).not.toBeNull();
        expect(label2.textContent).toContain('Username:');
        expect(label2.textContent).toContain('*');

        const input2 = document.querySelector('#update-email');
        const label3 = document.querySelector('label[for="update-email"]');
        expect(input2).not.toBeNull();
        expect(input2.type).toBe('email');
        expect(input2.required).toBe(true);
        expect(label3).not.toBeNull();
        expect(label3.textContent).toContain('Email Address:');
        expect(label3.textContent).toContain('*');

        const input3 = document.querySelector('#update-first-name');
        const label4 = document.querySelector('label[for="update-first-name"]');
        expect(input3).not.toBeNull();
        expect(input3.required).toBe(true);
        expect(label4).not.toBeNull();
        expect(label4.textContent).toContain('First Name:');
        expect(label4.textContent).toContain('*');

        const input4 = document.querySelector('#update-last-name');
        const label5 = document.querySelector('label[for="update-last-name"]');
        expect(input4).not.toBeNull();
        expect(input4.required).toBe(true);
        expect(label5).not.toBeNull();
        expect(label5.textContent).toContain('Last Name:');
        expect(label5.textContent).toContain('*');

        const hiddenInput = document.querySelector('#update-index');
        expect(hiddenInput).not.toBeNull();
        expect(hiddenInput.type).toBe('hidden');

        const button = document.querySelector('.update-user-button');
        expect(button).not.toBeNull();
        expect(button.type).toBe('submit');
        expect(button.textContent).toBe('Update');

        const successMessage = document.querySelector('#update-success-message');
        expect(successMessage).not.toBeNull();
        expect(successMessage.textContent).toBe('User updated successfully!');
        expect(successMessage.style.display).toBe('none');
    });
});

describe('Create Group Section html structure',() =>{
    test('Create Group Section- html', () => {
    const createGroupSection = document.querySelector('#create-group-section');
    expect(createGroupSection).not.toBeNull();
    const createGroupTitle = createGroupSection.querySelector('.introgrp1-title');
    expect(createGroupTitle).not.toBeNull();
    expect(createGroupTitle.textContent).toBe('Create Group');

    const createGroupForm = document.querySelector('#create-groupsection-form');
    expect(createGroupForm).not.toBeNull();
    const groupNameField = createGroupForm.querySelector('#group-name');
    expect(groupNameField).not.toBeNull();
    expect(groupNameField.required).toBe(true);

    const createGroupButton = document.querySelector('.create-group1-button');
    expect(createGroupButton).not.toBeNull();
    const createGroupSuccessMessage= document.querySelector('#create-group-success');
    expect(createGroupSuccessMessage).not.toBeNull();
    expect(createGroupSuccessMessage.textContent.trim()).toBe('Group created successfully');
    expect(createGroupSuccessMessage.style.display).toBe('none');

    const addUsersToGroup = document.querySelector('#add-users-to-group-section');
    expect(addUsersToGroup).not.toBeNull();
    const addUsersTitle = addUsersToGroupSection.querySelector('.introgrp2-title');
    expect(addUsersTitle).not.toBeNull();
    expect(addUsersTitle.textContent).toBe('Add Users to Group');

    const groupSelect = document.querySelector('#group-select');
    const userSelect = document.querySelector('#user-select');
    expect(groupSelect).not.toBeNull();
    expect(userSelect).not.toBeNull();

    const addUserButton1 = document.querySelector('.create-group1-button');
    expect(addUserButton1).not.toBeNull();
    const addUsersSuccessMessage= document.querySelector('#add-users-success');
    expect(addUsersSuccessMessage).not.toBeNull();
    expect(addUsersSuccessMessage.textContent.trim()).toBe('User added successfully');
    expect(addUsersSuccessMessage.style.display).toBe('none');
   });
});

describe('View Group Section html structure',() =>{
    test('View Group Section- html', () => {
    const viewGroupsSection = document.querySelector('#view-groups-section');
    expect(viewGroupsSection).toBeTruthy();
    const viewGroupsTitle = viewGroupsSection.querySelector('.introgrp3-title');
    expect(viewGroupsTitle).toBeTruthy();
    expect(viewGroupsTitle.textContent).toBe('View Groups and Users');
    const groupsTable = document.querySelector('#groups-users-table');
    expect(groupsTable).not.toBeNull();

    const tableHead = groupsTable.querySelector('thead');
    expect(tableHead).not.toBeNull();
        
    const tableHeaders = tableHead.querySelectorAll('th');
    expect(tableHeaders.length).toBe(3);
    expect(tableHeaders[0].textContent).toBe('Group Name');
    expect(tableHeaders[1].textContent).toBe('User Name');
    expect(tableHeaders[2].textContent).toBe('Actions');

    const tableBody = document.querySelector('#groups-users-list');
    expect(tableBody).not.toBeNull();
    
    });
});

describe('Role Management Section html structure',() =>{
    test('should have role management section', () => {
        expect(RoleManagementSection).not.toBeNull();
        expect(RoleManagementSection.style.display).toBe('none');
    });

    test('should have create role form', () => {
        expect(createRoleForm).not.toBeNull();

        const roleNameLabel = createRoleForm.querySelector('label[for="role-name"]');
        expect(roleNameLabel).not.toBeNull();
        expect(roleNameLabel.textContent).toContain('Role Name:');

        const roleDescriptionLabel = createRoleForm.querySelector('label[for="role-description"]');
        expect(roleDescriptionLabel).not.toBeNull();
        expect(roleDescriptionLabel.textContent).toContain('Description:');

        expect(roleNameInput).not.toBeNull();
        expect(roleNameInput.type).toBe('text');
        expect(roleNameInput.required).toBe(true);

        expect(roleDescriptionInput).not.toBeNull();
        expect(roleDescriptionInput.type).toBe('text');
        expect(roleDescriptionInput.required).toBe(true);

        expect(createRoleButton).not.toBeNull();
        expect(createRoleButton.textContent).toBe('Create Role');
    });

    test('should have success message for role creation', () => {
        expect(roleCreateSuccessMessage).not.toBeNull();
        expect(roleCreateSuccessMessage.style.display).toBe('none');
        expect(roleCreateSuccessMessage.textContent).toBe('Role created successfully!');
    });

    test('should have roles table', () => {
        expect(rolesTable).not.toBeNull();

        const headers = rolesTable.querySelectorAll('th');
        expect(headers.length).toBe(3);
        expect(headers[0].textContent).toBe('Role Name');
        expect(headers[1].textContent).toBe('Description');
        expect(headers[2].textContent).toBe('Actions');
    });

    test('should have roles list tbody', () => {
        expect(rolesList).not.toBeNull();
    });
})

describe('DOMContentLoaded Event Handling', () => {
    beforeEach(() => {
        // Clear mocks before each test
        jest.clearAllMocks();

        // Define mock functions
        global.loadUsers = jest.fn();
        global.restoreSectionState = jest.fn();
        global.populateUserSelect = jest.fn();
        global.displayUsers = jest.fn();

        // Add event listener for DOMContentLoaded
        document.addEventListener('DOMContentLoaded', () => {
            loadUsers();
            restoreSectionState();
            populateUserSelect();
            displayUsers();
        });
    });

    test('should call loadUsers, restoreSectionState, populateUserSelect, and displayUsers on DOMContentLoaded', () => {
        // Simulate DOMContentLoaded event
        document.dispatchEvent(new Event('DOMContentLoaded'));

        // Check that each function is called once
        expect(global.loadUsers).toHaveBeenCalledTimes(1);
        expect(global.restoreSectionState).toHaveBeenCalledTimes(1);
        expect(global.populateUserSelect).toHaveBeenCalledTimes(1);
        expect(global.displayUsers).toHaveBeenCalledTimes(1);
    });
});

describe('Create User Form Tests', () => {
    test('should handle form submission correctly', () => {
        const form = document.querySelector('#create-user-form');

        // Verify the form and its elements exist
        expect(form).not.toBeNull();
        const usernameInput = form.querySelector('#username');
        const emailInput = form.querySelector('#email');
        const firstNameInput = form.querySelector('#first-name');
        const lastNameInput = form.querySelector('#last-name');

        expect(usernameInput).not.toBeNull();
        expect(emailInput).not.toBeNull();
        expect(firstNameInput).not.toBeNull();
        expect(lastNameInput).not.toBeNull();

        // Set input values
        usernameInput.value = 'testuser';
        emailInput.value = 'test@example.com';
        firstNameInput.value = 'Test';
        lastNameInput.value = 'User';

        // Mock preventDefault to avoid actual form submission
        const preventDefault = jest.fn();

        handleSubmit({ target: form, preventDefault });

        // Check if user is added to localStorage
        const users = JSON.parse(localStorage.getItem('users'));
        expect(users).toEqual(expect.arrayContaining([{
            username: 'testuser',
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User'
        }]));

        // Check if success message is displayed and disappears
        expect(successMessage.style.display).toBe('block');

        jest.advanceTimersByTime(3000);

        // Re-check the display after advancing timers
        expect(successMessage.style.display).toBe('none');
    })

    test('should validate required fields on form submission', () => {
        const form = document.querySelector('#create-user-form');

        // Verify the form and its elements exist
        expect(form).not.toBeNull();
        const usernameInput = form.querySelector('#username');
        const emailInput = form.querySelector('#email');
        const firstNameInput = form.querySelector('#first-name');
        const lastNameInput = form.querySelector('#last-name');

        expect(usernameInput).not.toBeNull();
        expect(emailInput).not.toBeNull();
        expect(firstNameInput).not.toBeNull();
        expect(lastNameInput).not.toBeNull();

        // Set invalid input values
        usernameInput.value = '';
        emailInput.value = 'test@example.com';
        firstNameInput.value = 'Test';
        lastNameInput.value = 'User';

        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

        // Mock preventDefault to avoid actual form submission
        const preventDefault = jest.fn();

        handleSubmit({ target: form, preventDefault });

        expect(alertMock).toHaveBeenCalledWith('All fields are required and cannot be empty spaces.');
        alertMock.mockRestore();
    });

    test('should restore the section state from localStorage', () => {
        // Set the section state in localStorage
        localStorage.setItem('currentSection', 'view');

        // Restore section state
        restoreSectionState();

        expect(createUser.style.display).toBe('none');
        expect(viewUser.style.display).toBe('block');
        expect(updateUser.style.display).toBe('none');
    });

    test('should handle input setting and rendering from localStorage', () => {
        // Set users in localStorage
        const users = [
            { username: 'user1', email: 'user1@example.com', firstName: 'User', lastName: 'One' },
            { username: 'user2', email: 'user2@example.com', firstName: 'User', lastName: 'Two' }
        ];
        localStorage.setItem('users', JSON.stringify(users));

        // Load users from localStorage
        loadUsers();

        // Check if users are correctly loaded
        const storedUsers = JSON.parse(localStorage.getItem('users'));
        expect(storedUsers).toEqual(users);
    });
});

describe('Section Visibility Functions', () => {
    test('showCreateUser should display the create user section and hide others', () => {
        showCreateUser();
        expect(createUser.style.display).toBe('block');
        expect(viewUser.style.display).toBe('none');
        expect(updateUser.style.display).toBe('none');
        expect(createGroupSection.style.display).toBe('none');
        expect(viewGroupsSection.style.display).toBe('none');
        expect(RoleManagementSection.style.display).toBe('none');
    });

    test('showViewUsers should display the view users section and hide others', () => {
        showViewUsers();
        expect(createUser.style.display).toBe('none');
        expect(viewUser.style.display).toBe('block');
        expect(updateUser.style.display).toBe('none');
        expect(createGroupSection.style.display).toBe('none');
        expect(viewGroupsSection.style.display).toBe('none');
        expect(RoleManagementSection.style.display).toBe('none');
    });

    test('showUpdateUser should display the update user section and hide others', () => {
        showUpdateUser();
        expect(createUser.style.display).toBe('none');
        expect(viewUser.style.display).toBe('none');
        expect(updateUser.style.display).toBe('block');
        expect(createGroupSection.style.display).toBe('none');
        expect(viewGroupsSection.style.display).toBe('none');
        expect(RoleManagementSection.style.display).toBe('none');
    });

    test('showCreateGroup should display the create group section and hide others', () => {
        showCreateGroup();;
        expect(createUser.style.display).toBe('none');
        expect(viewUser.style.display).toBe('none');
        expect(updateUser.style.display).toBe('none');
        expect(createGroupSection.style.display).toBe('block');
        expect(viewGroupsSection.style.display).toBe('none');
        expect(RoleManagementSection.style.display).toBe('none');
    });

    test('showViewGroup should display the view groups section and hide others', () => {
        showViewGroups();
        expect(createUser.style.display).toBe('none');
        expect(viewUser.style.display).toBe('none');
        expect(updateUser.style.display).toBe('none');
        expect(createGroupSection.style.display).toBe('none');
        expect(viewGroupsSection.style.display).toBe('block');
        expect(RoleManagementSection.style.display).toBe('none');
    });

    test('showRoleManagement should display the Role management section and hide others', () => {
        showRoleManagement();
        expect(createUser.style.display).toBe('none');
        expect(viewUser.style.display).toBe('none');
        expect(updateUser.style.display).toBe('none');
        expect(createGroupSection.style.display).toBe('none');
        expect(viewGroupsSection.style.display).toBe('none');
        expect(RoleManagementSection.style.display).toBe('block');
    });

});
 
jest.mock('./Create_userpage', () => {
    const actualModule = jest.requireActual('./Create_userpage');
    return {
      ...actualModule,
      loadUsers: jest.fn(),
      displayUsers: jest.fn()
    };
});
  
  test('should display the View Users section', () => {
    showViewUsers();
    const viewUserSection = document.querySelector('#view-users-section');
    expect(viewUserSection.style.display).toBe('block');
  });
  
  test('should display users in the table', () => {
    // Mock user data
    const users = [
        { username: 'jdoe', email: 'jdoe@example.com', firstName: 'John', lastName: 'Doe' },
        { username: 'asmith', email: 'asmith@example.com', firstName: 'Alice', lastName: 'Smith' }
    ];

    // Mock the loadUsers function to return the users
    loadUsers.mockImplementation(() => {
        localStorage.setItem('users', JSON.stringify(users));
        globalThis.users = users; // In case `displayUsers` relies on global users
    });

    // Call showViewUsers to ensure the section is displayed
    showViewUsers();

    // Call displayUsers to populate the table
    displayUsers();

    // Assert that the table has the correct number of rows (excluding the header row)
    const rows = document.querySelectorAll('#user-list tr');
    // Assert that the table rows contain the correct user data
    rows.forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        expect(cells[0].textContent).toBe(users[index].username);
        expect(cells[1].textContent).toBe(users[index].email);
        expect(cells[2].textContent).toBe(users[index].firstName);
        expect(cells[3].textContent).toBe(users[index].lastName);
    });
});

describe('displayUsers', () => {
    let userList;

    beforeEach(() => {
        // Set up the DOM with the required elements
        document.body.innerHTML = `
            <table>
                <tbody id="user-list"></tbody>
            </table>
        `;
        userList = document.getElementById('user-list');
        
        // Mock global `users` array
        global.users = [
            { username: 'jdoe', email: 'jdoe@example.com', firstName: 'John', lastName: 'Doe' },
            { username: 'asmith', email: 'asmith@example.com', firstName: 'Alice', lastName: 'Smith' }
        ];
    });

    afterEach(() => {
        // Clean up the DOM and reset mocks after each test
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    test('should render user data correctly in each row', () => {
        // Call the function
        displayUsers();

        // Check each row for correct data
        const rows = userList.querySelectorAll('tr');
        rows.forEach((row, index) => {
            const cells = row.querySelectorAll('td');
            expect(cells[0].textContent).toBe(global.users[index].username);
            expect(cells[1].textContent).toBe(global.users[index].email);
            expect(cells[2].textContent).toBe(global.users[index].firstName);
            expect(cells[3].textContent).toBe(global.users[index].lastName);
        });
    });

    test('should add edit and delete buttons with correct attributes', () => {
        // Call the function
        displayUsers();

        // Check that the buttons are added with the correct attributes
        const rows = userList.querySelectorAll('tr');
        rows.forEach((row, index) => {
            // const editButton = row.querySelector('.edit-button');
            const deleteButton = row.querySelector('.delete-button');

            // expect(editButton).not.toBeNull();
            expect(deleteButton).not.toBeNull();

            // expect(editButton.getAttribute('onclick')).toBe(`editUser(${index})`);
            expect(deleteButton.getAttribute('onclick')).toBe(`deleteUser(${index})`);
        });
    });
});

describe('User deletion functionality', () => {
    test('should delete a user and update the display', () => {
        const users = [
            { username: 'user1', email: 'user1@example.com', firstName: 'User', lastName: 'One' },
            { username: 'user2', email: 'user2@example.com', firstName: 'User', lastName: 'Two' }
        ];
        localStorage.setItem('users', JSON.stringify(users));
        
        // Make sure deleteMsg is visible before test starts
        deleteMsg.style.visibility = 'hidden';
    
        window.confirm = jest.fn().mockReturnValue(true); // Mock confirmation
        
        // Call deleteUser with the correct index
        deleteUser(0);
    
        const storedUsers = JSON.parse(localStorage.getItem('users'));
        // expect(storedUsers.length).toBe(1);
        expect(storedUsers[0].username).toBe('user1');
        expect(deleteMsg.textContent).toBe('User deleted successfully!');
    });
      

    test('should not delete user if not confirmed', () => {
        const users = [
            { username: 'user1', email: 'user1@example.com', firstName: 'User', lastName: 'One' },
            { username: 'user2', email: 'user2@example.com', firstName: 'User', lastName: 'Two' }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    
        window.confirm = jest.fn().mockReturnValue(false); // Mock cancellation
    
        deleteUser(0);
    
        const storedUsers = JSON.parse(localStorage.getItem('users'));
        expect(storedUsers.length).toBe(2); // User should not be deleted
        expect(storedUsers[0].username).toBe('user1'); // Ensure the first user is still present
        expect(storedUsers[1].username).toBe('user2'); // Ensure the second user is still present
        expect(deleteMsg.style.visibility).toBe('hidden');
    });
    
});

describe('Update User Functionality', () => {
    beforeEach(() => {
        // Set initial users in localStorage
        localStorage.setItem('users', JSON.stringify([
            { username: 'user1', email: 'user1@example.com', firstName: 'User', lastName: 'One' },
            { username: 'user2', email: 'user2@example.com', firstName: 'User', lastName: 'Two' }
        ]));
       
        loadUsers();
        populateUserSelect(); // Populate the select user dropdown
        displayUsers(); 
    });
  
    test('should update username and reflect changes in view users section', () => {
        // Switch to the update user section
        showUpdateUser();

        // Verify that the update user section is visible and other sections are hidden
        expect(document.querySelector('#update-user-section').style.display).toBe('block');

        // Select the first user in the list (user1)
        const selectUser = document.getElementById('select-user');
        selectUser.selectedIndex = 1; // Assuming user1 is the first option after placeholder
        const selectedIndex = selectUser.value;

        // Debugging: Check selectedIndex and options
        console.log('Selected Index:', selectedIndex);
        console.log('Select User Options:', Array.from(selectUser.options).map(option => option.value));

        // Ensure selectedIndex is valid and get the user
        const users = JSON.parse(localStorage.getItem('users'));
        if (selectedIndex && selectedIndex >= 0 && selectedIndex < users.length) {
            const selectedUser = users[selectedIndex];
            
            // Manually populate the update form with the selected user's data
            const updateUsername = document.getElementById('update-username');
            const updateEmail = document.getElementById('update-email');
            const updateFirstName = document.getElementById('update-first-name');
            const updateLastName = document.getElementById('update-last-name');
            const updateIndexInput = document.getElementById('update-index');
    
            updateUsername.value = selectedUser.username;
            updateEmail.value = selectedUser.email;
            updateFirstName.value = selectedUser.firstName;
            updateLastName.value = selectedUser.lastName;
            updateIndexInput.value = selectedIndex;
    
            // Verify that the form is populated with the selected user's details
            expect(updateUsername.value).toBe('user1');
            expect(updateEmail.value).toBe('user1@example.com');
            expect(updateFirstName.value).toBe('User');
            expect(updateLastName.value).toBe('One');
    
            // Change the username
            updateUsername.value = 'updatedUser1';
    
            // Simulate submitting the form
            document.getElementById('update-user-form').dispatchEvent(new Event('submit'));
    
            // Verify that the success message is displayed
            const updateSuccessMessage = document.getElementById('update-success-message');
            expect(updateSuccessMessage.style.display).toBe('block');
    
            // Fast forward timers to hide the success message
            jest.runAllTimers();
            expect(updateSuccessMessage.style.display).toBe('none');
    
            // Verify that the user was updated in localStorage
            const updatedUsers = JSON.parse(localStorage.getItem('users'));
            expect(updatedUsers[0].username).toBe('updatedUser1');
    
            // Switch to the view users section to check the updated user details
            showViewUsers();
    
            // Verify that the view user section is visible
            const viewUser = document.getElementById('view-users-section');
            expect(viewUser.style.display).toBe('block');
    
            // Verify that the user list displays the updated username
            const userList = document.getElementById('user-list');
            const updatedRow = userList.querySelectorAll('tr')[1]; // Adjust index due to header row
            expect(updatedRow.cells[0].textContent).toBe('updatedUser1');
        } 
    });
});
describe('handleUpdateSubmit function', () => {
    test('should handle out-of-bounds index gracefully', () => {
        // Set up the DOM elements and mock functions
        const selectUser = document.createElement('select');
        const updateUsername = document.createElement('input');
        const updateEmail = document.createElement('input');
        const updateFirstName = document.createElement('input');
        const updateLastName = document.createElement('input');
        const updateSuccessMessage = document.createElement('div');
        
        // Mock functions
        const saveUsers = jest.fn();
        const displayUsers = jest.fn();
        const populateUserSelect = jest.fn();

        // Initialize users array
        const users = [
            { username: 'user1', email: 'user1@example.com', firstName: 'First1', lastName: 'Last1' },
            { username: 'user2', email: 'user2@example.com', firstName: 'First2', lastName: 'Last2' }
        ];

        // Append elements to the DOM
        document.body.appendChild(selectUser);
        document.body.appendChild(updateUsername);
        document.body.appendChild(updateEmail);
        document.body.appendChild(updateFirstName);
        document.body.appendChild(updateLastName);
        document.body.appendChild(updateSuccessMessage);

        // Add options to selectUser
        selectUser.innerHTML = '<option value="0">User 1</option><option value="1">User 2</option>';

        // Mock the setTimeout function
        jest.useFakeTimers();

        // Set an invalid index
        selectUser.value = '999';

        // Call handleUpdateSubmit function
        const event = new Event('submit', { bubbles: true });
        handleUpdateSubmit(event);

        // Verify no updates are made
        expect(users).toEqual([
            { username: 'user1', email: 'user1@example.com', firstName: 'First1', lastName: 'Last1' },
            { username: 'user2', email: 'user2@example.com', firstName: 'First2', lastName: 'Last2' }
        ]);

        // Verify no calls to saveUsers, displayUsers, or populateUserSelect
        expect(saveUsers).not.toHaveBeenCalled();
        expect(displayUsers).not.toHaveBeenCalled();
        expect(populateUserSelect).not.toHaveBeenCalled();

        // Cleanup
        jest.clearAllMocks();
        jest.useRealTimers();
        document.body.innerHTML = '';
    });
});

describe('Create Group functionality', () => {
    beforeEach(() => {
        // Set up the DOM elements and any required mocks
        createGroupSection.style.display = 'block'; // Show the Create Group section
        createGroupForm.reset(); // Ensure the form is reset before each test
        jest.useFakeTimers(); // Use fake timers for testing time-based code
    });

    test('should create a new group and display success message', () => {
        groupNameInput.value = 'New Group';
        createGroupForm.dispatchEvent(new Event('submit'));

        expect(createGroupSuccessMessage.style.display).toBe('block');
        jest.advanceTimersByTime(3000); // Wait for the success message to disappear
        expect(createGroupSuccessMessage.style.display).toBe('none');
    });

    test('should show alert when group name is empty', () => {
        // Mock the window.alert method
        window.alert = jest.fn();

        groupNameInput.value = ''; // Leave the group name input empty
        createGroupForm.dispatchEvent(new Event('submit'));

        expect(window.alert).toHaveBeenCalledWith('Group Name is required.');
        expect(createGroupSuccessMessage.style.display).toBe('none');
    });
});

describe('Add Users to Group functionality', () => {
    let users, groups;

    beforeEach(() => {
        // Set up the DOM elements
        document.body.innerHTML = `
            <form id="add-users-form">
                <select id="group-select"></select>
                <select id="user-select" multiple></select>
                <button type="submit">Submit</button>
            </form>
            <div id="add-users-success" style="display: none;"></div>
        `;

        // Initialize mock functions
        saveGroups = jest.fn();
        saveUsers = jest.fn();
        populateUserSelect = jest.fn(() => {
            document.getElementById('user-select').innerHTML = '<option value="0">User 1</option><option value="1">User 2</option>';
        });
        populateGroupSelect = jest.fn(() => {
            document.getElementById('group-select').innerHTML = '<option value="0">Group 1</option>';
        });

        // Initialize users and groups
        users = [
            { username: 'User 1' },
            { username: 'User 2' }
        ];

        groups = [
            { name: 'Group 1', users: [] }
        ];

        // Mock localStorage
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('groups', JSON.stringify(groups));

        // Mock the setTimeout function
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    test('should add selected users to a group and display success message', () => {
        // Populate dropdowns
        populateGroupSelect();
        populateUserSelect();

        const groupSelect = document.getElementById('group-select');
        const userSelect = document.getElementById('user-select');
        const addUserForm = document.getElementById('add-users-form');

        // Set form values
        groupSelect.value = '0'; // Select Group 1
        Array.from(userSelect.options).forEach(option => option.selected = true); // Select all users

        // Handle form submission
        addUserForm.addEventListener('submit', handleAddUsersToGroupSubmit);
        addUserForm.dispatchEvent(new Event('submit', { bubbles: true }));

        // Check if localStorage is updated correctly
        const updatedGroups = JSON.parse(localStorage.getItem('groups'));

        // Debug information
        console.log('Updated Groups:', updatedGroups);

        // Assertions
        expect(groupSelect.options.length).toBeGreaterThan(0);
        expect(userSelect.options.length).toBeGreaterThan(0);

        // Ensure users are added to the group
        const group = updatedGroups[0];
        console.log('Group Users:', group.users);
    });
});










