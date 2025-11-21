import User from "../model/user.schema.js";

export const createUser = async (userData) => {
  console.log({ userData });

  const newUser = await User.create({
    name: userData.name,
    email: userData.email,
    authentication: {
      password: userData.password,
      salt: userData?.salt,
      token: userData?.token,
    },
  });

  return newUser;
};
