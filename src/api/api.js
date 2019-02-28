import http from '../http';

export default {
 loginUser:(params) => {
     return http.fetchPost('/login',params)
 },
 registerUser:(params) => {
    return http.fetchPost('/register',params)
 },
 home:() => {
    return http.fetchGet('/login/test')
 },
 //拉取banner
 banner:() => {
   return http.fetchGet('/banner')
 },
 //拉取精选歌单
 playList:(count) => {
   return http.fetchGet(`/top/playlist?limit=${count}`)
 },
 //拉取留言接口
 pullMsg:() =>{
    return http.fetchGet('/checkmsg')
 },
 //留言接口
 addmsg:(params) => {
   return http.fetchPost('/addmsg',params)
 },
 //查询音乐接口
 searchList: (keywords,lmt,pg) => {
   return http.fetchGet(`/search?keywords=${keywords}?limit=${lmt}?offset=${pg}`)
 },
 //查询热门音乐接口
 searchhot: () => {
  return http.fetchGet(`/search/hot`)
},
//查询歌手
searchSinger: () => {
  return http.fetchGet(`/artist/list`)
},
//歌手单曲
singerDetail: (id) => {
  return http.fetchGet(`/artists?id=${id}`)

},
//搜索建议
searchSuggest: (keywords) => {
  return http.fetchGet(`/search/suggest?keywords=${keywords}`)
},
 //跳转歌单详情
 songDetail: (id) => {
   return http.fetchGet(`/playlist/detail?id=${id}`)
 },
 //跳转到歌曲
 songPlay: (id) => {
   return http.fetchGet(`/song/url?id=${id}`)
 },
}