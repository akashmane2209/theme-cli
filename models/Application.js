const mongoose = require("mongoose");

const appSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    token: { type: String, required: true },
    currentTheme: { type: mongoose.Schema.ObjectId, ref: "theme" }
  },
  {
    timestamps: true
  }
);

const App = mongoose.model("app", appSchema);

module.exports = { App };
