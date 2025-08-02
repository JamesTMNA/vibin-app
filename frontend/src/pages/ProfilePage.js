import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useVideo } from '../contexts/VideoContext';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent } from '../components/ui/card';
import { Settings, UserPlus, UserCheck, Play } from 'lucide-react';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { videos, users, followUser } = useVideo();
  const [profileUser, setProfileUser] = useState(null);
  const [userVideos, setUserVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Find profile user
    const user = users.find(u => u.id === userId);
    setProfileUser(user);

    if (user) {
      // Get user's videos
      const userVids = videos.filter(v => v.userId === userId);
      setUserVideos(userVids);

      // Get liked videos if viewing own profile
      if (userId === currentUser.id) {
        const liked = videos.filter(v => v.likedBy.includes(currentUser.id));
        setLikedVideos(liked);
      }

      // Check if current user is following this user
      const currentUserData = users.find(u => u.id === currentUser.id);
      setIsFollowing(currentUserData?.following?.includes(userId) || false);
    }
  }, [userId, currentUser, users, videos, navigate]);

  const handleFollow = () => {
    if (currentUser && userId !== currentUser.id) {
      followUser(currentUser.id, userId);
      setIsFollowing(!isFollowing);
    }
  };

  const VideoGrid = ({ videos }) => (
    <div className="grid grid-cols-3 gap-1 md:gap-2">
      {videos.map(video => (
        <Card
          key={video.id}
          className="aspect-square cursor-pointer group bg-gray-900 border-gray-700 overflow-hidden"
          onClick={() => navigate('/', { state: { videoId: video.id } })}
        >
          <CardContent className="p-0 relative">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
              <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs">
              <Play className="w-3 h-3" />
              <span>{video.likes}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (!currentUser || !profileUser) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="pt-20 flex items-center justify-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const isOwnProfile = userId === currentUser.id;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-gray-700">
              <AvatarImage src={profileUser.avatar} alt={profileUser.username} />
              <AvatarFallback className="text-2xl">
                {profileUser.displayName?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                    {profileUser.displayName}
                    {profileUser.verified && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </h1>
                  <p className="text-gray-400 text-lg">@{profileUser.username}</p>
                </div>

                <div className="flex gap-2">
                  {isOwnProfile ? (
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <Button
                      onClick={handleFollow}
                      className={`${
                        isFollowing
                          ? 'bg-gray-600 hover:bg-gray-700 text-white'
                          : 'bg-teal-600 hover:bg-teal-700 text-white'
                      } transition-colors`}
                    >
                      {isFollowing ? (
                        <>
                          <UserCheck className="w-4 h-4 mr-2" />
                          Following
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Follow
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-center md:justify-start gap-6 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-white">{userVideos.length}</p>
                  <p className="text-gray-400 text-sm">Videos</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white">{profileUser.followers || 0}</p>
                  <p className="text-gray-400 text-sm">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white">{profileUser.following?.length || 0}</p>
                  <p className="text-gray-400 text-sm">Following</p>
                </div>
              </div>

              {/* Bio */}
              {profileUser.bio && (
                <p className="text-gray-300 max-w-md">{profileUser.bio}</p>
              )}
            </div>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800 border border-gray-700">
              <TabsTrigger
                value="videos"
                className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-400"
              >
                Videos ({userVideos.length})
              </TabsTrigger>
              {isOwnProfile && (
                <TabsTrigger
                  value="liked"
                  className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-400"
                >
                  Liked ({likedVideos.length})
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="videos" className="mt-6">
              {userVideos.length > 0 ? (
                <VideoGrid videos={userVideos} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-4">
                    {isOwnProfile ? "You haven't posted any videos yet" : "No videos yet"}
                  </p>
                  {isOwnProfile && (
                    <Button
                      onClick={() => navigate('/upload')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Upload Your First Video
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>

            {isOwnProfile && (
              <TabsContent value="liked" className="mt-6">
                {likedVideos.length > 0 ? (
                  <VideoGrid videos={likedVideos} />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No liked videos yet</p>
                  </div>
                )}
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;