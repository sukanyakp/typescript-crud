import mongoose, { Document, Schema } from 'mongoose';

interface Student extends Document {
    name: string;
    age: number;
    email: string;
}

const studentsSchema = new Schema<Student>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    }
});

export default mongoose.model<Student>('Student', studentsSchema);