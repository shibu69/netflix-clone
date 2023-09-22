import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apikey = "a02dd8270d9f185fc9d504a98357e090";
const url = "https://api.themoviedb.org/3";
const upcoming = "upcoming";
const imgUrl = "https://image.tmdb.org/t/p/original";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => <img className="card" src={img} alt="" />;

const Row = ({
  title,
  arr = [
    {
      img: "https://assets-prd.ignimgs.com/2022/07/21/oppenheimer-poster-1658411601593.jpeg",
    },
  ],
}) => (
  <div className="row">
    <h2>{title}</h2>

    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [UpcomingMovies, setUpcomingMovies] = useState([]);
  const [NowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [PopularMovies, setPopularMovies] = useState([]);
  const [TopratedMovies, setTopratedMovies] = useState([]);
  const [Allgenre, setAllgenre] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}`);
      setUpcomingMovies(results);
    };

    const fetchNowplaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apikey}`);
      setNowPlayingMovies(results);
    };

    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apikey}`);
      setPopularMovies(results);
    };

    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${topRated}?api_key=${apikey}`);
      setTopratedMovies(results);
    };

    const getAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`);
      setAllgenre(genres);
    };

    fetchUpcoming();
    fetchNowplaying();
    fetchPopular();
    fetchTopRated();
    getAllGenre();
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          background: PopularMovies[0]
            ? `url(${`${imgUrl}/${PopularMovies[0].poster_path}`})`
            : "rgb(19, 19, 19)",
        }}
      >
        {PopularMovies[0] && <h1>{PopularMovies[0].original_title}</h1>}

        {PopularMovies[0] && <p>{PopularMovies[0].overview}</p>}

        <div>
          <button>
            Play <BiPlay />
          </button>
          <button>
            My List <AiOutlinePlus />{" "}
          </button>
        </div>
      </div>

      <Row title={"Upcoming Movies"} arr={UpcomingMovies} />
      <Row title={"Now Playing"} arr={NowPlayingMovies} />
      <Row title={"Popular"} arr={PopularMovies} />
      <Row title={"Top Rated"} arr={TopratedMovies} />
      <div className="genre" > 
        {Allgenre.map((item, index) => (
          <Link key={index} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
