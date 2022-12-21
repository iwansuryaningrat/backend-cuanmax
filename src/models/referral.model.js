export default (mongoose) => {
  const Schema = mongoose.Schema;
  const referralsSchema = new Schema(
    {
      referralCode: {
        type: String,
        required: true,
        unique: true,
        maxLength: [8, "Referral code must be 8 characters"],
      },
      referralUser: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        require: true,
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
      referralWithDrawCount: {
        type: Number,
        default: 0,
      },
      referralWithDrawHistory: [
        {
          withDrawAmount: {
            type: Number,
            default: 0,
          },
          withDrawStatus: {
            type: String,
            default: "Pending",
            enum: {
              values: ["Pending", "Approved", "Rejected", "Success", "Failed"],
              message: "Status must be Pending, Success or Failed",
            },
          },
          withDrawDate: {
            type: Number,
            default: 0,
          },
        },
      ],
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
      referralStatus: {
        type: String,
        default: "Active",
        enum: {
          values: ["Active", "Inactive"],
          message: "Status must be Active or Inactive",
        },
      },
    },
    { timestamps: true }
  );

  referralsSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Referrals = mongoose.model("Referrals", referralsSchema);

  return Referrals;
};
