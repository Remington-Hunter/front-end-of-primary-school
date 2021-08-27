<template>
    <span>{{hour? hourString+':'+minuteString+':'+secondString : minuteString+':'+secondString}}</span>
</template>

<script>
  export default {
    data () {
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
    mounted () {
      if (this.remainTime > 0) {
        this.hour = Math.floor((this.remainTime / 3600) % 24)
        this.minute = Math.floor((this.remainTime / 60) % 60)
        this.second = Math.floor(this.remainTime % 60)
        this.countDowm()
      }
    },
    methods: {
      countDowm () {
        clearInterval(this.timer)
        this.timer = setInterval(()=> {
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
      formatNum (num) {
        return num < 10 ? '0' + num : '' + num
      }
    },
    computed: {
      hourString () {
        return this.formatNum(this.hour)
      },
      minuteString () {
        return this.formatNum(this.minute)
      },
      secondString () {
        return this.formatNum(this.second)
      }
    }
  }
</script>