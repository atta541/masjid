import mongoose, { Document, Schema } from 'mongoose';

export interface ITechnology extends Document {
  base: string;
  styling: string;
  createdAt: Date;
  updatedAt: Date;
}

const TechnologySchema = new Schema<ITechnology>({
  base: { type: String, required: true },
  styling: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Technology || mongoose.model<ITechnology>('Technology', TechnologySchema);

