
import mongoose from 'mongoose';

const ComponentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Component || mongoose.model('Component', ComponentSchema);
