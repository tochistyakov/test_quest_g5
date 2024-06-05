export interface UsersResponse {
  incomplete_results: boolean;
  total_count: number;
  items: User[];
}

export interface User {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  score: number;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export interface UserDetails extends User {
  name: string;
  company?: string;
  blog: string;
  location: string;
  email?: unknown;
  hireable?: unknown;
  bio?: string;
  twitter_username?: unknown;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}