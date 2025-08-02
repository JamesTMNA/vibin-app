import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useVideo } from '../contexts/VideoContext';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Heart, MessageCircle, Share, MoreVertical, Play, Pause } from 'lucide-react';
import { cn } from '../lib/utils';

const VideoCard = forwardRef(({ video, isActive }, ref) => {
  const { currentUser } = useAuth();
  const { users, likeVideo, addComment } = useVideo();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const user = users.find(u => u.id === video.userId);
  const isLiked = video.likedBy.includes(currentUser?.id);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(e => console.log('Autoplay failed:', e));
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = () => {
    likeVideo(video.id, currentUser.id);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      addComment(video.id, currentUser.id, commentText);
      setCommentText('');
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div ref={ref} className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Video Container */}
      <div className="relative w-full max-w-md h-full bg-gray-900 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="w-full h-full object-cover cursor-pointer"
          onClick={togglePlay}
          loop
          muted
          playsInline
        />
        
        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <Button
              onClick={togglePlay}
              variant="ghost"
              size="lg"
              className="w-16 h-16 rounded-full bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30"
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </Button>
          </div>
        )}

        {/* Video Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4">
          <div className="flex items-start gap-3">
            <Avatar className="w-10 h-10 ring-2 ring-white">
              <AvatarImage src={user?.avatar} alt={user?.username} />
              <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-white text-sm">
                  @{user?.username}
                </span>
                {user?.verified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-white text-sm mb-2 line-clamp-2">
                {video.description}
              </p>
              {video.tags && (
                <div className="flex flex-wrap gap-1">
                  {video.tags.map(tag => (
                    <span key={tag} className="text-blue-400 text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute right-4 bottom-20 flex flex-col items-center gap-4">
        <Button
          onClick={handleLike}
          variant="ghost"
          size="lg"
          className="w-12 h-12 rounded-full bg-black bg-opacity-50 backdrop-blur-sm hover:bg-opacity-70 flex flex-col items-center p-0"
        >
          <Heart
            className={cn(
              "w-6 h-6 transition-colors",
              isLiked ? "fill-red-500 text-red-500" : "text-white"
            )}
          />
        </Button>
        <span className="text-white text-xs text-center">
          {formatNumber(video.likes)}
        </span>

        <Button
          onClick={() => setShowComments(true)}
          variant="ghost"
          size="lg"
          className="w-12 h-12 rounded-full bg-black bg-opacity-50 backdrop-blur-sm hover:bg-opacity-70 flex flex-col items-center p-0"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
        <span className="text-white text-xs text-center">
          {video.comments.length}
        </span>

        <Button
          variant="ghost"
          size="lg"
          className="w-12 h-12 rounded-full bg-black bg-opacity-50 backdrop-blur-sm hover:bg-opacity-70 flex flex-col items-center p-0"
        >
          <Share className="w-6 h-6 text-white" />
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="w-12 h-12 rounded-full bg-black bg-opacity-50 backdrop-blur-sm hover:bg-opacity-70 flex flex-col items-center p-0"
        >
          <MoreVertical className="w-6 h-6 text-white" />
        </Button>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full max-w-md h-2/3 overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  {video.comments.length} Comments
                </h3>
                <Button
                  onClick={() => setShowComments(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500"
                >
                  ✕
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {video.comments.map(comment => {
                const commentUser = users.find(u => u.id === comment.userId);
                return (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={commentUser?.avatar} />
                      <AvatarFallback>{commentUser?.displayName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm text-gray-900">
                          @{commentUser?.username}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                />
                <Button
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                  className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 disabled:opacity-50"
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

VideoCard.displayName = 'VideoCard';

export default VideoCard;