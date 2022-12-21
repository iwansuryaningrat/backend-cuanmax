// Unit Test for createPayment function in createPayment.test.js file with mocha
import assert from "assert";
import createTransaction from "../../src/controllers/midtrans/createPayment.function.js";

describe("createTransaction", () => {
  it("should return transaction object", async () => {
    const transaction_details = {
      order_id: "test-transaction-123",
      gross_amount: 200000,
    };
    const items = [
      {
        id: "a1",
        price: 100000,
        quantity: 1,
        name: "Apple",
      },
      {
        id: "a2",
        price: 50000,
        quantity: 2,
        name: "Orange",
      },
    ];
    const customer_details = {
      first_name: "John",
      last_name: "Watson",
      email: "iwan.suryaningrat28@gmail.com",
      phone: "081122334455",
    };
    const result = await createTransaction(
      transaction_details,
      items,
      customer_details
    );
    //   Result should be an object with property token and redirect_url
    assert.strictEqual(typeof result, "object");
    assert.strictEqual(typeof result.token, "string");
    assert.strictEqual(typeof result.redirect_url, "string");
  });
});
