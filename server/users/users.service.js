const axios = require('axios').default;

// Function to fetch all users
async function fetchAllUsers() {
  const { data: users } = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return users;
}

// Function to fetch a user by ID and return filtered user information
async function fetchUserById(userId) {
  const { data: user } = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );


  const filteredUser = {
    name: user.name,
    email: user.email,
  };

  return filteredUser;
}

module.exports = { fetchAllUsers, fetchUserById };
