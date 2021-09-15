const axios = require('axios');
// eslint-disable-next-line import/extensions
const { getClinics } = require('../../src/services/clinic.service.js');

jest.mock('axios');
const requestData = [
  {
    data: [
      {
        name: 'Good Health Home',
        stateName: 'Alaska',
        availability: {
          from: '10:00',
          to: '19:30',
        },
      },
      {
        name: 'Mayo Clinic',
        stateName: 'Florida',
        availability: {
          from: '09:00',
          to: '20:00',
        },
      },
    ],
  },
  {
    data: [
      {
        clinicName: 'Scratchpay Test Pet Medical Center',
        stateCode: 'CA',
        opening: {
          from: '00:00',
          to: '24:00',
        },
      },
    ],
  },
];

describe('Clinic Service', () => {
  it('should return all the clinics without any query params', () => {
    const clinics = [
      {
        name: 'Good Health Home',
        stateName: 'Alaska',
        availability: {
          from: '10:00',
          to: '19:30',
        },
      },
      {
        name: 'Mayo Clinic',
        stateName: 'Florida',
        availability: {
          from: '09:00',
          to: '20:00',
        },
      },
      {
        clinicName: 'Scratchpay Test Pet Medical Center',
        stateCode: 'CA',
        opening: {
          from: '00:00',
          to: '24:00',
        },
      },
    ];
    axios.all.mockResolvedValue(requestData);
    return getClinics({}).then((data) => {
      expect(data).toEqual(clinics);
    });
  });
  it('should return an empty array if a match is not found when query params provided', () => {
    axios.all.mockResolvedValue(requestData);
    return getClinics({ name: 'Good Health Home', state: 'CA' }).then((data) => {
      expect(data).toEqual([]);
    });
  });
  it('should return clinic/clinics if a match is found when query params provided', () => {
    axios.all.mockResolvedValue(requestData);
    return getClinics({ name: 'Good Health Home', state: 'AK', availability: 'from:10:00, to:19:30' }).then((data) => {
      expect(data).toEqual([
        {
          name: 'Good Health Home',
          stateName: 'Alaska',
          availability: {
            from: '10:00',
            to: '19:30',
          },
        },
      ]);
    });
  });
});
