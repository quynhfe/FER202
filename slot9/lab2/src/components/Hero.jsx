import Carousel from 'react-bootstrap/Carousel';
import {HeroImage} from '../styles/Style';
import { movies } from '../data/movies'; // Assuming you have a data file with movie images
function Hero() {
    return (
//           {
//     id: 1,
//     title: 'Galactic Wars',
//     description: 'Epic space battles decide the fate of a fractured galaxy as rival factions clash for control.',
//     poster: '/images/movie1.jpg',
//     genre: 'Sci-Fi',
//     year: 2022,
//     country: 'USA',
//     duration: 132
//   },
        <Carousel interval={3000}>
            {movies.map(movie => (
                <Carousel.Item  style={{borderRadius: "0"}} key={movie.id}>
                    <HeroImage className="d-block w-100" src={movie.poster} alt={movie.title} />
                    <Carousel.Caption>
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p>
                </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Hero;