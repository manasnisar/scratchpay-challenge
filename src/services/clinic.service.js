const httpStatus = require('http-status');
const axios = require('axios');
const ApiError = require('../utils/ApiError');
const { doesUserWant } = require('../utils/clinic-utils');

/**
 * Get clinics
 * @param {Object} Query
 * @returns {Promise<Object>}
 */

const getClinics = async (query) => {
  // prepare get request to fetch clinics from both apis
  const dentalClinicsRequest = axios.get('https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json');
  const vetClinicsRequest = axios.get('https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json');
  let clinics;
  try {
    // Execute the requests and merge responses
    clinics = await axios.all([dentalClinicsRequest, vetClinicsRequest]);
    clinics = [...clinics[0].data, ...clinics[1].data];
  } catch (error) {
    // In case the resource couldn't be fetched
    throw new ApiError(httpStatus.NO_CONTENT, 'Clinics not found!');
  }
  // Get the query fields before hand to avoid getting them repeadetly
  const queryFields = Object.keys(query);

  // filter the results based on query
  clinics = clinics.filter((clinic) => {
    return doesUserWant(query, queryFields, clinic);
  });
  // return the queried resources
  return clinics;
};

module.exports = {
  getClinics,
};
