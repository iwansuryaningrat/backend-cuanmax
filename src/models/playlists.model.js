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
        type: String,
        default:
          "https://res.cloudinary.com/dzqbzqgjw/image/upload/v1589788981/default-profile-picture_zqxqjy.png",
      },
      videoCount: Number,
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
