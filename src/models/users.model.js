export default (mongoose) => {
  const Schema = mongoose.Schema;
  const usersSchema = new Schema(
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
      phone: {
        type: String,
      },
      address: {
        type: String,
      },
      gender: {
        type: String,
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
          isNew: {
            type: Boolean,
            default: true,
          },
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

  usersSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Users = mongoose.model("Users", usersSchema);

  return Users;
};
