export interface Achievement {
  id: string;
  title: string;
  description: string;
  metric: string;
  icon: string;
  category: string;
  year?: string;
  order: number;
}

export const defaultAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Operational Excellence',
    description: 'Managing 9700+ workforce achieving $27M monthly shipments',
    metric: '$27M',
    icon: 'TrendingUp',
    category: 'Professional',
    year: '2024',
    order: 1
  },
  {
    id: '2',
    title: 'Industry Leadership',
    description: 'Sr. GM Operations at Lantabur Group, driving strategic growth',
    metric: '25+ Years',
    icon: 'Award',
    category: 'Professional',
    year: '1999-2024',
    order: 2
  },
  {
    id: '3',
    title: 'Community Building',
    description: 'Active CNBL member contributing to alumni network for over two decades',
    metric: '25+ Years',
    icon: 'Users',
    category: 'Community',
    year: '1999-2024',
    order: 3
  },
  {
    id: '4',
    title: 'Notre Dame Legacy',
    description: 'Proud Batch \'99 alumnus carrying forward the Damian spirit',
    metric: 'Batch \'99',
    icon: 'GraduationCap',
    category: 'Education',
    year: '1999',
    order: 4
  }
];
