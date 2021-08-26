<!--<template>-->
<!--  <div>-->
<!--    <span>{{city}}</span>-->
<!--    <span>{{location}}</span>-->
<!--  </div>-->

<!--</template>-->

<!--<script>-->
<!--import BMap from 'BMap'-->
<!--import BMapLib from 'BMapLib'-->
<!--export default {-->
<!--  data(){-->
<!--    return{-->
<!--      city:'',-->
<!--      location:''-->
<!--    }-->
<!--  },-->
<!--  // methods部分-->
<!--  methods:{-->
<!--    getLocation() {-->
<!--      const self = this-->
<!--      AMap.plugin('AMap.Geolocation', function () {-->
<!--        var geolocation = new AMap.Geolocation({-->
<!--          // 是否使用高精度定位，默认：true-->
<!--          enableHighAccuracy: true,-->
<!--          // 设置定位超时时间，默认：无穷大-->
<!--          timeout: 10000,-->
<!--        })-->

<!--        geolocation.getCurrentPosition()-->
<!--        AMap.event.addListener(geolocation, 'complete', onComplete);-->
<!--        AMap.event.addListener(geolocation, 'error', onError);-->

<!--        function onComplete(data) {-->
<!--          // data是具体的定位信息-->
<!--          console.log('定位成功信息：', data);-->
<!--        }-->
<!--        function onError(data) {-->
<!--          // 定位出错-->
<!--          console.log('定位失败错误：', data);-->
<!--          // 调用ip定位-->
<!--          self.getLngLatLocation();-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    getLngLatLocation() {-->
<!--      var self = this;-->
<!--      AMap.plugin('AMap.CitySearch', function () {-->
<!--        var citySearch = new AMap.CitySearch();-->
<!--        citySearch.getLocalCity(function (status, result) {-->
<!--          if (status === 'complete' && result.info === 'OK') {-->
<!--            // 查询成功，result即为当前所在城市信息-->
<!--            console.log('通过ip获取当前城市：', result)-->
<!--            self.city = result.city;-->
<!--            //逆向地理编码-->
<!--            AMap.plugin('AMap.Geocoder', function () {-->
<!--              var geocoder = new AMap.Geocoder({-->
<!--                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode-->
<!--                city: result.adcode-->
<!--              })-->
<!--              var lnglat = result.rectangle.split(';')[0].split(',');-->
<!--              geocoder.getAddress(lnglat, function (status, data) {-->
<!--                if (status === 'complete' && data.info === 'OK') {-->
<!--                  // result为对应的地理位置详细信息-->
<!--                  console.log(data)-->
<!--                  self.location = data;-->
<!--                }-->
<!--              })-->
<!--            })-->
<!--          }-->
<!--        })-->
<!--      })-->
<!--    },-->
<!--  },-->
<!--// created 中调用-->
<!--  created () {-->
<!--    // 此处为调用精确定位之后，调取ip定位，可根据实际情况改写-->
<!--    this.getLocation();-->
<!--  }-->

<!--}-->
<!--</script>-->

<template>
  <div>
    <div class="home">
      <div>您现在所在的城市为：{{location}}</div>
    </div>
  </div>
</template>



<script>
import BMap from 'BMap'

export default {
  data() {
    return{
      location: null
    }
  },
  methods:{
    get_location(){
      let _this = this
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          const myGeo = new BMap.Geocoder()
          myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), data => {
            if (data.addressComponents) {
              const result = data.addressComponents
              console.log(result)
              _this.location = {
                creditLongitude: r.point.lat, // 经度
                creditLatitude: r.point.lng, // 纬度
                creditProvince: result.province || '', // 省
                creditCity: result.city || '', // 市
                creditArea: result.district || '', // 区
                creditStreet: (result.street || '') + (result.streetNumber || '') // 街道
              }
            }
          })
        }
      })
    }
  },
  mounted() {
      this.get_location();
  }}
</script>


