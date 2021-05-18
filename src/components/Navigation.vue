<template>
  <nav class="nav">
    <router-link class="nav__logo" :to="{ name: 'home' }" exact title="Film Guide App">
        <svg class="nav__logo-image">
            <use xlink:href="#svgLogo"></use>
        </svg>
    </router-link>
    <div class="nav__hamburger" @click="toggleNav">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <div class="nav__left">
        <ul class="nav__list">
            <li class="nav__item" v-for="item in listTypes" v-if="item.isCategory">
                <router-link class="nav__link" :to="{ name: 'home-category', params: { category: item.query } }">
                    <div class="nav__link-wrap">
                        <svg class="nav__link-icon">
                            <use :xlink:href="'#icon_' + item.query"></use>
                        </svg>
                        <span class="nav__link-title">{{ item.shortTitle }}</span>
                    </div>
                 </router-link>
            </li>
        </ul>
    </div>
    <div class="nav__center">
        <input class="nav__center-input" type="text" v-model.trim="searchQuery" @keyup.enter="search" @blur="search" placeholder="Search for a movie...">
        <svg class="nav__center-icon">
          <use xlink:href="#iconSearch"></use>
        </svg>
    </div>
    <div class="nav__right" v-if="userNotAuthenticated">
        <ul class="nav__right-list">
            <li class="nav__item">
                <a class="nav__link" :href="'/'" @click.prevent="openLoginPopup()" >
                    <div class="nav__link-wrap">
                        <svg class="nav__link-icon">
                            <use :xlink:href="'#iconLogin'"></use>
                        </svg>
                        <span class="nav__link-title">Log In</span>
                    </div>
                </a>
            </li>
            <li class="nav__item">
                <a  class="nav__link" :href="'/'" @click.prevent="openRegisterPopup()" >
                    <div class="nav__link-wrap">
                        <svg class="nav__link-icon">
                            <use :xlink:href="'#iconLogin'"></use>
                        </svg>
                        <span class="nav__link-title">Register</span>
                    </div>
                </a>
            </li>
        </ul>
    </div> 
    <div class="nav__right" v-if="userAuthenticated">
        <ul class="nav__right-list">
            <li class="nav__item">
                <router-link class="nav__link" :to="{name: 'profile'}" >
                    <div class="nav__link-wrap">
                        <svg class="nav__link-icon">
                            <use :xlink:href="'#iconLogin'"></use>
                        </svg>
                        <span class="nav__link-title">Profile</span>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>   
      <!--<li class="nav__item nav__item--profile">
        <div  class="nav__link nav__link--profile"  @click="requestToken" v-if="!userLoggedIn">
          <div class="nav__link-wrap">
            <svg class="nav__link-icon">
              <use xlink:href="#iconLogin"></use>
            </svg>
            <span class="nav__link-title">Log In</span>
          </div>
        </div>
        <router-link  class="nav__link nav__link--profile" :to="{name: 'profile'}" v-if="!userLoggedIn">
          <div class="nav__link-wrap">
            <svg class="nav__link-icon">
              <use xlink:href="#iconLogin"></use>
            </svg>
            <span class="nav__link-title">Profile</span>
          </div>
        </router-link>
      </li>-->
  </nav>
</template>

<script>
import storage from "../storage.js";
import api from '../api.js';

export default {
  data() {
    return {
      listTypes: storage.listTypes,
      userAuthenticated: false,
      userNotAuthenticated: false,
      searchQuery: ""
    };
  },
  methods: {
    async setUserStatus(){
      try{
        let response = await api.whoami();
        if(response.status === 200){
          this.userAuthenticated = true;
          this.userNotAuthenticated = false;
        } else {
          this.userNotAuthenticated = true;
          this.userAuthenticated = false;
        }
      }
      catch(error){
        this.userNotAuthenticated = true;
        this.userAuthenticated = false;
      }
    },
    search(){

    },
    toggleNav() {
      document
        .querySelector(".nav__hamburger")
        .classList.toggle("nav__hambuerger--active");
      document
        .querySelector(".nav__list")
        .classList.toggle("nav__list--active");
      document.querySelector(".nav__right-list").classList.toggle("nav__right-list--active");
    },
    openLoginPopup(){
        eventHub.$emit('openLoginPopup');
    },
    openRegisterPopup(){
      eventHub.$emit('openRegisterPopup');
    }
  },
  mounted(){
    eventHub.$on('setUserStatus', this.setUserStatus)

  },
  created() {
    this.setUserStatus();
    eventHub.$on('setUserStatus', this.setUserStatus)
  }
};
</script>


<style lang="scss">
@import "./src/scss/variables";
@import "./src/scss/media-queries";


.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: $c-dark-blue;
  display: flex;
  margin-left: 10px;
  z-index: 10;
  @include tablet-min {
    width: 100%;
    height: 75px;
    margin-left: 20px;
  }
  &__left {
      float: left;
  }
  &__right {
      float: right;
      text-align: center;
      right: 0;
      top: 0;
      margin-right: 20px;
      height: 75px;
      @include mobile_only{
        position: relative;
      }
      &-list{
        margin: 0;
        display: flex;
        padding: 0;
        list-style: none;
        @include mobile-only {
            font-size: 0;
            opacity: 0;
            left: 0;
            top: 218px;
            position: fixed;
            width: 100%;
            visibility: hidden;
            transition: all 0.5s ease;
            text-align: left;
            &--active {
                opacity: 1;
                visibility: visible;
            }
        }
      }
  }
  &__center {
    height: 50px;
    width: 100%;
    display: flex;
    z-index: 5;
    @include tablet-min{
      position: relative;
      height: 75px;
      right: 0;
    }
    @include mobile_only{
        width: calc(100% - 110px);
        position: fixed;
        top: 0;
        right: 55px;
    }
    &-input{
      display: block;
      width: 100%;
      padding: 15px 20px 15px 45px;
      outline: none;
      border: 0;
      background-color: transparent;
      color: $c-light;
      font-weight: 300;
      font-size: 16px;
      @include tablet-min{
        padding: 15px 30px 15px 60px;
      }
      @include tablet-landscape-min{
        padding: 15px 30px 15px 80px;
      }
      @include desktop-min{
        padding: 15px 30px 15px 90px;
      }
    }
    &-icon{
      width: 14px;
      height: 14px;
      fill: rgba($c-light, 1);
      transition: fill 0.5s ease;
      pointer-events: none;
      position: absolute;
      top: 50%;
      margin-top: -7px;
      left: 20px;
      @include tablet-min{
        width: 18px;
        height: 18px;
        margin-top: -9px;
        left: 30px;
      }
      @include tablet-landscape-min{
        left: 50px;
      }
      @include desktop-min{
        left: 60px;
      }
    }
    &-input:focus + &-icon{
      fill: $c-light;
    }
  }
  &__logo {
    display: block;
    width: 55px;
    height: 50px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $c-dark-blue;
    @include tablet-min {
      width: 95px;
      height: 75px;
    }
    &-image {
      width: 35px;
      height: 31px;
      fill: $c-yellow;
      transition: transform 0.5s ease;
      @include tablet-min {
        width: 45px;
        height: 40px;
      }
    }
    &:hover &-image {
      transform: scale(1.04);
    }
  }
  &__hamburger {
    display: block;
    position: fixed;
    width: 55px;
    height: 50px;
    top: 0;
    right: 0;
    cursor: pointer;
    background: $c-dark-blue;
    z-index: 10;
    @include tablet-min {
      display: none;
    }
    .bar {
      position: absolute;
      width: 23px;
      height: 1px;
      background: rgba($c-light, 1);
      transition: all 300ms ease;
      &:nth-child(1) {
        left: 16px;
        top: 17px;
      }
      &:nth-child(2) {
        left: 16px;
        top: 25px;
        &:after {
          content: "";
          position: absolute;
          left: 0px;
          top: 0px;
          width: 23px;
          height: 1px;
          background: transparent;
          transition: all 300ms ease;
        }
      }
      &:nth-child(3) {
        right: 15px;
        top: 33px;
      }
    }
    &--active {
      .bar {
        &:nth-child(1),
        &:nth-child(3) {
          width: 0;
        }
        &:nth-child(2) {
          transform: rotate(-45deg);
        }
        &:nth-child(2):after {
          transform: rotate(-90deg);
          background: rgba($c-dark, 0.5);
        }
      }
    }
  }
  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;
    left: 95px;
    top: 0px;
    background: rgba($c-dark-blue, 0.98);
    @include mobile-only {
      font-size: 0;
      opacity: 0;
      left: 0;
      top: 50px;
      position: fixed;
      width: 100%;
      visibility: hidden;
      transition: all 0.5s ease;
      text-align: left;
      &--active {
        opacity: 1;
        visibility: visible;
      }
    }
    @include tablet-min {
      display: flex;
      background: transparent;
      border-top: 0;
      top: 0;
    }
  }
  &__item {
    @include mobile-only {
      display: inline-block;
      text-align: center;
      background: $c-dark-blue;
      width: 50%;
    }
    @include tablet-min {
      &--right {
        height: 75px;
        border-bottom: 0;
      }
    }
  }
  &__link {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    font-size: 7px;
    font-weight: 300;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: rgba($c-light, 1);
    transition: color 0.5s ease, background 0.5s ease;
    position: relative;
    cursor: pointer;
    @include mobile-only {
      font-size: 10px;
      padding: 20px 0;
      &--profile {
        background: $c-dark-blue;
      }
    }
    @include tablet-min {
      width: 95px;
      height: 75px;
      font-size: 9px;
      &--profile {
        width: 75px;
        height: 75px;
        background: $c-dark-blue;
      }
    }
    &-icon {
      width: 20px;
      height: 20px;
      margin-bottom: 3px;
      fill: rgba($c-light, 1);
      transition: fill 0.5s ease;
      @include tablet-min {
        width: 20px;
        height: 20px;
        margin-bottom: 5px;
      }
    }
    &-title {
      display: block;
      width: 100%;
      transition: color 0.5s ease;
    }
    &:hover {
      color: $c-yellow;
    }
    &:hover &-icon {
      fill: $c-yellow;
    }
    &:hover &-wrap &-icon {
      fill: $c-yellow;
    }
    &:hover &-wrap &-title {
      color: $c-yellow;
    }
    &.is-active {
      color: $c-light;
      background: $c-dark-blue;
    }
    &.is-active &-icon {
      fill: $c-light;
    }
  }
}
</style>