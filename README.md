# scratchpay-challenge

Assumptions:
- The api has to return all the clinics if no query was used
- The api has to return no clinics if the match is not perfect (e.g name provided and matches, state provided but doesn't match)

Features:
- Single endpoint to search for clinics based on query
- Search by multiple criteria
- Use state name and state code interchangeably
- Well documented api using [SwaggerUI](https://swagger.io/tools/swagger-ui)

Acceptance Criteria Match:
- Simple, clear and readable code
  - Well structured
  - separation of concerns
  - follows standards
- Correct
- Secure
- Memory efficiency
  - Worst scenario space complexity of O(n)
  - Time complexity
    Two main loops. One has the worst case complexity of O(3), that the query fields. The other loop has a complexity of O(n)
- Well test code
  - Unit and integration tested with Jest
  ![Coverage Screenshot](https://photos.app.goo.gl/dNdGbEuVDHj6Eqky7)
