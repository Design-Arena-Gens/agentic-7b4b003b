import mongoose, { Document, Schema } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category: string;
  level: number;
  icon?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      min: 1,
      max: 100,
      default: 50,
    },
    icon: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);
