import mongoose, { Document, Schema } from 'mongoose';

export interface IFeature {
  title: string;
  description: string;
}

export interface IService extends Document {
  icon: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  detail: string;
  features: IFeature[];
  createdAt: Date;
  updatedAt: Date;
}

const FeatureSchema = new Schema<IFeature>({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const ServiceSchema = new Schema<IService>({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: false },
  description: { type: String, required: true },
  detail: { type: String, required: true },
  features: [FeatureSchema],
}, {
  timestamps: true,
});

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
