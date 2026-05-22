import express from 'express';
import { StudentController } from './student.controller';
// 1. If any client/user request any endpoint, then first it reaches to the route.
// 2. It pass the request to middlewares (IF any)
// 3. It moves the HTTP request to controller. Controller handles the http requests and responses.
// 4. At last, controller calls the service. 
// 5. Inside the service, it handles the business logic like connecting with DB or calling the schema


const router = express.Router();

router.post('/add', StudentController.addNewStudent);
router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudentById);
router.delete('/delete/:studentId', StudentController.deleteStudentById);
router.put('/update/:studentId', StudentController.updateStudentById);

export const StudentRoutes = router;