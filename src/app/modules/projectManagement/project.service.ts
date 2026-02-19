
import { TProject } from "./project.interface";
import { Project } from "./project.model";
import { upstashRedis } from '../../utils/upstashRedis';

const PROJECTS_CACHE_KEY = 'projects:all';

const refreshProjectsCache = async () => {
  const latestProjects = await Project.find();
  await upstashRedis.setToCache(PROJECTS_CACHE_KEY, latestProjects);
};

const addProjectDataIndoDB = async (payload: TProject) => {
  const result = await Project.create(payload);
  await refreshProjectsCache();
  return result;
};

const getAllProjectDataFromDB = async () => {
  const cachedProjects = await upstashRedis.getFromCache<TProject[]>(PROJECTS_CACHE_KEY);
  if (cachedProjects) {
    return cachedProjects;
  }

  const result = await Project.find();
  await upstashRedis.setToCache(PROJECTS_CACHE_KEY, result);
  return result;
};

const deletedProjectIntoDB = async (id: string) => {
  const result = await Project.findByIdAndDelete(id);
  await refreshProjectsCache();
  return result;
};
const updateProjectIntoDB = async (id: string, projectInfo: Partial<TProject>) => {
  const result = await Project.findByIdAndUpdate(
  id,
  { ...projectInfo },
  { new: true }
);
  await refreshProjectsCache();
  return result;
};
export const projectServices = {
    addProjectDataIndoDB,
    getAllProjectDataFromDB,
    deletedProjectIntoDB,
    updateProjectIntoDB
};
