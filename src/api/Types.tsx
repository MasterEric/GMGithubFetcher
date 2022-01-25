export type GithubRepoData = {
  full_name: string;
  description: string;
  html_url: string;
};

export type GithubRepoCommit = {
  sha: string;

  commit: {
    message: string;
    // Additional properties.
    [key: string]: string;
  };
}

export type GithubRepoCommitData = Array<GithubRepoCommit>;