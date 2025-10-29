export interface Agent {
  id: string;
  name: string;
  link:string;
  shortDescription: string;
  createdBy: string;
  rating: number;
  usageCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'developer';
}
