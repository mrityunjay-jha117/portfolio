import axios from "axios";

// Configure your API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface BlogDetail extends Blog {
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  date: string;
  readTime: string;
  views: number;
  likes: number;
  tags: string[];
}

export interface BlogsResponse {
  blogs: Blog[];
  totalPages: number;
  currentPage?: number;
  totalBlogs?: number;
}

class BlogService {
  /**
   * Fetch paginated blogs
   * @param page - Page number (1-indexed)
   * @param limit - Number of blogs per page
   */
  async getBlogs(page: number = 1, limit: number = 10): Promise<BlogsResponse> {
    try {
      const response = await axios.get<BlogsResponse>(
        `${API_BASE_URL}/api/blogs`,
        {
          params: { page, limit },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw error;
    }
  }

  /**
   * Fetch a single blog by ID
   * @param id - Blog ID
   */
  async getBlogById(id: number | string): Promise<BlogDetail> {
    try {
      const response = await axios.get<BlogDetail>(
        `${API_BASE_URL}/api/blogs/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching blog:", error);
      throw error;
    }
  }

  /**
   * Search blogs by query
   * @param query - Search query string
   * @param page - Page number
   */
  async searchBlogs(query: string, page: number = 1): Promise<BlogsResponse> {
    try {
      const response = await axios.get<BlogsResponse>(
        `${API_BASE_URL}/api/blogs/search`,
        {
          params: { q: query, page },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error searching blogs:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const blogService = new BlogService();

// Example usage in components:
/*

import { blogService } from '@/services/blogService';

// In your component:
const fetchBlogs = async (page: number) => {
  setLoading(true);
  try {
    const data = await blogService.getBlogs(page, blogsPerPage);
    setBlogs(data.blogs);
    setTotalPages(data.totalPages);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    // Handle error (show toast, error message, etc.)
  } finally {
    setLoading(false);
  }
};

*/
