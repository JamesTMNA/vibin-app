export const mockUsers = [
  {
    id: '1',
    username: 'sarah_vines',
    displayName: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b96cf6f4?w=150&h=150&fit=crop&crop=face',
    bio: 'Creating 6-second magic ✨ | Comedy & Lifestyle',
    followers: 12500,
    following: 89,
    verified: true
  },
  {
    id: '2',
    username: 'mike_comedy',
    displayName: 'Mike Chen',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Professional goofball 🤪 | Daily laughs',
    followers: 8200,
    following: 156,
    verified: false
  },
  {
    id: '3',
    username: 'alex_art',
    displayName: 'Alex Rivera',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Artist & Creator | Time-lapse magic',
    followers: 15600,
    following: 203,
    verified: true
  }
];

export const mockVideos = [
  {
    id: '1',
    userId: '1',
    title: 'When you finally understand JavaScript closures',
    description: 'That moment when it all clicks! 🤯',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=600&fit=crop',
    duration: 6,
    likes: 1245,
    comments: [
      {
        id: '1',
        userId: '2',
        text: 'This is so relatable! 😂',
        timestamp: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        userId: '3',
        text: 'Finally someone explained it right!',
        timestamp: '2024-01-15T11:15:00Z'
      }
    ],
    likedBy: ['2', '3'],
    timestamp: '2024-01-15T09:00:00Z',
    tags: ['coding', 'javascript', 'learning']
  },
  {
    id: '2',
    userId: '2',
    title: 'Cooking hack that changed my life',
    description: 'You will never cook pasta the same way again! 🍝',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=600&fit=crop',
    duration: 6,
    likes: 892,
    comments: [
      {
        id: '3',
        userId: '1',
        text: 'Mind blown! Trying this tonight 🤩',
        timestamp: '2024-01-14T14:20:00Z'
      }
    ],
    likedBy: ['1'],
    timestamp: '2024-01-14T13:45:00Z',
    tags: ['cooking', 'lifehack', 'food']
  },
  {
    id: '3',
    userId: '3',
    title: 'Drawing a masterpiece in 6 seconds',
    description: 'Speed art challenge - realistic eye drawing ✏️',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop',
    duration: 6,
    likes: 2134,
    comments: [
      {
        id: '4',
        userId: '2',
        text: 'How is this even possible?! 😱',
        timestamp: '2024-01-13T16:10:00Z'
      },
      {
        id: '5',
        userId: '1',
        text: 'Talent level: Universe 🌟',
        timestamp: '2024-01-13T16:45:00Z'
      }
    ],
    likedBy: ['1', '2'],
    timestamp: '2024-01-13T15:30:00Z',
    tags: ['art', 'drawing', 'timelapse']
  },
  {
    id: '4',
    userId: '1',
    title: 'My cat thinks hes a dog',
    description: 'Plot twist: he might actually be one 🐱🐕',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=600&fit=crop',
    duration: 6,
    likes: 3456,
    comments: [
      {
        id: '6',
        userId: '3',
        text: 'That tail wag though! 😄',
        timestamp: '2024-01-12T12:00:00Z'
      }
    ],
    likedBy: ['2', '3'],
    timestamp: '2024-01-12T11:20:00Z',
    tags: ['pets', 'funny', 'cats']
  }
];