import { IForksRequest } from './models'

const { NEXT_SERVER_API_BASE_URL } = process.env

export const userRepos = (name: string): string => `/api/users/${name}/repos`
export const repoForks = ({ userName, repoName, page = 1, isServer }: IForksRequest) =>
  `${ isServer ? NEXT_SERVER_API_BASE_URL : '/api' }/repos/${userName}/${repoName}/forks?page=${page}`
