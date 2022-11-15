import {GET_FIGURES, FIGURES_ERROR} from '../types'

const initialState = {
    figures:[],
    loading:true
}

export default function figuresReducer(state = initialState, action){

    switch(action.type){

        case GET_FIGURES:
        return {
            ...state,
            figures:action.payload,
            loading:false

        }
        case FIGURES_ERROR:
            return{
                loading: false, 
                error: action.payload 
            }
        default: return state
    }

}