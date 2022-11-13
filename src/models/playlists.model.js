export default (mongoose) => {
  const Schema = mongoose.Schema;
  const playlistSchema = new Schema(
    {
      name: {
        type: String,
        require: true,
      },
      category: {
        type: String,
        require: true,
        enum: ["Stock", "Crypto", "Money Management", "Trading Psychology"],
      },
      description: String,
      instructor: {
        type: String,
        require: true,
      },
      videoLevel: {
        type: String,
        require: true,
        enum: ["Beginner", "Intermediate", "Advanced"],
      },
      image: {
        imageName: {
          type: String,
        },
        imageLink: {
          type: String,
          require: true,
          default: "https://via.placeholder.com/150",
        },
      },
      videoCount: Number,
      status: {
        type: String,
        require: true,
        enum: ["Draft", "Published", "Archived"],
        default: "Draft",
      },
    },
    { timestamps: true }
  );

  playlistSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Playlists = mongoose.model("Playlists", playlistSchema);

  return Playlists;
};
