module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      category: String,
      description: String,
      image: String,
      count: Number,
    },
    { timestamp: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Playlist = mongoose.model("playlist", schema);
  return Playlist;
};
