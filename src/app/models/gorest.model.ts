export interface UsersGoRest {
  id?: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface UsersPosts {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface UsersComments {
  id?: number;
  post_id?: number;
  name: string;
  email: string;
  body: string;
}
