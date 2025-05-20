
import { TProject } from "./project.interface";
import { Project } from "./project.model";

const addProjectDataIndoDB = async (payload: TProject) => {
  const result = await Project.create(payload);
  return result;
};

const getAllProjectDataFromDB = async () => {
  const result = await Project.find();
  return result;
};

const deletedProjectIntoDB = async (id: string) => {
  const result = await Project.findByIdAndDelete(id);
  return result;
};
const updateProjectIntoDB = async (id: string, projectInfo: Partial<TProject>) => {
  const result = await Project.findByIdAndUpdate(id, { ...projectInfo });
  return result;
};
export const projectServices = {
    addProjectDataIndoDB,
    getAllProjectDataFromDB,
    deletedProjectIntoDB,
    updateProjectIntoDB
};
