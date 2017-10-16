<template>
  <div class="ratings" ref="content">
    <div class="ratings-content" >
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">
            综合评分
          </div>
          <div class="rank">
            高于周边商家{{seller.rankRate}}%
          </div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score='seller.serviceScore'></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score='seller.foodScore'></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect
        @select="select"
        @toggle-content="toggleContent"
        :only-content="onlyContent"
        :select-type="selectType"
        :ratings='ratings'
        ></ratingselect>
        <div class="rating-wrapper">
          <ul >
            <li v-show="needShow(rating.rateType,rating.text)" class="rating-item border-1px" v-for="rating in ratings">
              <div class="avatar">
                <img width="28" height="28" :src="rating.avatar" />
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score"></star>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <p class="text">
                  {{rating.text}}
                </p>
                <div v-show="rating.recommend&&rating.recommend.length" class="recommend">
                  <span class="icon-thumb_up"></span>
                  <span v-for="text in rating.recommend" class="item">{{text  }}</span>
                </div>
                <div class="time">
                  {{rating.rateTime |　formatDate}}
                </div>
              </div>
            </li>
          </ul>
        </div>

    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NAGETIVE = 1;
  const ALL = 2;
  import star from '../star/star.vue'
  import split from '../split/split.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  import BScroll from 'better-scroll'
  import {formatDate} from '../../common/js/date.js'

  export default{
    props:{
      seller:{type:Object}
    },
    data (){
      return {
        selectType:ALL,
        onlyContent:true,
        ratings:[]
      }
    },
    methods:{
      select (type,event){
        this.selectType = type;
        this.$nextTick(() =>{
          this.scroll.refresh();
        })
      },
      toggleContent (event){
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() =>{
          this.scroll.refresh();
        })
      },
      needShow (type,text){
        if(this.onlyContent&&!text){
          return false;
        }
        if(this.selectType===ALL){
          return true;
        }else{
          return type === this.selectType;
        }
      }
    },
    created (){
      this.$http.get('api/ratings').then(response => {
        response = response.data;
        if(response.errno === 0){
          this.ratings = response.data;
        }
        this.$nextTick(() =>{
          if(!this.scroll){
            this.scroll = new BScroll(this.$refs.content,{click:true});
          }else{
            this.scroll.refresh();
          }
        })
      })
    },
    filters:{
      formatDate(time) {
         let date = new Date(time);
         return formatDate(date,'yyyy-MM-dd hh:mm');
      }
    },
    components:{
      star,
      split,
      ratingselect
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .ratings
    position:absolute
    top:174px
    bottom:0
    left:0
    width:100%
    overflow:hidden
    .overview
      display:flex
      padding:18px 0
      .overview-left
        flex:0  0 137px
        padding:6px 0
        border-right:solid 1px rgba(7,17,27,0.1)
        text-align:center
        .score
          font-size:24px
          color:rgb(255,153,0)
          line-height:28px
          margin-bottom:6px
        .title
          font-size:12px
          color:rgb(7,17,27)
          line-height:12px
          margin-bottom:8px
        .rank
          font-size:10px
          color:rgb(147,153,159)
          line-height:10px
      .overview-right
        flex:1
        padding:8px 0
        padding-left:24px
        .score-wrapper
          margin-bottom:8px
          font-size:0px
          .title
            display:inline-block
            vertical-align:top
            line-height:18px
            font-size:12px
            color:rgb(7,17,27)
          .star
            display:inline-block
            vertical-align:top
            margin:0 12px
          .score
            display:inline-block
            line-height:18px
            vertical-align:top
            font-size:12px
            color:rgb(255,153,0)
        .delivery-wrapper
          font-size:0
          .title
            line-height:18px
            font-size:12px
            color:rgb(7,17,27)
          .delivery
            margin-left:12px
            line-height:18px
            font-size:12px
            color:rgb(147,153,159)
    .rating-wrapper
      padding:0 18px
      .rating-item
        display:flex
        padding:18px 0
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex:0,0,28px
          width:28px
          margin-right:12px
          img
          border-radius:50%
        .content
          position:relative
          flex:1
          .name
            font-size:10px
            color:rgb(7,17,27)
            line-height:12px
            margin-bottom:4px
          .star-wrapper
            margin-bottom:6px
            font-size:0px
            .star
              display:inline-block
              vertical-align:top
              margin-right:6px
            .delivery
              display:inline-block
              vertical-align:top
              font-size:10px
              font-weight:200
              color:rgb(147,153,159)
              line-height:12px
          .text
            font-size:12px
            color:rgb(7,17,27)
            line-height:18px
            margin-bottom:8px
          .recommend
            font-size:0
            line-height:16px
            .icon-thumb_up,.item
              display:inline-block
              margin:0 8px 4px 0
              font-size:9px
            .icon-thumb_up
              color:rgb(0,160,220)
            .item
              padding:0 6px
              border:1px solid rgba(7,17,27,0.1)
              border-radius:1px
              color:rgb(147,153,159)
              background:#fff
          .time
            position:absolute
            top:0
            right:0
            font-size:10px
            font-weight:200
            color:rgb(147,153,159)
            line-height:12px


</style>
