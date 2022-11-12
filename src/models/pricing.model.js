export default (mongoose) => {
  const Schema = mongoose.Schema;
  const pricingSchema = new Schema(
    {
      memberName: {
        type: String,
        require: true,
      },
      duration: {
        type: String,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
      discountPrice: {
        type: Number,
      },
      currency: {
        type: String,
        require: true,
      },
      feature: [
        {
          name: {
            type: String,
            require: true,
          },
          status: {
            type: Boolean,
            require: true,
          },
        },
      ],
    },
    { timestamps: true }
  );

  pricingSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Pricing = mongoose.model("Pricing", pricingSchema);

  return Pricing;
};
