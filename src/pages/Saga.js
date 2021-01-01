import React,{useState, useEffect} from 'react'
import {useLocation } from 'react-router-dom'
import axios from '../components/axios';
import Back from '../components/Back'
import './style/Saga.css'
import Spinner from '../components/Spinner'


function Saga(props) {
    const location = useLocation()
    const movieTitle = location.state&&location.state.title
    const movieid = location.state&&location.state.id
    const fetchUrl = `https://kitsu.io/api/edge/media-relationships?filter[source_id]=${movieid}&filter[source_type]=Anime&include=destination&page[limit]=10&page[offset]=0&sort=role`
    const [saga,setSaga] = useState([])
    const [isLoading, setisLoading]  = useState(true);
    
    useEffect(() => {
        async function fetchMovieData() {
            const request = await axios.get(fetchUrl);
            setSaga(request.data.included);

            const infos = {}
            Object.assign(infos,request.data);

            for (let index = 0; index < infos.data.length; index++) {
                let stringified= JSON.stringify(infos.data[index].attributes.role);
                let role_lablel = stringified.split("_").join(" ").replace(/"/g,"")
                let role_id = infos.data[index].relationships.destination.data.id;
                let attrib_id = infos.included[index].id;
                if(role_id === attrib_id) {
                    infos.included[index].attributes['role']=role_lablel
                }
            }
            setisLoading(false)
            return infos;
        }
        fetchMovieData();
    },[])
    return (
        <div>
        <Back/>
        <h3 class="ribbon">
            <strong class="ribbon-inner">{movieTitle} Franchise</strong>
        </h3>
            <div>
                <div className="saga-grid">
                        {!isLoading ? saga&&saga.map(s => <div className="saga-item">
                            
                            <div className="saga-item-poster">
                                <img src={s?.attributes?.posterImage?.small} />
                            </div>

                            <div className="saga-item-title">
                                <h4 className="title">{s?.attributes?.titles?.en || s?.attributes?.titles?.en_jp}</h4>
                                <span className="media-type">{s?.attributes?.showType}</span>
                                <span className="media-date"> . {s?.attributes?.startDate.split("-")[0]}</span>
                                <span className="info">{s.attributes.role}</span>
                            </div>
                                </div>
                                ) : "Loading..."}
                </div>
            </div>
        </div>
    )
}

export default Saga
