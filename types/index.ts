export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}



export interface Post {
  _id: string;
  content: string;
  user: User;
  
}

