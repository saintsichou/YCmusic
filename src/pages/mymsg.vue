<template>
  <div class='container'>
    <van-cell-group>
        <van-field
          v-model="message"
          type="textarea"
          placeholder="请输入留言"
          rows="1"
          autosize
          clearable
          color="#1989fa"
        />
      </van-field>
      <div class='ratego'>
          <van-rate
            v-model="value"
            icon="like"
            void-icon="like-o"
            color="#f44"
          />
          <span class='fontValue'>{{this.value}}分</span>
          <van-button  type="primary" size="mini" @click='send'>发送留言</van-button>
      </div>
      </van-cell-group>
    <h2 class='van-nav-bar__title'>这是留言板</h2>
    <div class='box'>
        <div class='msgBox' v-for='(item,index) in list' :key='item.id' @click='del()'>
          <div class='msgheader'>
              <span :class='vip0'>{{item.user_name}}</span>
              <van-rate
                v-model="item.star"
                icon="like"
                void-icon="like-o"
                color="#604991"
                disabled
              />
          </div>
          <div class='msgcontent'>
            {{item.message}}
          </div>
          <div class='msgFoot'>{{converTime(item.time)}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import vheader from '@/components/vheader';
import tab from '@/components/tab';
import api from '../api/api.js';
import {mapGetters,mapMutations,mapState} from 'vuex';
import { Lazyload } from 'vant';
import { PullRefresh } from 'vant';
import { Toast } from 'vant';
import {time,converTime} from '../util/index.js'
export default {
  name: 'home',
  data () {
    return {
      message:'',
      loading:false,
      list:[],
      finished: false,
      value:4,
      value2:1,
      vip0:'userName',
      vip1:'vip'
    }
  },
  computed: {
          // ...mapState('msgs')
  },
  mounted() {
    api.home().then(res => {
        // 解析成功
        if(res.data.code ===1){
          api.pullMsg().then((res)=>{
              // console.log(res.data.data)
              let data = res.data.data;
              this.list = res.data.data;
            //  this.$store.dispatch('addmsgs',res.data.data)
          })
        }else{
          this.$router.push('/')
        }
      }).catch(err => {
        console.log(`错误 - ${err}`)
      })
  },
  methods: {
    sortN(a,b){
      return b.id - a.id
    },
    send(){
      // console.log(time())
      if(this.message == ''){
          Toast('留言板不能为空!')
      }else{
          let params = {
            user_id:1,
            user_name:sessionStorage.getItem('user'),
            message:this.message,
            star:this.value,
            vip:sessionStorage.getItem('vip')
            
          }
          api.addmsg(params).then((res)=>{
            console.log(res)
              console.log(time())
            if(res.data.status === 200){
              this.list.unshift({
                user_id:1,
                user_name:sessionStorage.getItem('user'),
                message:this.message,
                star:this.value,
                time:time(),
                vip:sessionStorage.getItem('vip')
              })
               Toast('留言成功')
              //  this.$store.state.msgs.length++;
              this.message = ''
              this.value = 4
            }else{
              Toast('系统错误')
            }
          })
      }
      
    },
    converTime(t){
        let dateee = new Date(t).toJSON();  
        let date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'') 
        return date;
    },
    del(){
      console.log('000')
    }
    
  },
  components:{
    vheader,
    tab
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  .container{
      background: url('../../static/imgs/bg2.jpg') center center no-repeat;
      background-size:cover;
  }
  .box{
    width:100%;
    overflow:hidden;
    margin-bottom:60px;
  }
  .van-nav-bar__title{
      padding:20px 0;
    }
  .ratego{
    width:100%;
    height:30px;
    
    .fontValue{
      display:block;
      float:left;
      font-size:18px;
      line-height:30px;
      padding:0 20px;
    }
    .van-button{
      float:left;
      background:#1989fa;
      border-color:#1989fa;
      height:30px;
      line-height:30px;
    }
    .van-rate{
      float:left;
      line-height:20px;
      padding:5px 10px 0 10px;
      i{
          line-height:30px;
      }
    }
  }
  .msgBox{
    padding: 10px;
    border-top:1px solid #ccc;
    box-sizing:border-box;
    // width: 100%;
    .msgheader{
      width:100%;
      height:14px;
      line-height:14px;
      padding-bottom:5px;

      .userName{
        float:left;
        line-height:14px;
        font-size:16px;
        color: #666;
      }
       .vip{
          float:left;
          line-height:14px;
          font-size:16px;
          color:red;
        }
      .van-rate{
        float:right;
      }
    }
    .msgcontent{
      width:100%;
      line-height:20px;
      font-size:14px;
      text-align:left;
      text-indent:4px;
      padding-bottom:5px;  
      // color:#604991    
    }
    .msgFoot{
       width:100%;
      line-height:20px;
      font-size:9px;
      text-align:left;
      color: #999;
    }
  }
 
</style>
