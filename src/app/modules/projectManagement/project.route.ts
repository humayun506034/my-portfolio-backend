import express from 'express';
import { projectController } from './project.controller';

const router = express.Router();

router.post('/add-project',projectController.addProjectData);
router.get('/', projectController.getAllProjectData);
router.delete('/delete-project', projectController.deleteProjectData);
router.put('/update-project', projectController.updateProjectData);

export const projectRoutes = router;
