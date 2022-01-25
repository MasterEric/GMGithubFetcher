export type GithubRepoData = {
  full_name: string;
  description: string;
  html_url: string;
};

export type GithubRepoCommit = {
  sha: string;

  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    },
    message: string;
  };
}

export type GithubRepoCommitData = Array<GithubRepoCommit>;