import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_API_REPO_DATA_URL = GITHUB_API_URL + "/repos/{user}/{repo}";
const GITHUB_API_REPO_COMMITS_URL = GITHUB_API_URL + "/repos/{user}/{repo}/commits";

const httpGet = async function (url:string) {
  return axios.get(url, {
    method: 'get',
    url: url,
  }).then((response) => {
    return response.data;
  });
};

export const getRepoData = async function (user:string, repo:string) {
  const url = GITHUB_API_REPO_DATA_URL
    .replace("{user}", user)
    .replace("{repo}", repo);

  return httpGet(url);
}

export const getRepoCommits = async function (user:string, repo:string) {
  const url = GITHUB_API_REPO_COMMITS_URL
    .replace("{user}", user)
    .replace("{repo}", repo);

  return httpGet(url);
}