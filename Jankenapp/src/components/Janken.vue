<template>
  <div class="hello">
    <h1>Janken.vue</h1>
    <button v-on:click="gameStart" type="button" id="gameStart">ゲームスタート</button>
    <p>{{ score }}</p>
    <div class="imgArea"><img v-bind:src="src" alt=""></div>
    <ul>
            <li>
                <button v-on:click="onSelected" class="button" type="button" value="0" disabled>グー</button>
            </li>
            <li>
                <button v-on:click="onSelected" class="button" type="button" value="1" disabled>チョキ</button>
            </li>
            <li>
                <button v-on:click="onSelected" class="button" type="button" value="2" disabled>パー</button>
            </li>
        </ul>
  </div>
</template>

<script>
export default {
  name: 'Janken',
  data() {
            return { 
                src :require('../assets/choki.png'),
                imgList: [
                    require('../assets/gu.png'),
                    require('../assets/choki.png'),
                    require('../assets/par.png')
                ],
                timer: null,
                resultMessage: '',
                score:''
            }
  },
  methods:{
      
      changeImg(number) {
                // 画像を切り替える
                if(number && Math.abs(number) <= this.imgList.length) {
                    this.src = this.imgList[number];
                } else {
                    var num = Math.floor(Math.random() * this.imgList.length);
                    this.src = this.imgList[num];
                }
      },
      gameStart() { //sbが押されたときの処理
          this.timer = setInterval(this.changeImg,80)
          document.getElementById('gameStart').setAttribute('disabled', true)
          let btns = document.querySelectorAll('.button');
          for( let btn of btns ) {
                    btn.removeAttribute('disabled');
                }
      },
      onSelected(e) {
          clearInterval(this.timer)
          let btns = document.querySelectorAll('.button');
                for( let btn of btns ) {
                    btn.setAttribute('disabled', true);
                }
          document.getElementById('gameStart').removeAttribute('disabled')
        
          let button = e.target
          window.console.log(this.src)
          let resultNum = parseInt(this.imgList.indexOf(this.src), 10)
          let selectNum = parseInt(button.value, 10) /* 第1引数に渡した値を10進数に変換して返す!!*/
          let kekkaNum = this.decisionJanken(selectNum, resultNum)
          this.$store.commit('onSelected',kekkaNum)
          console.log(kekkaNum)

      },
      decisionJanken(myHand, cpuHand) {
                let result = 0; // 0:負け, 1:勝ち,2:引き分け
                
                switch(myHand) {
                    case 0://自分が0(グー)のとき
                    if(cpuHand===0){
                        result = 2 // 引き分け
                    }else if(cpuHand===1){
                        result = 1 // 勝ち
                    }else{
                        result = 0 // 負け
                    }
                    break;
                    case 1: // 自分が1チョジ
                    if(cpuHand===1){
                        result =2 // 引分け
                    }else if(cpuHand===2){
                        result = 1
                    }else{
                        result = 0
                    }
                    break;
                    case 2: // 自分が2ｐ－あの時
                    if(cpuHand===2){
                        result = 2
                    }else if(cpuHand===0){
                        result = 1
                    }else {
                        result = 0
                    }
                }
                return result;
                
            },

  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.imgArea{
    height: 300px;
}
</style>
