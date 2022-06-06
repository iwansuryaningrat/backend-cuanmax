module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
      },
      username: {
        type: String,
        require: true,
        unique: true,
      },
      email: {
        type: String,
        require: true,
        unique: true,
      },
      password: {
        type: String,
        require: true,
      },
      imageLink: {
        type: String,
        default:
          "https://res.cloudinary.com/dzqbzqgjw/image/upload/v1589788981/default-profile-picture_zqxqjy.png",
      },
      type: {
        accountType: {
          member: String,
          startDate: Date,
          endDate: Date,
        },
        isAdmin: Boolean,
      },
      referal: {
        referalCode: {
          type: String,
          unique: true,
        },
        referalCount: Number,
        referalAccount: [{ username: String }],
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Users = mongoose.model("users", schema);
  return Users;
};
