<template>
  <li class="movies-item">
    <a class="movies-item__link" :class="{'no-image': noImage}" :href="'/movie/' + movie.id" @click.prevent="openMoviePopup(movie.id, true)">
      <figure class="movies-item__poster">
        <img v-if="!noImage" class="movies-item__img" src="~assets/placeholder.png" v-img="poster()" alt="">
        <img v-if="noImage" class="movies-item__img is-loaded" src="~assets/no-image.png" alt="">
      </figure>
      <div class="movies-item__content">
        <p class="movies-item__vote"><span class="movies-item__star">&starf;</span>{{ movie.vote_average }}</p>
        <p class="movies-item__title">{{ movie.title }}</p>
        <p class="movies-item__date">{{ movie.release_date.substring(0, 4) }}</p>
        <p class="movies-item__lang">{{ movie.original_language.toUpperCase() }}</p>
        <button v-if="!movie.watchlisted" class="movies-item__watchlist-button"><span style="margin-right: 5px; font-size:110%;">&plus;</span>Watchlist</button>
        <button v-if="movie.watchlisted" class="movies-item__watchlist-button-activated"><span style="margin-right: 5px; font-size:110%;">&check;</span>Watchlisted</button>
      </div>
    </a>
  </li>
</template>

<script>
import img from '../directives/v-image.js';

export default {
  props: ['movie'],
  directives: {
    img: img
  },
  data(){
    return{
      noImage: false
    }
  },
  methods: {
    poster() {
      if(this.movie.poster_path){
        return 'https://image.tmdb.org/t/p/w370_and_h556_bestv2' + this.movie.poster_path;
      } else {
        this.noImage = true;
      }
    },
    openMoviePopup(id, event){
      eventHub.$emit('openMoviePopup', id, event);
    }
  }
}
</script>

<style lang="scss">
@import "./src/scss/variables";
@import "./src/scss/media-queries";
.movies-item{
    transition: 0.2s;
    border-radius: 10px;
    background-color: $c-movie-item-gray;
    @include mobile_only{
        max-width: calc(50% - 20px);
    }
  &__link{
    text-decoration: none;
    color: rgba($c-light, 1);
    font-weight: 300;
  }
  &__content{
    padding-top: 10px;
  }
  &__img{
    width: 100%;
    opacity: 0;
    border-radius: 10px 10px 0 0;
    transform: scale(0.97) translateZ(0);
    transition: opacity 0.5s ease, transform 0.5s ease;
    &.is-loaded{
      opacity: 1;
      transform: scale(1);
    }
  }
  &__title{
    margin: 0;
    padding: 0 10px 0 10px;
    font-size: 11px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    letter-spacing: 0.5px;
    transition: color 0.5s ease;
    @include mobile-ls-min{
      font-size: 12px;
    }
    @include tablet-min{
      font-size: 14px;
    }
  }
  &__date{
    margin: 0;
    padding: 0 0 10px 10px;
    float: left;
    width: 50%;
    font-size: 11px;
    letter-spacing: 0.5px;
    transition: color 0.5s ease;
    @include mobile-ls-min{
        font-size: 12px;
    }
    @include tablet-min{
        font-size: 14px;
    }
  }
  &__lang{
    margin: 0;
    padding: 0 10px 10px 0;
    float: right;
    text-align: right;
    width: 50%;
    font-size: 11px;
    letter-spacing: 0.5px;
    transition: color 0.5s ease;
    @include mobile-ls-min{
        font-size: 12px;
    }
    @include tablet-min{
        font-size: 14px;
    }
  }
  &__star{
      margin-right: 5px;
      font-size:120%;
      color:$c-yellow;
  }
  &__vote{
    margin: 0;
    padding: 0 0 0 10px;
    font-size: 11px;
    letter-spacing: 0.5px;
    transition: color 0.5s ease;
    @include mobile-ls-min{
      font-size: 12px;
    }
    @include tablet-min{
      font-size: 14px;
    }
  }

  &__watchlist-button{
      cursor: pointer;
      width: 100%;
      font-size: 14px;
      border-radius: 0 0 10px 10px;
      background-color: $c-movie-item-gray;
      color: $c-yellow;
      border: 1px solid $c-yellow;
      height: 30px;
  }
  &__watchlist-button:hover{
      background-color: $c-dark-blue;
      color: $c-yellow;
  }
  &__watchlist-button-activated{
      cursor: pointer;
      width: 100%;
      font-size: 14px;
      border-radius: 0 0 10px 10px;
      background-color: $c-yellow;
      color: $c-dark-blue;
      border: 1px solid $c-yellow;
      height: 30px;
  }

  &__watchlist-button-activated:hover{
      background-color: $c-dark-blue;
      color: $c-yellow;
  }
}

.movies-item:hover {
    transform: scale(1.05);
}
</style>
