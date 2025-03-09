
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database for demo purposes
const MOCK_USERS_KEY = 'denim_store_users';
const CURRENT_USER_KEY = 'denim_store_current_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get users from localStorage
      const usersJson = localStorage.getItem(MOCK_USERS_KEY);
      const users = usersJson ? JSON.parse(usersJson) : [];
      
      // Find user with matching email and password
      const foundUser = users.find((u: any) => 
        u.email === email && u.password === password
      );
      
      if (foundUser) {
        // Don't store password in the state
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
        toast.success('Logged in successfully');
        return;
      }
      
      throw new Error('Invalid email or password');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get existing users
      const usersJson = localStorage.getItem(MOCK_USERS_KEY);
      const users = usersJson ? JSON.parse(usersJson) : [];
      
      // Check if email is already registered
      if (users.some((u: any) => u.email === email)) {
        throw new Error('Email already registered');
      }
      
      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password // In a real app, this would be hashed
      };
      
      // Save to "database"
      users.push(newUser);
      localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
      
      // Log user in
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      
      toast.success('Account created successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
