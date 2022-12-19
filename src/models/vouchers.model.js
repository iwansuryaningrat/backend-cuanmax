export default (mongoose) => {
  const Schema = mongoose.Schema;
  const vouchersSchema = new Schema(
    {
      voucherCode: {
        type: String,
        unique: true,
        require: true,
      },
      voucherName: {
        type: String,
        require: true,
      },
      voucherDescription: String,
      voucherDiscount: {
        type: Number,
        require: true,
      },
      voucherQuota: {
        type: Number,
        require: true,
      },
      voucherType: {
        type: String,
        require: true,
        enum: {
          values: ["Liveclass", "Membership", "Both"],
          message: "Voucher type must be Percentage or Nominal",
        },
      },
      forNewUSer: {
        type: Boolean,
        default: true,
      },
      status: {
        type: String,
        require: true,
        enum: {
          values: ["Active", "Inactive"],
          message: "Status must be Active or Inactive",
        },
        default: "Active",
      },
    },
    { timestamps: true }
  );

  vouchersSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Vouchers = mongoose.model("Vouchers", vouchersSchema);

  return Vouchers;
};
