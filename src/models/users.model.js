export default (mongoose) => {
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
      image: {
        imageName: {
          type: String,
        },
        imageLink: {
          type: String,
          default:
            "https://res.cloudinary.com/dzqbzqgjw/image/upload/v1599098981/default-user-image_qjqjqj.png",
        },
      },
      type: {
        accountType: {
          member: String,
          startDate: Date,
          endDate: Date,
          isNew: Boolean,
        },
        isAdmin: {
          type: Boolean,
          default: false,
          require: true,
        },
        isActivated: {
          type: Boolean,
          default: false,
          require: true,
        },
      },
      referal: {
        referalCode: {
          type: String,
          unique: true,
        },
        referalCount: Number,
        referalAccount: [{ username: String }],
        referalAmount: {
          type: Number,
          default: 0,
        },
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
