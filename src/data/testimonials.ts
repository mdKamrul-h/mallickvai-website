export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  imageUrl: string;
  featured: boolean;
  order: number;
}

export const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Ahmed Rahman',
    role: 'Industry Consultant',
    company: 'RMG Excellence Ltd.',
    content: 'Nazrul\'s leadership in operations management sets a benchmark for the industry. His ability to balance efficiency with employee welfare is truly remarkable.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE2NzYzODkwMTE4fDA&ixlib=rb-4.1.0&q=80&w=400',
    featured: true,
    order: 1
  },
  {
    id: '2',
    name: 'Sarah Williams',
    role: 'Supply Chain Director',
    company: 'Global Apparel Inc.',
    content: 'Working with Nazrul has been an exceptional experience. His dedication to quality and timely delivery makes Lantabur Group a trusted partner.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTY3NjM4OTAxMTl8MA&ixlib=rb-4.1.0&q=80&w=400',
    featured: true,
    order: 2
  },
  {
    id: '3',
    name: 'Kamal Hassan',
    role: 'CNBL Member',
    company: 'Notre Dame College Batch \'98',
    content: 'As a fellow Damian, I\'ve watched Nazrul contribute tirelessly to CNBL. His commitment to our community is an inspiration to us all.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBzbWlsZXxlbnwxfHx8fDE2NzYzODkwMTIwfDA&ixlib=rb-4.1.0&q=80&w=400',
    featured: true,
    order: 3
  }
];
