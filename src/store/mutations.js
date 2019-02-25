import * as types from './var';


const mutations = {
    [types.LOGIN] (state,str){
        state.userInfo.user = str.user;
        state.userInfo.token = str.token;
    },
    [types.SET_MUSIC_LIST] (state, musicList) {
        state.musicList = musicList
      },
      [types.SET_SINGER] (state, singer) {
        state.singer = singer
      },
      [types.SET_PLAYING_STATE] (state, flag) {
        state.playing = flag
      },
      [types.SET_FULL_SCREEN] (state, flag) {
        state.fullScreen = flag
      },
      [types.SET_PLAYLIST] (state, list) {
        state.playlist = list
      },
      [types.SET_SEQUENCE_LIST] (state, list) {
        state.sequenceList = list
      },
      [types.SET_PLAY_MODE] (state, mode) {
        state.mode = mode
      },
      [types.SET_CURRENT_INDEX] (state, index) {
        state.currentIndex = index
      },
      [types.SET_DISC] (state, disc) {
        state.disc = disc
      },
      [types.SET_TOP_LIST] (state, topList) {
        state.topList = topList
      },
      [types.SET_SEARCH_HISTORY] (state, history) {
        state.searchHistory = history
      },
      [types.SET_PLAY_HISTORY] (state, history) {
        state.playHistory = history
      },
      [types.SET_FAVORITE_LIST] (state, list) {
        state.favoriteList = list
      },
      [types.ADD_COUNT] (state, num) {
        state.count += num
      },
      [types.MY_MSG] (state,msg) {
         state.msgs = msg
      },
      [types.SONG_URL] (state,songurl){
        state.songUrl = songurl
      }
}
export default mutations;