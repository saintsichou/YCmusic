import * as types from './var';


const actions = {
    login({commit,state},str){
        commit(types.LOGIN,str)
    },
    addmsgs({commit},str){
        commit(types.MY_MSG,str)
    },
    songInfo({commit},str){
         commit(types.SET_MUSIC_LIST,str)
    },
    songurl({commit},str){
        commit(types.SONG_URL,str)
    }
}
export default actions