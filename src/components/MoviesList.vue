<template>
  <div class="wrapper" v-if="listLoaded">
    <div class="movies" v-if="movies.length">
      <header class="movies__header">
        <div class="header_icon"></div>
        <h2 class="movies__title">{{ listTitle }}</h2>
        <span class="movies__results" v-if="!shortList">{{ countResults }}</span>
        <router-link v-if="shortList" class="movies__link" :to="{name: 'home-category', params: {category: category}}">
          View All
        </router-link>
      </header>
      <ul class="movies__list">
        <movies-list-item class="movies__item" v-for="(movie, index) in movies" :movie="movie" :showButton="true"></movies-list-item>
      </ul>
      <div class="movies__nav" v-if="!shortList" :class="{'is-hidden' : currentPage == pages}">
        <button @click="loadMore" class="button">Load More</button>
      </div>
    </div>
    <i v-if="!listLoaded" class="loader"></i>
    <section v-if="!movies.length" class="not-found">
      <div class="not-found__content">
        <h2 class="not-found__title" v-if="mode == 'search'">Nothing Found</h2>
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
  props: ['type', 'mode', 'category', 'shortList'],
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
      pages: '',
      results: '',
      currentPage: 1,
      listLoaded: false,
      routeCategory: ''
    }
  },
  computed: {
    pageTitle(){
      return this.listTitle + storage.pageTitlePostfix;
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
    handleAPICall(promise){
      promise.then(response => {
          let data = response.data;
          if(this.shortList){
              this.movies = data.results.slice(0, 8);
              this.pages = 1;
              this.results = 5;
          } else {
              this.movies = data.results;
              this.pages = 10;
              this.results = 200; 
          }
          this.listLoaded = true;
      })
      .catch(error => {

      });
    },
    fetchCategory(){
      let category = this.routeCategory == undefined ? this.category : this.routeCategory;

      if(this.$route.params.query != undefined){
        this.handleAPICall(api.searchMovies(this.$route.params.query));
      }
      else if(category == 'popular'){
        this.handleAPICall(api.getTrendingMovies(this.currentPage));
      }
      else if(category == 'top_rated'){
        this.handleAPICall(api.getTopRatedMovies(this.currentPage));
      }
      else if(category == 'upcoming'){
        this.handleAPICall(api.getUpComingMovies(this.currentPage));
      }
      else if(category == 'now_playing'){
        this.handleAPICall(api.getNowPlayingMovies(this.currentPage));
      }
      else{
        this.handleAPICall(api.getTrendingMovies(this.currentPage));
      }
      
    },
    loadMore(){
      this.currentPage++;
      api.getTrendingMovies(this.currentPage)
      .then(response => {
        let data = response.data;
        let newData = this.movies.concat(data.results);
        this.movies = newData;
      })
      .catch(error => {

      });
    },
    init(){
      // Set List Title
    /*if(this.mode == 'collection') {
      let caregory = this.$route.params.category || this.category;
      this.listTitle = storage.categories[caregory];
    }*/
    if(this.mode == 'search'){
      this.listTitle = storage.categories['search'];
      eventHub.$emit('setSearchQuery');
    } else if(this.mode == 'collection') {
      let caregory = this.$route.params.category || this.category;
      this.listTitle = storage.categories[caregory];
    } else if(this.mode == 'favorite') {
      this.listTitle = storage.categories['favorite'];
    }
    this.routeCategory = this.$route.params.category;
    this.fetchCategory();

    eventHub.$on('movie_watchlisted', movieId =>{
      this.movies.forEach(movie => {
        if(movie.id === movieId){
          movie.watchlisted = true;
        }
      });
    });

    eventHub.$on('movie_unwatchlisted', movieId =>{
      this.movies.forEach(movie => {
        if(movie.id === movieId){
          movie.watchlisted = false;
        }
      });
    });
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
