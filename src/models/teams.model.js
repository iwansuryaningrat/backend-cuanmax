export default (mongoose) => {
  const schema = mongoose.Schema(
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
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Teams = mongoose.model("teams", schema);
  return Teams;
};
