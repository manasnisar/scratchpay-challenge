# scratchpay-challenge

Assumptions:
- The api has to return all the clinics if no query was used
- The api has to return no clinics if the match is not perfect (e.g "name" provided and matches, "state" provided but doesn't match)
- The api doesn't need to be case insensitive ("California" would be correct but "california" would be not)

Features:
- Single endpoint to search for clinics based on query
- Search by multiple criteria
- State name and state code can be used interchangeably
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
    Two main loops. One has the worst case complexity of O(3), that's the query fields. The other loop has a complexity of O(n)
- Well test code
  - Unit and integration tested with Jest
  ![Refer to assets/test-coverage.PNG](/assets/test-coverage.jpg)
- Well documented code
  - Includes helpful inline documentation
  - GUI documentation for the API using SwaggerUI
- CI/CD
  - CI/CD pipeline setup using CircleCI, if jest tests pass, the app is deployed to heroku
  - [Live app here](https://scratchpay-challenge.herokuapp.com/v1/docs/)
  ![Last successful build screenshot](/assets/ci-image.jpg)
- Dockerized
  Project has been dockerized leveraging docker-compose
  
Notes:
  - I tried to avoid one liners for clarity, although I love using them
  - So you guys might see a bunch of if else statements, as i was trying to make the queries as easy as possible
