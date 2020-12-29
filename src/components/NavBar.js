import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router';

import './NavBar.css'
import logo from './img/logo.png'

  const NavBar = () => {

  const [items,setItems] = useState([])
  const [text,setText] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);

  const [Filter,setFilter] = useState('text');
  const [Media,setMediaType] = useState('anime');
  const [PageLimit,setPageLimit] = useState(10);
  const [PageOffset, setPageOffset] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const [PagesCount,setPagesCount] = useState(0);

  const history = useHistory();

  // const SEARCH_API = `https://kitsu.io/api/edge/anime?fields[${Media}]=slug,canonicalTitle,titles,posterImage,description,averageRating,startDate,popularityRank,ratingRank,youtubeVideoId&filter[${Filter}]=${query}&page[offset]=${PageOffset}&page[limit]=${PageLimit}`

  // const fetchData = async (api_url) => {
  //       try {
  //         const resp = await axios.get(api_url,
  //         {
  //           headers:{
  //             'Accept': 'application/vnd.api+json',
  //             'Content-Type': 'application/vnd.api+json'
  //         }
  //       });
      
  //           setIsLoading(true);
  //           setItems(resp.data.data);
  //           setPagesCount(resp.data.meta.count);
  //           setIsLoading(false);
  //           // console.log(items,'items');
  //           // console.log(resp,'resp');
      
  //     }catch (err) {
  //           // Handle Error Here
  //           console.error(err);
  //       }
  //       return (items)
  //     };
      
    // useEffect (() => 
    // {
    // fetchData(SEARCH_API)
    // },[query])

    const onSearchChange = (q) => {
    // setText(q); 
    setQuery(q);
    setPageOffset(0); //reset page offset so fetched anime would be displayed starting from 0
    if (q =='') history.push("/")
    else {
          history.push({
          pathname: '/Search',
          search: `?query=${q}`,
          state: { term: q }
    })
  }

    }
    
        return (
        <nav className="NavBar">
          <div className="logo-cnt">
            <a href="/">
            <img className="logo" src={logo} alt="Logo">
            </img>
            </a>
          </div>          

            <input
              type='text'
              className='search-control'
              placeholder='Search By title, character, voice actor ...'
              value={query}
              onChange={(e) => onSearchChange(e.target.value)}
              // autoFocus
           />
          <span className="brand">My AnimeList</span>
          <span className='author'>By Amin Hammami</span>
        </nav>
        )}
export default NavBar;