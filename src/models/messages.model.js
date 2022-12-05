export default (mongoose) => {
  const Schema = mongoose.Schema;
  const messagesSchema = new Schema(
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
        enum: {
          values: ["Unread", "Read", "Replied"],
          message: "Status must be Unread, Read, or Replied",
        },
        default: "Unread",
      },
    },
    { timestamps: true }
  );

  messagesSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Messages = mongoose.model("Messages", messagesSchema);

  return Messages;
};
