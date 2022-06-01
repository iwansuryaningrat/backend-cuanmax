module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      date: {
        type: String,
        require: true,
      },
      category: {
        type: String,
        require: true,
      },
      data: [
        {
          name: {
            type: String,
            require: true,
          },
          code: {
            type: String,
            require: true,
          },
          lastPrice: {
            type: Number,
            require: true,
          },
          buyArea: {
            buyLow: {
              type: Number,
              require: true,
            },
            buyHigh: {
              type: Number,
              require: true,
            },
          },
          sellLoss: {
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
        },
      ],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Watchlist = mongoose.model("watchlist", schema);
  return Watchlist;
};
