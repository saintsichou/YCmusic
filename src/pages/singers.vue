<template>
    <div class='container'>
          <van-panel  v-for="item in list" :title="item.letter" :key="item.id">
              <div class='vscard' v-for='(lt,index) in item.data' :key='index' @click='jumpPlaylt(lt.id,lt.name)'>
                <img slot="left" :src='lt.image'>
                <span slot="left" style="margin-left: 10px">{{lt.name}}</span>
              </div>
          </van-panel>
          <div v-if="showLetter" class="centerLetter"><strong>{{letter}}</strong></div>
          <div class="letterList" v-if="showLetterList">
              <a v-for="letter in Letters" class='ltlist'  @click="jumper(letter)"><span>{{letter}}</span></a>
              <a style="display: block"  @click="jumper('#')">#</a>
          </div>
          <van-popup v-model="showList" position="right">
           

                 <div class='vscard' v-for='(lt,index) in details' :key='index' @click='jumpSing(lt.id,lt.al.name)'>
                  <span slot="left">{{index+1}}</span>
                  <span slot="left" style="margin-left: 10px">{{lt.al.name}}</span>
                </div>

          </van-popup>
    </div>
</template>

<script>
import api from '../api/api.js';
import store from '../store/store.js';
import {mapState} from 'vuex';
import {mapMutations} from 'vuex';
import http from '../api/api.js';
import { Toast } from 'vant';
import foot from '@/components/foot'
const pinyin = require('pinyin')
export default {
  name: 'singers',
  data () {
    return {
          list: [],
          showLetter:false,
          showLetterList:true,
          letter:'',
          Letters:[],
          showList:false,
          details:[]
        }
    },
    created() {
    
    },
    mounted() {
      api.searchSinger().then((res)=>{
        this.list = this.sortList(res.data.artists)
        var lets = this.list.forEach((val,index)=>{
           this.Letters.push(val.letter)
        })
      })
      
    },
    methods: {
      //排序
      sortList(arr){
        var self = this;
        var letters = "ABCDEFGHJKLMNOPQRSTWXYZ".split('');
        var result = [];
        for(let i=0; i<letters.length;i++){
          var cur = {'letter':letters[i],data:[]}
          for(let j=0; j<arr.length;j++){
            let py = pinyin(arr[j].name, {
              style: pinyin.STYLE_INITIALS, // 设置拼音风格
              heteronym: true
            })
            let firstLetter = py[0][0].toUpperCase()
             var initial = firstLetter.charAt(0)
            // console.log(initial)
            if(initial==letters[i]||initial==letters[i].toLowerCase()){
                        cur.data.push({
                          id:arr[j].id,
                        	name:arr[j].name,
                        	image:arr[j].img1v1Url
                        });
            }
            //  let res =  arr[j].map((item)=>{
            //    return{
            //       id:item.id,
            //       name:item.name,
            //       img:item.img1v1Url
            //    } 
            //   })
            //   cur.data.push(res)
          }
          if(cur.data.length) {
                result.push(cur);
            }
        }
        return result
      },
      jumpPlaylt(id,name){
        this.showList = true;
        window.name = name;
        api.singerDetail(id).then((res)=>{
          this.details = res.data.hotSongs
        })
        // this.$router.push({ path: '/musiclist', query: { songID: id }});
      },
      jumpSing(id,name){

          this.showList=false
          
          this.$store.dispatch('songurl',{
              'id':id,
              'title':name,
              'singer':window.name
          })
      },
      jumper(key){
    	if (key=='#') {
        	
        }
      }
    },
    components:{
      foot
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.container{
  text-align:left;
  position:relative;
  .van-cell__title{
    background:rgba(0, 0, 0, 0.1)
  }
}
  .vscard{
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 10px 0;
    margin: 0 10px;
    box-sizing: border-box;
    font-size:12px;
    img{
      width:25px;
      height:25px;
      border-radius:50%;
      margin-right:10px;
    }
  }
  .letterList{
    // width:20px;
   position: fixed;
    z-index: 30;
    right: 5px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 20px;
    padding: 200px 0;
    border-radius: 3px;
    text-align: center;
    font-family: Helvetica;
    .ltlist{
        display: block;
        font-size: 14px;
        margin-top: 3px
    }
  }
  .centerLetter{
    position:fixed;
    top: 50%;
    width:50px;
    height:50px;
    background:#ccc;
    color:#fff
  }
  .singerbox{
    width:100%;
    height:100%;
    background:#fff;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
