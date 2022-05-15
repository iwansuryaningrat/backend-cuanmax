module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      memberName: String,
      duration: String,
      price: Number,
      discountPrice: Number,
      currency: String,
      feature: [{ name: String, status: Boolean }],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Pricing = mongoose.model("pricing", schema);
  return Pricing;
};
