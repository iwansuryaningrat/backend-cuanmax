export default (mongoose) => {
  const Schema = mongoose.Schema;
  const liveclassSchema = new Schema(
    {
      title: {
        type: String,
        require: true,
      },
      liveclassCode: {
        type: String,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
      description: {
        type: String,
        require: true,
      },
      category: {
        type: String,
        require: true,
      },
      tags: [
        {
          type: String,
          require: true,
        },
      ],
      date: {
        type: Date,
        require: true,
      },
      time: {
        type: String,
        require: true,
      },
      location: {
        type: String,
        require: true,
      },
      status: {
        type: String,
        require: true,
        enum: {
          values: ["Upcoming", "Closed", "Cancelled", "Ongoing", "Completed"],
          message:
            "Status must be Upcoming, Closed, Cancelled, Ongoing or Completed",
        },
        default: "Upcoming",
      },
      thumbnail: {
        imageName: {
          type: String,
        },
        imagePath: {
          type: String,
          require: true,
          default: "example.jpg",
        },
      },
      benefits: [
        {
          type: String,
          require: true,
        },
      ],
      participants: {
        participantsCount: {
          type: Number,
          require: true,
          default: 0,
        },
        participantsList: [
          {
            userID: {
              type: Schema.Types.ObjectId,
              ref: "Users",
            },
          },
        ],
      },
    },
    { timestamps: true }
  );

  liveclassSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Liveclass = mongoose.model("Liveclasses", liveclassSchema);

  return Liveclass;
};
