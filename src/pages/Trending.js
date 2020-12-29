import React from 'react'
import {useState, useEffect} from 'react'
import AnimeGrid from '../components/AnimeGrid'
import axios from '../components/axios'


function Trending() {

    const fetchUrl = 'https://kitsu.io/api/edge/trending/anime?limit=20'
    
    const [movies, setMovies]  = useState([]);
    const [isLoading, setisLoading]  = useState(true);

    useEffect(() => {
        async function fetchMovieData() {
            setisLoading(true)
            const request = await axios.get(fetchUrl);
            setMovies(request.data.data);
            setisLoading(false)
            return request;
        }
        fetchMovieData();
    },[])
    
    return ( <AnimeGrid items={movies} isLoading={isLoading} title='Trending this week'/> )
}

export default Trending

