import userSchema from "../model/user.schema.js";

export const findUserByEmail = async ({ email }) => {
  const user = await userSchema
    .findOne({ email })
    .select(
      "+authentication.password +authentication.salt +authentication.token"
    );

  return user;
};


export async function findUserById({ id }) {
  const user = await userSchema

  console.log({ id });


  const userData = await user.findOne({ _id: id })

  return userData || {}

}


