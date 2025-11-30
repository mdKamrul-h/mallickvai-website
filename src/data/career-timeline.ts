export interface CareerEvent {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  type: 'professional' | 'education' | 'community';
  order: number;
}

export const defaultCareerTimeline: CareerEvent[] = [
  {
    id: '1',
    year: '2020 - Present',
    title: 'Sr. GM Operations',
    company: 'Lantabur Group',
    description: 'Leading operations across multiple facilities, managing 9700+ workforce, and achieving consistent $27M monthly shipments through strategic planning and team development.',
    type: 'professional',
    order: 1
  },
  {
    id: '2',
    year: '2015 - 2020',
    title: 'General Manager Operations',
    company: 'Lantabur Group',
    description: 'Scaled operations significantly, implemented quality management systems, and drove efficiency improvements across the production chain.',
    type: 'professional',
    order: 2
  },
  {
    id: '3',
    year: '2010 - 2015',
    title: 'Deputy General Manager',
    company: 'Lantabur Group',
    description: 'Managed production units, optimized workflows, and established strong vendor relationships to ensure supply chain reliability.',
    type: 'professional',
    order: 3
  },
  {
    id: '4',
    year: '2005 - 2010',
    title: 'Production Manager',
    company: 'Lantabur Group',
    description: 'Oversaw daily manufacturing operations, quality control, and team coordination for multiple production lines.',
    type: 'professional',
    order: 4
  },
  {
    id: '5',
    year: '1999 - 2005',
    title: 'Production Engineer',
    company: 'RMG Sector',
    description: 'Started career in the RMG industry, learning the fundamentals of garment manufacturing and operations management.',
    type: 'professional',
    order: 5
  },
  {
    id: '6',
    year: '1999',
    title: 'Graduated from Notre Dame College',
    company: 'Notre Dame College Dhaka',
    description: 'Completed higher secondary education as part of the prestigious Batch \'99, building foundations in science and engineering.',
    type: 'education',
    order: 6
  },
  {
    id: '7',
    year: '1999 - Present',
    title: 'CNBL Active Member',
    company: 'CNBL Community',
    description: '25+ years of continuous engagement with the Notre Dame alumni community, contributing to events, networking, and community building initiatives.',
    type: 'community',
    order: 7
  }
];
