export interface Agent {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  icon: string;
  createdBy: string;
  rating: number;
  usageCount: number;
  tags: string[];
  isActive: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'developer';
}
