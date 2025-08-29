import { useApiClient } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Alert } from "react-native";

export const useCreatePost = () => {
  const [content, setContent] = useState("");
  const api = useApiClient();
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
   mutationFn: async (postData: { content: string }) => {
  return api.post("/posts", postData);
},

    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      
    },
    onError: () => {
      Alert.alert("Error", "Failed to create post. Please try again.");
    },
  });

const createPost = () => {
    if (!content.trim()) {
      Alert.alert("Empty Post", "Please write something!");
      return;
    }

    const postData: { content: string} = {
      content: content.trim(),
    };

    

    createPostMutation.mutate(postData);
  };

  return {
    content,
    setContent,
   
    isCreating: createPostMutation.isPending,
    createPost,
  };
};