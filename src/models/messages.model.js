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
      status: {
        type: String,
        require: true,
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Messages = mongoose.model("messages", schema);
  return Messages;
};
