module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: {
        type: String,
        require: true,
      },
      author: {
        type: String,
        require: true,
      },
      category: {
        type: String,
        require: true,
      },
      tags: {
        type: [String],
      },
      date: {
        type: Date,
        require: true,
      },
      cover: {
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
          type: String,
          require: true,
        },
      ],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const News = mongoose.model("news", schema);
  return News;
};
