export default (mongoose) => {
  const Schema = mongoose.Schema;
  const repliedMessagesSchema = new Schema(
    {
      messageId: {
        type: Schema.Types.ObjectId,
        ref: "Messages",
        require: true,
      },
      adminId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        require: true,
      },
      message: {
        type: String,
        require: true,
      },
    },
    { timestamps: true }
  );

  repliedMessagesSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const RepliedMessages = mongoose.model(
    "repliedMessages",
    repliedMessagesSchema
  );

  return RepliedMessages;
};
