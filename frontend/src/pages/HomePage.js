import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useVideo } from '../contexts/VideoContext';
import VideoCard from '../components/VideoCard';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { Camera, Plus } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { videos } = useVideo();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    // Auto-scroll behavior
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const newIndex = Math.round(scrollPosition / windowHeight);
      
      if (newIndex !== currentVideoIndex && newIndex < videos.length) {
        setCurrentVideoIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentVideoIndex, videos.length]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Main Video Feed */}
      <div className="pt-16">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="h-screen snap-y snap-mandatory"
            style={{ scrollSnapAlign: 'start' }}
          >
            <VideoCard
              video={video}
              ref={el => videoRefs.current[index] = el}
              isActive={index === currentVideoIndex}
            />
          </div>
        ))}
      </div>

      {/* Floating Upload Button */}
      <Button
        onClick={() => navigate('/upload')}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 border-0 shadow-2xl z-50 transition-all duration-300 hover:scale-110"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default HomePage;