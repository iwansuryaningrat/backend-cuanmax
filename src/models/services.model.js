export default (mongoose) => {
  const schema = mongoose.Schema(
    {
      serviceName: {
        type: String,
        require: true,
      },
      description: String,
      image: {
        imageName: {
          type: String,
        },
        imagePath: {
          type: String,
          require: true,
          default: "",
        },
      },
      benefits: [
        {
          benefitName: String,
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

  const Services = mongoose.model("services", schema);
  return Services;
};
