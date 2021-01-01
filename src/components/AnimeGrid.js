      
import React from 'react'
import AnimeItem from './AnimeItem';
import Spinner from './Spinner'
import './style/AnimeGrid.css'

const AnimeGrid = ({items, isLoading, title, description}) => {
  return (
  <div className="Grid-cnt">
    <div class="ribbon-wrapper">
      <h3 class="ribbon">
        <strong class="ribbon-inner">{title}</strong>
     </h3>
    <p className="definition">{description}</p>
  </div>
<div className='Grid'>

    {isLoading ? (<div className="spinner-wrap"><Spinner/><h3>Loading ...</h3></div>) :
   (items.map( (item)=>  (<AnimeItem key={item.id} item={item}></AnimeItem>)) )}
</div>
  </div>)
}
//   return (
//     <section className= "Grid">
//         {items.map(({item}) => (
//       <div key={item.id} >
//           <h1 className="Title">{item.attributes.canonicalTitle}</h1>
//           <h3 className="description">{item.attributes.description}</h3>
//           <p className="synopsis">{item.attributes.synopsis}</p>
//       </div>
//     ))}
//   </section>
  
// )
export default AnimeGrid;