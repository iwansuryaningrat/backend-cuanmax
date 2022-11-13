export default (mongoose) => {
  const Schema = mongoose.Schema;
  const teamsSchema = new Schema(
    {
      name: {
        type: String,
        require: true,
      },
      description: {
        type: String,
      },
      position: {
        type: String,
        require: true,
      },
      photo: {
        photoName: {
          type: String,
        },
        photoLink: {
          type: String,
        },
      },
      contact: {
        instagram: String,
        twitter: String,
        linkedin: String,
        email: String,
      },
      status: {
        type: String,
        require: true,
        enum: {
          value: ["Active", "Inactive"],
          message: "Status must be Active or Inactive",
        },
        default: "Active",
      },
    },
    { timestamps: true }
  );

  teamsSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Teams = mongoose.model("Teams", teamsSchema);

  return Teams;
};
