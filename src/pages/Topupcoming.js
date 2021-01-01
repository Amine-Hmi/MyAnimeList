import React from 'react'
import {useState, useEffect} from 'react'
import AnimeGrid from '../components/AnimeGrid'
import axios from '../components/axios'
import Back from '../components/Back'




function Topupcoming() {
    const fetchUrl =  'https://kitsu.io/api/edge/anime?filter%5Bstatus%5D=upcoming&page%5Blimit%5D=20&sort=-userCount'
        
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
        console.log(movies)
    },[])

    return ( 
            <>
            <Back/>
            <AnimeGrid items={movies} isLoading={isLoading} title='Top Upcoming Animes'/>
            </> )
}

export default Topupcoming

