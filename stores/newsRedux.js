import {createReducer, createActions} from 'reduxsauce';

const {Creators, Types} = createActions({
    newsGetNews: ["onSuccess", "onError"],    
});

export const NewsTypes = Types;
export default Creators; // actions

const INIT_STATE ={

}

const getNews = (state, action)=>{
    return state
}

const HANDLERS = {
    [Types.NEWS_GET_NEWS]: getNews,
}

export const reducer = createReducer(INIT_STATE, HANDLERS);