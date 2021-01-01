import React, {useState} from 'react'
import { FirstPageTwoTone,SkipNextTwoTone,SkipPreviousTwoTone,LastPageTwoTone } from '@material-ui/icons';
import './style/Pagination.css'
import axios from '../components/axios'

const Pagination = ({prev, next, last, first,handlePage,itemsNb}) => {
// const Pagination = ({pages, getPageLimit, paginate,currentPage}) => {
//     let pageNumbers = [];

    
// for (let i=1; i<= Math.ceil(pages/getPageLimit); i++){
//      pageNumbers.push(i);
//     }

const [isLoading, setIsLoading] = useState(false)
const [items, setItems] = useState([])


async function fetchMovieData(url) {
    handlePage(url);
    return (items)
}
    return (
        //Math.ceil(itemsNb/PageLimit) = pagesnumber
        Math.ceil(itemsNb/10) > 1 ?
        <div className="pagination">
            {prev ?  <button type="button" onClick={()=>{fetchMovieData(first)}}><FirstPageTwoTone>First</FirstPageTwoTone></button> : <button type="button" disabled><FirstPageTwoTone>First</FirstPageTwoTone></button>}
            {prev ?  <button type="button" onClick={()=>{fetchMovieData(prev)}}><SkipPreviousTwoTone>Previous</SkipPreviousTwoTone></button> : <button type="button" disabled><SkipPreviousTwoTone>Previous</SkipPreviousTwoTone></button>}
            {next ?  <button type="button" onClick={()=>{fetchMovieData(next)}}><SkipNextTwoTone>Next</SkipNextTwoTone></button> : <button type="button" disabled><SkipNextTwoTone>Next</SkipNextTwoTone></button>}
            {next ?  <button type="button" onClick={()=>{fetchMovieData(last)}}><LastPageTwoTone>Last</LastPageTwoTone></button> : <button type="button" disabled><LastPageTwoTone>Last</LastPageTwoTone></button>}
        </div>
        : ''

//         <section className="Footer">
//             <nav>
//                 <ul className='pagination'>
//                     {pageNumbers.map(number => (
//                     <li key={number} className='page-item'>
//                         <a href="!#" onClick={() => {paginate((number-1)*getPageLimit,number)}}
//                          className ={currentPage === number ? 'active' : ''}>
//                         {number}
//                         </a>
//                     </li>
//   ))}
// </ul>
//                     </nav>
//         </section>        
    )
}

export default Pagination