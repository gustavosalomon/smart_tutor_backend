
import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  lessonId: Number,
  title: String,
  duration: Number // en minutos
});

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  lessons: [lessonSchema]
});

export default mongoose.model('Subject', subjectSchema);
