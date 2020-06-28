<template>
    <div class="info-card" :class="[size?'info-card__'+size:'','info-card__'+direction]" :style="{background:content.bgColor}">
        <i :class="content.icon" :style="{color:content.mainColor}"></i>
        <div class="text-content">
            <div class="main-text" :style="{color:content.mainColor}">{{content.mainText}}</div>
            <div class="desc-text" :style="{color:content.mainColor,opacity:0.6}">{{content.descText}}</div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "InfoCard",
    props:{
      size:{
        type:String,
        default:'medium'
      },
      direction:{
        type:String,
        default:'horizontal'
      },
      content:{
        type:Object,
        default:function(){
          return {
            icon:'el-icon-s-tools',
            mainText:'主内容文案',
            descText:'描述信息文案',
            mainColor:'#333',
            bgColor:'#fff',
          }
        }
      }
    }
  }
</script>

<style scoped>
    .info-card{
        position: relative;
        display: flex;
        align-items: center;
        padding: 20px 35px;
        background: #fff;
        font-size: 16px;
        border-radius: 3px;
    }
    .info-card i{
        font-size: 60px;
    }
    .text-content{
        text-align: left;
    }


    .info-card__medium.info-card__horizontal{
        padding: 20px 35px;
    }
    .info-card__medium.info-card__vertical{
        padding: 20px 35px;
    }
    .info-card__medium .text-content .main-text{
        font-size: 18px;
        line-height: 30px;
    }
    .info-card__medium .text-content .desc-text{
        font-size: 16px;
        line-height: 26px;
    }
    .info-card__medium i{
        font-size: 60px;
        line-height: 60px;
    }
    .info-card__medium.info-card__horizontal i{
        margin-right: 20px;
    }
    .info-card__medium.info-card__vertical i{
        margin-bottom: 16px;
    }


    .info-card__small.info-card__horizontal{
        padding: 15px 28px;
    }
    .info-card__small.info-card__vertical{
        padding: 20px 28px 12px;
    }
    .info-card__small .text-content .main-text{
        font-size: 16px;
        line-height: 26px;
    }
    .info-card__small .text-content .desc-text{
        font-size: 14px;
        line-height: 22px;
    }
    .info-card__small i{
        font-size: 48px;
        line-height: 48px;
    }
    .info-card__small.info-card__horizontal i{
        margin-right: 16px;
    }
    .info-card__small.info-card__vertical i{
        margin-bottom: 12px;
    }


    .info-card__mini.info-card__horizontal{
        padding: 10px 22px;
    }
    .info-card__mini.info-card__vertical{
        padding: 15px 22px 10px;
    }
    .info-card__mini .text-content .main-text{
        font-size: 14px;
        line-height: 20px;
    }
    .info-card__mini .text-content .desc-text{
        font-size: 12px;
        line-height: 16px;
    }
    .info-card__mini i{
        font-size: 40px;
        line-height: 40px;
    }
    .info-card__mini.info-card__horizontal i{
        margin-right: 12px;
    }
    .info-card__mini.info-card__vertical i{
        margin-bottom: 8px;
    }


    .info-card__horizontal{
        justify-content: space-between;
    }
    .info-card__horizontal .text-content{
        text-align: left;
    }
    .info-card__vertical{
        flex-direction: column;
        justify-content: space-between;
    }
    .info-card__vertical .text-content{
        text-align: center;
    }
</style>