module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      category: String,
      description: String,
      image: String,
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
