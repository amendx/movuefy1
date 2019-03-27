


import axios from 'axios';

const baseURL ="https://api.themoviedb.org/3";
//  const baseURL=`${baseDomain}`

export const MovieRepository = axios.create({
    baseURL
})
export const UserRepository = axios.create({
    baseURL
})

