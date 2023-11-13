import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: false,
            unique: true,
            trim: true,
            minlength: 1,
        },
        Image: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        Title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        Desc: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        Link: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        Github: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Project ||
    mongoose.model("Project", projectSchema);
