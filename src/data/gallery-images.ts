export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  date: string;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export const defaultGalleryImages: GalleryImage[] = [
  {
    id: '1',
    title: 'CNBL Annual Gathering 2024',
    description: 'Community members celebrating another successful year of collaboration and growth',
    imageUrl: 'https://images.unsplash.com/photo-1762006222425-cb6e6b5045f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjM4NzcwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Community',
    tags: ['CNBL', 'Event', 'Community'],
    date: '2024-11-01',
    featured: true
  },
  {
    id: '2',
    title: 'Factory Operations Excellence',
    description: 'State-of-the-art manufacturing facility driving quality production',
    imageUrl: 'https://images.unsplash.com/photo-1748347568194-c8cd8edd27da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwaW5kdXN0cmlhbCUyMG9wZXJhdGlvbnN8ZW58MXx8fHwxNjc2Mzg5MDEwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Professional',
    tags: ['Operations', 'Manufacturing', 'RMG'],
    date: '2024-10-15',
    featured: false
  },
  {
    id: '3',
    title: 'Leadership Summit',
    description: 'Strategic planning session with industry leaders',
    imageUrl: 'https://images.unsplash.com/photo-1564069970419-0bc8e7b487da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJzaGlwJTIwaGFuZHNoYWtlJTIwdGVhbXdvcmt8ZW58MXx8fHwxNjc2Mzg5MDEwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Professional',
    tags: ['Leadership', 'Business', 'Strategy'],
    date: '2024-09-28',
    featured: false
  },
  {
    id: '4',
    title: 'Team Collaboration Workshop',
    description: 'Fostering teamwork and innovation across departments',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMG1lZXRpbmclMjBkaXNjdXNzaW9ufGVufDF8fHx8MTY3NjM4OTAxMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Professional',
    tags: ['Teamwork', 'Training', 'Development'],
    date: '2024-08-20',
    featured: false
  },
  {
    id: '5',
    title: 'Notre Dame Alumni Meet',
    description: 'Reconnecting with fellow Batch \'99 alumni and sharing memories',
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3RyZSUyMGRhbWUlMjBjb2xsZWdlfGVufDF8fHx8MTY3NjM4OTAxMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Community',
    tags: ['Notre Dame', 'Alumni', 'Education'],
    date: '2024-07-15',
    featured: false
  },
  {
    id: '6',
    title: 'Industry Conference 2024',
    description: 'Presenting insights on operational excellence in the RMG sector',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNjc2Mzg5MDExMXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Professional',
    tags: ['Conference', 'Industry', 'Speaking'],
    date: '2024-06-10',
    featured: false
  },
  {
    id: '7',
    title: 'Team Building Success',
    description: 'Building strong relationships across the organization',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29yayUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNjc2Mzg5MDExMnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Professional',
    tags: ['Team', 'Culture', 'Collaboration'],
    date: '2024-05-22',
    featured: false
  },
  {
    id: '8',
    title: 'CNBL Social Gathering',
    description: 'Informal meetup strengthening community bonds',
    imageUrl: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBnYXRoZXJpbmclMjBmcmllbmRzfGVufDF8fHx8MTY3NjM4OTAxMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Community',
    tags: ['CNBL', 'Social', 'Networking'],
    date: '2024-04-18',
    featured: false
  },
  {
    id: '9',
    title: 'Quality Assurance Review',
    description: 'Ensuring excellence in every aspect of production',
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFsaXR5JTIwY29udHJvbCUyMGluc3BlY3Rpb258ZW58MXx8fHwxNjc2Mzg5MDExNHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Professional',
    tags: ['Quality', 'Standards', 'Excellence'],
    date: '2024-03-25',
    featured: false
  },
  {
    id: '10',
    title: 'Community Service Initiative',
    description: 'Giving back to the community through collaborative efforts',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzZXJ2aWNlJTIwdm9sdW50ZWVyfGVufDF8fHx8MTY3NjM4OTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Community',
    tags: ['Service', 'CSR', 'Impact'],
    date: '2024-02-14',
    featured: false
  },
  {
    id: '11',
    title: 'Innovation Workshop',
    description: 'Exploring new technologies and methodologies in manufacturing',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc2hvcCUyMGlubm92YXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTY3NjM4OTAxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Professional',
    tags: ['Innovation', 'Technology', 'Workshop'],
    date: '2024-01-30',
    featured: false
  },
  {
    id: '12',
    title: 'Milestone Celebration',
    description: 'Celebrating achievements and looking forward to future success',
    imageUrl: 'https://images.unsplash.com/photo-1530099486328-e021101a494a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxlYnJhdGlvbiUyMHN1Y2Nlc3MlMjB0ZWFtfGVufDF8fHx8MTY3NjM4OTAxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Professional',
    tags: ['Celebration', 'Achievement', 'Success'],
    date: '2023-12-20',
    featured: false
  }
];
