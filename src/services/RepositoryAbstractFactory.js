import MoviesRepository from './moviesRepository'
import UsersRepository from './usersRepository'

const repositories ={
    movies: MoviesRepository,
    user: UsersRepository
};

export const RepositoryAbstractFactory = {
    get: name => repositories[name]

}