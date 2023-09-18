export function isAuthenticated() {
  // You can implement your authentication logic here
  // For example, check if the user is logged in and has a valid token
  // Return true if authenticated, false otherwise
  const userToken = localStorage.getItem('userToken');
  return !!userToken; // Returns true if userToken exists, false otherwise
}