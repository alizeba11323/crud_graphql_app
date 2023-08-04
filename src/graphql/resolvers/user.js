module.exports = {
  UserResult: {
    __resolveType: (obj, context, info) => {
      if (obj.args) {
        return "UserErrorResponse";
      }
      if (obj.token) {
        return "UserRegisterResponse";
      }
      return null;
    },
  },
  Mutation: {
    registerUser: async (
      parent,
      { userInput: { name, email, password, avatarImage } },
      { userContext },
      info
    ) => {
      const user = await userContext.findOne({ email });
      if (user) {
        return {
          message: "User Already exists",
          args: "Email",
        };
      }
      const newUser = await userContext.create({
        email,
        name,
        password,
        avatarImage,
      });
      const token = await newUser.genToken();
      return {
        message: "User Created Successfully",
        token: `Bearer ${token} `,
        user: {
          ...newUser._doc,
          password: null,
        },
      };
    },
    loginUser: async (
      parent,
      { loginInput: { email, password } },
      { userContext },
      info
    ) => {
      const user = await userContext.findOne({ email });
      if (!user) return { message: "User Not Found", args: "email" };
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return {
          message: "Wrong password",
          args: "Password",
        };
      }
      const token = await user.genToken();
      return {
        message: "User LoggedIn successfully",
        token,
        user: {
          ...user._doc,
          password: null,
        },
      };
    },
  },
};
