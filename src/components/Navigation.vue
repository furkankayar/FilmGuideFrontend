<template>
  <nav class="nav">
    <router-link
      class="nav__logo"
      :to="{ name: 'home' }"
      exact
      title="Film Guide App"
    >
      <svg class="nav__logo-image">
        <use xlink:href="#svgLogo"></use>
      </svg>
    </router-link>
    <div class="nav__hamburger" @click="toggleNav">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <ul class="nav__list">
      <li class="nav__item" v-for="item in listTypes" v-if="item.isCategory">
        <router-link
          class="nav__link"
          :to="{ name: 'home-category', params: { category: item.query } }"
        >
          <div class="nav__link-wrap">
            <svg class="nav__link-icon">
              <use :xlink:href="'#icon_' + item.query"></use>
            </svg>
            <span class="nav__link-title">{{ item.shortTitle }}</span>
          </div>
        </router-link>
      </li>
       <div class="login-status" v-if="!userLoggedIn">
           <ul class="list">
        <li class="nav__item">
        <router-link
          class="nav__link" :to="{name: 'profile'}" 
        >
          <div class="nav__link-wrap">
            <svg class="nav__link-icon">
              <use :xlink:href="'#iconLogin'"></use>
            </svg>
            <span class="nav__link-title">Log In</span>
          </div>
        </router-link>
      </li>
      <li class="nav__item">
        <router-link
          class="nav__link" :to="{name: 'profile'}" 
        >
          <div class="nav__link-wrap">
            <svg class="nav__link-icon">
              <use :xlink:href="'#iconLogin'"></use>
            </svg>
            <span class="nav__link-title">Register</span>
          </div>
        </router-link>
      </li>
           </ul>
       </div> 
       <div class="login-status" v-if="userLoggedIn">
       <ul class="list">
        <li class="nav__item">
        <router-link
          class="nav__link" :to="{name: 'profile'}" 
        >
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
    </ul>
  </nav>
</template>

<script>
import storage from "../storage.js";

export default {
  data() {
    return {
      listTypes: storage.listTypes,
      userLoggedIn: false
    };
  },
  methods: {
    toggleNav() {
      document
        .querySelector(".nav__hamburger")
        .classList.toggle("nav__hambuerger--active");
      document
        .querySelector(".nav__list")
        .classList.toggle("nav__list--active");
    },
  },
};
</script>


<style lang="scss">
@import "./src/scss/variables";
@import "./src/scss/media-queries";

.login-status{
    position: fixed;
    right: 0;
    top: 0;
    text-align: center;
    height: 84px;
    @include mobile_only{
        position: relative;
    }
    
}

.login-status .list{
    display: flex;
    padding: 0;
    list-style: none;

}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: $c-dark-blue;
  display: flex;
  z-index: 10;
  @include tablet-min {
    width: 100%;
    height: 75px;
  }
  &__logo {
    display: block;
    width: 55px;
    height: 50px;
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
      width: 50%;
    }
    @include tablet-min {
      &--right {
        position: fixed;
        right: 0;
        top: 0;
        width: 75px;
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