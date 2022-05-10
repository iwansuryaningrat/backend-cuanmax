module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      username: String,
      email: String,
      password: String,
      image: String,
      type: {
        accountType: {
          member: String,
          startDate: Date,
          endDate: Date,
        },
        isAdmin: Boolean,
      },
      referal: {
        referalCode: String,
        referalLink: String,
        referalCount: Number,
        referalAccount: [{ username: String }],
      },
    },
    {
      timestamp: true,
    }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Profiles = mongoose.model("profiles", schema);
  return Profiles;
};
