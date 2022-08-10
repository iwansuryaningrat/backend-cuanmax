import request from "supertest";
import app from "../../index.js";
// import describe from "mocha";
import mocha from "mocha";
var describe = mocha.describe;
import assert from "assert";

describe(" Get Teams Endpoint Test", () => {
  it("responds with json", function (done) {
    request(app)
      .get("/api/v1/teams/")
      .set("Accept", "application/json")
      .expect(200, done);
  });
});
