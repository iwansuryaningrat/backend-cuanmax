export default (mongoose) => {
  const Schema = mongoose.Schema;
  const subscribersSchema = new Schema(
    {
      email: {
        type: String,
        require: true,
      },
      startDate: Date,
      endDate: Date,
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

  subscribersSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Subscribers = mongoose.model("Subscribers", subscribersSchema);

  return Subscribers;
};
