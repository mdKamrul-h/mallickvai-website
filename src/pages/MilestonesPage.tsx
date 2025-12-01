import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Users, TrendingUp, Award, Star, MapPin } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { getJourneyMilestones, JourneyMilestone } from '../lib/supabase-db';
import { supabase } from '../lib/supabase';

// Default milestone images - these will be replaced with actual data from localStorage
const defaultJourneyMilestones = [
  {
    id: '1',
    year: '1997',
    title: 'SSC from Khulna Public College',
    description: 'Completed SSC (Secondary School Certificate) from Khulna Public College. The foundational academic achievement that marked the beginning of an extraordinary journey.',
    category: 'education',
    image: 'https://images.unsplash.com/photo-1686213011698-8e70cb7ed011?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQzMjk4NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    image2: 'https://images.unsplash.com/photo-1686213011698-8e70cb7ed011?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQ0NTE1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
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
    title: 'The Terminal- Notredamian architects, Engineers and planner junction',
    description: 'As one of the core members successfully completed The Terminal program with 650 Participants at hotel Radisson. Participants were Ex notredamian Architect, Engineers and planners. This is the first time CNBL got huge media coverage..',
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

const categoryIcons = {
  education: GraduationCap,
  career: Briefcase,
  community: Users,
  business: TrendingUp,
  leadership: Award,
};

const categoryColors = {
  education: { bg: 'from-[#3B82F6] to-[#2563EB]', text: 'text-blue-400' },
  career: { bg: 'from-[#8B5CF6] to-[#7C3AED]', text: 'text-purple-400' },
  community: { bg: 'from-[#10B981] to-[#059669]', text: 'text-green-400' },
  business: { bg: 'from-[#F59E0B] to-[#D97706]', text: 'text-orange-400' },
  leadership: { bg: 'from-[#EF4444] to-[#DC2626]', text: 'text-red-400' },
};

const categoryLabels = {
  education: 'Education',
  career: 'Career',
  community: 'Community',
  business: 'Business',
  leadership: 'Leadership',
};

export function MilestonesPage() {
  const [journeyMilestones, setJourneyMilestones] = useState<JourneyMilestone[]>(defaultJourneyMilestones);

  useEffect(() => {
    document.title = 'My Journey | Engr. M M Nazrul Islam';
    
    const loadMilestones = async () => {
      // Try to load from Supabase first
      if (supabase) {
        try {
          const data = await getJourneyMilestones();
          if (data && data.length > 0) {
            // Check if data is outdated (has old title format)
            const firstMilestone = data.find(m => m.id === '1');
            const isOutdated = firstMilestone && (
              firstMilestone.title === 'SSC - Secondary School Certificate' ||
              firstMilestone.title === 'SSC - Khulna Public College'
            );
            
            if (isOutdated) {
              console.log('Detected outdated Supabase data, using updated defaults');
              setJourneyMilestones(defaultJourneyMilestones);
              // Optionally update Supabase in the background
              try {
                const { saveJourneyMilestones } = await import('../lib/supabase-db');
                await saveJourneyMilestones(defaultJourneyMilestones);
                console.log('Updated Supabase with new milestone data');
              } catch (error) {
                console.warn('Failed to update Supabase:', error);
              }
              return;
            }
            
            setJourneyMilestones(data);
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
          const parsed = JSON.parse(stored);
          // Check if localStorage data is outdated
          const firstMilestone = parsed.find((m: JourneyMilestone) => m.id === '1');
          const isOutdated = firstMilestone && (
            firstMilestone.title === 'SSC - Secondary School Certificate' ||
            firstMilestone.title === 'SSC - Khulna Public College'
          );
          
          if (isOutdated) {
            console.log('Detected outdated localStorage data, using updated defaults');
            setJourneyMilestones(defaultJourneyMilestones);
            // Update localStorage
            localStorage.setItem('journeyMilestones', JSON.stringify(defaultJourneyMilestones));
            return;
          }
          
          setJourneyMilestones(parsed);
        } catch (error) {
          console.error('Error loading milestones from localStorage:', error);
          setJourneyMilestones(defaultJourneyMilestones);
        }
      } else {
        // No saved data, use defaults
        setJourneyMilestones(defaultJourneyMilestones);
      }
    };
    
    loadMilestones();
  }, []);

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(180deg, #0A1929 0%, #1A2942 50%, #0A1929 100%)'
    }}>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A961] rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#B76E79] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C9A961]/20 to-[#B76E79]/20 backdrop-blur-xl rounded-full border border-[#C9A961]/30 mb-8">
              <MapPin className="w-4 h-4 text-[#C9A961]" />
              <span className="text-[#C9A961] font-['Inter'] font-semibold tracking-wide">1997 → Present • 28 Years of Excellence</span>
            </div>
            
            <h1 className="text-white mb-6 font-['Montserrat'] text-5xl md:text-6xl lg:text-7xl">
              My <span className="bg-gradient-to-r from-[#C9A961] to-[#B76E79] bg-clip-text text-transparent">Journey</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 font-['Inter'] leading-relaxed max-w-3xl mx-auto">
              From the classrooms of Notre Dame to leading operations in Bangladesh's garment industry, 
              every milestone tells a story of <span className="text-[#C9A961]">dedication</span>, 
              <span className="text-[#B76E79]"> leadership</span>, and <span className="text-[#C9A961]">service</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative">
            {/* Central Timeline Line - Hidden on mobile, shown on desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C9A961] via-[#B76E79] to-[#C9A961] transform -translate-x-1/2 opacity-30" />
            
            {/* Milestones */}
            <div className="space-y-12 md:space-y-20">
              {journeyMilestones.map((milestone, index) => {
                const Icon = categoryIcons[milestone.category];
                const colors = categoryColors[milestone.category];
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Desktop Layout: Alternating */}
                    <div className={`hidden md:grid md:grid-cols-2 gap-8 items-center ${isLeft ? '' : 'direction-rtl'}`}>
                      {/* Content Side */}
                      <div className={`${isLeft ? 'text-right' : 'text-left'}`}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="inline-block w-full"
                        >
                          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-[#C9A961]/50 transition-all duration-500 shadow-2xl hover:shadow-[#C9A961]/20">
                            {/* Year Badge */}
                            <div className={`inline-block px-4 py-2 bg-gradient-to-r ${colors.bg} rounded-full mb-4 shadow-lg`}>
                              <span className="text-white font-['Montserrat'] font-bold text-sm tracking-wider">{milestone.year}</span>
                            </div>

                            {/* Category & Featured Badge */}
                            <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full backdrop-blur-sm">
                                <Icon className={`w-4 h-4 ${colors.text}`} />
                                <span className={`text-xs font-['Inter'] font-semibold ${colors.text}`}>
                                  {categoryLabels[milestone.category]}
                                </span>
                              </div>
                              {milestone.featured && (
                                <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-full border border-yellow-500/30">
                                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                  <span className="text-xs font-['Inter'] font-semibold text-yellow-400">Featured</span>
                                </div>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="text-white font-['Montserrat'] font-bold text-2xl mb-4 leading-tight">
                              {milestone.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-300 font-['Inter'] leading-relaxed text-base">
                              {milestone.description}
                            </p>
                          </div>
                        </motion.div>
                      </div>

                      {/* Image Side */}
                      <div className={`${isLeft ? 'md:order-first' : ''}`}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                          className="relative"
                        >
                          {milestone.image2 ? (
                            // Two images grid layout
                            <div className="grid grid-cols-2 gap-3">
                              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 aspect-square">
                                <ImageWithFallback
                                  src={milestone.image}
                                  alt={`${milestone.title} - Image 1`}
                                  className="w-full h-full object-cover"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${colors.bg} opacity-20`} />
                              </div>
                              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 aspect-square">
                                <ImageWithFallback
                                  src={milestone.image2}
                                  alt={`${milestone.title} - Image 2`}
                                  className="w-full h-full object-cover"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${colors.bg} opacity-20`} />
                              </div>
                            </div>
                          ) : (
                            // Single image layout
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-[4/3]">
                              <ImageWithFallback
                                src={milestone.image}
                                alt={milestone.title}
                                className="w-full h-full object-cover"
                              />
                              <div className={`absolute inset-0 bg-gradient-to-t ${colors.bg} opacity-20`} />
                            </div>
                          )}
                          {/* Decorative Gradient Glow */}
                          <div className={`absolute -inset-1 bg-gradient-to-r ${colors.bg} opacity-20 blur-2xl -z-10 rounded-3xl`} />
                        </motion.div>
                      </div>
                    </div>

                    {/* Mobile Layout: Vertical Stack */}
                    <div className="md:hidden">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-[#C9A961]/50 transition-all duration-500 shadow-2xl"
                      >
                        {/* Image */}
                        {milestone.image2 ? (
                          // Two images for mobile
                          <div className="grid grid-cols-2 gap-2 p-2">
                            <div className="relative aspect-square overflow-hidden rounded-2xl">
                              <ImageWithFallback
                                src={milestone.image}
                                alt={`${milestone.title} - Image 1`}
                                className="w-full h-full object-cover"
                              />
                              <div className={`absolute inset-0 bg-gradient-to-t ${colors.bg} opacity-30`} />
                            </div>
                            <div className="relative aspect-square overflow-hidden rounded-2xl">
                              <ImageWithFallback
                                src={milestone.image2}
                                alt={`${milestone.title} - Image 2`}
                                className="w-full h-full object-cover"
                              />
                              <div className={`absolute inset-0 bg-gradient-to-t ${colors.bg} opacity-30`} />
                            </div>
                          </div>
                        ) : (
                          // Single image for mobile
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <ImageWithFallback
                              src={milestone.image}
                              alt={milestone.title}
                              className="w-full h-full object-cover"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${colors.bg} opacity-30`} />
                          </div>
                        )}
                          
                        {/* Year Badge Overlay */}
                        <div className="absolute top-4 left-4">
                          <div className={`px-4 py-2 bg-gradient-to-r ${colors.bg} rounded-full shadow-xl backdrop-blur-sm`}>
                            <span className="text-white font-['Montserrat'] font-bold text-sm tracking-wider">{milestone.year}</span>
                          </div>
                        </div>

                        {/* Featured Badge */}
                        {milestone.featured && (
                          <div className="absolute top-4 right-4">
                            <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-500/90 to-yellow-600/90 rounded-full shadow-xl backdrop-blur-sm">
                              <Star className="w-3 h-3 text-white fill-white" />
                              <span className="text-xs font-['Inter'] font-bold text-white">Featured</span>
                            </div>
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-6">
                          {/* Category */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full backdrop-blur-sm">
                              <Icon className={`w-4 h-4 ${colors.text}`} />
                              <span className={`text-xs font-['Inter'] font-semibold ${colors.text}`}>
                                {categoryLabels[milestone.category]}
                              </span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-white font-['Montserrat'] font-bold text-xl mb-3 leading-tight">
                            {milestone.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-300 font-['Inter'] leading-relaxed text-sm">
                            {milestone.description}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Center Icon Dot (Desktop Only) */}
                    <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-2xl border-4 border-[#0A1929]`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>



      {/* Call to Action */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9A961] rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-white font-['Montserrat'] text-3xl md:text-4xl mb-6">
              The Journey <span className="bg-gradient-to-r from-[#C9A961] to-[#B76E79] bg-clip-text text-transparent">Continues</span>
            </h2>
            <p className="text-xl text-gray-300 font-['Inter'] leading-relaxed mb-8">
              Every milestone is a stepping stone to greater service and impact. 
              Join me in building a stronger Notre Dame community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/campaign"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A961] to-[#B76E79] text-white font-['Inter'] font-semibold rounded-xl hover:shadow-2xl hover:shadow-[#C9A961]/50 transition-all duration-300 hover:scale-105"
              >
                <Award className="w-5 h-5" />
                Support My Candidacy
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-['Inter'] font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}