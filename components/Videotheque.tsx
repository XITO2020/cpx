import MovieList from './MovieList'


const Videotheque = () => {
  const nasaMovies = movies.filter(movie => movie.genre === "nasa");
  const bluebeamMovies = movies.filter(movie => movie.genre === "58-bluebeam-evolution");
  const chemtrailsMovies = movies.filter(movie => movie.genre === "51-chemtrails&haarp-seisme-bluebbeam");
  const hoaxMovies = movies.filter(movie => movie.genre === "59-historical-hoaxes-till-climatechange");
  const HHMovies = movies.filter(movie => movie.genre === "60-hidden-History-policy-truth");
  const HprojectsMovies = movies.filter(movie => movie.genre === "61-hidden-projects-now");

return (
    <div className="pb-40">
        <MovieList title="Nasa + Disney" data={nasaMovies} />
        <MovieList title="Chemtrails" data={chemtrailsMovies} />
        <MovieList title="BlueBeam Evolution" data={bluebeamMovies} />
        <MovieList title="Historical Hoax" data={hoaxMovies} />
        <MovieList title="Histoire secrete et politique" data={HHMovies} />
        <MovieList title="projets encore secrets de nos jours" data={HprojectsMovies} />
    </div>    

)
}

export default Videotheque