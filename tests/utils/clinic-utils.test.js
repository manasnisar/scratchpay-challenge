// eslint-disable-next-line import/extensions
const { doesUserWant, compareAvailability } = require('../../src/utils/clinic-utils.js');

describe('Clinic Utils', () => {
  describe('test compareAvailability', () => {
    it('should return true for mactching availability', () => {
      const queryAvailabililty = 'from:09:00, to:17:00';
      const clinicAvailability = { from: '09:00', to: '17:00' };
      const result = compareAvailability(clinicAvailability, queryAvailabililty);
      expect(result).toEqual(true);
    });

    it('should return false for clashing availability', () => {
      const queryAvailabililty = 'from:09:00, to:17:00';
      const clinicAvailability = { from: '08:00', to: '21:00' };
      const result = compareAvailability(clinicAvailability, queryAvailabililty);
      expect(result).toEqual(false);
    });
  });
  describe('Check doesUserWant', () => {
    it('should return true for mactching clinic name where it is denoted by "name" in clinic object', () => {
      const query = { name: 'Hopkins Hospital Baltimore' };
      const queryFields = ['name'];
      // first clinic object type where clinic name is denoted by name
      const clinic = {
        name: 'Hopkins Hospital Baltimore',
        stateName: 'Florida',
        availability: {
          from: '07:00',
          to: '22:00',
        },
      };
      const result = doesUserWant(query, queryFields, clinic);
      expect(result).toEqual(true);
    });

    it('should return true for mactching clinic name where it is denoted by "clinicName" in clinic object', () => {
      const query = { name: 'City Vet Clinic' };
      const queryFields = ['name'];
      // first clinic object type where clinic name is denoted by name
      const clinic = {
        clinicName: 'City Vet Clinic',
        stateCode: 'NV',
        opening: {
          from: '10:00',
          to: '22:00',
        },
      };
      const result = doesUserWant(query, queryFields, clinic);
      expect(result).toEqual(true);
    });

    it('should return false for clashing clinic name', () => {
      const query = { name: 'Town Vet Clinic' };
      const queryFields = ['name'];
      const clinic = {
        clinicName: 'City Vet Clinic',
        stateCode: 'NV',
        opening: {
          from: '10:00',
          to: '22:00',
        },
      };
      const result = doesUserWant(query, queryFields, clinic);
      expect(result).toEqual(false);
    });
    it('should return true for mactching state where it is denoted by "stateName" in clinic object', () => {
      const query = { state: 'Florida' };
      const queryFields = ['state'];
      const clinic = {
        name: 'Hopkins Hospital Baltimore',
        stateName: 'Florida',
        availability: {
          from: '07:00',
          to: '22:00',
        },
      };
      const result = doesUserWant(query, queryFields, clinic);
      expect(result).toEqual(true);
    });
    it('should return true for mactching state where it is denoted by "stateCode" in clinic object', () => {
      const query = { state: 'NV' };
      const queryFields = ['state'];
      const clinic = {
        clinicName: 'City Vet Clinic',
        stateCode: 'NV',
        opening: {
          from: '10:00',
          to: '22:00',
        },
      };
      const result = doesUserWant(query, queryFields, clinic);
      expect(result).toEqual(true);
    });
    it('should return true for mactching state where a state code is used but clinic object has the complete state name', () => {
      const query = { state: 'FL' };
      const queryFields = ['state'];
      const clinic = {
        name: 'Hopkins Hospital Baltimore',
        stateName: 'Florida',
        availability: {
          from: '07:00',
          to: '22:00',
        },
      };
      const result = doesUserWant(query, queryFields, clinic);
      expect(result).toEqual(true);
    });
    it('should return true for mactching state where a state name is used but clinic object has the state code', () => {
      const query = { state: 'Nevada' };
      const queryFields = ['state'];
      const clinic = {
        clinicName: 'City Vet Clinic',
        stateCode: 'NV',
        opening: {
          from: '10:00',
          to: '22:00',
        },
      };
      const result = doesUserWant(query, queryFields, clinic);
      expect(result).toEqual(true);
    });
    it('should return true for match on both name and state', () => {
      const query = { name: 'City Vet Clinic', state: 'Nevada' };
      const queryFields = ['state'];
      const clinic = {
        clinicName: 'City Vet Clinic',
        stateCode: 'NV',
        opening: {
          from: '10:00',
          to: '22:00',
        },
      };
      const result = doesUserWant(query, queryFields, clinic);
      expect(result).toEqual(true);
    });
    it('should return false if one of the fields doesnt match', () => {
      const query = { name: 'City Vet Clinic', state: 'CA' };
      const queryFields = ['state'];
      const clinic = {
        clinicName: 'City Vet Clinic',
        stateCode: 'NV',
        opening: {
          from: '10:00',
          to: '22:00',
        },
      };
      const result = doesUserWant(query, queryFields, clinic);
      expect(result).toEqual(false);
    });
    it('should return true if availability or opening doesnt match availability in query', () => {
      const query = { availability: 'from:10:00, to:22:00' };
      const queryFields = ['availability'];
      const clinic = {
        clinicName: 'City Vet Clinic',
        stateCode: 'NV',
        opening: {
          from: '10:00',
          to: '22:00',
        },
      };
      const result = doesUserWant(query, queryFields, clinic);
      expect(result).toEqual(true);
    });
    it('should return false if availability or opening doesnt match availability in query', () => {
      const query = { availability: 'from:10:00, to:12:00' };
      const queryFields = ['availability'];
      const clinic = {
        clinicName: 'City Vet Clinic',
        stateCode: 'NV',
        opening: {
          from: '10:00',
          to: '22:00',
        },
      };
      const result = doesUserWant(query, queryFields, clinic);
      expect(result).toEqual(false);
    });
    it('should return true if a perfect match is found based on all query fields', () => {
      const query = { name: 'City Vet Clinic', state: 'Nevada', availability: 'from:10:00, to:22:00' };
      const queryFields = ['name', 'state', 'availability'];
      const clinic = {
        clinicName: 'City Vet Clinic',
        stateCode: 'NV',
        opening: {
          from: '10:00',
          to: '22:00',
        },
      };
      const result = doesUserWant(query, queryFields, clinic);
      expect(result).toEqual(true);
    });
    it('should return false if a perfect match is not found based on all query fields', () => {
      const query = { name: 'City Vet Clinic', state: 'CA', availability: 'from:10:00, to:22:00' };
      const queryFields = ['name', 'state', 'availability'];
      const clinic = {
        clinicName: 'City Vet Clinic',
        stateCode: 'NV',
        opening: {
          from: '10:00',
          to: '22:00',
        },
      };
      const result = doesUserWant(query, queryFields, clinic);
      expect(result).toEqual(true);
    });
  });
});
