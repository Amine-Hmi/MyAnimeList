import React from 'react';
import {useState, useEffect} from 'react';
import {useLocation } from 'react-router-dom'
import axios from '../components/axios';
import Back from '../components/Back'
import Pagination from '../components/Pagination'
import missing from '../components/img/missing.jpg';
import Spinner from '../components/Spinner'
import  './episodes.css'

function Episodes(props){

    const location = useLocation()
    const movieid = location.state&&location.state.id
    const movieTitle = location.state&&location.state.title
    const fetchUrl = `https://kitsu.io/api/edge/episodes?filter[mediaType]=Anime&filter[media_id]=${movieid}&sort=number`
    const [items,setItems] = useState([])
    const [isLoading, setisLoading] = useState(true)


    const [next, setNext]  = useState('');
    const [last, setLast]  = useState('');
    const [first, setFirst]  = useState('');
    const [prev, setPrev]  = useState('');
    const [itemsNb, setItemsNb]  = useState('');

    async function fetchMovieData(url) {
        const result = await axios.get(url);
        setItems(result.data);
        setFirst(result.data.links.first)
        setLast(result.data.links.last)
        setNext(result.data.links.next)
        setPrev(result.data.links.prev)
        setItemsNb(result.data.meta.count)
        setisLoading(false)

        return (items);
    }

    useEffect(() => {
        
        fetchMovieData(fetchUrl);
    },[])
    
    return (
        <>
        <h3 class="ribbon">
            <strong class="ribbon-inner">{movieTitle} Episodes</strong>
        </h3>
        <div className="episodes-wrap">
        <Back/>
        <div className="episodes-grid">

        {!isLoading ? 
            (items.data&&items.data.map(
            item => <>
            <div className="episode-item">

                <div className="thumb-wrap">
                    <img src={item.attributes.thumbnail?.original ?  item.attributes.thumbnail?.original : missing} key={item.id}/>
                </div>
                        
                <div className="info-wrap">
                    <h5 className="ep-title">{item.attributes.canonicalTitle}</h5>
                    <h6 className="ep-number">Episode {item.attributes.number}</h6>
                </div>
            </div>
                        </>
            )) : <div className='Spinner-wrap'><Spinner/></div>
        }
        </div>
            <Pagination next={next}
             prev={prev} last={last}
             first={first} items={items}
             itemsNb={itemsNb}
             handlePage={(p)=>{fetchMovieData(p)}}/>
    </div></>
    )}

export default Episodes
