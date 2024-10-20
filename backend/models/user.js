import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  regno: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: false, // If department is not required for all, mark it optional
  }
});

// Hash password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// Compare password for login
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// This will ensure confirmPassword is not stored in the database
UserSchema.virtual('confirmPassword').get(function () {
  return this._confirmPassword;
}).set(function (value) {
  this._confirmPassword = value;
});

const User = mongoose.model('User', UserSchema);
export default User;
