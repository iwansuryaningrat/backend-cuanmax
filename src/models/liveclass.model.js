module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: {
        type: String,
        require: true,
      },
      description: {
        type: String,
        require: true,
      },
      date: {
        type: Date,
        require: true,
      },
      time: {
        type: String,
        require: true,
      },
      location: {
        type: String,
        require: true,
      },
      status: {
        type: String,
        require: true,
      },
      cover: {
        imageName: {
          type: String,
        },
        imagePath: {
          type: String,
          require: true,
          default: "",
        },
      },
      participants: [
        {
          email: {
            type: String,
          },
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

  const Liveclass = mongoose.model("liveclass", schema);
  return Liveclass;
};
