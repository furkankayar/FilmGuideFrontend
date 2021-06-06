<template>
  <section class="movie">
    <div class="movie__container" v-if="movieLoaded">
      <header class="movie__header" :class="{'movie__header--page': type=='page'}" :style="{ 'background-image': 'url(' + movieBackdropSrc + ')' }">
        <div class="movie__wrap movie__wrap--header" :class="{'movie__wrap--page': type=='page'}">
          <figure class="movie__poster">
            <img v-if="moviePosterSrc" class="movie__img" src="~assets/placeholder.png" v-img="moviePosterSrc">
            <img v-if="!moviePosterSrc" class="movies-item__img is-loaded" src="~assets/no-image.png">
          </figure>
          <div class="movie__title">
            <h1 class="movie__title-text">
              {{ movie.title }}
              <span v-if="movie.tagline">{{ movie.tagline }}</span>
            </h1>
          </div>
        </div>
      </header>
      <div class="movie__main">
        <div class="movie__wrap movie__wrap--main" :class="{'movie__wrap--page': type=='page'}">
          <div class="movie__actions">
              <button v-if="!movie.watchlisted" class="watchlist-button" @click="addWatchlist"><span style="margin-right: 5px; font-size:110%;">&plus;</span>Watchlist</button>
              <button v-if="movie.watchlisted" class="watchlist-button-activated" @click="removeWatchlist"><span style="margin-right: 5px; font-size:110%;">&check;</span>Watchlisted</button>
          </div>
          <div class="movie__info">
            <div class="movie__details">
              <div class="movie__details-block">
                  <h2 class="movie__details-title">
                  Overview
                </h2>
                <div v-if="movie.overview" class="movie__details-text">
                    {{ movie.overview }}
                </div>
              </div>
              <div v-if="movie.genres.length" class="movie__details-block">
                <h2 class="movie__details-title">
                  Genres
                </h2>
                <div class="movie__details-text">
                  {{ nestedDataToString(movie.genres) }}
                </div>
              </div>
              <div v-if="movie.release_date" class="movie__details-block">
                <h2 class="movie__details-title">
                  Release Date
                </h2>
                <div class="movie__details-text" v-formatDate="movie.release_date"></div>
              </div>
              <div class="movie__details-block">
                <div style="display:flex;">
                    <h2 class="movie__details-title">
                        Cast
                    </h2>
                    <router-link class="person__link" :to="{name: 'home-category', params: {}}">
                        View All
                    </router-link>
                </div>
                <ul class="person__list">
                    <li class="person__list-item" v-for="person in movie.cast" :key="person.id">
                        <figure class="person__list-item__poster">
                            <img v-if="person.profilePath" class="person__img" src="~assets/placeholder.png" v-img="personPoster(person)" alt="">
                            <img v-if="!person.profilePath" class="person__img is-loaded" src="~assets/no-image.png" alt="">
                        </figure>
                        <p class="person__list-item__title">{{ person.name }}</p>
                    </li>
                </ul>
              </div>
              <div v-if="movie.videos.length > 0" class="movie__details-block">
                <h2 class="movie__details-title">
                  Trailers
                </h2>
                <div class="trailer">
                  <div class="trailer__tab">
                    <div class="trailer__tablink" v-for="video, index in movie.videos" :key="video.videoId" @click="trailerChangeTab(index)">
                      <button class="trailer__tablink-button">{{ index + 1 }}</button>
                    </div>
                  </div>
                  
                  <div class="trailer__tabcontent">
                    <iframe class="trailer__video"
                      :src="'https://www.youtube.com/embed/' + videoKey">
                    </iframe> 
                  </div>
                
                </div>
              </div>
              <div class="movie__details-block">
                <h2 class="movie__details-title">
                  Reviews
                </h2>
                <ul class="review__list">
                  <review v-for="item in movie.reviews" :reviewProp="item"/>
                </ul>
                <div v-if="!showForm" class="review__text" @click="showForm = true">
                  Review this movie
                </div>
                <div v-if="showForm" class="review__form">
                  <h2 class="movie__details-title" align="center">New Review</h2>
                  <hr class="separator">
                  <label v-if="showError" class="alert alert__error" >{{errorLabelText}}</label>
                  <form>
                  <label class="review__label" for="title">Title</label>
                  <input v-model="reviewTitle" name="title" class="review__input" required="required"/>
                  <br>
                  <label class="review__label" for="content">Content</label>
                  <textarea v-model="reviewContent" rows="4" name="content" class="review__input review__input-content" required="required"/>
                  <div class="review__label">Rating</div>
                  <div class="rate">
                    <input type="radio" id="star10" name="rate" value="10" @click="reviewRating = 10" />
                    <label for="star10" title="text">10 stars</label>
                    <input type="radio" id="star9" name="rate" value="9" @click="reviewRating = 9" />
                    <label for="star9" title="text">9 stars</label>
                    <input type="radio" id="star8" name="rate" value="8" @click="reviewRating = 8" />
                    <label for="star8" title="text">8 stars</label>
                    <input type="radio" id="star7" name="rate" value="7" @click="reviewRating = 7" />
                    <label for="star7" title="text">7 stars</label>
                    <input type="radio" id="star6" name="rate" value="6" @click="reviewRating = 6" />
                    <label for="star6" title="text">6 stars</label>
                    <input type="radio" id="star5" name="rate" value="5" @click="reviewRating = 5" />
                    <label for="star5" title="text">5 stars</label>
                    <input type="radio" id="star4" name="rate" value="4" @click="reviewRating = 4" />
                    <label for="star4" title="text">4 stars</label>
                    <input type="radio" id="star3" name="rate" value="3" @click="reviewRating = 3" />
                    <label for="star3" title="text">3 stars</label>
                    <input type="radio" id="star2" name="rate" value="2" @click="reviewRating = 2" />
                    <label for="star2" title="text">2 stars</label>
                    <input type="radio" id="star1" name="rate" value="1" @click="reviewRating = 1" />
                    <label for="star1" title="text">1 star</label>
                  </div>
                  <button type="submit" class="review__button" @click="sendComment">Send</button>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import api from '../api.js'
import storage from '../storage.js'
import img from '../directives/v-image.js'
import formatDate from '../directives/v-formatDate.js'
import Review from './Review.vue'

export default {
  props: ['id', 'type'],
  directives: {
    img: img,
    formatDate: formatDate
  },
  components: {
    Review
  },
  data(){
    return{
      movie: {},
      movieLoaded: false,
      moviePosterSrc: '',
      movieBackdropSrc: '',
      favoriteChecked: false,
      favorite: '',
      noImage: false,
      videoKey: "",
      reviewTitle: "",
      reviewContent: "",
      reviewRating: 0,
      showError: false,
      errorLabelText: "",
      showForm: false
    }
  },
  methods: {
    sendComment(e){
      e.preventDefault();
      if(this.reviewTitle == ""){
        this.errorLabelText = "Title is missing!";
        this.showError = true;

      }
      else if(this.reviewContent == ""){
        this.errorLabelText = "Content is missing!";
        this.showError = true;
      }
      else{
        this.showError = false;
        api.sendReview(this.id, {
          title: this.reviewTitle,
          content: this.reviewContent,
          rating: this.reviewRating
        })
        .then(response => {
          if(response.status === 200){
            this.movie = {};
            this.reviewTitle = "";
            this.reviewContent = "";
            this.reviewRating = 0;
            this.showForm = false;
            this.fetchMovie(this.id);
          }
        })
      }
    },
    fetchMovie(id){
        api.getMovie(id)
        .then(response => {
            if(response.status === 200){
                let movie = response.data;
                this.movie = movie;
                this.poster();
                this.backdrop();
                this.movieLoaded = true;
                this.movie.cast = this.movie.cast.sort(() => .5 - Math.random()).slice(0, 8);
                this.movie.videos = this.movie.videos.slice(0, 5);
                if(this.movie.videos.length > 0){
                  this.videoKey = this.movie.videos[0].key;
                }
                document.title = this.movie.title;
            } else {
                this.$router.push({name: '404'});
            }
            
        })
        .catch(error => {
            this.$router.push({ name: '404' });
        });
    },
    personPoster(person) {
      if(person.profilePath){
        return 'https://image.tmdb.org/t/p/w370_and_h556_bestv2' + person.profilePath;
      } else {
        this.noImage = true;
      }
    },
    poster() {
      if(this.movie.poster_path){
        this.moviePosterSrc = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + this.movie.poster_path;
      }
    },
    backdrop(){
      if(this.movie.backdrop_path){
        this.movieBackdropSrc = 'https://image.tmdb.org/t/p/w500' + this.movie.backdrop_path;
      }
    },
    nestedDataToString(data) {
      let nestedArray = [], resultString;
      data.forEach((item) => nestedArray.push(item.name));
      resultString = nestedArray.join(', ');
      return resultString;
    },
    async addWatchlist(e){
        try{
            let response = await api.addWatchlist(this.movie.movie_id);
            if (response.status === 200){
                this.movie.watchlisted = true;
            }
        }
        catch(error){
        }
    },
    async removeWatchlist(e){
        try{
            let response = await api.removeWatchlist(this.movie.movie_id);
            if (response.status === 200){
                this.movie.watchlisted = false;
            }
        }
        catch(error){
        }
    },
    trailerChangeTab(index){
      this.videoKey = this.movie.videos[index].key;
    }
  },
  watch: {
    id: function(val){
      this.fetchMovie(val);
    }
  },
  created(){
    this.fetchMovie(this.id);
  }
}
</script>

<style lang="scss">
@import "./src/scss/variables";
@import "./src/scss/media-queries";

.movie{
  &__wrap{
    display: flex;
    &--page{
      max-width: 100%;
      position: relative;
      margin: 0 auto;
    }
    &--header{
      align-items: center;
      height: 100%;
    }
    &--main{
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      @include tablet-min{
        flex-direction: row;
      }
    }
  }
  &__header{
    height: 250px;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-color: $c-dark;
    @include tablet-min{
      height: 350px;
      &--page{
        height: 384px;
      }
    }
    &:before{
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      background: rgba($c-dark, 0.85);
    }
  }
    &__poster{
      display: none;
      width: 70%;
      @include tablet-min{
        background: $c-dark;
        display: block;
        position: absolute;
        max-width: calc(25% - 40px);
        min-width: 260px;
        top: 100px;
        left: 40px;
      }
    }
      &__img{
        display: block;
        width: 100%;
        opacity: 0;
        transform: scale(0.97) translateZ(0);
        transition: opacity 0.5s ease, transform 0.5s ease;
        &.is-loaded{
          opacity: 1;
          transform: scale(1);
        }
      }
    &__title{
      position: relative;
      padding: 20px;
      color: $c-yellow;
      text-align: center;
      width: 100%;
      @include tablet-min{
        width: 55%;
        text-align: left;
        margin-left: calc(max(300px, 25%));

        padding: 30px 30px 30px 40px;
      }
      &-text{
        font-weight: 500;
        line-height: 1.4;
        font-size: 24px;
        @include tablet-min{
          font-size: 30px;
        }
        span{
          display: block;
          font-size: 14px;
          font-weight: 300;
          color: rgba($c-white, 0.7);
          margin-top: 10px;
        }
      }
    }
  &__main{
    background: $c-dark-blue;
    min-height: calc(100vh - 250px);
    @include tablet-min{
      min-height: 0;
    }
  }
    &__actions{
      text-align: center;
      max-width: calc(25%);
      width: calc(25% - 40px);
      min-width: 260px;
      order: 2;
      padding: 20px;
      margin-top: 150px;
      margin-left: 40px;
      border-top: 1px solid rgba($c-dark, 0.05);
      @include tablet-min{
        order: 1;
      width: calc(25% - 40px);
        min-width: 260px;
        margin-top: 150px;
        border-top: 0;
      }
      @include desktop-min{
        margin-top: calc(33% - 240px);
      }
      &-link{
        display: flex;
        align-items: center;
        text-decoration: none;
        text-transform: uppercase;
        color: rgba($c-light, 0.5);
        transition: color 0.5s ease;
        font-size: 11px;
        padding: 10px 0;
        border-bottom: 1px solid rgba($c-dark, 0.05);
        &:hover{
          color: rgba($c-dark, 0.75);
        }
        &.active{
          color: $c-dark;
        }
      }
      &-icon{
        width: 16px;
        height: 16px;
        margin: 0 10px 0 0;
        fill: rgba($c-dark, 0.5);
        transition: fill 0.5s ease, transform 0.5s ease;
        &.waiting{
          transform: scale(0.8, 0.8);
        }
      }
      &-link:hover &-icon{
        fill: rgba($c-dark, 0.75);
      }
      &-link.active &-icon{
        fill: $c-green;
      }
      &-text{
        display: block;
        padding-top: 2px;
      }
    }
    &__info{
      width: 100%;
      padding: 20px;
      order: 1;
      @include tablet-min{
        order: 2;
        padding: 40px;
        width: 60%;
        margin-left: calc(max(325px, 25%));
      }
    }
    &__info{
      margin-left: 0;
    }
      &__description{
        font-weight: 300;
        font-size: 13px;
        line-height: 1.8;
        margin-bottom: 20px;
        @include tablet-min{
          margin-bottom: 30px;
          font-size: 14px;
        }
      }
      &__details{
        &-block{
          margin-bottom: 20px;
          @include tablet-min{
            margin-bottom: 30px;
          }
        }
        &-title{
          margin: 0;
          font-weight: 400;
          text-transform: uppercase;
          font-size: 14px;
          color: $c-yellow;
          @include tablet-min{
            font-size: 16px;
          }
        }
        &-text{
          font-weight: 300;
          font-size: 14px;
          margin-top: 5px;
        }    
    }
}

.person{
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
    &__list{
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        &-item{
            transition: 0.2s;
            border-radius: 10px;
            cursor: pointer;
            background-color: $c-movie-item-gray;
            margin: 10px;

            @include mobile_only{
                width: calc((100% + 20px) / 4 - 20px);
                &:first-child{
                    margin: 10px 10px 10px 0px;
                }
                &:nth-child(4){
                    margin: 10px 0px 10px 10px;
                }
                &:nth-child(5){
                    margin: 10px 10px 10px 0px;
                }
                &:last-child{
                    margin: 10px 0px 10px 10px;
                }
            }
            width: 50%;
            @include tablet-min{
                width: calc((100% + 20px) / 4 - 20px);
                &:first-child{
                    margin: 10px 10px 10px 0px;
                }
                &:nth-child(4){
                    margin: 10px 0px 10px 10px;
                }
                &:nth-child(5){
                    margin: 10px 10px 10px 0px;
                }
                &:last-child{
                    margin: 10px 0px 10px 10px;
                }
            }
            @include tablet-landscape-min{
                width: calc((100% + 20px) / 4 - 20px);
                &:first-child{
                    margin: 10px 10px 10px 0px;
                }
                &:nth-child(4){
                    margin: 10px 0px 10px 10px;
                }
                &:nth-child(5){
                    margin: 10px 10px 10px 0px;
                }
                &:last-child{
                    margin: 10px 0px 10px 10px;
                }
            }
            @include desktop-min{
                width: calc((100% + 20px)/8 - 20px);
                &:first-child{
                    margin: 10px 10px 10px 0px;
                }
                &:nth-child(4){
                    margin: 10px 10px 10px 10px;
                }
                &:nth-child(5){
                    margin: 10px 10px 10px 10px;
                }
                &:last-child{
                    margin: 10px 0px 10px 10px;
                }
            }
            &__title{
                margin: 0;
                padding: 10px 10px 10px 10px;
                font-size: 11px;
                font-weight: 500;
                letter-spacing: 0.5px;
                transition: color 0.5s ease;
                @include mobile-ls-min{
                    font-size: 12px;
                }
                @include tablet-min{
                    font-size: 14px;
                }
            }
        }
        &-item:hover{
            transform: scale(1.05);
        }
    }
}

.watchlist-button{
      cursor: pointer;
      transition: 0.3s;
      width: 100%;
      font-size: 11px;
      border-radius: 10px 10px 10px 10px;
      background-color: transparent;
      color: $c-yellow;
      border: 1px solid $c-yellow;
      height: 30px;
      @include mobile-ls-min{
        font-size: 12px;
      }
      @include tablet-min{
        font-size: 13px;
    }
    &:hover{
      background-color: $c-movie-item-gray;
      color: $c-yellow;
    }
    &-activated{
      cursor: pointer;
      transition: 0.3s;
      width: 100%;
      font-size: 11px;
      border-radius: 10px 10px 10px 10px;
      background-color: $c-yellow;
      color: $c-dark-blue;
      border: 1px solid $c-yellow;
      height: 30px;
      @include mobile-ls-min{
        font-size: 12px;
      }  
      @include tablet-min{
        font-size: 13px;
      }
      &:hover{
        background-color: $c-movie-item-gray;
        color: $c-yellow;
      }
  }
}

.trailer{
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  padding: 0px 1px 1px 0px;
  border: 1px solid $c-yellow;
  text-align: justify;
  border-radius: 10px;

  &__tab{
    overflow: hidden;
    display: inline-block;
    width: 10%;
    margin-right: 10px;
  }
  &__tablink{
    background-color: $c-dark-blue;
    color: $c-yellow;
    width: 100%;
    text-align: center;
    outline: none;
    cursor: pointer;
    border: none;
    padding: 5px;
    transition: 0.3s;
    border: 1px solid $c-yellow;
    border-left: none;
    border-top: none;

    @include tablet_min{
      padding: 10px;
    }

    &-button{
      background: transparent;
      border: none;
      color: $c-yellow;
      cursor: pointer;
    }

    &:first-child{
      border-radius: 10px 0px 0px 0px;
    }

    &:last-child{
      border-radius: 0px 0px 10px 10px;
    }
    
    &:only-child{
      border-radius: 10px 0px 10px 0px
    }

    &:hover{
      background-color: $c-dark;
    }
    &:active{
      background-color: $c-yellow;
      color: $c-dark-blue;
    }
  }
  &__tabcontent{
    position: relative;
    display: inline-block;
    width: 90%;
    padding-top: 56.25%;
  }
  &__video{
    border-radius: 10px;
    width: 100%;
    height: 100%;
    border: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

  }
}

.review{
  &__list{
    padding: 0;
  }
  &__text{
    font-size: 14px;
    color: $c-yellow;
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }
  &__input{
    width: 100%;
    border: none;
    background-color: $c-dark-blue;
    color: $c-light;
    font-size: 14px;
    padding: 10px;
    border-radius: 10px;
    line-height: 20px;
    margin: 5px 0px;
    &:focus{
      outline-width: 0px;
    }
    &-content{
      resize: vertical;
    }
  }
  &__label{
    font-size: 14px;
    color: $c-yellow;
  }
  &__button{
    margin-top: 20px;
     cursor: pointer;
      transition: 0.3s;
      width: 100%;
      font-size: 11px;
      border-radius: 10px 10px 10px 10px;
      background-color: $c-dark-blue;
      color: $c-yellow;
      border: 1px solid $c-yellow;
      height: 30px;
      @include mobile-ls-min{
        font-size: 12px;
      }
      @include tablet-min{
        font-size: 13px;
    }
    &:hover{
      background-color: $c-yellow;
      color: $c-dark-blue;
    }
  }
  &__form{
    padding: 10px;
    width: 90%;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    background-color: $c-dark;
    @include tablet-min{
        width: 70%;
    }
    @include desktop-min{
        width: 50%;
    }
  }
}

.rate {
    float: left;
    padding: 0;
}
.rate:not(:checked) > input {
    position:absolute;
    top:-9999px;
    left: -9999px;
    visibility: hidden;
}
.rate:not(:checked) > label {
    float:right;
    width:1em;
    overflow:hidden;
    white-space:nowrap;
    cursor:pointer;
    font-size:30px;
    color:#ccc;
}
.rate:not(:checked) > label:before {
    content: '★ ';
}
.rate > input:checked ~ label {
    color: $c-yellow;    
}
.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
    color: #deb217;  
}
.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
    color: #c59b08;
}

</style>
