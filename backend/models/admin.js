import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminSchema = new mongoose.Schema({
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
    unique: true, // Assuming registration number should be unique
  },
  department: {
    type: String,
    required: false, // Marked as optional
  },
  roleType: {
    type: String,
    required: true, // Assuming roleType is mandatory
  },
});

// Hash password before saving the admin
AdminSchema.pre('save', async function (next) {
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
AdminSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// This will ensure confirmPassword is not stored in the database
AdminSchema.virtual('confirmPassword').get(function () {
  return this._confirmPassword;
}).set(function (value) {
  this._confirmPassword = value;
});

// Create the Admin model
const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
