
import React, { useState, useEffect } from 'react'
import axios from './axios';
import './Row.css'
import { Link } from 'react-router-dom'

export default function Row({title, fetchUrl, slug}) {
    const [movies, setMovies]  = useState([]);
    const [isLoading, setisLoading]  = useState(true);

    useEffect(() => {
        async function fetchMovieData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.data);
            setisLoading(false)
            return request;
        }
        fetchMovieData();
    },[])
    
    return (
        <div className="row__container">        
            <div className="row">
                <h3 className="row__title">{title}</h3>

                <div className="row__posters">

                    {isLoading ? (<h6>Loading...</h6>) : movies.map(movie=>(
                    <>
                        <Link to={`/anime/${movie.attributes.slug}`} key={movie.id}>
                            <img src={movie.attributes.posterImage.small}  alt={movie.attributes.canonicalTitle}/>
                        </Link>
                    </>
                )
                )} 
                </div>
                <div className="more">
                    {/* <a href="#">View More</a> */}
                    <Link to={{
                        pathname: `/explore/anime/${slug}`}
                        }>View More</Link>
                </div>
            </div>
        </div>
    )
}