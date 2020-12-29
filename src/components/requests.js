import { Language } from "@material-ui/icons";

const requests = {

    fetchMostPopular :"https://kitsu.io/api/edge/anime?page[limit]=5&sort=-user_count",
    fetchHighestRated:"https://kitsu.io/api/edge/anime?page[limit]=5&sort=-average_rating",
    fetchTrendingThisWeek: "https://kitsu.io/api/edge/trending/anime?limit=5",
    fetchTopCurrent:"https://kitsu.io/api/edge/anime?filter[status]=current&page[limit]=5&sort=-user_count",
    fetchTopUpcoming: "https://kitsu.io/api/edge/anime?filter[status]=upcoming&page[limit]=5&sort=-user_count",
//?To Be Checked
    fetchGenreInfos: `https://kitsu.io/api/edge/categories?filter[slug]=ecchi&include=parent.parent`,
    fetchGenreNewlyReleased: `https://kitsu.io/api/edge/anime?filter[status]=current&filter[categories]=ecchi&page[limit]=15&sort=-start_date`,
    fetchGenreMostPopular: `https://kitsu.io/api/edge/anime?filter[categories]=ecchi&page[limit]=15&sort=-user_count`,
    fetchGenreTrending: `https://kitsu.io/api/edge/anime?filter[categories]=ecchi&page[limit]=15&sort=-user_count`,
//? Language ti be used as filters when fetching anime characters
//? Detailed info /Tab
// fetchLang: `https://kitsu.io/api/edge/anime/${movie.id}/_languages`,
// fetchChar: `https://kitsu.io/api/edge/castings?filter[media_type]=Anime&filter[media_id]=${movie.id}&filter[is_character]=true&filter[language]=${Language}&include=character,person&sort=-featured`,
// fetchSaga: `https://kitsu.io/api/edge/media-relationships?filter[source_id]=${movie.id}&filter[source_type]=Anime&include=destination&sort=role`,
// //? Limited 
// fetchSagaltd: `https://kitsu.io/api/edge/media-relationships?filter[source_id]=${movie.id}&filter[source_type]=Anime&include=destination&page[limit]=4&sort=role`
       
}

export default requests;