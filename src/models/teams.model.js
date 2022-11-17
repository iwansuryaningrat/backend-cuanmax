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
          default: "default-profile-picture.png",
        },
        photoLink: {
          type: String,
          require: true,
          default:
            // "https://api.cuanmax.com/assets/images/default-profile-picture.png",
            "http://localhost:8080/assets/images/default-profile-picture.png",
        },
      },
      contact: {
        instagram: {
          type: String,
          default: "",
        },
        twitter: {
          type: String,
          default: "",
        },
        linkedin: {
          type: String,
          default: "",
        },
        email: {
          type: String,
          default: "",
        },
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

  teamsSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Teams = mongoose.model("Teams", teamsSchema);

  return Teams;
};
