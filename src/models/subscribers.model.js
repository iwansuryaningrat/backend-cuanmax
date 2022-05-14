module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      email: String,
      startDate: Date,
      endDate: Date,
      status: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Subscribers = mongoose.model("subscribers", schema);
  return Subscribers;
};
