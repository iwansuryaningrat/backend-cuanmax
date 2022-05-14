module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: String,
      description: String,
      url: String,
      image: String,
      playlist: {
        id: String,
        name: String,
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
