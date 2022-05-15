module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      firstName: String,
      lastName: String,
      email: String,
      subject: String,
      message: String,
      status: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Message = mongoose.model("message", schema);
  return Message;
};
