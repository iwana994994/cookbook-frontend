import { useApiClient,postApi } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const usePosts = (username?: string) => {
  const api = useApiClient();
  const {
    data: postsData
  } = useQuery({
    queryKey: username ? ["userPosts", username] : ["posts"],
    queryFn: () => (username ? postApi.getUserPosts(api, username) : postApi.getPosts(api)),
    select: (response) => response.data.posts
  });
return {
    posts: postsData || []}

}