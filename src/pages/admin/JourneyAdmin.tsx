import { useState, useEffect } from 'react';
import { Upload, Camera, Save, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadImage, deleteImage, STORAGE_BUCKETS, isSupabaseUrl } from '../../lib/supabase';
import { getJourneyMilestones, saveJourneyMilestones, JourneyMilestone } from '../../lib/supabase-db';
import { supabase } from '../../lib/supabase';

interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  category: string;
  image: string;
  image2: string;
  featured: boolean;
}

// Default milestones data - same as in MilestonesPage
const defaultMilestones: Milestone[] = [
  {
    id: '1',
    year: '1997',
    title: 'SSC from Khulna Public College',
    description: 'Completed SSC (Secondary School Certificate) from Khulna Public College. The foundational academic achievement that marked the beginning of an extraordinary journey.',
    category: 'education',
    image: 'https://images.unsplash.com/photo-1686213011698-8e70cb7ed011?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQzMjk4NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1686213011698-8e70cb7ed011?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQzMjk4NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false
  },
  {
    id: '2',
    year: '1999',
    title: 'HSC from Notre Dame College',
    description: 'Graduated from Notre Dame College with HSC. Actively involved in different clubs, building leadership skills and creating lifelong bonds with the NDC community.',
    category: 'education',
    image: 'https://images.unsplash.com/photo-1695204906099-8d6394c2752f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMGNvbGxlZ2UlMjBjYW1wdXN8ZW58MXx8fHwxNzY0MzU5MTkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/flagged/photo-1580408453889-ed5e1b51924a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzY0NDgzNTYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true
  },
  {
    id: '3',
    year: '2005',
    title: 'B.Sc Engineering (IPE) from BUET',
    description: 'Earned Bachelor of Science in Engineering (IPE) from Bangladesh University of Engineering and Technology (BUET), one of the most prestigious institutions in the country.',
    category: 'education',
    image: 'https://images.unsplash.com/photo-1695204906099-8d6394c2752f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMGNvbGxlZ2UlMjBjYW1wdXN8ZW58MXx8fHwxNzY0MzU5MTkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1659080907111-7c726e435a28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMGRlZ3JlZSUyMGNlcnRpZmljYXRlfGVufDF8fHx8MTc2NDQ5MTczN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true
  },
  {
    id: '4',
    year: '2004-2005',
    title: 'Finance Secretary of AIPE, BUET',
    description: 'Served as Finance Secretary of the Association of Industrial and Production Engineering (AIPE) at BUET, demonstrating early leadership and organizational skills.',
    category: 'leadership',
    image: 'https://images.unsplash.com/photo-1554863838-764b29f1ad1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJzaGlwJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzY0MzU5MTk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1758518729929-8210d3b0839e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBsZWFkZXJzaGlwJTIwbWVldGluZ3xlbnwxfHx8fDE3NjQ0OTE3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false
  },
  {
    id: '5',
    year: '2005',
    title: 'Joined Burlingtons Ltd',
    description: 'Started professional career in the RMG industry by joining Burlingtons Ltd, taking the first steps into garment manufacturing operations.',
    category: 'career',
    image: 'https://images.unsplash.com/photo-1721578006568-17901600cff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0aWxlJTIwZmFjdG9yeSUyMGdhcm1lbnR8ZW58MXx8fHwxNzY0MzU5MTkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1654703680091-010855f522e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwcHJvZHVjdGlvbiUyMGZsb29yfGVufDF8fHx8MTc2NDQ1NTA5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false
  },
  {
    id: '6',
    year: '2006-2007',
    title: 'Served FCI BD Ltd',
    description: 'Contributed to FCI Bangladesh Ltd, expanding expertise in garment manufacturing and production management.',
    category: 'career',
    image: 'https://images.unsplash.com/photo-1505624198937-c704aff72608?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBtZWV0aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjQyOTE3MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1668714742426-c47d8a0e6ae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5hZ2VyJTIwb2ZmaWNlJTIwZGVza3xlbnwxfHx8fDE3NjQ0OTIwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false
  },
  {
    id: '7',
    year: '2008-2012',
    title: 'Served Apex Holding Ltd',
    description: 'Served at Apex Holding Ltd, gaining valuable experience in managing large-scale operations and developing strategic leadership capabilities.',
    category: 'career',
    image: 'https://images.unsplash.com/photo-1758630737900-a28682c5aa69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG9mZmljZSUyMG1vZGVybnxlbnwxfHx8fDE3NjQyNDMxODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1762341120156-4a8303067873?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBleGVjdXRpdmUlMjBvZmZpY2V8ZW58MXx8fHwxNzY0NDkyMDI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false
  },
  {
    id: '8',
    year: '2013-2022',
    title: 'Partner at Manvill Styles Ltd',
    description: 'Served as Partner at Manvill Styles Ltd, building a successful garment manufacturing enterprise and establishing strong business foundations.',
    category: 'business',
    image: 'https://images.unsplash.com/photo-1543132220-7bc04a0e790a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDI5MDg0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1758599543152-a73184816eba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMHBhcnRuZXJzaGlwfGVufDF8fHx8MTc2NDQzMTM5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true
  },
  {
    id: '9',
    year: '2017',
    title: 'Started retail business "Pink and Blue"',
    description: 'Launched retail business venture with brand "Pink and Blue", diversifying into retail sector and creating a continuing successful brand presence.',
    category: 'business',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NDM1OTE5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1708960044696-f6eacf2d21a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMHN0b3JlJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzY0NDkyMDI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true
  },
  {
    id: '10',
    year: '2023-2024',
    title: 'Served Beximco Group',
    description: 'Served Beximco Group managing one unit with 4000+ manpower and achieving yearly turnover of $45M, demonstrating large-scale operational excellence.',
    category: 'career',
    image: 'https://images.unsplash.com/photo-1758630737900-a28682c5aa69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG9mZmljZSUyMG1vZGVybnxlbnwxfHx8fDE3NjQyNDMxODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1700156316467-7b78b47c2c9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwYnVpbGRpbmclMjBtb2Rlcm58ZW58MXx8fHwxNzY0NDkyMDI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true
  },
  {
    id: '11',
    year: '2024-2025',
    title: 'Serving Lantabur Group',
    description: 'Currently serving Lantabur Group with 10,000+ manpower, managing yearly business of $130M, leading operations at unprecedented scale.',
    category: 'career',
    image: 'https://images.unsplash.com/photo-1758630737900-a28682c5aa69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG9mZmljZSUyMG1vZGVybnxlbnwxfHx8fDE3NjQyNDMxODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1580795478966-561ba4f1ce68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVyYXRpb25zJTIwbWFuYWdlbWVudCUyMHRlYW18ZW58MXx8fHwxNzY0NDkyMDMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true
  },
  {
    id: '12',
    year: '2018',
    title: 'Founded NDC99 - The Notredamian organization',
    description: 'Founded NDC99 - The Notredamian organization with Facebook and WhatsApp groups, creating platforms for batch members to connect and strengthen community bonds.',
    category: 'community',
    image: 'https://images.unsplash.com/photo-1757143137392-0b1e1a27a7de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHVtbmklMjByZXVuaW9uJTIwY29sbGVnZXxlbnwxfHx8fDE3NjQzNTkxOTQ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1758270703733-3663d99c9dd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHVtbmklMjBncm91cCUyMHBob3RvfGVufDF8fHx8MTc2NDQ5MTczOHww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true
  },
  {
    id: '13',
    year: '2019',
    title: 'NDC 99 Executive Committee',
    description: 'Organizations formed and started contributing to NDC 99 Executive Committee, actively serving the Notre Dame community with dedication.',
    category: 'leadership',
    image: 'https://images.unsplash.com/photo-1554863838-764b29f1ad1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJzaGlwJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzY0MzU5MTk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1758518729929-8210d3b0839e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBsZWFkZXJzaGlwJTIwbWVldGluZ3xlbnwxfHx8fDE3NjQ0OTE3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true
  },
  {
    id: '14',
    year: '2019',
    title: 'CNBL Life Member - LM 0202',
    description: 'Became a Life Member of College Notre Dame Bangladesh (CNBL), deepening commitment to the alma mater.',
    category: 'community',
    image: 'https://images.unsplash.com/photo-1763629433062-0f0e43d55d03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBwZW9wbGV8ZW58MXx8fHwxNzY0MzUzODg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1715173679369-18006e84d6a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW1iZXJzaGlwJTIwY2FyZCUyMGNlcnRpZmljYXRlfGVufDF8fHx8MTc2NDQ5MjAyOHww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true
  },
  {
    id: '15',
    year: '2019',
    title: 'Notredamian Hoodies Initiative',
    description: 'Launched the iconic Notredamian Hoodies project, creating a symbol of pride for the Notre Dame community.',
    category: 'community',
    image: 'https://images.unsplash.com/photo-1757143137392-0b1e1a27a7de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHVtbmklMjByZXVuaW9uJTIwY29sbGVnZXxlbnwxfHx8fDE3NjQzNTkxOTQ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1594308482008-40c1396b4dff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob29kaWUlMjBhcHBhcmVsJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzY0NDkyMDI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true
  },
  {
    id: '16',
    year: '2023',
    title: 'The Terminal - 10 Minute School',
    description: 'Led The Terminal program at 10 Minute School, empowering students with career guidance and mentorship.',
    category: 'leadership',
    image: 'https://images.unsplash.com/photo-1554863838-764b29f1ad1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJzaGlwJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzY0MzU5MTk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1758270704587-43339a801396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50b3JzaGlwJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQ0OTIwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true
  },
  {
    id: '17',
    year: '2023-2025',
    title: 'CNBL Membership Committee',
    description: 'Served on CNBL Membership Committee, strengthening the community through strategic member engagement.',
    category: 'leadership',
    image: 'https://images.unsplash.com/photo-1764173039197-efc6c758b2c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JraW5nJTIwZXZlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY0MjU0ODMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1581592717535-7f3e001bfa7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21taXR0ZWUlMjBtZWV0aW5nJTIwZ3JvdXB8ZW58MXx8fHwxNzY0NDkyMDI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true
  },
  {
    id: '18',
    year: '2024',
    title: 'Lantabur Foundation',
    description: 'Actively involved with Lantabur Foundation in social welfare and community development initiatives.',
    category: 'community',
    image: 'https://images.unsplash.com/photo-1758599668547-2b1192c10abb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwdm9sdW50ZWVyJTIwaGVscGluZ3xlbnwxfHx8fDE3NjQzNTkxOTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1760992004210-44a502a2872d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzZXJ2aWNlJTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NjQzODk2ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false
  },
  {
    id: '19',
    year: '2024-2025',
    title: 'RMG Network Leadership',
    description: 'Built extensive professional network across the RMG industry, fostering collaboration and knowledge sharing.',
    category: 'leadership',
    image: 'https://images.unsplash.com/photo-1764173039197-efc6c758b2c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JraW5nJTIwZXZlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY0MjU0ODMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1675716921224-e087a0cca69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG5ldHdvcmtpbmclMjBldmVudHxlbnwxfHx8fDE3NjQ0NDE0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true
  },
  {
    id: '18',
    year: '2024',
    title: 'Donor Member - Chitalmari Hasina Begum Girls High School',
    description: 'Supporting education and empowering young girls in rural Bangladesh through donor membership at Chitalmari Hasina Begum Girls High School, Bagerhat.',
    category: 'community',
    image: 'https://images.unsplash.com/photo-1760510088582-3ca0631ad84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5nbGFkZXNoJTIwc2Nob29sJTIwYnVpbGRpbmclMjBlZHVjYXRpb258ZW58MXx8fHwxNzY0NTA1NTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    image2: 'https://images.unsplash.com/photo-1603373577790-b635631b0302?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJscyUyMHNjaG9vbCUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjQ0OTE3Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false
  },
  {
    id: '20',
    year: '2024',
    title: 'Donor Member - Chitalmari Hasina Begum Girls High School',
    description: 'Supporting education and empowering young girls in rural Bangladesh through donor membership at Chitalmari Hasina Begum Girls High School, Bagerhat.',
    category: 'community',
    image: 'https://images.unsplash.com/photo-1760510088582-3ca0631ad84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5nbGFkZXNoJTIwc2Nob29sJTIwYnVpbGRpbmclMjBlZHVjYXRpb258ZW58MXx8fHwxNzY0NTA1NTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    image2: 'https://images.unsplash.com/photo-1603373577790-b635631b0302?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJscyUyMHNjaG9vbCUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjQ0OTE3Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false
  },
  {
    id: '21',
    year: '2025',
    title: 'CNBL Executive Committee Candidacy',
    description: 'Running for CNBL Executive Committee position to serve the Notre Dame community with renewed vision and dedication.',
    category: 'leadership',
    image: 'https://images.unsplash.com/photo-1762345127396-ac4a970436c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2hpZXZlbWVudCUyMGF3YXJkJTIwdHJvcGh5fGVufDF8fHx8MTc2NDM1OTE5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1762363146131-394fbd8002c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdGlvbiUyMGNhbXBhaWduJTIwdm90aW5nfGVufDF8fHx8MTc2NDQ5MjAzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true
  },
];

export function JourneyAdmin() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingImageId, setUploadingImageId] = useState<string | null>(null);

  useEffect(() => {
    const loadMilestones = async () => {
      // Try to load from Supabase first
      if (supabase) {
        try {
          const data = await getJourneyMilestones();
          if (data && data.length > 0) {
            setMilestones(data);
            return;
          }
        } catch (error) {
          console.warn('Failed to load from Supabase, trying localStorage:', error);
        }
      }
      
      // Fallback to localStorage
      const stored = localStorage.getItem('journeyMilestones');
      if (stored) {
        try {
          setMilestones(JSON.parse(stored));
        } catch (error) {
          console.error('Error loading from localStorage:', error);
          setMilestones(defaultMilestones);
        }
      } else {
        setMilestones(defaultMilestones);
      }
    };
    
    loadMilestones();
  }, []);

  const saveAllChanges = async () => {
    setIsUploading(true);
    
    try {
      // Save to Supabase if configured
      if (supabase) {
        try {
          await saveJourneyMilestones(milestones);
          console.log('Successfully saved to Supabase');
        } catch (error) {
          console.warn('Failed to save to Supabase, saving to localStorage:', error);
          // Fallback to localStorage
          const dataToSave = JSON.stringify(milestones);
          localStorage.setItem('journeyMilestones', dataToSave);
        }
      } else {
        // Save to localStorage if Supabase not configured
        const dataToSave = JSON.stringify(milestones);
        localStorage.setItem('journeyMilestones', dataToSave);
      }
      
      setHasUnsavedChanges(false);
      setSaveSuccess(true);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving changes:', error);
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        alert('❌ STORAGE FULL!\n\nYou have too many uploaded images. localStorage limit reached.\n\nSOLUTION:\n1. Set up Supabase to use cloud storage\n2. Clear your browser data for this site\n3. Upload fewer images');
      } else {
        alert('Error saving changes. Please try again.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUpload = async (milestoneId: string, imageNumber: 1 | 2, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const uploadKey = `${milestoneId}-${imageNumber}`;
    setUploadingImageId(uploadKey);
    setIsUploading(true);

    try {
      // Find the milestone to get the old image URL
      const milestone = milestones.find(m => m.id === milestoneId);
      const oldImageUrl = milestone?.[imageNumber === 1 ? 'image' : 'image2'];
      
      // Delete old image from Supabase if it exists
      if (oldImageUrl && isSupabaseUrl(oldImageUrl)) {
        try {
          await deleteImage(oldImageUrl, STORAGE_BUCKETS.JOURNEY);
        } catch (error) {
          console.warn('Failed to delete old image:', error);
        }
      }

      // Upload new image to Supabase
      const imageUrl = await uploadImage(file, STORAGE_BUCKETS.JOURNEY, 'journey');
      
      const updatedMilestones = milestones.map(milestone => {
        if (milestone.id === milestoneId) {
          return {
            ...milestone,
            [imageNumber === 1 ? 'image' : 'image2']: imageUrl
          };
        }
        return milestone;
      });
      
      setMilestones(updatedMilestones);
      setHasUnsavedChanges(true);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please check your Supabase configuration and try again.');
    } finally {
      setIsUploading(false);
      setUploadingImageId(null);
    }
  };

  const clearImage = async (milestoneId: string, imageNumber: 1 | 2) => {
    const milestone = milestones.find(m => m.id === milestoneId);
    const imageUrl = milestone?.[imageNumber === 1 ? 'image' : 'image2'];
    
    // Delete from Supabase if it's a Supabase image
    if (imageUrl && isSupabaseUrl(imageUrl)) {
      try {
        await deleteImage(imageUrl, STORAGE_BUCKETS.JOURNEY);
      } catch (error) {
        console.warn('Failed to delete image from Supabase:', error);
      }
    }
    
    const updatedMilestones = milestones.map(milestone => {
      if (milestone.id === milestoneId) {
        return {
          ...milestone,
          [imageNumber === 1 ? 'image' : 'image2']: ''
        };
      }
      return milestone;
    });
    
    setMilestones(updatedMilestones);
    setHasUnsavedChanges(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#1A2942] to-[#0A1929] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Save Button */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-white font-['Montserrat'] text-4xl md:text-5xl mb-4">
                Journey <span className="bg-gradient-to-r from-[#C9A961] to-[#B76E79] bg-clip-text text-transparent">Image Manager</span>
              </h1>
              <p className="text-gray-300 font-['Inter'] text-lg">
                Upload and manage images for each milestone in your journey
              </p>
            </div>
            
            {/* Save Button - Always visible */}
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={saveAllChanges}
                disabled={!hasUnsavedChanges || isUploading}
                className={`px-8 py-4 rounded-xl font-['Inter'] font-semibold transition-all duration-300 flex items-center gap-2 ${
                  hasUnsavedChanges && !isUploading
                    ? 'bg-gradient-to-r from-[#C9A961] to-[#B76E79] text-white hover:shadow-2xl hover:shadow-[#C9A961]/50 hover:scale-105'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save All Changes
                  </>
                )}
              </button>
              
              {hasUnsavedChanges && (
                <span className="text-yellow-400 text-sm font-['Inter'] animate-pulse">
                  ⚠️ You have unsaved changes
                </span>
              )}
              
              {saveSuccess && (
                <span className="text-green-400 text-sm font-['Inter'] flex items-center gap-1">
                  ✓ Changes saved successfully!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Milestones Grid */}
        <div className="grid gap-6">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-[#C9A961]/50 transition-all duration-300"
            >
              {/* Milestone Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#C9A961] to-[#B76E79] rounded-full text-white text-sm font-semibold">
                    {milestone.year}
                  </span>
                  <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
                    {milestone.category}
                  </span>
                </div>
                <h3 className="text-white font-['Montserrat'] text-2xl mb-2">
                  {milestone.title}
                </h3>
                <p className="text-gray-300 font-['Inter'] text-sm">
                  {milestone.description}
                </p>
              </div>

              {/* Image Upload Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Image 1 */}
                <div>
                  <label className="block text-white font-['Inter'] font-semibold mb-3">
                    Image 1
                  </label>
                  {milestone.image ? (
                    <div className="relative rounded-xl overflow-hidden aspect-square group">
                      <img
                        src={milestone.image}
                        alt={`${milestone.title} - Image 1`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <label className={`cursor-pointer px-4 py-2 bg-[#C9A961] text-white rounded-lg font-semibold hover:bg-[#B8984D] transition-colors flex items-center gap-2 ${uploadingImageId === `${milestone.id}-1` ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          {uploadingImageId === `${milestone.id}-1` ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Camera className="w-4 h-4" />
                              Replace
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            className="hidden"
                            disabled={uploadingImageId === `${milestone.id}-1`}
                            onChange={(e) => handleImageUpload(milestone.id, 1, e)}
                          />
                        </label>
                        <button
                          onClick={() => clearImage(milestone.id, 1)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className={`block w-full aspect-square border-2 border-dashed border-gray-600 rounded-xl hover:border-[#C9A961] transition-colors cursor-pointer bg-white/5 ${uploadingImageId === `${milestone.id}-1` ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        disabled={uploadingImageId === `${milestone.id}-1`}
                        onChange={(e) => handleImageUpload(milestone.id, 1, e)}
                      />
                      <div className="h-full flex flex-col items-center justify-center text-gray-400 hover:text-[#C9A961] transition-colors">
                        {uploadingImageId === `${milestone.id}-1` ? (
                          <>
                            <Loader2 className="w-12 h-12 mb-3 animate-spin" />
                            <span className="font-['Inter'] font-semibold">Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Camera className="w-12 h-12 mb-3" />
                            <span className="font-['Inter'] font-semibold">Tap to Upload Image 1</span>
                            <span className="text-sm mt-1">From Camera or Gallery</span>
                          </>
                        )}
                      </div>
                    </label>
                  )}
                </div>

                {/* Image 2 */}
                <div>
                  <label className="block text-white font-['Inter'] font-semibold mb-3">
                    Image 2
                  </label>
                  {milestone.image2 ? (
                    <div className="relative rounded-xl overflow-hidden aspect-square group">
                      <img
                        src={milestone.image2}
                        alt={`${milestone.title} - Image 2`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <label className={`cursor-pointer px-4 py-2 bg-[#C9A961] text-white rounded-lg font-semibold hover:bg-[#B8984D] transition-colors flex items-center gap-2 ${uploadingImageId === `${milestone.id}-2` ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          {uploadingImageId === `${milestone.id}-2` ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Camera className="w-4 h-4" />
                              Replace
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            className="hidden"
                            disabled={uploadingImageId === `${milestone.id}-2`}
                            onChange={(e) => handleImageUpload(milestone.id, 2, e)}
                          />
                        </label>
                        <button
                          onClick={() => clearImage(milestone.id, 2)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className={`block w-full aspect-square border-2 border-dashed border-gray-600 rounded-xl hover:border-[#C9A961] transition-colors cursor-pointer bg-white/5 ${uploadingImageId === `${milestone.id}-2` ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        disabled={uploadingImageId === `${milestone.id}-2`}
                        onChange={(e) => handleImageUpload(milestone.id, 2, e)}
                      />
                      <div className="h-full flex flex-col items-center justify-center text-gray-400 hover:text-[#C9A961] transition-colors">
                        {uploadingImageId === `${milestone.id}-2` ? (
                          <>
                            <Loader2 className="w-12 h-12 mb-3 animate-spin" />
                            <span className="font-['Inter'] font-semibold">Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Camera className="w-12 h-12 mb-3" />
                            <span className="font-['Inter'] font-semibold">Tap to Upload Image 2</span>
                            <span className="text-sm mt-1">From Camera or Gallery</span>
                          </>
                        )}
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-12 flex justify-center">
          <a
            href="/journey"
            className="px-8 py-4 bg-gradient-to-r from-[#C9A961] to-[#B76E79] text-white font-['Inter'] font-semibold rounded-xl hover:shadow-2xl hover:shadow-[#C9A961]/50 transition-all duration-300 hover:scale-105"
          >
            View Journey Page
          </a>
        </div>
      </div>

      {/* Floating Save Button - Mobile Friendly */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <button
            onClick={saveAllChanges}
            disabled={isUploading}
            className={`px-8 py-4 bg-gradient-to-r from-[#C9A961] to-[#B76E79] text-white font-['Inter'] font-semibold rounded-full shadow-2xl hover:shadow-[#C9A961]/70 transition-all duration-300 hover:scale-110 flex items-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save All Changes
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}