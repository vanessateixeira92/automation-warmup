export const USERS = {
  valid: { username: "test", password: "password123" },
  blocked: { username: "testblock", password: "password123" },
  invalid: { username: "invalidUser", password: "password123" },
  wrongPassword: { username: "test", password: "password1234" },
};

export const MESSAGES = {
  success: {
    login: "User successfully logged in!",
    authenticated: (user) => `User ${user} authenticated`,
    logout: "You have been logged out. Please log in.",
  },
  errors: {
    blocked: "User blocked!",
    invalid: "User not found!",
    wrongPassword: "Incorrect username or password!",
    tooManyAttempts: "User temporarily blocked!",
  },
};
