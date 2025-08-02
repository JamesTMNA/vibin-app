import React, { createContext, useContext, useState } from 'react';
import { mockVideos, mockUsers } from '../data/mockData';

const VideoContext = createContext();

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState(mockVideos);
  const [users, setUsers] = useState(mockUsers);

  const likeVideo = (videoId, userId) => {
    setVideos(prevVideos => 
      prevVideos.map(video => {
        if (video.id === videoId) {
          const hasLiked = video.likedBy.includes(userId);
          return {
            ...video,
            likes: hasLiked ? video.likes - 1 : video.likes + 1,
            likedBy: hasLiked 
              ? video.likedBy.filter(id => id !== userId)
              : [...video.likedBy, userId]
          };
        }
        return video;
      })
    );
  };

  const addComment = (videoId, userId, text) => {
    const comment = {
      id: Date.now().toString(),
      userId,
      text,
      timestamp: new Date().toISOString()
    };

    setVideos(prevVideos => 
      prevVideos.map(video => {
        if (video.id === videoId) {
          return {
            ...video,
            comments: [...video.comments, comment]
          };
        }
        return video;
      })
    );
  };

  const followUser = (currentUserId, targetUserId) => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === currentUserId) {
          const isFollowing = user.following.includes(targetUserId);
          return {
            ...user,
            following: isFollowing
              ? user.following.filter(id => id !== targetUserId)
              : [...user.following, targetUserId]
          };
        }
        if (user.id === targetUserId) {
          const currentUser = prevUsers.find(u => u.id === currentUserId);
          const isFollowing = currentUser?.following.includes(targetUserId);
          return {
            ...user,
            followers: isFollowing ? user.followers - 1 : user.followers + 1
          };
        }
        return user;
      })
    );
  };

  const uploadVideo = (videoData, userId) => {
    const newVideo = {
      id: Date.now().toString(),
      userId,
      ...videoData,
      likes: 0,
      comments: [],
      likedBy: [],
      timestamp: new Date().toISOString()
    };

    setVideos(prevVideos => [newVideo, ...prevVideos]);
    return newVideo;
  };

  const value = {
    videos,
    users,
    likeVideo,
    addComment,
    followUser,
    uploadVideo
  };

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
};