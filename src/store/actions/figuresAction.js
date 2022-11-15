import {GET_FIGURES, FIGURES_ERROR} from '../types'
import axios from 'axios'

export const getFigures = () => async dispatch => {
    
    try{
        const res = await axios.get(`../data.json`)
        dispatch( {
            type: GET_FIGURES,
            payload: res.data
        })
    }
    catch(error){
        dispatch( {
            type: FIGURES_ERROR,
            payload: error,
        })
    }

}