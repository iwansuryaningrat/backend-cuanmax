export default (mongoose) => {
  const Schema = mongoose.Schema;
  const videosSchema = new Schema(
    {
      title: {
        type: String,
        require: true,
      },
      description: String,
      url: {
        type: String,
        require: true,
      },
      thumbnail: {
        thumbnailName: {
          type: String,
          require: true,
        },
        thumbnailLink: {
          type: String,
          require: true,
          default: "example.jpg",
        },
      },
      playlist: {
        type: Schema.Types.ObjectId,
        ref: "Playlists",
        require: true,
      },
      tags: [String],
      views: Number,
      likes: Number,
      dislikes: Number,
      duration: Number,
      date: Date,
      status: {
        type: String,
        require: true,
        enum: {
          value: ["Draft", "Published", "Archived"],
          message: "Status must be Draft, Published or Archived",
        },
        default: "Draft",
      },
    },
    { timestamps: true }
  );

  videosSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Videos = mongoose.model("Videos", videosSchema);
  return Videos;
};
