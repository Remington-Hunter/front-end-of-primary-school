<template>
  <div>
    <div class="locationHeader">
      <div class="region">{{ locationDescription }}</div>
      <div style="display: flex; align-items: center">
              <span
                  style="font-size: 20px; margin-left: 10px; margin-right: 5px; color: #444444;"
              >
                <i class="el-icon-location"></i>
                当前位置
              </span>
      </div>
    </div>
    </div>
</template>

<script>
import axios  from "axios";
export default {
  name: 'Location',
  mounted () {
    this.getLocation()
  },
  data() {
    return {
      // locationInfo: {
      //   ip: '',
      //   country: '',
      //   province: '',
      //   city: '',
      //   district: '',
      //   location: '',
      // },
      locationInfo: {
        ip: '',
        country: '中国',
        province: '北京市',
        city: '北京市',
        district: '海淀区',
        location: '116.310316,39.956074',
      },
    };
  },
  computed: {
    locationDescription () {
      if (this.locationInfo.country === '中国') {
        if (this.locationInfo.province === this.locationInfo.city) {
          return this.locationInfo.city + this.locationInfo.district
        } else {
          return this.locationInfo.province + this.locationInfo.city + this.locationInfo.district
        }
      } else {
        return this.locationInfo.country
      }
    },
  },
  methods: {
    getLocation() {
      // eslint-disable-next-line
      this.locationInfo.ip = window.localStorage.getItem('Ip')
      console.log(this.locationInfo.ip)
      var _this = this;
      var url1 = "https://restapi.amap.com/v5/ip?key=096748afcd44f7a9939d2065057b26ef&type=4&ip=114.247.50.2";
      axios.get("https://restapi.amap.com/v5/ip?key=a593d64ab73229be6b3d1ef802b76849&type=4&ip="+this.locationInfo.ip)
          .then(response => {
            console.log(response)
            _this.locationInfo.country = response.data.country
            _this.locationInfo.province = response.data.province
            _this.locationInfo.city = response.data.city
            _this.locationInfo.district = response.data.district
            _this.locationInfo.location = response.data.location
            console.log(_this.locationInfo)
          })
    },
  }
}

</script>

<style scoped>
.locationHeader {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;

  align-self: start;
}
.region {
  white-space: nowrap;
  text-align: center;

  font-size: 27px;
  /* font-weight: 500; */

  background-color: #e0e0e0;
  color: rgb(105, 105, 105);

  /* border: #cccccc solid 2px; */
  border-radius: 30px;

  padding: 5px 15px 5px 15px;
  margin: 3px;
}

</style>