export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  imageUrl: string;
  featured: boolean;
  published: boolean;
}

export const defaultBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Leading Through Change: RMG Industry Evolution',
    excerpt: 'Exploring the transformation of Bangladesh\'s ready-made garment industry and the leadership principles that drive sustainable growth in a competitive global market.',
    content: `The ready-made garment (RMG) industry in Bangladesh has undergone remarkable transformation over the past two decades. As someone who has been part of this journey for over 25 years, I've witnessed firsthand how adaptation and innovation have become the cornerstones of success.

## The Evolution of Operations

Managing a workforce of 9,700+ employees requires more than just operational efficiency—it demands a deep understanding of human dynamics, supply chain complexities, and market trends. At Lantabur Group, we've consistently achieved monthly shipments exceeding $27 million by focusing on three key pillars:

1. **People-First Leadership**: Our team is our greatest asset
2. **Process Innovation**: Continuous improvement in manufacturing
3. **Quality Excellence**: Never compromising on standards

## Lessons from the Field

The challenges we face today are different from those of 1999 when I started my journey. Global competition, sustainability demands, and technological advancement have reshaped the industry landscape.

However, the fundamental principles remain unchanged: integrity, commitment, and excellence.`,
    author: 'Engr. M M Nazrul Islam',
    date: '2024-11-15',
    category: 'Leadership',
    tags: ['RMG Industry', 'Leadership', 'Operations', 'Manufacturing'],
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxlYWRlcnNoaXB8ZW58MXx8fHwxNjc2Mzg5MDExMXww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
    published: true
  },
  {
    id: '2',
    title: 'Building Community: 25 Years with CNBL',
    excerpt: 'Reflections on a quarter-century journey with the CNBL community, from early gatherings to becoming a pillar of Notre Dame alumni engagement.',
    content: `Community is more than just a network—it's a family bound by shared values and memories. My 25+ year journey with CNBL has been one of the most rewarding aspects of my life beyond the corporate world.

## The Power of Connection

What started as informal gatherings of Notre Dame College alumni has grown into a vibrant community of professionals, entrepreneurs, and leaders. CNBL represents the best of what collective action can achieve.

## Key Milestones

- **1999**: Early participation in CNBL activities
- **2005**: Active role in community building initiatives
- **2010**: Contributing to alumni engagement programs
- **2020**: Supporting the next generation of Damians

The relationships built through CNBL have enriched my life immeasurably, providing not just professional networks but lifelong friendships.`,
    author: 'Engr. M M Nazrul Islam',
    date: '2024-10-28',
    category: 'Community',
    tags: ['CNBL', 'Notre Dame', 'Community Building', 'Alumni'],
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmd8ZW58MXx8fHwxNjc2Mzg5MDEwOXww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
    published: true
  },
  {
    id: '3',
    title: 'The Notre Dame Legacy: Values That Shape Leaders',
    excerpt: 'How the principles learned at Notre Dame College continue to guide professional excellence and community service in today\'s world.',
    content: `Notre Dame College instilled in us more than academic knowledge—it shaped our character, values, and approach to life. As a proud member of Batch '99, I carry these lessons into every aspect of my professional and personal journey.

## Core Values from Notre Dame

The Damian spirit is characterized by:

- **Excellence in All Endeavors**: Striving for the highest standards
- **Service to Community**: Giving back and lifting others
- **Integrity and Honor**: Doing what's right, always
- **Lifelong Learning**: Never stopping the pursuit of knowledge

## Application in Industry

These principles have been instrumental in navigating the complex world of RMG operations. Whether managing large teams or making critical business decisions, the foundation laid at Notre Dame continues to guide my path.`,
    author: 'Engr. M M Nazrul Islam',
    date: '2024-09-20',
    category: 'Education',
    tags: ['Notre Dame', 'Values', 'Education', 'Leadership'],
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBjb2xsZWdlfGVufDF8fHx8MTY3NjM4OTAxMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
    published: true
  }
];
