import React from 'react'
import { Star,Favorite } from '@material-ui/icons';
import { yellow,red } from '@material-ui/core/colors';
import missing from './img/missing.jpg';
import {Link} from 'react-router-dom'
import './AnimeItem.css'




const AnimeItem = ({ item }) => {
  const rateColor = item.attributes.averageRating && item.attributes.averageRating <30 ? 'red' :
  (item.attributes.averageRating && item.attributes.averageRating >=30 && item.attributes.averageRating && item.attributes.averageRating < 80 ) ? 'orange' : '#1abc9c'; 

  return (
  <div className="Grid-item" key={item.id}>
    <div className="Card">
    <div className="Front">
      {<img className="Poster" src={item.attributes.posterImage == null ? missing : item.attributes.posterImage.medium } alt={item.attributes.canonicalTitle}></img>}
      <h2 className="Title">{item.attributes.canonicalTitle}
      </h2>
      <div className="Rates">
        
      </div>
  </div>

    <div className="Back">
      <h3 >{item.attributes.canonicalTitle}</h3>
      {/* <h3 className="description">{item.attributes.description}</h3> */}
      {/* <meter min="0" low="10" optimum="50" high="90" max="100" value={item.attributes.averageRating}></meter> */}
      <p className="avg" style={{color: rateColor}}>{(item.attributes.averageRating) ? item.attributes.averageRating+'%' : 'N/A'}</p>
      <p className="pop"><Star style={{ color: yellow[800] }}></Star>#{item.attributes.popularityRank} Most popular</p>
      <p className="pop"><Favorite style={{ color: red[800] }}></Favorite>#{item.attributes.ratingRank} Best Rated</p>
      <p><strong>Type: </strong>{item.attributes.showType}</p>
      <p><strong>Broadcast on: </strong>{(item.attributes.startDate) ? (item.attributes.startDate.split('-')[0]) : 'N/A'}</p>
      <p><strong>English: </strong>{item.attributes.titles.en}</p>
      <p><strong>Japanese: </strong>{item.attributes.titles.ja_jp}</p>
      {/* <p><strong>Japanese (Romaji): </strong>{item.attributes.titles.en_jp}</p> */}
      <p><strong>Status: </strong>{item.attributes.status}</p>
      <p><strong>Episode Length: </strong>{item.attributes.episodeLength} minutes</p>
      <p><strong>Age Rating: </strong>{item.attributes.ageRatingGuide}</p>
      {/* <a className='title-link' href= {'https://kitsu.io/anime/'+item.attributes.slug} target="_blank" rel="noopener noreferrer">More Details</a> */}
      <Link to={`/anime/${item.attributes.slug}`} className='title-link'>More Details</Link>
    </div>
  </div>
  </div>
  )}

export default AnimeItem
