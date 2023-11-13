import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Create the user schema
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        password: {
            type: String,
            trim: true,
            required: true,
            minlength: 6,
        },
        email: {
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

// Before saving the user, hash the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { // If the password is not modified, skip this
        next();
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);

    // Set the password to the hashed password
    this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.models.User || mongoose.model("User", userSchema);
