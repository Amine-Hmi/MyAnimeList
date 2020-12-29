
import React from 'react'
import {useState, useEffect} from 'react'
import Pagination from '../components/Pagination'
import AnimeGrid from '../components/AnimeGrid'
import axios from '../components/axios'


function Topcurrent() {
    const [movies, setMovies]  = useState([]);
    const [isLoading, setisLoading]  = useState(true);
    const fetchUrl= `https://kitsu.io/api/edge/anime?filter%5Bstatus%5D=current&page%5Blimit%5D=20&page%5Boffset%5D=0&sort=-userCount

`
    const [next, setNext]  = useState('');
    const [last, setLast]  = useState('');
    const [first, setFirst]  = useState('');
    const [prev, setPrev]  = useState('');

    async function fetchMovieData(url) {
        setisLoading(true)
        const request = await axios.get(url);
        setMovies(request.data.data);
        setFirst(request.data.links.first)
        setLast(request.data.links.last)
        setNext(request.data.links.next)
        setPrev(request.data.links.prev)   
        setisLoading(false)
        return request;
    }

    useEffect(() => {
        fetchMovieData(fetchUrl);
    },[])

    return (
        <>
        <AnimeGrid items={movies} isLoading={isLoading} title='Top Current Animes'/>
        <Pagination next={next} prev={prev} last={last} first={first} items={movies} handlePage={(p)=>{fetchMovieData(p)}}/>
        </>
    )
}
export default Topcurrent