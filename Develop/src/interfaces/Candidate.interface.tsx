// TODO: Create an interface for the Candidate objects returned by the API


export interface Candidate {
    id: number;
    login: string;
    avatar_url: string;
    node_id: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    location: string;
    email: string;
    company: string;
  }
  