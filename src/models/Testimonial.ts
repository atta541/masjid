import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  review: string;
  name: string;
  post: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>({
  review: { type: String, required: true },
  name: { type: String, required: true },
  post: { type: String, required: true },
  image: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

