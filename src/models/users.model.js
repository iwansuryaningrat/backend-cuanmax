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
      birthday: {
        type: String,
      },
      password: {
        type: String,
        require: true,
      },
      image: {
        imageName: {
          type: String,
          default: "default-profile-picture.png",
        },
        imageLink: {
          type: String,
          require: true,
          default:
            // "https://api.cuanmax.com/assets/images/default-profile-picture.png",
            "http://localhost:8080/assets/images/default-profile-picture.png",
        },
      },
      type: {
        accountType: {
          member: {
            type: String,
            default: "Basic Member",
          },
          subscription: {
            startAt: {
              type: Number,
              default: 0,
            },
            expiredAt: {
              type: Number,
              default: 0,
            },
          },
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Referral",
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
