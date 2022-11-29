/****************************************************************************
  FileName      [ searchPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the search result ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/searchPage.css'
import { useNavigate, useLocation } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const SearchPage = () => {
    const {state} = useLocation()
    // const location = useLocation();
    // const {state} = location
    // let location = useLocation()
    // let server_id = location.state
    // console.log(location, state)
    const [restaurants, setRestaurant] = useState([])
    const getRestaurant = async () => {
        // TODO Part I-3-b: get information of restaurants from DB
        // console.log('search page...');
        // console.log({state})
        const data = await instance.get('/getSearch', {
            params: {
                state
            },
        });
        // console.log(data.data)
        setRestaurant(data.data.contents)
    }

    useEffect(() => {
        getRestaurant()
    }, [ state.priceFilter, state.mealFilter, state.typeFilter, state.sortBy])


    const navigate = useNavigate();
    const ToRestaurant = (id) => {
        // TODO Part III-1: navigate the user to restaurant page with the corresponding id
    }
    const getPrice = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (priceText)
    }
    const getDesc = (tags) => {
        let descText = ''
        for (let i = 0; i < tags.length; i++)
            if(i === tags.length - 1){
                descText += tags[i]
            }
            else{
                descText += tags[i] + ", "
            }
        return(descText)
    }

    return (

        <div className='searchPageContainer'>
            {
                restaurants.map((item) => (
                    
                    // TODO Part I-2: search page front-end
                    <>
                        {/* {console.log(item)} */}
                        <div className="resBlock" id={item.id} key={item.id}>
                            <div className="resImgContainer">
                                <img className='resImg' src={item.img}  />
                            </div>
                            <div className="resInfo">
                                <div className="title">
                                    <p className='name'> {item.name} </p>
                                    <p className='price'> {getPrice(item.price)}  </p>
                                    <p className='distance'>{item.distance / 1000} km</p>
                                </div>
                                <p className='description'>{getDesc(item.tag)}</p>
                                {/* {console.log("DEC", getDesc(item.tag))} */}
                            </div>
                        </div>
                    </>
                ))
            }
        </div>
    )
}
export default SearchPage