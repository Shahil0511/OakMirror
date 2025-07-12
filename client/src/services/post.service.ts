import axios from "axios";
import api from "./api";

interface Post {
  id: string;
  title: string;
  content: string;
  postType: "general" | "question" | "review" | "news";
  industry?: string;
  company?: string;
  jobTitle?: string;
  location?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

interface CreatePostRequest {
  title: string;
  content: string;
  postType: "general" | "question" | "review" | "news";
  industry?: string;
  company?: string;
  jobTitle?: string;
  location?: string;
  tags?: string[];
}

interface GetPostsParams {
  page?: number;
  limit?: number;
  postType?: string;
  industry?: string;
  search?: string;
}

interface PostsResponse {
  data: Post[];
  total: number;
  page: number;
  limit: number;
}

export const postService = {
  /**
   * Create a new post
   */
  async createPost(postData: CreatePostRequest): Promise<Post> {
    try {
      const response = await api.post("/post", postData);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let errorMessage = "Post creation failed";

        if (error.response?.data?.errors) {
          errorMessage = Object.entries(error.response.data.errors)
            .map(
              ([field, messages]) =>
                `${field}: ${(messages as string[]).join(", ")}`
            )
            .join("\n");
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }

        throw new Error(errorMessage);
      }
      throw new Error("Post creation failed. Please try again later.");
    }
  },

  /**
   * Get posts with pagination and filters
   */
  async getPosts(params: GetPostsParams = {}): Promise<PostsResponse> {
    try {
      const response = await api.get("/post", { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            "Failed to fetch posts. Please try again later."
        );
      }
      throw new Error("Failed to fetch posts. Please try again later.");
    }
  },

  /**
   * Get a single post by ID
   */
  // async getPostById(postId: string): Promise<Post> {
  //   try {
  //     const response = await api.get(`/post/${postId}`);
  //     return response.data.data;
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       throw new Error(
  //         error.response?.data?.message || "Post not found or access denied."
  //       );
  //     }
  //     throw new Error("Failed to fetch post. Please try again later.");
  //   }
  // },

  /**
   * Update a post
   */
  // async updatePost(
  //   postId: string,
  //   postData: Partial<CreatePostRequest>
  // ): Promise<Post> {
  //   try {
  //     const response = await api.patch(`/post/${postId}`, postData);
  //     return response.data.data;
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       throw new Error(
  //         error.response?.data?.message || "Failed to update post."
  //       );
  //     }
  //     throw new Error("Failed to update post. Please try again later.");
  //   }
  // },

  /**
   * Delete a post
   */
  // async deletePost(postId: string): Promise<void> {
  //   try {
  //     await api.delete(`/post/${postId}`);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       throw new Error(
  //         error.response?.data?.message || "Failed to delete post."
  //       );
  //     }
  //     throw new Error("Failed to delete post. Please try again later.");
  //   }
  // },

  /**
   * Get posts by current user
   */
  // async getMyPosts(params: GetPostsParams = {}): Promise<PostsResponse> {
  //   try {
  //     const response = await api.get("/post/me", { params });
  //     return response.data;
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       throw new Error(
  //         error.response?.data?.message ||
  //           "Failed to fetch your posts. Please try again later."
  //       );
  //     }
  //     throw new Error("Failed to fetch your posts. Please try again later.");
  //   }
  // },
};
