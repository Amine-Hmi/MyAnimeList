import React, { useState } from 'react'
import './SearchBar.css'

const Search = ({getFilter, getSort, getPageLimit,media}) => {
  const [text, setText] = useState('')
  const [Filter, setFilter] = useState('')
  const [Sort, setSort] = useState('')
  const [PageLimit, setPageLimit] = useState('')
  const [MediaType, setMediaType] = useState('')

  const onFilterChange = (f) => {
    setFilter(f)
    getFilter(f)
  }

  const handleSelect = (s) => {
    setSort(s)
    getSort(s)
  }
  
  const handlePageLimit = (p) => {
    setPageLimit(p)
    getPageLimit(p)
  }
  const handleMediaChange = (m) => {
    setMediaType(m)
    media(m)
  }
  
  

  
  return (
    <section className='search'>
      <form>
        {/* <input
          type='text'
          className='form-control'
          placeholder='Search'
          value={text}
          onChange={(e) => onSearchChange(e.target.value)}
          autoFocus
        /> */}
        <label>Filter</label>
        <select id="Filter" name="Filter" onChange={(e) => onFilterChange(e.target.value)}
>         <option value="text">Anime</option>
          <option value="categories">Genre</option>
          <option value="Character">Character</option>
      </select>

        <label >Sort</label>
        <select id="sort" name="sort" onChange={ (e) => handleSelect(e.target.value)} >
          <option value="-user_Count" selected>Popularity</option>
          <option value="-average_rating" >Average rates</option>
          <option value="-start_date">Date</option>
          <option value="-created_at">Recently Added</option>
      </select>

        <label >Limit</label>
        <select id="Pagelimit" name="PageLimit" onChange={ (e) => handlePageLimit(parseInt(e.target.value))}>
          <option value="5">5</option>
          <option value="10" selected>10</option>
          <option value="15">15</option>
          <option value="20">20</option>
      </select>

        <label >Media Type</label>
        <select id="Media" name="Media" onChange={ (e) => handleMediaChange(e.target.value)}>
          <option value="anime">Anime</option>
          <option value="manga">Manga</option>
      </select>

      </form>
      
    </section>
  )
}

export default Search