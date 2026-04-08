import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 1,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      // Increased to 100 because bcrypt hashes are ~60 characters. 
      // 50 was too short and would have caused a validation error!
      maxLength: 100, 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Fixed: Removed 'next' because we are using an async function.
// In modern Mongoose, async hooks don't need the next() callback.
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    throw new Error("Password hashing failed");
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);