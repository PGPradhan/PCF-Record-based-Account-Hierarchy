export const mockData = [
  {
    accountid: "f0ee9e0e-6ea5-ef11-b8e8-000d3ad8dc8f",
    name: "Prathamesh Pradhan",
    parentaccountid: null,
    telephone1: "09321266468",
    statecode: 0
  },
  {
    accountid: "0ec1838e-a7d5-ef11-8eea-000d3ad8dc8f",
    name: "teste",
    parentaccountid: "f0ee9e0e-6ea5-ef11-b8e8-000d3ad8dc8f",
    telephone1: "9876543210",
    statecode: 0
  },
  {
    accountid: "a680bdcf-7e31-f011-8c4d-7c1e5236ebf7",
    name: "Sub child AC1",
    parentaccountid: null,
    telephone1: "9012345678",
    statecode: 0
  },
  {
    accountid: "fdb8b1ef-7e31-f011-8c4d-7c1e5236ebf7",
    name: "AC1->A1",
    parentaccountid: "a680bdcf-7e31-f011-8c4d-7c1e5236ebf7",
    telephone1: "9988776655",
    statecode: 1
  },
  {
    accountid: "a99861f6-7e31-f011-8c4d-7c1e5236ebf7",
    name: "AC1->A2",
    parentaccountid: "a680bdcf-7e31-f011-8c4d-7c1e5236ebf7",
    telephone1: "8877665544",
    statecode: 0
  },
  {
    accountid: "27bd6fd6-7e31-f011-8c4d-7c1e5236ebf7",
    name: "Sub child AC2",
    parentaccountid: "f0ee9e0e-6ea5-ef11-b8e8-000d3ad8dc8f",
    telephone1: "9090909090",
    statecode: 0
  },
  {
    accountid: "7189d002-7f31-f011-8c4d-7c1e5236ebf7",
    name: "AC2->A1",
    parentaccountid: "27bd6fd6-7e31-f011-8c4d-7c1e5236ebf7",
    telephone1: "1234567890",
    statecode: 0
  },
  {
    accountid: "a147fd08-7f31-f011-8c4d-7c1e5236ebf7",
    name: "AC2->A2",
    parentaccountid: "27bd6fd6-7e31-f011-8c4d-7c1e5236ebf7",
    telephone1: "1122334455",
    statecode: 1
  }
];

export default mockData;


// const mockData = [
//   {
//     accountid: "A",
//     name: "Parent A",
//     parentaccountid: null,
//     telephone1: "123-111-0000",
//     statecode: 0
//   },
//   {
//     accountid: "A1",
//     name: "Child A1",
//     parentaccountid: "A",
//     telephone1: "123-111-0001",
//     statecode: 0
//   },
//   {
//     accountid: "A2",
//     name: "Child A2",
//     parentaccountid: "A1",
//     telephone1: "123-111-0002",
//     statecode: 0
//   },
//   {
//     accountid: "B",
//     name: "Parent B",
//     parentaccountid: null,
//     telephone1: "123-222-0000",
//     statecode: 0
//   },
//   {
//     accountid: "B1",
//     name: "Child B1",
//     parentaccountid: "B",
//     telephone1: "123-222-0001",
//     statecode: 0
//   },
//   {
//     accountid: "B2",
//     name: "Child B2",
//     parentaccountid: "B1",
//     telephone1: "123-222-0002",
//     statecode: 0
//   },
//   {
//     accountid: "C",
//     name: "Unrelated Root",
//     parentaccountid: null,
//     telephone1: "999-999-9999",
//     statecode: 1
//   }
// ];

// export default mockData;
