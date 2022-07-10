module.exports = (mongoose) => {
  const schema = mongoose.Schema(
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
        type: String,
        require: true,
      },
      playlist: {
        // playlistId: {
        //   type: schema.Types.ObjectId,
        //   ref: "Playlists",
        //   require: true,
        // },
        playlistTitle: {
          type: String,
          require: true,
        },
      },
      tags: [String],
      views: Number,
      likes: Number,
      dislikes: Number,
      duration: Number,
      category: String,
      date: Date,
      status: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Videos = mongoose.model("videos", schema);
  return Videos;
};
