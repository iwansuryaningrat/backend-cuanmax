export default (mongoose) => {
  const Schema = mongoose.Schema;
  const watchlistSchema = new Schema(
    {
      name: {
        type: String,
        require: true,
      },
      code: {
        type: String,
        require: true,
      },
      category: {
        type: String,
        require: true,
      },
      tags: {
        type: [String],
      },
      sector: {
        type: String,
      },
      lastPrice: {
        type: Number,
        require: true,
      },
      buyArea: {
        type: Number,
        require: true,
      },
      stopLoss: {
        type: Number,
        require: true,
      },
      takeProfit: {
        TP1: {
          type: Number,
          require: true,
        },
        TP2: {
          type: Number,
          require: true,
        },
        TP3: {
          type: Number,
          require: true,
        },
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  );

  watchlistSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Watchlist = mongoose.model("Watchlists", watchlistSchema);

  return Watchlist;
};
