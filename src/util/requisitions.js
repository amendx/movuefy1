// import axios from 'axios';

// const apiKey = "533bf9a3f2e9acf633932e225a72339e";

// async function getAllPopularMovies() {
//     // Most popular movies 
//     const returnable = (await axios
//         .get(
//             `https://api.themoviedb.org/3/discover/movie?api_key=${
//             apiKey
//             }&sort_by=popularity.desc`
//         )).data.results;
//     return returnable;

// }
// async function getAllPopularKidsMovies() {
//     // Most popular kids movies 
//     const returnable = (await axios
//         .get(
//             `https://api.themoviedb.org/3/discover/movie?api_key=${
//             apiKey
//             }&certification.lte=G&sort_by=popularity.desc`
//         )).data.results;
//     return returnable;

// }
// async function getNumberedDramas(quantity) {
//     const returnable = (await axios
//         .get(
//             `https://api.themoviedb.org/3/discover/movie?api_key=${
//             apiKey
//             }&with_genres=18&sort_by=vote_average.desc&vote_count.gte=${quantity}`
//         )).data.results;
//     return returnable;

// }


// export { getAllPopularMovies, getAllPopularKidsMovies, getNumberedDramas }