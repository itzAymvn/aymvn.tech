import mongoose from "mongoose";

const skillSchema = mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        skills: {
            type: Array,
            required: true,
            unique: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Skill || mongoose.model("Skill", skillSchema);
