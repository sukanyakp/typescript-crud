import { SuiteContext } from 'node:test';
import Student from '../models/studentsModel';
import { Request, Response } from 'express';

export const fetchAllStudents = async (req: Request, res: Response) => {
    try {
        const students = await Student.find();
        res.render('students', { students });
    } catch (error) {
        console.log(error);
    }
};

export const addStudents = async (req: Request, res: Response) => {
    try {
        const { name, email, age } = req.body;
        const student = new Student({
            name: name,
            email: email,
            age: age
        });

        // let alreadyExist = await Student.findOne({ email });
        const newStudent = await student.save();
        if (newStudent) {
            res.status(200).json({ success: true, message: 'Data added succesfully' });
        } else {
            res.status(400).json({ success: false, message: 'Failed to add data' });
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchStudent = async (req: Request, res: Response) => {
    try {
        let student = await Student.findOne({_id: req.params.studentId });
        console.log('Request params studentId: ', req.params.studentId);
        console.log('fetch student : ', student);
        res.status(200).json(student);
    } catch (error) {
        console.log(error);
    }
};

export const editStudents = async (req: Request, res: Response) => {
    try {
        const { name, email, age, id } = req.body;
        console.log('EDIT DATA : ', req.body);
        console.log('ID :', req.body.id);
        const updateStudents = await Student.findByIdAndUpdate(id, {
            $set: {
                name: name,
                email: email,
                age: age
            }
        }, { new: true });
        console.log('UPDATED DATA : ', updateStudents);
        if (updateStudents) {
            res.status(200).json({ success: true, message: 'data updated successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Error updating data' });
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        await Student.findByIdAndDelete(req.params.studentId);
        res.status(200).json('Deleted successfully');
    } catch (error) {
        console.log(error);
    }
};