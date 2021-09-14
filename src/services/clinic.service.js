const httpStatus = require('http-status');
const axios = require('axios');
const stateCodes = require('../utils/stateCodes');
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

const compareAvailability = (clinicAvailability, queryAvailability) => {
  const queryFrom = queryAvailability.substr(queryAvailability.search(/\d/g), 5);
  const queryTo = queryAvailability.split('to')[1].substr(queryAvailability.split('to')[1].search(/\d/g), 5);

  if (clinicAvailability.from === queryFrom && clinicAvailability.to === queryTo) {
    return true;
  }
  return false;
};

const doesUserWant = (query, queryFields, clinic) => {
  for (let field = 0; field < queryFields.length; field += 1) {
    if (queryFields[field] === 'name') {
      if (clinic.name) {
        if (query.name !== clinic.name) {
          return false;
        }
      } else if (query.name !== clinic.clinicName) {
        return false;
      }
    }
    if (queryFields[field] === 'state') {
      if (clinic.stateName) {
        if (query.state !== clinic.stateName) {
          if (stateCodes[query.state] !== clinic.stateName) {
            return false;
          }
        }
      } else if (query.state !== clinic.stateCode) {
        if (stateCodes[clinic.stateCode] !== query.state) {
          return false;
        }
      }
    }
    if (queryFields[field] === 'availability') {
      if (clinic.availability) {
        return compareAvailability(clinic.availability, query.availability);
      }
      return compareAvailability(clinic.opening, query.availability);
    }
  }
  return true;
};

const getClinics = async (query) => {
  const dentalClinicsRequest = axios.get('https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json');
  const vetClinicsRequest = axios.get('https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json');
  let clinics;
  try {
    clinics = await axios.all([dentalClinicsRequest, vetClinicsRequest]);
    clinics = [...clinics[0].data, ...clinics[1].data];
  } catch (error) {
    throw new ApiError(httpStatus.NO_CONTENT, 'Clinics not found!');
  }

  const queryFields = Object.keys(query);

  clinics = clinics.filter((clinic) => {
    return doesUserWant(query, queryFields, clinic);
  });
  return clinics;
};

module.exports = {
  getClinics,
};
