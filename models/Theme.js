const mongoose = require("mongoose");

function toLower(v) {
  return v.toLowerCase();
}

const themeSchema = new mongoose.Schema(
  {
    application: { type: mongoose.Schema.ObjectId, ref: "app" },
    header: { type: Object, required: true },
    footer: { type: Object, required: true },
    productListing: {
      type: Object,
      default: { is_active: false, template: "" }
    },
    productDescription: {
      type: Object,
      required: true,
      default: { is_active: false, template: "" }
    },
    group: { type: String, required: true, set: toLower },
    name: { type: String, required: true, set: toLower }
  },
  {
    timestamps: true
  }
);

const Theme = mongoose.model("theme", themeSchema);

module.exports = { Theme };
