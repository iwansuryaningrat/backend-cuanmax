export default (mongoose) => {
  const Schema = mongoose.Schema;
  const servicesSchema = new Schema(
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
      status: {
        type: String,
        require: true,
        default: "Active",
        enum: {
          values: ["Active", "Inactive"],
          message: "Status must be Active or Inactive",
        },
      },
    },
    { timestamps: true }
  );

  servicesSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Services = mongoose.model("Services", servicesSchema);

  return Services;
};
