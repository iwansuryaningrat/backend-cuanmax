export default (mongoose) => {
  const schema = mongoose.Schema(
    {
      transactionId: {
        type: String,
        require: true,
      },
      transactionType: {
        type: String,
        require: true,
      },
      transactionAmount: {
        type: String,
        require: true,
      },
      transactionDate: {
        type: String,
        require: true,
      },
      transactionStatus: {
        type: String,
        require: true,
      },
      transactionDescription: {
        type: String,
        require: true,
      },
      transactionReference: {
        type: String,
        require: true,
      },
      transactionUser: {
        type: String,
        require: true,
      },
      transactionUserId: {
        type: String,
        require: true,
      },
      transactionUserName: {
        type: String,
        require: true,
      },
      transactionUserEmail: {
        type: String,
        require: true,
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Transactions = mongoose.model("transactions", schema);
  return Transactions;
};
