
import express from 'express';
import * as studentsController from '../controller/studentcontroller';

const router = express.Router();

router.get('/', studentsController.fetchAllStudents);
router.post('/create', studentsController.addStudents);
router.post('/update', studentsController.editStudents);
router.get('/student/:studentId', studentsController.fetchStudent);
router.delete('/student/:studentId', studentsController.deleteStudent);

export default router;