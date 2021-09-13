const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// /**
//  * Create a user
//  * @param {Object} userBody
//  * @returns {Promise<Clinic>}
//  */
// const createUser = async (userBody) => {
//   if (await User.isEmailTaken(userBody.email)) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
//   }
//   return User.create(userBody);
// };

const getClinics = async (query) => {
  console.log(query)
  // here is where we would get data
  // return users;
  return {}
};



module.exports = {
  getClinics,
};
