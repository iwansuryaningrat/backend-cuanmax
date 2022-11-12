export default (mongoose) => {
  const Schema = mongoose.Schema;
  const TestimoniSchema = new Schema(
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

  TestimoniSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Testimoni = mongoose.model("Testimoni", TestimoniSchema);

  return Testimoni;
};
