import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
  // Info for list view
  title: { type: String, required: true },
  year: { type: String, required: true },
  tags: [{ type: String }],
  description: { type: String, required: true },
  projectImageUrl: { type: String },
  // Info for detailed individual page
  detailedDesc: { type: String, required: true },
  techStackImageUrl: { type: String },
  techStackExps:  [{ type: String }],
  contributionImageUrl: { type: String },
  contributionExps: [{ type: String }],
  btns: [{
    btnName: { type: String },
    url: {type: String}
  }]
});

export const Work = mongoose.model("Work", workSchema);