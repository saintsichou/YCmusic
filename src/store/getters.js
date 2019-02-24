import * as types from './var';

const getters = {
    [types.LOGIN](state){
        return state.userInfo
    }
}
export const musicList = state => state.musicList

export const singer = state => state.singer

export const count = state => state.count

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const disc = state => state.disc

export const topList = state => state.topList

export const searchHistory = state => state.searchHistory

export const playHistory = state => state.playHistory

export const favoriteList = state => state.favoriteList

export const myMsg = state => state.msgs

export default getters;