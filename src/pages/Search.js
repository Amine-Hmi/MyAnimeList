import React, {useState, useEffect} from 'react';
import  {useLocation} from 'react-router'
import AnimeGrid from '../components/AnimeGrid'
import axios from '../components/axios'
import Pagination from '../components/Pagination'


function Search() {
    const location = useLocation()
    const [items,setItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [PageOffset, setPageOffset] = useState(0);

    const [next, setNext] = useState('')
    const [prev, setPrev] = useState('')
    const [last, setLast] = useState('')
    const [first, setFirst] = useState('')
    const [itemsNb, setItemsNb]  = useState('');



    const SEARCH_API = `https://kitsu.io/api/edge/anime?fields[anime]=slug,canonicalTitle,titles,posterImage,description,averageRating,startDate,popularityRank,ratingRank,ageRatingGuide,showType,status&filter[text]=${location.search}&page[offset]=${PageOffset}&page[limit]=10`

    
    async function fetchMovieData(url) {
        setIsLoading(true);
        const resp = await axios.get(url);
        setIsLoading(false);
        setItems(resp.data.data);
        setFirst(resp.data.links.first)
        setLast(resp.data.links.last)
        setNext(resp.data.links.next)
        setPrev(resp.data.links.prev)
        setItemsNb(resp.data.meta.count)
        
        return (items);
      }

    useEffect(() => {
      fetchMovieData(SEARCH_API)}
  ,[location.search])
  
  // const Paginate = (p) => {
  //   setIsLoading(true)
  //   setItems([...p.data])
  //   setFirst(p.links.first)
  //   setLast(p.links.last)
  //   setNext(p.links.next)
  //   setPrev(p.links.prev)
  //   setIsLoading(false)
  // }
  
    return (
    <div><>
                <AnimeGrid items={items} isLoading={isLoading} title={'Search results for: '+location.state.term}/>
                <Pagination next={next} prev={prev} last={last} first={first}
                 items={items} handlePage={(p)=>{fetchMovieData(p)}} itemsNb={itemsNb} />
                </>
    </div>
    )
}

export default Search
