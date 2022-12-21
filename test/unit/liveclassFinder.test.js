import findLiveclass from "../../src/controllers/function/liveclassFinder.function.js";
import assert from "assert";

describe("Liveclass Finder", () => {
  it("Find liveclass", async () => {
    const liveclass = await findLiveclass(
      "60e0a1d9a0b2f40e7c5a0c639b2fabc5b00b1918d150f4"
    );
    assert.strictEqual(typeof liveclass, "object");
  });
});
