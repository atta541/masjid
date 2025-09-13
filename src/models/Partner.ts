import mongoose, { Document, Schema } from 'mongoose';

export interface IPartner extends Document {
  image: string;
  name?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PartnerSchema = new Schema<IPartner>({
  image: { type: String, required: true },
  name: { type: String },
  website: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.Partner || mongoose.model<IPartner>('Partner', PartnerSchema);
