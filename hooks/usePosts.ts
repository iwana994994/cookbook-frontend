import { useApiClient,postApi } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const usePosts = (username?: string) => {
  const queryClient = useQueryClient();
  const api = useApiClient();
  const {
    data: postsData
  } = useQuery({
    queryKey: username ? ["userPosts", username] : ["posts"],
    queryFn: () => (username ? postApi.getUserPosts(api, username) : postApi.getPosts(api)),
    select: (response) => response.data.posts
  });

  // delete post
  
  const deletePost = useMutation({
    mutationFn: (postId: string) => postApi.deletePost(api, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (username){

        queryClient.invalidateQueries({ queryKey: ["userPosts", username] });
      }
    console.log("Post deleted   🎁")
    },
  })

  return {
      posts: postsData || [],
    deletePost
  }
};
