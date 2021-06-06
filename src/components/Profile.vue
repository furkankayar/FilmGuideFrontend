<template>
  <div class="wrapper" v-if="listLoaded">
    <div class="movies" v-if="movies.length">
      <header class="movies__header">
        <div class="header_icon"></div>
        <h2 class="movies__title">{{ username }}'s Watchlist</h2>
      </header>
      <ul class="movies__list">
        <movies-list-item class="movies__item" v-for="(movie, index) in movies" :movie="movie" :showButton="showButton"></movies-list-item>
      </ul>
    </div>
    <i v-if="!listLoaded" class="loader"></i>
    <section v-if="!movies.length" class="not-found">
      <div class="not-found__content">
        <h2 class="not-found__title" v-if="mode == 'favorite'">You haven't added any favorite movies</h2>
      </div>
    </section>
  </div>
</template>

<script>
import api from '../api.js'
import axios from 'axios'
import numeral from 'numeral'
import storage from '../storage.js'
import MoviesListItem from './MoviesListItem.vue'

// Storage for removed favorite item
let removed;

export default {
  components: { MoviesListItem },
  beforeRouteLeave (to, from, next) {
    if(from.name == 'search'){
      eventHub.$emit('setSearchQuery', true);
    }
    next();
  },
  data() {
    return {
      listTitle: '',
      movies: [],
      results: '',
      listLoaded: false,
      username: '',
      showButton: false
    }
  },
  computed: {
    pageTitle(){
      return this.listTitle + storage.pageTitlePostfix;
    },
    query(){
      return this.$route.params.query || '';
    },
    countResults(){
      if(this.results > 1){
        return numeral(this.results).format('0,0') + ' results';
      } else {
        return numeral(this.results).format('0,0') + ' result';
      }
    }
  },
  methods: {
    fetchWatchlist(){
      api.getWatchlist(this.username)
      .then(response => {
          let data = response.data;
          this.movies = data.watchlist;
          this.listLoaded = true;
      })
      .catch(error => {
          console.log(error.response);
      });
    },
    init(){
        this.showButton = false;
        if(this.$route.params.username != undefined){
            this.username = this.$route.params.username;
            if (this.username != localStorage.getItem("username")){
                this.showButton = true;
            }
        } else {
            this.username = localStorage.getItem("username")
        }
    
        this.fetchWatchlist();
    }
  },
  watch: {
    '$route':{
        handler: 'init',
        immediate: true
    }
  },
  created(){
    this.init();
  }
}
</script>

<style lang="scss">
@import "./src/scss/variables";
@import "./src/scss/media-queries";
.movies{
  padding: 10px;
  @include tablet-min{
    padding: 15px;
  }
  @include tablet-landscape-min{
    padding: 25px;
  }
  @include desktop-min{
    padding: 30px;
  }
  &__header{
    display: flex;
    align-items: center;
    padding: 20px 10px;
   
  }
    &__title{
      margin: 0;
      font-size: 16px;
      line-height: 16px;
      color: $c-yellow;
      font-weight: 500;
      @include tablet-min{
        font-size: 18px;
        line-height: 18px;
      }
    }
    &__results{
      font-size: 12px;
      font-weight: 300;
      letter-spacing: 0.5px;
      color: rgba($c-dark, 0.5);
    }
    &__link{
      font-size: 12px;
      font-weight: 300;
      letter-spacing: 0.5px;
      color: rgba($c-light, 0.5);
      margin: auto;
      margin-right: 0;
      text-decoration: none;
      transition: color 0.5s ease;
      &:after{
        content: " →";
      }
      &:hover{
        color: $c-light;
      }
    }
  &__list{
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }
    &__item{
      margin: 10px;
      width: 50%;
      @include tablet-min{
          width: calc(100%/4 - 20px);
      }
      @include tablet-landscape-min{
        width: calc(100%/4 - 20px);
      }
      @include desktop-min{
        width: calc(100%/8 - 20px);
      }
    }
    &__nav{
      padding: 25px 0;
      text-align: center;
      &.is-hidden{
        display: none;
      }
    }
}

.header_icon{
  display: block;
  width: 7px;
  height: 30px;
  border-radius: 20px;
  margin-right: 10px;
  background-color: $c-yellow;
}
</style>
