import mongoose, { Document, Schema } from 'mongoose';

export interface IPortfolio extends Document {
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link?: string;
  github?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  category: { type: String, required: true },
  technologies: [String],
  link: { type: String, required: false },
  github: { type: String, required: false },
  featured: { type: Boolean, default: false },
}, {
  timestamps: true,
});

export default mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);