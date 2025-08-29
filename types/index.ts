export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  bannerUrl?: string;
}



export interface Post {
  _id: string;
  content: string;
  user: User;
  createdAt: string;
  
}

