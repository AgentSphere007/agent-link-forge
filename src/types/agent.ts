export interface Agent {
  id: string;
  model_name: string;
  link:string;
  shortDescription: string;
  createdBy: string;
  rating: number;
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'developer';
}
