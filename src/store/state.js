import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    userInfo: {
        vip:sessionStorage.getItem('vip') || '',
        user:sessionStorage.getItem('user') || '',
        token:sessionStorage.getItem('token') || null
    },
    musicList: {},
    singer: {},
    // 播放
    playing: true,
    // 全屏
    fullScreen: false,
    //歌单
    playlist: [],
    // 顺序列表
    sequenceList: [],
    count:5,
    // 播放模式
    // mode: playMode.sequence,
    // 当前播放索引
    currentIndex: -1,
    disc: {},
    topList: {},
    //留言板
    msgs:[],
    songUrl:{}
    // searchHistory: loadSearch(),
    // playHistory: loadPlay(),
    // favoriteList: loadFavorite()
}
export default state