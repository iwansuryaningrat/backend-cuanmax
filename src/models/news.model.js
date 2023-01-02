export default (mongoose) => {
  const Schema = mongoose.Schema;
  const newsSchema = new Schema(
    {
      title: {
        type: String,
        require: true,
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
      category: {
        type: String,
        require: true,
      },
      tags: [{ type: String }],
      date: {
        type: Date,
        require: true,
      },
      thumbnail: {
        photoName: {
          type: String,
        },
        photoLink: {
          type: String,
          require: true,
          default: "https://via.placeholder.com/150",
        },
      },
      body: [
        {
          paragraph: {
            type: String,
            require: true,
          },
        },
      ],
      status: {
        type: String,
        require: true,
        enum: {
          values: ["Draft", "Published", "Archived"],
          message: "Status must be Draft, Published or Archived",
        },
        default: "Draft",
      },
    },
    { timestamps: true }
  );

  newsSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const News = mongoose.model("News", newsSchema);

  return News;
};
