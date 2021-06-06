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
      listLoaded: false
    }
  },
  computed: {
    pageTitle(){
      return this.listTitle + storage.pageTitlePostfix;
    },
    query(){
      return this.$route.params.query || '';
    },
    request(){
      if(this.mode == 'search'){
        return `https://api.themoviedb.org/3/search/movie?api_key=${storage.apiKey}&language=en-US&query=${this.query}&page=${this.currentPage}`;
      } else if(this.mode == 'collection') {
        let caregory = this.$route.params.category || this.category;
        return `https://api.themoviedb.org/3/movie/${caregory}?api_key=${storage.apiKey}&language=en-US&page=${this.currentPage}`;
      } else if(this.mode == 'favorite') {
        return `https://api.themoviedb.org/3/account/${storage.userId}/favorite/movies?api_key=${storage.apiKey}&session_id=${storage.sessionId}&language=en-US&sort_by=created_at.desc&page=${this.currentPage}`;
      }
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
    fetchCategory(){
      api.getTrendingMovies(this.currentPage)
      .then(response => {
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
    updateFavorite(){
      if(this.mode == 'favorite'){
        let promises = [], movies = [], pages, results;
        for(let i = 1; i <= this.currentPage; i++){
          promises.push(axios.get(`https://api.themoviedb.org/3/account/${storage.userId}/favorite/movies?api_key=${storage.apiKey}&session_id=${storage.sessionId}&language=en-US&sort_by=created_at.desc&page=${i}`))
        }
        axios.all(promises).then(function(results) {
          results.forEach(function(resp) {
            let data = resp.data;
            movies = movies.concat(data.results);
            pages = data.total_pages;
            results = data.total_results;
          });
          this.movies = movies;
          this.pages = pages;
          if(this.currentPage > pages){
            this.currentPage -= 1;
          }
          this.results = results;
        }.bind(this));
      }
    }
  },
  watch: {
    query(value){
      this.fetchCategory(value);
    }
  },
  created(){
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
    this.fetchCategory();
    eventHub.$on('updateFavorite', this.updateFavorite);
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
