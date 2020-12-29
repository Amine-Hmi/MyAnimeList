import React from 'react'
import {useState, useEffect} from 'react'
import AnimeGrid from '../components/AnimeGrid'
import axios from '../components/axios'
import Pagination from '../components/Pagination'


function Highestrated() {
    const fetchUrl= "https://kitsu.io/api/edge/anime?page%5Blimit%5D=20&page%5Boffset%5D=0&sort=-averageRating";
        
    const [movies, setMovies]  = useState([]);
    const [isLoading, setisLoading]  = useState(true);
    
    const [next, setNext]  = useState('');
    const [last, setLast]  = useState('');
    const [first, setFirst]  = useState('');
    const [prev, setPrev]  = useState('');
    const [itemsNb, setItemsNb]  = useState('');


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
        return request;
    }

    useEffect(() => {        
        fetchMovieData(fetchUrl);
    },[])

    return (<>
                <AnimeGrid items={movies} isLoading={isLoading} title='Highest Rated Animes'/>
                <Pagination next={next} prev={prev} last={last} first={first} items={movies} handlePage={(p)=>{fetchMovieData(p)}} itemsNb={itemsNb}/>
            </>
    
    )
}

export default Highestrated

