<template>
  <div class="home-info">
    <div class="wrapper">
      <div class="description">
        <p class="key_words">
          <span class="key_word simple">简约</span>
          <span class="key_word easy">好用</span>
          <span class="key_word profession">专业</span>
        </p>
        <p class="slogan">问卷星球为您提供专业调研服务</p>
      </div>
      <div class="contact_us">
        <p class="bold">任何建议和问题随时吐个槽</p>
        <p class="contacts">
          官方邮箱1：<a
            target="_blank"
            href="mailto:qinzhe@buaa.edu.com"
          >qinzhe@buaa.edu.com</a><br>
          官方邮箱2：<a
            target="_blank"
            href="mailto:18377011@buaa.edu.com"
          >18377011@buaa.edu.com</a><br>
          官方QQ群：<a
            target="_blank"
            title="问卷星球反馈群"
          >850743462</a><br>
          客服QQ1：<a>981507892</a><br>
          客服QQ2：<a>2320092610</a>

        </p>
      </div>
      <div class="wx_qrcode">
        <img
          src="../../assets/wx.jpg"
          class="qrcode"
        >
        <p class="bold">扫描添加客服微信号</p>
      </div>
    </div>
    <div style="margin-top:50px">
      <p style="color: #999;font-size: 10px; display: block;
	text-align: center;">ICP证:鲁ICP2021031002号 鲁ICP备2021031002号-1</p>
    </div>
    <div style="">
      <a
        style="color: #999;font-size: 10px; display: block;
	text-align: center;"
        href="https://beian.miit.gov.cn"
      >工业和信息化部政务服务平台ICP/IP地址/域名信息备案管理网址</a>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.home-info {
  background-color: #f5f5f5;
  padding: 38px 0 20px;
  margin-top: 30px;
}
.wrapper {
  max-width: 1040px;
  position: relative;
  margin: 0 auto;
  padding: 0 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.key_words {
  font-size: 20px;
  color: #58a6e7;
}
.key_word {
  line-height: 24px;
  display: inline-block;
  padding: 15px 0 15px 60px;
  margin-right: 20px;
  background-size: 54px;
}
.key_word.simple {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAMAAAC4uKf/AAAAhFBMVEUAAABYp+hwwv9ZpuhfrvFaqelZp+dktPFdq+xZpuhap+hZqOhZp+lZp+hYp+hYp+hequtequ1YqOlbqulZpuhaqelbqOpdqetYp+hYp+haqOlYp+hYp+hYp+hZpuhZqOhZqehYp+hap+lZpudZpuhZp+dYp+dYp+hYp+hYp+dZqOdYpuhtBjOAAAAAK3RSTlMA+gXrETa2ChbAmJJysvTfHxtRLe9FOibi0WnFioX1Tkx8W9ady62nx2thbMKKigAAA+ZJREFUaN6018mWokAQheGbySDKJII44VROVf2///v1outUT2ihJN+GXcaJExkX0DOK+Uccbla5Z4yXrzZh/DEvNABbH8c7WuzGx9rKIX8dZgDeeJIc6nLqW+tPy/qQTMYeQBaufUc97a8GOMUzXy38WXwCzHXfv79o64EJ3yI9EL2FBrxtpD6KOINV0uGQKFlBFhevdzUxkAbqKEjBTF7sbl3BrdQTyhtUaz0vuEC40JMWIVwCPcc2sJzpBbMlNFZPmL5jmpFeMmoM71N1tq/IA70syKn26mgLqa8e/BS26sKeMYl6SgznDoMbpezm6m2+I/126P4GL5ADgcfG/6avDcuFnFgs2TzszaYsCzlSLEmt7jvjLeTMwuP86M7vAjkU7O5vwB4zl1Nzw16tphWJHEuopmph30nlXMq71f8acl/O+TlNyzAxgQYQGP4/90KjQTRc9I81y5EGMVqy1l+iipkGMqOK9KcJoQYTMvkrxgwLDWaBKfRbzE0DuhHrS5RRakAlWfQ7gF1mxyEsW3Jkq0/WI3BXy3BuSQzPft3Nlcuc91pGsvpK/6u7tK8zqqA1/a+fWWlMJDeCjCxQi8gY/zOpQle1KrJarULWn883OVF691/1b786shmRq+8bc9AdEZmVVHOSC9MlZqa7TtSSjsROauU8HEfMUdKYmforcvihB2aMJe3w1Vt0grUe8dlJBZ5681eQ6DGPQnPG/Wtd4KhvjJnrg4l6Gm26/GhO+FBM0rfWGBp9KyFWyEG92JBOy3Mg1Ia6X60UzuqgZqMVZa9aV7ipi5KVcqbq4QZXqy6m5PJ67fQZUqtOfDwZrF4WQ2jVjcX8rNZsdhOIYSC8baWidqUm2kuhaoWg4oLf//2QuHyn1dgkmOAXmFU2P/7G0yT2a/axmfxiLcv4Z5gPrmVs2CAHs1PgQ6uVla1fy/tG3gi2Q8u19VcO9V7+jR+zf9oJ36Feu64+hdrZrDi9IK4rLuKQ2tGs1KhLMfPERNSWF9v6tXhieDy1GvAQ8bh4PGkLhJqGB90W0PA41ICHgBYND62cSw14iBStHE2qVgMe4jXbgfZbqAEPUb+a9huw0GrAQ7QAC5BJq30DD4ECmYBBrVa3FmY5YBDMlWrAQ6zAXABeqwEP8QLgp73tJq1WgYdIYU1gumi1N+AhVJgu2ElSrUELO8lplM1fxyajLNMCTDU3M23bVEM602rPHCKkjkcyBz+pI63MYd3jx5D3GbCOMTrOGorjeZWe4/5xggx9IxpjhU+6xWpGDAz1iEKNGvJqjK+NHcy7OXL4DGHKtJgo9br4ArDLdQs+U7S3Y2g5NY59AQx6fCU5IiepAAAAAElFTkSuQmCC);
}
.key_word.easy {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAMAAAC4uKf/AAAAjVBMVEUAAABaqOlYp+hYp+hZp+hYp+hfr/Fwwv9Zp+hdquxYp+hbrO1Yp+hbqOlZp+haqelYqOlcqetYp+hYp+hdqutYp+lnsvhZpuhZpuhYp+lZqOhaqelbquhaqepZpuhZp+lZp+hZpulYp+hYp+hZqOhZp+dZp+hgqO5Yp+hZpulZpuhap+hap+haqelYpud58jMtAAAALnRSTlMAZ/r06+ERBbcWkxvTObE1cSaqhR+KCe/AUU5FLUqfe2t0x8SPy5od0FvXl18+aGSFgwAABLlJREFUaN60lumSmlAQRtu7sDgC6oALEvd9Juf9Hy+pZDIZU4oNmvPHH1Kc6tt9v0aacJgtu9Gm550xzvc2UXc5O8h/IEwWE8sV7GSRhPJEgk5kAdxk3y+TKg/CMMirpFztJw7ARp3gSTWVQwP0utOrLwym3R5ghuXj9cWvDkx0imsfeo8MuNdYHuFla+G4UrwkXh3Bbl/aV/VmIM1ESZaCeWtZXWcMw0oaUA1h3JHmZDuIBtKQQQS7rOkIFuCn0oKph6LRYOZrTDGSVowKwzoXNeUYn0hrEs+4FCWvkAYPJU4Kr7p2zTF9eZC+YR4qjjzFzuRhZpb0btODDS6TJ5A5NsGdujb4gTyFgWdTW1uY4l/kSbx40rq+zXEDeRoDx7xu5m0mTySzt29AiZkpN/fiu24mDeWNjBrT1x4P+KUmzvqM86vDsSYVFTuwwFnT3pT1tSEp8LqM+gad8NsEzoraAk9xpZkYZfbO8fKTd1hoUtmQXTmbQnQ4th8n5EVBwU7+oYMfKecZZn+OM9PsN09HLojHaPfyAjv6nRDwTbW7GcfylTciUbIhkkYyiXi7iDGDNqYCw6qhbID5GrhbhqLkBFVDmQzZyiexpRIlQ7w0lVXY+EsAp6JkNKZoLJP0byCHjqzJKTaXZbjwczaPoiXiLM1lcqT8bENfvQ9h0Ua2YvhnmE0sSvbYoI0sNib4SKpIlBwMW2kjk4jOx+9JbgH/BL7J28lOvysKLbFS9h0KaSeLsaGIJPREJwvP+FFLmfRIfqV4VynbwlQuZL73yTFavEgN3V9jPGGqk71DKpeyS+yydtFMRMQSqGSJ4XzxZND9yn5nIArlFgFW5IATjSx3jOvXUB5R92nhOMiMiUY28Iov2Akmr/lzJkv2ClnmoCP3yGFVEz5L6dK/L5tZzEnuc2ZeE49diSjvyUZbsKorldYkX0kka5I7suQMLtGt8ZoBSFhLj6pWVs2BYSAPyyp64slrZYCbipI5m5rp8eII6mW2iEUvW9fcaieGsFY2D0TPnp3cIsT8qNbsdhIGoiBsf0DStFpbCBANWNAU0Xzv/3iGRHtuyLDEQ7POFXeTkNPdPTPfRbOrEr2CUprlTP3M3jjKv3HC3M9swVEOSMmLn1nLRI7+nmocs4q9HVceZltyeVwV1OOYdRR2xXiYdSzlFfPMys+sJpOXZ08+jllObw8eD7NXUvHgsaecl5l+ym0p3MwS0I/UinIMs5LKFgsvM7FYiJXJ1+yLmVgGnc1mJLbm+k2jXnPvGrpbm3U0w3l88DtBRDRhoYvXqS9DFx0nQZqdlD+GXp4yTtJBGT8KbDI+OcigTEeAUJ/UpmEdzYwHGQHqcBOGfKzsL/d8S1oZburYFoahDthkOqhkbKsDaRg+oZS0nWoMAd51IK2jdrB4J4flpkvOqe4WTWljJKJ2VSKA/e4b0GrmokRQ9YiZmZ6KXcY5ZflktUnmoh4RxY+DRPFjlZaHdKVlZZ2TdFmna0gtXUPGULDeojqOpRR3r/vjARl8EY244BM3rCZGYMgDhYoV8vojvhY3mDcucmgwZR0CU9YCpvTFRD80Jhqu+3UYALs+jeC/QntvDC1rHHv3i2PvrsaxvwFdaLF2LJ0SBwAAAABJRU5ErkJggg==);
}
.key_word.profession {
  background-image: url(data:image/png;base64,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);
}
.slogan {
  margin-top: 22px;
  color: #999;
  font-size: 22px;
}
.description,
.contact_us,
.wx_qrcode {
  vertical-align: top;
  display: inline-block;
}
.wx_qrcode {
  text-align: center;
  width: 130px;
  margin-top: 18px;
}
.contact_us {
  width: 230px;
  margin-top: -6px;
  margin-left: 127px;
  margin-right: 92px;
}
.contact_us .bold {
  font-size: 16px;
  margin-bottom: 18px;
}
.contact_us .contacts {
  font-size: 13px;
  line-height: 190%;
  color: #999;
}
.qrcode {
  margin-top: -5px;
  width: 100px;
  height: 100px;
}
.bold {
  color: #999;
  font-size: 13px;
}
</style>