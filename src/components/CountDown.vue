<template>
  <div class="c-count">
    <span class="djs">考试结束倒计时</span>
    <span class="c-time">{{hour? hourString+'时'+minuteString+'分'+secondString+'秒' : minuteString+'分'+secondString}}</span>
  </div>

</template>

<script>
export default {
  data() {
    return {
      hour: '',
      minute: '',
      second: '',
      timer: ''
    }
  },
  props: {
    remainTime: {    // 倒计时间总秒数
      default: ''
    }
  },
  mounted() {
    if (this.remainTime > 0) {
      this.hour = Math.floor((this.remainTime / 3600))
      this.minute = Math.floor((this.remainTime / 60) % 60)
      this.second = Math.floor(this.remainTime % 60)
      this.countDowm()
    }
  },
  methods: {
    countDowm() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.hour === 0) {
          if (this.minute !== 0 && this.second === 0) {
            this.second = 59
            this.minute -= 1
          } else if (this.minute === 0 && this.second === 0) {
            this.second = 0
            this.$emit('countDownEnd')
            clearInterval(this.timer)
          } else {
            this.second -= 1
          }
        } else {
          if (this.minute !== 0 && this.second === 0) {
            this.second = 59
            this.minute -= 1
          } else if (this.minute === 0 && this.second === 0) {
            this.hour -= 1
            this.minute = 59
            this.second = 59
          } else {
            this.second -= 1
          }
        }
      }, 1000)
    },
    formatNum(num) {
      return num < 10 ? '0' + num : '' + num
    }
  },
  computed: {
    hourString() {
      return this.formatNum(this.hour)
    },
    minuteString() {
      return this.formatNum(this.minute)
    },
    secondString() {
      return this.formatNum(this.second)
    }
  }
}
</script>

<style scoped>
.c-count {
  height: 8vh;
  padding: 10px;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0;
  z-index: 1500;
  background-color: #409eff;
  color: #fff;
  margin-left: auto;
  margin-right: auto;
  width: 1000px;
  text-align: center;
}

.djs {
  font-size: 4vh;
  margin-right: 20px;
}

.c-time {
  font-size: 4vh;
}
</style>