import React from 'react';
import {useState, useEffect} from 'react';
import {useParams,useLocation} from 'react-router';
import axios from '../components/axios';
import AnimeGrid from '../components/AnimeGrid'
import Pagination from '../components/Pagination'
import Back from '../components/Back'
import "./style/Categories.css"

function Categories(props) {
    const {category} = useParams();
    const [movies,setMovies] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [description, setDescription] = useState(null)

    const [next, setNext]  = useState('');
    const [last, setLast]  = useState('');
    const [first, setFirst]  = useState('');
    const [prev, setPrev]  = useState('');
    const [itemsNb, setItemsNb]  = useState('');
    
    const location = useLocation()

    const fetchCategoryUrl= `https://kitsu.io/api/edge/anime?fields[anime]=slug,canonicalTitle,titles,posterImage,description,averageRating,startDate,popularityRank,ratingRank,showType,youtubeVideoId&filter[categories]=${category}&page[limit]=20&page[offset]=0&sort=-user_count`
    const fetchCategorydescUrl = `https://kitsu.io/api/edge/categories?filter[slug]=${category}&include=parent.parent`
    const catTitle = location.state&&location.state.title
    // const newly_released = `https://kitsu.io/api/edge/anime?filter[status]=current&filter[categories]=${category}&page[limit]=15&sort=-start_date`
    // const most_popular = `https://kitsu.io/api/edge/anime?filter%5Bcategories%5D=${category}&page%5Blimit%5D=15&sort=-user_count`
    // const trending = `https://kitsu.io/api/edge/trending/anime?limit=15&in_category=true&category=180`
     
    // useEffect(() => {
    //     async function fetchMovieData() {
    //         setisLoading(true);
    //         const resp = await axios.get(fechCategorydescUrl);
    //         console.log(resp.data)
    //         setisLoading(false);
    //         setDescription(resp?.data?.data?.attributes?.description);
    //         return description;
            
    //     }
    //     fetchMovieData();
    // },[])
    async function fetchMovieData(url) {
        setisLoading(true);
        const respCatMov = await axios.get(url);
        const respCatDesc= await axios.get(fetchCategorydescUrl);
        // console.log('Movies',respCatMov.data.data)
        setisLoading(false);
        setMovies(respCatMov.data.data);
        setDescription(respCatDesc?.data?.data[0]);
        setFirst(respCatMov.data.links.first)
        setLast(respCatMov.data.links.last)
        setNext(respCatMov.data.links.next)
        setPrev(respCatMov.data.links.prev)
        setItemsNb(respCatMov.data.meta.count)

        return (movies,description);
    }

    useEffect(() => {        
        fetchMovieData(fetchCategoryUrl)
        },[])

    return (
        <div id="categories__wrapper">
            <Back/>
            <AnimeGrid items={movies}
             isLoading={isLoading}
             title={catTitle}
             description={description?.attributes?.description}/>
            <Pagination next={next}
             prev={prev} last={last}
             first={first} items={movies}
             handlePage={(p)=>{fetchMovieData(p)}} itemsNb={itemsNb} />
        </div>
    )

}

export default Categories
