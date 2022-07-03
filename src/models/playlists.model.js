module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        require: true,
      },
      category: {
        type: String,
        require: true,
      },
      description: String,
      instructor: {
        type: String,
        require: true,
      },
      videoLevel: {
        type: String,
        require: true,
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
        default: "active",
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Playlists = mongoose.model("playlists", schema);
  return Playlists;
};
