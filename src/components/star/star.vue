<template>
  <div class="stars" :class="starType">
    <span class="star-item" v-for="starItem in starClass" :key="starItem" :class="starItem"></span>
  </div>
</template>

<script type="text/ecmascript6">
  const LENGTH = 5; // 星星的总个数
  const STAR_ON = 'on',
        STAR_HALF = 'half',
        STAR_OFF = 'off';

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      // 根据不同的 size 显示不同尺寸的星星 
      starType() {
        return 'star-' + this.size;
      },
      // 根据不同的评分显示不同状态的星星
      starClass() {
        const result = [];
        const computedScore = Math.floor(this.score * 2) / 2; // 将评分按照 0.5 进行转换
        const hasDecimal = computedScore % 1 !== 0; // 评分是否包含小数
        const onCount = Math.floor(computedScore); // 一颗星个数

        if (onCount) {
          for (let i = 0; i < onCount; i++) {
            result.push(STAR_ON); // 填充一颗星
          }
        }

        if (hasDecimal) {
          result.push(STAR_HALF); // 填充半颗星
        }

        while (result.length < LENGTH) { // 如果一颗星和半颗星的个数小于 5 个，就用无星填充剩余位置
          result.push(STAR_OFF);
        }

        return result;
      }
    }
  };
</script>

<style lang="stylus" type="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';

  .stars
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 16px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
