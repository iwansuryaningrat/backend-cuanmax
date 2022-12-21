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
        enum: {
          values: ["Stock", "Crypto", "Money Management", "Trading Psychology"],
          message:
            "Category must be Stock, Crypto, Money Management, or Trading Psychology",
        },
      },
      description: String,
      instructor: {
        type: String,
        require: true,
      },
      videoLevel: {
        type: String,
        require: true,
        enum: {
          values: ["Beginner", "Intermediate", "Advanced"],
          message: "Level must be Beginner, Intermediate, or Advanced",
        },
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
      videoCount: {
        type: Number,
        require: true,
        default: 0,
      },
      status: {
        type: String,
        require: true,
        enum: {
          values: ["Draft", "Published", "Archived"],
          message: "Status must be Draft, Published or Archived",
        },
        default: "Published",
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
