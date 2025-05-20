import { model, Schema } from 'mongoose';
import { TProject } from './project.interface';

const ProjectSchema = new Schema<TProject>({
  title: { type: String, required: true },
  live_link: { type: String, required: true },
  client_link: { type: String, required: true },
  server_link: { type: String, required: true },
  short_description: { type: String, required: true },
  long_description: { type: String, required: true },
  technology: { type: String, required: true },
  image: { type: String, required: true },
 
});

export const Project = model<TProject>('Project', ProjectSchema);
