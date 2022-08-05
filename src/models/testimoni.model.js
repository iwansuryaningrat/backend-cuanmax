export default (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        require: true,
      },
      position: {
        type: String,
        require: true,
      },
      company: {
        type: String,
        require: true,
      },
      body: {
        type: String,
        require: true,
      },
      photosUrl: {
        type: String,
        require: true,
        default: "",
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Testimoni = mongoose.model("testimoni", schema);
  return Testimoni;
};
