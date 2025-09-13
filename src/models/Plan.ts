import mongoose, { Document, Schema } from 'mongoose';

export interface IPlan extends Document {
  projectName: string;
  description: string;
  totalAmount: number;
  image: string;
  category: string; // e.g., "Education", "Healthcare", "Infrastructure", "Emergency Relief"
  targetAmount?: number; // Optional target amount for fundraising
  isActive: boolean;
  isYearly: boolean; // Add this property for plan type filtering
  createdAt: Date;
  updatedAt: Date;
}

const PlanSchema = new Schema<IPlan>({
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  targetAmount: { type: Number, required: false },
  isActive: { type: Boolean, default: true },
  isYearly: { type: Boolean, default: false },
}, {
  timestamps: true,
});

// Clear the model cache to ensure new schema is used
if (mongoose.models.Plan) {
  delete (mongoose.models as any).Plan;
}

// Also clear any existing connection models
if (mongoose.connection.models.Plan) {
  delete (mongoose.connection.models as any).Plan;
}

export default mongoose.model<IPlan>('Plan', PlanSchema);

