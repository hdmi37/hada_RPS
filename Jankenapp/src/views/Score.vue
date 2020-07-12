<template>
    <div class="score">
        <h1>スコア</h1>
        <!-- <ul class="score__list">
            <li v-for="(item, index)in score" :key="index">{{ index + 1}}回目:{{ item }}</li>
        </ul> -->
        <button v-on:click="resetGame" class="button">ゲームを初期化する</button>
        </div>
</template>

<script>
export default {
        name: 'Score',
        methods: {
            resetGame() {
                this.$store.commit('resetScore')
            }
        },
        computed: {
            score() {
                return this.$store.getters.score
            }
        }
            }

</script>