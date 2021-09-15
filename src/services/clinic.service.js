const httpStatus = require('http-status');
const axios = require('axios');
const ApiError = require('../utils/ApiError');
const { doesUserWant } = require('../utils/clinic-utils');

// /**
//  * Create a user
//  * @param {Object} userBody
//  * @returns {Promise<Clinic>}
//  */

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
