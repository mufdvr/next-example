import { IForksRequest } from './models'

export const userRepos = (name: string): string => `/api/users/${name}/repos`
export const repoForks = ({ userName, repoName, page = 1 }: IForksRequest) =>
  `/api/repos/${userName}/${repoName}/forks?page=${page}`
