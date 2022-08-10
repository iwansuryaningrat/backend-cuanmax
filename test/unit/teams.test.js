import request from "supertest";
import app from "../../index.js";
// import describe from "mocha";
import mocha from "mocha";
var describe = mocha.describe;

describe("Teams", () => {
  it("responds with json", function (done) {
    request(app)
      .get("/api/v1/teams/")
      .set("Accept", "application/json")
      .expect(200, done);
  });
});

// console.log(describe);

// describe("GET /", () => {
//   it("should return a list of teams", async () => {
//     const response = await request(app).get("/teams");
//     expect(response.status).toBe(200);
//   }).timeout(10000);
// });

// describe("GET /", function () {
//   it("responds with json", function (done) {
//     request(app)
//       .get("/")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200, done);
//   });
// });
