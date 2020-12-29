import React from 'react';
import {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from './axios'
import './AnimeDetails.css'
import { Star,Favorite, ImageOutlined,ArrowBackIcon } from '@material-ui/icons';
import { Tooltip,Zoom, makeStyles } from '@material-ui/core';
import { yellow,red } from '@material-ui/core/colors';
import  ReactImageVideoLightbox from '../../node_modules/react-image-video-lightbox';
import  default_cover from '../components/img/default_cover.png'
import missing from '../components/img/missing.jpg'
import {PlayArrow, MovieSharp} from '@material-ui/icons';

function AnimeDetails({ match }) {

const [isLoading, setisLoading]  = useState(false);
const [movie, setMovie]  = useState([]);
const [movieId, setMovieId]  = useState('');
const [genres, setGenres]  = useState([]);
const [characters, setCharacters]  = useState([]);
const [saga, setSaga]  = useState([]);
const [lightboxOpen,setLightBox] = useState(false);

const fetchUrl = `https://kitsu.io/api/edge/anime?fields[categories]=slug,title&filter[slug]=${match.params.slug}&include=categories,animeProductions.producer`
const fetchGenresUrl = `https://kitsu.io/api/edge/anime?fields[categories]=slug,title&filter[slug]=${match.params.slug}&include=categories`
const fetchSagaUrl = `https://kitsu.io/api/edge/media-relationships?filter[source_id]=${movie.id}&filter[source_type]=Anime&include=destination&page[limit]=4&sort=role`
const fetchCharactersUrl = `https://kitsu.io/api/edge/castings?filter[media_id]=${movie.id}&filter[media_type]=Anime&filter[is_character]=true&filter[language]=Japanese&include=character&page[limit]=4&sort=-featured`
const rateColor = movie.attributes?.averageRating && movie.attributes?.averageRating <30 ? 'red' :
(movie.attributes?.averageRating && movie.attributes?.averageRating >=30 && movie.attributes?.averageRating && movie.attributes?.averageRating < 80 ) ? 'orange' : '#1abc9c'; 
let history = useHistory()

const rainbow = (i) => {
    let cols = ["#f44336","#ff9800","#4caf50","#2196f3","#3f51b5","#9e9e9e"]
    const res = (i+1) > cols.length ? cols[i % (cols.length)] : cols[i]
    return (res)
}

//* Custom Black Background Tooltip START

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      backgroundColor: theme.palette.common.black,
    },
  }));
  
  function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();
  
    return <Tooltip arrow classes={classes} {...props} />;
  }
    //* Custom Black Background Tooltip END

/* 
 ? Fetch Anime attributes
*/
useEffect(() => {
    async function fetchMovieData() {
        setisLoading(true);
        const resp = await axios.get(fetchUrl);
        setisLoading(false);
        setMovie(resp.data.data[0]);
        setMovieId(resp.data.data[0].id);
        return movie
    }
    fetchMovieData();
},[])

// ?fetch anime genre & producers at once

useEffect(() => {
    async function fetchMovieData() {
        setisLoading(true);
        const resp = await axios.get(fetchGenresUrl);
        const tempgenre = []
        resp.data.included.forEach(element => {
            let tmp = (element.type ==='categories') ? (tempgenre.push(element.attributes)) : ''
        });
        //* genres alphabetically
        tempgenre.sort((a, b) => a.slug.localeCompare(b.slug))
        setGenres(tempgenre)
        setisLoading(false);
        return genres
    }
    fetchMovieData();
},[movie])

//*fetch anime characters

useEffect(() => {
        setisLoading(true);
    async function fetchMovieData() {
        const resp = await axios.get(fetchCharactersUrl);
        setisLoading(false);
        setCharacters(resp.data.included);
        return characters
    }
    fetchMovieData();
},[movie])

//*fetch Saga infos
useEffect(() => {
    async function fetchMovieData() {
        setisLoading(true);
        const resp = await axios.get(fetchSagaUrl);
        setisLoading(false);
        setSaga(resp.data.included);
        return saga
    }
    fetchMovieData();
},[movie])

const description = document.getElementById("description");
const handleExpand = () =>  {description.classList.toggle("reduced")}

//* Todo format dates to season
// let regexp = /(\d{4})-(\d{2})-(\d{2})/;
// let result = (movie.attributes.startDate).match(regexp);
// console.log("year: "+result[0]+"month: "+result[1]+"day: "+result[2])

    return (
        <div id="global">
            <div id="wrapper">
                    <div className="cover-wrap">
                      <img src={(movie?.attributes?.coverImage) === null ?  default_cover : movie?.attributes?.coverImage?.large} alt="" className="poster"/>
                      <div className="overlay">
                      </div>
                      
                      {/* <div className="details-wrap">
                          <div className="detail">
                          <h3>{movie?.attributes?.canonicalTitle}</h3>
                            <div className="metadata">
                                <span>{movie?.attributes?.ageRatingGuide}</span>
                                <span>{movie?.attributes?.createdAt.split('-')[0]}</span>
                                <span>{movie?.attributes?.ageRatingGuide}</span>
                                <span>{movie?.attributes?.episodeLength} minutes</span>
                            </div>
                            <p>{movie?.attributes?.description}</p>
                          </div>
                      </div> */}
                    </div>

                    <div className="main-wrapper">
                        
                    <section id="main">
                        {/* <nav classname="navbar">
                            <div classname="container">
                                <div classname="row">
                                    <div className="navbar-nav">
                                        <a className="navlink-item">Summary</a>
                                        <a className="navlink-item">Saga</a>
                                        <a className="navlink-item">Episodes</a>
                                        <a className="navlink-item">Characters</a>
                                    </div>
                                </div>
                            </div>
                        </nav> */}
                        <div className="left-sidebar sidebar">
                            <div className="poster-wrap">
                                <img src={movie?.attributes?.posterImage?.small} alt=""/>
                            </div>
                            {/* <div className="streaming-links-wrap">
                                <div>Streaming links</div>
                            </div> */}
                        </div>
                
                        <section className="central sidebar">
                            <div className="description-wrap">

                            <div className="title-wrap">
                                <h3 className="title">{movie?.attributes?.canonicalTitle}</h3>
                                <h5 className="year">{movie?.attributes?.startDate.split('-')[0]}</h5>

                            </div>
                                <h1 className="rating" style={{color: rateColor}}>Approved By {movie?.attributes?.averageRating}% of the community</h1>
                                <p id="description" name="description" className="reduced">{movie?.attributes?.description}</p>
                                <a id="expand-desc" className="read-more" onClick={handleExpand}>Read more...</a>
                                <div className="rating-wrap">
                                    <div>
                                        <Link to="/explore/anime/most-popular">
                                        <Star style={{ color: yellow[800], "margin-bottom":-2, "margin-right":5}}></Star>Ranked #{movie?.attributes?.popularityRank} (Most popular Anime)
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to={"/explore/anime/highest-rated"}>
                                        <Favorite style={{ color: red[800], "margin-bottom":-2, "margin-right":5 }}></Favorite>Rated #{movie?.attributes?.ratingRank} (Best Rated Anime)
                                        </Link>
                                    </div>
                                </div>

                                <div className="genres">
                                {genres.map((genre,index)=> <li key={genre} style={{"background":rainbow(index)}}>
                                <Link to={{
                                    pathname:`/anime/categories/${genre.slug}`,
                                     state:{
                                         title:genre.title },
                                     }}>{genre.title}</Link></li>)}                                    
                                </div>

                            </div>          
        
                        </section>
            
                        <section className="right-sidebar sidebar">
                            <div className="trailer">
                            {lightboxOpen && <ReactImageVideoLightbox id="player"
                            data={[
                             { url: `https://www.youtube.com/embed/${movie?.attributes?.youtubeVideoId}?rel=0&amp;start=1;fs=0;autohide=1;hd=1;mute=0;autoplay=1;showinfo=0`, type: 'video', altTag: 'Trailer' }]}
                                startIndex={0}
                                showResourceCount={false}
                                onCloseCallback={() => { setLightBox(false) }} />
                             }
                                <div className="trailer-preview">
                                    <img src={`https://img.youtube.com/vi/${movie?.attributes?.youtubeVideoId}/mqdefault.jpg`}  alt=""/>
                                    <button onClick={() => { setLightBox(true); window.scrollTo(0, 0) }}><PlayArrow/></button>
                                </div>
                             
                            </div>
                                <div className="details-wrap">
                                <h3>Anime Details</h3>
                                <p><strong>English Title: </strong><span>{movie?.attributes?.titles.en}</span></p>
                                <p><strong>Japanese (Romaji) Title: </strong>{movie?.attributes?.titles.en_jp}</p>
                                <p><strong>American Title: </strong>{movie?.attributes?.titles.en_us}</p>
                                <p><strong>Japanese: </strong>{movie?.attributes?.titles.ja_jp}</p>
                                <p className="showtype"><strong>Type: </strong>{movie?.attributes?.subtype}</p>
                                <p className="episodes"><strong>Episodes: </strong>{movie?.attributes?.episodeCount}</p>
                                <div className="broadcast__start"><strong>First Broadcast: </strong>{movie?.attributes?.startDate.split('-')[0]}</div>    
                                <p className="status"><strong>Status: </strong>{movie?.attributes?.status}</p>
                                <p className="age rating"><strong>Age Rating: </strong>{movie?.attributes?.ageRatingGuide}</p>
                                <p className="episode-length"><strong>Episode Length: </strong> {movie?.attributes?.episodeLength} minutes</p>
                                </div>

                                {!isLoading && characters !== undefined ? 
                                  <div className="characters-wrap">
                                    <h5>Characters</h5>
                                    <div className="characters__pic-wrap">
                                    {characters&&characters.map(character => 
                                    <div className="character-pic" key={character.attributes.name}>
                                        <BootstrapTooltip TransitionComponent={Zoom} placement="top-start" title={character.attributes.name} arrow>
                                        <img src={character.attributes.image?.original||missing} alt={character.attributes.name}/>
                                        </BootstrapTooltip>
                                    </div>)}
                                    </div>
                                    <Link to={{
                                    pathname:`/anime/${match.params.slug}/characters`,
                                     state:{
                                         id:movieId,
                                         title:movie?.attributes?.titles.en||movie?.attributes?.titles.en_jp
                                        },
                                     }} className="view-more" >View all characters</Link>
                                </div> : ''}

                                {!isLoading && saga !== undefined ?
                                    <div className="saga-wrap">
                                <h5>Saga</h5>
                                <div className="saga-pic-wrap">
                                    {saga&&saga.map(s => 
                                    <div className="saga-pic" key={s.attributes.canonicalTitle}>
                                        <BootstrapTooltip style={{"fontSize":46}} TransitionComponent={Zoom} placement="top-start" title={s.attributes.canonicalTitle} arrow>
                                        <img src={s.attributes.posterImage.small} alt={s.attributes.canonicalTitle}/>
                                        </BootstrapTooltip>
                                    </div>)}
                                    </div>
                                    <Link to={{
                                    pathname:`/anime/${match.params.slug}/saga`,
                                     state:{
                                         id:movieId,
                                         title:movie?.attributes?.titles.en||movie?.attributes?.titles.en_jp
                                        },
                                     }} className="view-more" >View The entire saga</Link>
                                </div> : ''}

                                <div className="episode-wrap">
                                <Link to={{
                                    pathname:`/anime/${match.params.slug}/episode`,
                                     state:{
                                         id:movieId,
                                         title:movie?.attributes?.titles.en||movie?.attributes?.titles.en_jp
                                        },
                                     }} className="view-more" >View all episodes</Link>
                                 <MovieSharp style={{ color: red[800], "margin-left":15}}/>
                                
                                </div>
                        </section> 

                    </section>
                    </div>

            </div>
        </div>
    )
}

export default AnimeDetails
