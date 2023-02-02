// Create Unit Test for timeConvert function in timeConvert.test.js file with mocha
import assert from "assert";
import timeConvert from "../../src/controllers/function/timeConverter.function.js";

describe("timeConvert", () => {
  it("should return time in format yyyy-mm-dd hh:mm:ss +hh:mm", () => {
    const date = new Date();
    const result = timeConvert(date);
    const expected = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")} +07:00`;
    assert.strictEqual(result, expected);
  });
});
