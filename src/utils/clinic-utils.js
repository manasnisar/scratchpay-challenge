const stateCodes = require('./stateCodes');

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

module.exports = {
  doesUserWant,
  compareAvailability,
};
