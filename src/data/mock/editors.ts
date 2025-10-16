export interface EditorItem {
  id: string;
  name: string;
  email: string;
  rating: number;
  completedProjects: number;
  activeProjects: number;
}

export const mockEditors: EditorItem[] = [
  {
    id: 'e1',
    name: 'Phạm Minh Đức',
    email: 'duc.editor@studio.vn',
    rating: 4.8,
    completedProjects: 42,
    activeProjects: 3,
  },
  {
    id: 'e2',
    name: 'Ngô Thảo My',
    email: 'my.editor@studio.vn',
    rating: 4.9,
    completedProjects: 55,
    activeProjects: 2,
  },
  {
    id: 'e3',
    name: 'Trịnh Gia Huy',
    email: 'huy.editor@studio.vn',
    rating: 4.7,
    completedProjects: 36,
    activeProjects: 4,
  },
];


