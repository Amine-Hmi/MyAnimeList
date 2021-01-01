import React,{useState} from 'react'
import './App.css'
import {HashRouter as Router, Switch, Route, Link, useHistory, HashRouter } from 'react-router-dom';
import { Favorite } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

import NavBar from './components/NavBar';
import AnimeDetails from './pages/AnimeDetails';

// Decorative Icons
import Home from './components/Home'
import Search from './pages/Search'
import Highestrated from './pages/Highestrated';
import Mostpopular from './pages/Mostpopular';
import Trending from './pages/Trending';
import Topupcoming from './pages/Topupcoming';
import Topcurrent from './pages/Topcurrent';
import Categories from './pages/Categories';
import Characters from './pages/Characters';
import Saga from './pages/Saga';
import Episodes from './pages/Episodes';
import NotFound from './pages/NotFound';


export default function App() {
     

      // const indexOfLastItem = currentPage * PageLimit;
      // const indexOfFirstItem = indexOfLastItem - PageLimit;
      // // const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);    

      // const paginate = (pageNumber, offset) => {
      //   setPageOffset(pageNumber);
      //   setCurrentPage(offset)};
      
      // // const SEARCH_API=`https://kitsu.io/api/edge/${Media}/?filter[${Filter}]=${query}?page[limit]=${PageLimit}&page[offset]=${PageOffset}`
      // const FEATURED_API=`https:kitsu.io/api/edge/anime?page[limit]=${PageLimit}&sort=${Sort}`
      // // const BASE_API=`https://kitsu.io/api/edge/anime/?filter[${Filter}]=${query}?page[limit]=${PageLimit}&page[offset]=${PageOffset}&sort=${Sort}`
      // //adveanced popular = `https://kitsu.io/api/edge/anime?fields[${Media}]=slug,canonicalTitle,titles,posterImage,description,averageRating,startDate,popularityRank,ratingRank,youtubeVideoId&page[offset]=${PageOffset}&page[limit]=${PageLimit}&sort=-user_count`

      const [PageOffset, setPageOffset] = useState(0);
      const [query, setQuery] = useState('');
      const history = useHistory();

  return (   
      <Router basename={process.env.PUBLIC_URL}>

      <div className="App">
      
      <NavBar/>
      
      {/* <div className="mylinks-wrap">
            <div className="mylinks">
              <Link to="/"><button><HomeIcon style={{ color: purple[100] }}></HomeIcon>Home</button></Link>

              <Link to={
                  {
                    pathname: "/Search",
                    state: { 
                    from :"root" 
                    }                    
                  }
                }
                ><button><SearchIcon style={{ color: purple[100] }}></SearchIcon>Search</button></Link>

              <Link to={{pathname: "/About"}}><button><AboutIcon style={{ color: purple[100] }}></AboutIcon>About</button></Link>
            </div>
          </div> */}
       
       <Switch>
          <Route key="1" path="/" exact component={Home}/>
          <Route key="2" path="/Search" exact component={Search}/>
          <Route key="3" path="/anime/:slug" exact component={AnimeDetails}/>
          <Route key="4" path="/explore/anime/highest-rated" exact component={Highestrated}/>
          <Route key="5" path="/explore/anime/most-popular" exact component={Mostpopular}/>
          <Route key="6" path="/explore/anime/top-current" exact component={Topcurrent}/>
          <Route key="7" path="/explore/anime/top-upcoming" exact component={Topupcoming}/>
          <Route key="8" path="/explore/anime/trending" exact component={Trending}/>
          <Route key="9" path="/anime/categories/:category" exact component={Categories}/>
          <Route key="10" path="/anime/:anime/characters" exact component={Characters}/>
          <Route key="11" path="/anime/:anime/saga" exact component={Saga}/>
          <Route key="12" path="/anime/:anime/episode" exact component={Episodes}/>
          <Route key="13" component={NotFound}/>
       </Switch>

       <section className="myFooter">
          <div className="credits">
          © 2020, made with <Favorite style={{ color: red[800] }}></Favorite>
          by <a href="http://github.com/Amine-Hmi">Amine Hammami</a>
          </div>
        </section> 

       
      {/* <Pagination 
      getPageLimit= {PageLimit} //reset pageoffset upon every new search
      paginate = {paginate}
      pages={PagesCount}
      currentPage = {currentPage}
      />
     */}


      </div>
      </Router>

  );
}