<template>
  <section class="home">
    <header class="home__header">
      <div class="home__header-wrap">
        <!--<h1 class="home__header-title">The Film Guilde App</h1>
        <strong class="home__header-subtitle">Made with Vue.js</strong>-->
      </div>
    </header>
    <movies-list v-for="item in listTypes" v-if="item.isCategory" :type="'component'" :showButton="showButton" :mode="'collection'" :category="item.query" :shortList="true"></movies-list>
  </section>
</template>

<script>
import MoviesList from './MoviesList.vue';
import storage from '../storage.js'

export default {
  components: {
    MoviesList
  },
  data: function(){
    return {
      listTypes: storage.listTypes,
      showButton: false
    }
  },
  mounted(){
    if(this.$route.params.showLogin){
      eventHub.$emit('openLoginPopup');
    }
    this.showButton = this.$route.params.showButton;
    document.title = 'Film Guide'
  }
};
</script>

<style lang="scss">
@import "./src/scss/variables";
@import "./src/scss/media-queries";
.home{
  &__header{
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    position: relative;
    background-color: $c-dark;
    background-image: url('~assets/the_matrix.jpg');
    @include tablet-min{
      height: 384px;
    }
    &:before{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba($c-light, 0.0);
    }
    &-wrap{
      text-align: center;
      position: relative;
    }
    &-title{
      font-weight: 500;
      font-size: 22px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: $c-light;
      margin: 0;
      @include tablet-min{
        font-size: 28px;
      }
    }
    &-subtitle{
      display: block;
      font-size: 14px;
      font-weight: 300;
      color: $c-light;
      margin: 5px 0;
      @include tablet-min{
        font-size: 16px;
      }
    }
    &-link{
      text-decoration: none;
      color: $c-dark;
      font-size: 13px;
      font-weight: 300;
      opacity: 0.7;
      transition: opacity 0.5s ease;
      &:hover{
        opacity: 1;
      }
      span{
        display: inline-block;
        vertical-align: middle;
      }
      &-icon{
        display: inline-block;
        vertical-align: middle;
        margin-right: 2px;
        width: 16px;
        height: 15px;
        fill: $c-dark;
      }
    }
  }
  .wrapper{
    min-height: 0;
  }
}
</style>
