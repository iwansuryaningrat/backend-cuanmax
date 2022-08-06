import db from "../models/index.js";

export default function connect() {
  db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Database connected!`);
    })
    .catch((err) => {
      console.log(`Cannot connect to database!`, err);
      process.exit();
    });
}

// export default connect;
