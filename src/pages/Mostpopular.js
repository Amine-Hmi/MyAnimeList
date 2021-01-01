
    
import React from 'react'
import {useState, useEffect} from 'react'
import AnimeGrid from '../components/AnimeGrid'
import axios from '../components/axios'
import Pagination from '../components/Pagination'
import Back from '../components/Back'



function Mostpopular() {
    const fetchUrl="https://kitsu.io/api/edge/anime?page%5Blimit%5D=20&sort=-userCount"
    
    const [movies, setMovies]  = useState([]);
    const [isLoading, setisLoading]  = useState(true);

    const [next, setNext]  = useState('');
    const [last, setLast]  = useState('');
    const [first, setFirst]  = useState('');
    const [prev, setPrev]  = useState('');
    const [itemsNb, setItemsNb]  = useState('');
    
   
//     const fetchNext = () => {
//     fetchMovieData(next);
//  }
//     const fetchLast = () => {
//     fetchMovieData(last);
//  }
//     const fetchFirst = () => {
//     fetchMovieData(first);
//   }
//     const fetchPrev = () => {
//     fetchMovieData(prev);
//  }

    async function fetchMovieData(url) {
        setisLoading(true)
        const request = await axios.get(url);
        setMovies(request.data.data);
        setFirst(request.data.links.first)
        setLast(request.data.links.last)
        setNext(request.data.links.next)
        setPrev(request.data.links.prev)
        setItemsNb(request.data.meta.count)
        setisLoading(false)
        //append lazyloading
        // setMovies((prev)=>[...prev,...request.data.data]);
        // setNext(request.data.links.next);
        // setLast(request.data.links.last);
        // setFirst(request.data.links.first);
        // setPrev(request.data.links.prev);
    }
    useEffect(() => {
        fetchMovieData(fetchUrl);
    },[])

    return (
                <>
                <Back/>
                <AnimeGrid items={movies} isLoading={isLoading} title='Most Popular Animes'/>
                <Pagination next={next} prev={prev} last={last} first={first} items={movies} handlePage={(p)=>{fetchMovieData(p)}} itemsNb={itemsNb}/>
                </>
    )
}

export default Mostpopular
