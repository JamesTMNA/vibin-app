import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useVideo } from '../contexts/VideoContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import { Upload, Video, X, Play, Pause } from 'lucide-react';
import Navbar from '../components/Navbar';

const UploadPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { uploadVideo } = useVideo();
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setVideoPreview(url);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select a video file",
          variant: "destructive",
        });
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setVideoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const togglePreviewPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a video to upload",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Mock upload - in real app this would upload to server/cloud storage
      const mockVideoUrl = 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4';
      
      const videoData = {
        title: formData.title || 'Untitled Video',
        description: formData.description || '',
        videoUrl: mockVideoUrl,
        thumbnailUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop',
        duration: 6,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      uploadVideo(videoData, currentUser.id);

      toast({
        title: "Video uploaded successfully!",
        description: "Your video is now live on Vine",
      });

      navigate('/');
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                <Video className="w-6 h-6 text-teal-500" />
                Upload Your Vibin'
              </CardTitle>
              <p className="text-gray-400">Share your creativity in 6 seconds</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* File Upload Area */}
              <div className="space-y-4">
                {!videoPreview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-300 mb-2">Click to upload video</p>
                    <p className="text-sm text-gray-500">MP4, MOV, AVI up to 10MB</p>
                    <p className="text-xs text-gray-500 mt-2">Recommended: 6-second videos for best Vine experience</p>
                  </div>
                ) : (
                  <div className="relative bg-gray-800 rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      src={videoPreview}
                      className="w-full h-64 object-contain"
                      onEnded={() => setIsPlaying(false)}
                    />
                    
                    {/* Video Controls */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <Button
                        onClick={togglePreviewPlay}
                        variant="ghost"
                        size="lg"
                        className="w-16 h-16 rounded-full bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white ml-1" />
                        )}
                      </Button>
                    </div>

                    {/* Remove Button */}
                    <Button
                      onClick={removeFile}
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Video Details Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Give your video a catchy title..."
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                    maxLength={100}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell viewers about your video..."
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 resize-none"
                    rows={3}
                    maxLength={300}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.description.length}/300 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags (comma-separated)
                  </label>
                  <Input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="funny, comedy, viral, trending..."
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Add tags to help others discover your content
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    disabled={!selectedFile || isLoading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                  >
                    {isLoading ? 'Uploading...' : 'Upload Video'}
                  </Button>
                </div>
              </form>

              {/* Upload Tips */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="font-medium text-white mb-2">Tips for great Vines:</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Keep it to 6 seconds for the authentic Vine experience</li>
                  <li>• Make the first second count - grab attention immediately</li>
                  <li>• Use good lighting and clear audio</li>
                  <li>• Add relevant tags to help others discover your content</li>
                  <li>• Be creative and have fun!</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;