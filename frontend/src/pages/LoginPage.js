import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        toast({
          title: "Welcome back!",
          description: "You've been logged in successfully.",
        });
        navigate('/');
      } else {
        toast({
          title: "Login failed",
          description: result.error || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setFormData({ email: 'sarah@example.com', password: 'password123' });
    
    try {
      const result = await login('sarah@example.com', 'password123');
      if (result.success) {
        toast({
          title: "Demo Login Successful!",
          description: "Welcome to Vine clone!",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Demo login failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white mb-2">
            <span className="text-green-500">V</span>ine
          </CardTitle>
          <p className="text-gray-400">Welcome back to the loop</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
              />
            </div>
            
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-800 px-2 text-gray-400">Or</span>
            </div>
          </div>

          <Button
            onClick={handleDemoLogin}
            disabled={isLoading}
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Try Demo Login
          </Button>

          <div className="text-center">
            <span className="text-gray-400">Don't have an account? </span>
            <Link to="/register" className="text-green-500 hover:text-green-400 font-medium">
              Sign up
            </Link>
          </div>

          <div className="text-xs text-gray-500 text-center">
            <p>Demo credentials:</p>
            <p>Email: sarah@example.com</p>
            <p>Password: password123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;