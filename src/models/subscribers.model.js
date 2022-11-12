export default (mongoose) => {
  const Schema = mongoose.Schema;
  const subscribersSchema = new Schema(
    {
      email: {
        type: String,
        require: true,
      },
      startDate: Date,
      status: String,
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
