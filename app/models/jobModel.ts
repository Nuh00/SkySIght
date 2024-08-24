import mongoose from "mongoose";

const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    company: {
      required: true,
      type: String,
    },
    location: {
      required: true,
      type: String,
    },
    salary: {
      required: true,
      type: Number,
    },
    status: {
      required: true,
      type: String,
    },
    appliedDate: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Job = mongoose.models?.Job || mongoose.model("Job", jobSchema);
