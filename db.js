const mongoose = require("mongoose");
const connectionString = "mongodb+srv://user1:user1pass@cluster0.hbwrn.mongodb.net/rental_agency?retryWrites=true&w=majority";

const Client = require("./models/client");
const Noleggio = require("./models/noleggi");
const Prodotto = require("./models/prod");
const Worker = require("./models/worker");

if (!connectionString) {
  console.error("MongoDB connection string missing!");
  process.exit(1);
}

mongoose.connect(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB error: " + err.message);
  process.exit;
});
db.once("open", () => console.log("mongoDB connection established"));

Client.find((err, stories) => {
  if (err) return console.error(err);
  //if (stories.length) return;

  new Client({
    name: "Maria",
    client_id: "123bbn4",
    password: "blabla",
  }).save();
});

Manager.find((err, stories) => {
  if (err) return console.error(err);
  //if (stories.length) return;

  new Manager({
    name: "Mario",
    password: "blubla",
  }).save();
});

Worker.find((err, stories) => {
  if (err) return console.error(err);
  //if (stories.length) return;

  new Worker({
    name: "Marco",
    password: "tututu",
  }).save();
});

Prodotto.find((err, stories) => {
  if (err) return console.error(err);
  //if (stories.length) return;

  new Prodotto({
    name: "Apollo",
    prod_id: "p94035jj",
    summary: "Bella ciao",
    power:"120",
    available: false
  }).save();
});

Noleggio.find((err, stories) => {
  if (err) return console.error(err);
  //if (stories.length) return;

  new Noleggio({
    prod_id: "p93292377g",
    client_id: "c9384hh",
    start_date: 2021-6-6,
    end_date: 2021-7-7
  }).save();
});

/*module.exports = {
  getUsers: async (options = {}) => User.find(options),
  saveUser: async (username, id) => {
    await User.updateOne({ id }, { username }, { upsert: true });
  },
  getStories: async (options = {}, fields = "") =>
    NewStory.find(options, fields),
  saveStory: async (storyname, adj, nodes, css, published) => {
    await NewStory.updateOne(
      { title: storyname },
      { pages: nodes.length + 1, adj, nodes, css, published },
      { upsert: true }
    );
  },
  deleteStory: async (options = {}) => {
    NewStory.deleteOne(options, function (err) {});
  },
  saveActiveUser: async (username, id, story, activity) => {
    await ActiveUser.updateOne(
      { id },
      { username, story, activity },
      { upsert: true }
    );
  },
  deleteActiveUser: async (options = {}) => {
    await ActiveUser.deleteOne(options);
  },
};*/