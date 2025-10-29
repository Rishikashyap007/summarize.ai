import mongoose, { Schema } from "mongoose";

export interface IPdfSummary extends Document {
  user: mongoose.Types.ObjectId;
  original_file_url: string;
  summary_text: string;
  title: string;
  file_name: string;
  shareable_link: string;
  isPublic: boolean;
  createdAt: Date;
}

const pdfSummarySchema = new Schema(
  {
    original_file_url: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    summary_text: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
    },
    file_name: {
      type: String,
      required: true,
    },
    shareable_link: {
      type: String,
      default: "",
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const pdfSummary =
  mongoose.models.pdfSummary || mongoose.model<IPdfSummary>("pdfSummary", pdfSummarySchema);

export default pdfSummary;
