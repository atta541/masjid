import mongoose, { Document, Schema } from 'mongoose';

export interface IFAQ extends Document {
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}

const FAQSchema = new Schema<IFAQ>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.FAQ || mongoose.model<IFAQ>('FAQ', FAQSchema);

