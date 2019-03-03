<template>
    <div class="container">
        <div class="infos" ref='infos' v-for='(item,index) in lists' :key='index'>
            <h4>今日天气</h4><hr>
            <p>城市/区:{{item.city}}<p/>
            <p>天气:{{item.weather}}<p/>
            <p>温度:{{item.temperature}}<p/>
            <p>风向:{{item.windDirection}}<p/>
            <p>风力:{{item.windPower}}<p/>
            <p>湿度:{{item.humidity}}<p/>
            <p>发布时间:{{item.reportTime}}<p/>
           
        </div>
        <div id='mymap'></div>
        <van-button type="default" @click='op' :style="{'margin':'12px'}">地区查询</van-button>
        <van-popup v-model="show" position="bottom" :overlay='false'>
             <van-area :area-list="areaList" @confirm='confirm' @cancel='cancel'/>
        </van-popup>
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
import { Popup } from 'vant';
import AMap from 'AMap'
  var map
  var district = null;
  var polygons=[];
export default {
  name: 'gmap',
  data(){
      return {
        show:false,
        lists:[],
        areaList:
            {
                province_list: {
                   440000: '广东省',
                },
                city_list: {
                    440100: '广州市',
                    440600: '佛山市',

                },
                county_list: {
                    440103: '荔湾区',
                    440104: '越秀区',
                    440105: '海珠区',
                    440106: '天河区',
                    440111: '白云区',
                    440112: '黄埔区',
                    440113: '番禺区',
                    440114: '花都区',
                    440115: '南沙区',
                    440117: '从化区',
                    440118: '增城区',
                    440604: '禅城区',
                    440605: '南海区',
                    440606: '顺德区',
                    440607: '三水区',
                    440608: '高明区',
                }
            }
        
      }
  },
  computed: {

  },
  mounted() {
    this.init();
    this.getWeather();
                    console.log(this.$refs.infos)

  },
  methods: {
    op(e){
        this.show = true
    },
    init(cityname){
        map = new AMap.Map('mymap', {
          center: [113.264385,23.129112],
          resizeEnable: true,
          mapStyle: "amap://styles/grey",
          zoom: 12
        })
    },
    getWeather(cityname){   
        const self = this; 
         AMap.plugin('AMap.Weather', function() {
            var weather = new AMap.Weather();
        //查询实时天气信息, 查询的城市到行政级别的城市，如朝阳区、杭州市
         weather.getLive(cityname, function(err, data) {
                if (!err) {
                    self.lists.push(data) 
                }
         });
        })

    },
    drawBounds(name) {
            //加载行政区划插件
            if(!district){
                //实例化DistrictSearch
                var opts = {
                    subdistrict: 0,   //获取边界不需要返回下级行政区
                    extensions: 'all',  //返回行政区边界坐标组等具体信息
                    level: 'district'  //查询行政级别为 市
                };
                district = new AMap.DistrictSearch(opts);
            }
            //行政区查询
            district.setLevel('district')
            district.search(name, function(status, result) {
                map.remove(polygons)//清除上次结果
                polygons = [];
                var bounds = result.districtList[0].boundaries;
                if (bounds) {
                    for (var i = 0, l = bounds.length; i < l; i++) {
                        //生成行政区划polygon
                        var polygon = new AMap.Polygon({
                            strokeWeight: 1,
                            path: bounds[i],
                            fillOpacity: 0.4,
                            fillColor: '#80d8ff',
                            strokeColor: '#0091ea'
                        });
                        polygons.push(polygon);
                    }
                }
                map.add(polygons)
                map.setFitView(polygons);//视口自适应
            });
        },
    confirm(e){
        let name = e[2].name;
        this.getWeather(name)
        this.drawBounds(name)
        this.show = false

    },
    cancel(){
        this.show = false
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
        width:100%;
        
    }
    #mymap{
        width:100%;
        height:350px;
        background: #f8f8f8;
        .info{
            background:#ccc
        }
    }
    .infos{
        position:fixed;
        top:50px;
        width:120px;
        right:2px;
        z-index:300;
        background:rgba(0,0,0,.6);
        color:#fff;

        h4{
            padding:1px
        }
        p{
            padding:1px;

        }
    }
    
</style>
