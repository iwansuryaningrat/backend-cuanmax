module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      firstName: {
        type: String,
        require: true,
      },
      lastName: String,
      email: {
        type: String,
        require: true,
      },
      subject: {
        type: String,
        require: true,
      },
      message: {
        type: String,
        require: true,
      },
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
