import {createReducer, createActions} from 'reduxsauce';

const {Creators, Types} = createActions({
    userGetInfo: ["onSuccess", "onError"],
    userSetInfo: ['data']
});

export const UserTypes = Types;
export default Creators; // actions

const INIT_STATE ={

}

const getInfo = (state, action)=>{
    return state
}

const setInfo =(state,action)=>{
    const {data} = action
    return {
        ...data
    }
}

const HANDLERS = {
    [Types.USER_GET_INFO]: getInfo,
    [Types.USER_SET_INFO]: setInfo,
}

export const reducer = createReducer(INIT_STATE, HANDLERS);