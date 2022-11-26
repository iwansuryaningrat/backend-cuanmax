export default (mongoose) => {
  const Schema = mongoose.Schema;
  const referralSchema = new Schema(
    {
      referralCode: {
        type: String,
        unique: true,
        maxLength: [8, "Referral code must be 8 characters"],
      },
      referralCount: {
        type: Number,
        default: 0,
      },
      referralAccount: [{ username: String }],
      referralTotalAmount: {
        type: Number,
        default: 0,
      },
      referralAvailableAmount: {
        type: Number,
        default: 0,
      },
      referralWithDraw: {
        type: Number,
        default: 0,
      },
      referralWithDrawHistory: [
        {
          amount: {
            type: Number,
            default: 0,
          },
          status: {
            type: String,
            default: "Pending",
            enum: {
              values: ["Pending", "Success", "Failed"],
              message: "Status must be Pending, Success or Failed",
            },
          },
          timestamps: {
            type: Number,
            default: 0,
          },
        },
      ],
      referralStatus: {
        type: String,
        default: "Active",
        enum: {
          values: ["Active", "Inactive"],
          message: "Status must be Active or Inactive",
        },
      },
      referralWithDrawBank: {
        withDrawBankName: {
          type: String,
          default: "",
        },
        withDrawBankAccountName: {
          type: String,
          default: "",
        },
        withDrawBankAccountNumber: {
          type: String,
          default: "",
        },
        withDrawBankAccountVerified: {
          type: Boolean,
          default: false,
        },
      },
    },
    { timestamps: true }
  );

  referralSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Referral = mongoose.model("Referral", referralSchema);

  return Referral;
};
