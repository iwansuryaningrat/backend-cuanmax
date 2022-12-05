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
      testimoni: {
        type: String,
        require: true,
      },
      photosUrl: {
        type: String,
        require: true,
        default:
          // "https://api.cuanmax.com/assets/images/default-profile-picture.png",
          "http://localhost:8080/assets/images/default-profile-picture.png",
      },
      status: {
        type: String,
        require: true,
        enum: {
          values: ["Active", "Inactive"],
          message: "Status must be Active or Inactive",
        },
        default: "Active",
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
