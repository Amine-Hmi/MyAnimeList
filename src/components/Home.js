import React from 'react'
import Row from './Row'
import requests from './requests';


function Home() {
  return (
    <>
        <Row title="Most Popular" fetchUrl={requests.fetchMostPopular} slug="most-popular"/>
        <Row title="Highest Rated" fetchUrl={requests.fetchHighestRated} slug="highest-rated"/>
        <Row title="Trending" fetchUrl={requests.fetchTrendingThisWeek} slug="trending"/>
        <Row title="Top Current" fetchUrl={requests.fetchTopCurrent} slug="top-current"/>
        <Row title="Top Upcoming" fetchUrl={requests.fetchTopUpcoming} slug="top-upcoming"/>
    </>
  )
}

export default Home
