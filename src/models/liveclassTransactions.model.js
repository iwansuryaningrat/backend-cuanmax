export default (mongoose) => {
  const Schema = mongoose.Schema;
  const liveclassTransactionSchema = new Schema(
    {
      paymentCode: {
        type: String,
        require: true,
      },
      liveclassId: {
        type: Schema.Types.ObjectId,
        ref: "Liveclasses",
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
        enum: {
          values: ["Pending", "Success", "Failed"],
          message: "Status must be Pending, Success or Failed",
        },
        default: "Pending",
      },
      transactionDescription: {
        type: String,
        require: true,
      },
      transactionUser: {
        type: Schema.Types.ObjectId,
        ref: "users",
        require: true,
      },
      voucherCode: {
        type: String,
      },
    },
    { timestamps: true }
  );

  liveclassTransactionSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const LiveclassTransactions = mongoose.model(
    "LiveclassTransactions",
    liveclassTransactionSchema
  );

  return LiveclassTransactions;
};
