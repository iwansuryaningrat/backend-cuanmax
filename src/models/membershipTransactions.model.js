export default (mongoose) => {
  const Schema = mongoose.Schema;
  const membershipTransactionsSchema = new Schema(
    {
      paymentCode: {
        type: String,
        require: true,
      },
      transactionName: {
        type: String,
        require: true,
        default: "Cuanmax Pro Membership",
      },
      membershipDuration: {
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

  membershipTransactionsSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const MembershipTransactions = mongoose.model(
    "MembershipTransactions",
    membershipTransactionsSchema
  );

  return MembershipTransactions;
};
