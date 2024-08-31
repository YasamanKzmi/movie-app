export default function getTvShows(){
    fetch("https://api.themoviedb.org/3/discover/tv?include_adult=false&api_key=720ad2987e909dda7a20407b983dd9fa&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc",)
    .then(res => res.json())
    .then(data => console.log(data.results))
    
}

