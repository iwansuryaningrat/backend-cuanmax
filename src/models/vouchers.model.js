module.exports = (mongoose) => {
  const schema = mongoose.Schema(
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
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Vouchers = mongoose.model("vouchers", schema);
  return Vouchers;
};
