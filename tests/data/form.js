export const USERS = [
  {
    scenario: "Multiple Hobbies Selected",
    name: "Vanessa",
    email: "vanessa@example.com",
    password: "password123",
    country: "brazil",
    gender: "female",
    hobbies: [
      "Read books",
      "Travel",
      "Video Games",
      "Sports",
      "Movies",
      "Board Games",
    ],
  },

  {
    scenario: "Single Hobby Selected",
    name: "Diogo",
    email: "diogo@example.com",
    password: "password123",
    country: "canada",
    gender: "male",
    hobbies: ["Read books"],
  },

  {
    scenario: "No Hobbies Selected",
    name: "Filipa",
    email: "filipa@example.com",
    password: "password123",
    country: "usa",
    gender: "other",
    hobbies: [],
  },

  {
    name: "Bruno",
    email: "bruno@example.com",
    password: "password123",
    country: "mexico",
    gender: "male",
    hobbies: ["Video Games"],
  },

  {
    name: "Joana",
    email: "joana@example.com",
    password: "password123",
    country: "portugal",
    gender: "female",
    hobbies: ["Board Games"],
  },
];

export const MESSAGES = {
  success: {
    message1: "Success!",
    message2: "The form has been submitted successfully.",
  },

  errors: {
    blocked: "User blocked!",
    invalid: "User not found!",
    wrongPassword: "Incorrect username or password!",
    tooManyAttempts: "User temporarily blocked!",
  },
};
