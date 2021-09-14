const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { clinicService } = require('../services');

const getClinics = catchAsync(async (req, res) => {
  const clinics = await clinicService.getClinics(req.query);
  res.status(httpStatus.OK).send(clinics);
});

module.exports = {
  getClinics,
};
