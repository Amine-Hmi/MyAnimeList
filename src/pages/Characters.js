import React from 'react';
import {useState, useEffect} from 'react';
import {useLocation } from 'react-router-dom'
import axios from '../components/axios';
import './style/characters.css'
import Back from '../components/Back'
import missing from '../components/img/missing.jpg'


function Characters(props) {

const location = useLocation()
const movieid = location.state&&location.state.id
const movieTitle = location.state&&location.state.title
const [isLoading, setisLoading]  = useState(true);
const [languages, setLanguages]  = useState([]);
const [selectedlanguage, setSelectedLanguage]  = useState('');
const [casting, setCasting]  = useState([]);
const [hasMore, setHasMore]  = useState('');

const fetchLangsUrl = `https://kitsu.io/api/edge/anime/${movieid}/_languages`
const fetchCharsUrl = `https://kitsu.io/api/edge/castings?filter[media_type]=Anime&filter[media_Id]=${movieid}&filter[is_character]=true&filter[language]=${selectedlanguage}&include=character,person&sort=-featured`

// const voiceactor = `https://kitsu.io/api/edge/castings?filter[is_character]=true&filter[language]=Japanese&filter[media_id]=${movieid}&filter[media_type]=Anime&include=character,person&page[limit]=10&page[offset]=0&sort=-featured`
const infos = {}

//* fetch (data.data.relationships.character.data.id) => char_id
//* fetch data.data.relationships.person.data.id => person_id
//* if (data.included.id) == char_id => fetch included.attributs.name => save to
/*
? Remove ducpicates from fetched characters
 */
const loadMore = (p) => {
    let arr = p.concat(infos.data)
    let arr2 = [...new Map(arr.map(item => [JSON.stringify(item), item])).values()];
    return (arr2)
}

useEffect(() => {
    async function fetchLangData() {
        const reqLangs = await axios.get(fetchLangsUrl);
        setLanguages(reqLangs.data);
        setSelectedLanguage('Japanese')
        setisLoading(false)
        return (languages);
    }
    fetchLangData();
},[])


async function fetchMovieData(url) {
    const resp = await axios.get(url);
    setisLoading(false)

    Object.assign(infos,resp.data);

        for (let i = 0; i < infos.data.length; i++) {
            let person_id = infos.data[i].relationships.person.data.id;
            let char_id = infos.data[i].relationships.character.data.id;

                for (let j = 0; j < infos.included.length; j++) {

                    let id = infos.included[j].id;
                    let name = infos.included[j].attributes.name;
                        if (char_id === id)
                            {
                                infos.data[i].relationships.character.data['name'] = name;
                                infos.data[i].relationships.character.data['image'] = infos.included[j].attributes?.image?.original;
                            }

                        if (person_id === id)
                        {
                            infos.data[i].relationships.person.data['name'] = name;
                            infos.data[i].relationships.person.data['image'] = infos.included[j].attributes?.image?.original;
                        }

            }
        }
        setCasting((prev)=>loadMore(prev))  
        setHasMore(infos.links.next)
        return (infos);


}

useEffect(() => {
fetchMovieData(fetchCharsUrl);
setCasting([]) // clear previous other lang actors so they wont be appended to current lang actors
},[selectedlanguage,languages])


    return (
            <><h3 class="ribbon">
                <strong class="ribbon-inner">{movieTitle} Characters</strong>
            </h3>
        <div>
            <Back/>
            <label for="Languages">Choose a language:</label>

            <select id="Languages" onChange={(e)=> {setSelectedLanguage(e.target.options[e.target.selectedIndex].text)}}>
            {languages&&languages.map(lang => 
            <option key={lang} value={lang} selected = {lang === selectedlanguage ? 'true' : 'false'}>{lang}</option>)}
            </select>
            
            <div className="media-wrap">

            {isLoading ? <h3>'Loading ...'</h3> :  casting&&casting.map(char =>
            <>
              <div className="Characters-wrap">
                  
                <div className="Character-pic">
                    <img key={char?.relationships.character.data.image} src={char?.relationships.character.data.image||missing} atl={char?.relationships.character.data.image}/>
                </div>
                
                <div className="Character-name">
                    <p key={char?.relationships.character.data.name}>{char?.relationships.character.data.name}</p>
                </div>

                <div className="actors-wrap">
                
                    <div className="Actors-pic">
                        <img key={char?.relationships?.person.data.image} src={char?.relationships.person.data.image} atl={char?.relationships.person.data.name}/>
                    </div>

                    <div className="Actor-name">
                        <p key={char.relationships?.person.data.name}>{char.relationships.person.data.name}</p>
                    </div>
                
            </div>
                
            </div>
            </>            
            )
            }
             
            </div>
                {hasMore ? <button onClick={()=> {if (hasMore) {fetchMovieData(hasMore)}}}>Load More ...</button> : ''}
        </div></>
    )
    }
export default Characters