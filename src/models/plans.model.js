export default (mongoose) => {
  const Schema = mongoose.Schema;
  const planSchema = new Schema(
    {
      planName: {
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
        default: "IDR",
      },
      features: [
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
      status: {
        type: String,
        require: true,
        default: "Active",
        enum: {
          values: ["Active", "Inactive"],
          message: "Status must be Active or Inactive",
        },
      },
    },
    { timestamps: true }
  );

  planSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Plans = mongoose.model("Plans", planSchema);

  return Plans;
};
