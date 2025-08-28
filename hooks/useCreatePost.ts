import { postApi, useApiClient } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Alert } from "react-native";

export const useCreatePost = () => {
  const [content, setContent] = useState("");
  const api = useApiClient();

  const createPostMutation = useMutation({
   mutationFn: (content: string) => postApi.createPost(api, { content }),

    onSuccess: () => {
      Alert.alert("Success", "Post created successfully!");
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
    createPostMutation.mutate(content);
  };

  return {
    content,
    setContent,
    createPostMutation,

    createPost
  };
};