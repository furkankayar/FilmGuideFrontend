<template>
  <div class="container" id="app">
    <navigation></navigation>

    <login-popup v-if="loginPopupIsVisible" @close="closeLoginPopup"></login-popup>

    <section class="main">
      <transition name="fade" @after-leave="afterLeave">
        <router-view name="list-router-view" :type="'page'" :mode="'collection'" :key="$route.params.category"></router-view>
      </transition>
    </section>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
import LoginPopup from './components/LoginPopup.vue';

export default {
  name: 'app',
  components: {
    Navigation, LoginPopup
  },
  data(){
    return {
      loginPopupIsVisible: false
    }
  },
  methods: {
    afterLeave(){
      document.querySelector('body').scrollTop = 0;
    },
    isTouchDevice(){
      return 'ontouchstart' in document.documentElement;
    },
    openLoginPopup(){
      this.loginPopupIsVisible = true;
      document.querySelector('body').classList.add('hidden');
    },
    closeLoginPopup(){
      this.loginPopupIsVisible = false;
      document.querySelector('body').classList.remove('hidden');
      window.history.back();
    }
  },
  created(){
    eventHub.$on('openLoginPopup', this.openLoginPopup);
    if(this.isTouchDevice()) {
      document.querySelector('body').classList.add('touch');
    }
  }
}
</script>

<style lang="scss">
@import "./src/scss/variables";
@import "./src/scss/media-queries";
*{
  box-sizing: border-box;
}
html, body{
  height: 100%;
}
body{
  font-family: sans-serif;
  line-height: 1.6;
  background: $c-dark-blue;
  color: $c-light;
  &.hidden{
    overflow: hidden;
  }
}
input, textarea, button{
  font-family: sans-serif;
}
figure{
  padding: 0;
  margin: 0;
}
img{
  display: block;
  max-width: 100%;
  height: auto;
}



.loader{
  animation: load 1s linear infinite;
  border: 2px solid $c-white;
  border-radius: 50%;
  display: block;
  height: 30px;
  left: 50%;
  margin: -1.5em;
  position: absolute;
  top: 50%;
  width: 30px;
  &:after {
    border: 5px solid $c-green;
    border-radius: 50%;
    content: '';
    left: 10px;
    position: absolute;
    top: 16px;
  }
}
@keyframes load {
  100% { transform: rotate(360deg); }
}
.wrapper{
  position: relative;
}

.main{
  position: relative;
  padding: 50px 0 0;
  @include tablet-min{
    width: 100%;
    padding: 75px 0 0;
    position: relative;
  }
}
.button{
  display: inline-block;
  border: 1px solid $c-dark;
  text-transform: uppercase;
  background: $c-dark;
  font-weight: 300;
  font-size: 11px;
  line-height: 2;
  letter-spacing: 0.5px;
  padding: 5px 20px 4px 20px;
  cursor: pointer;
  color: $c-dark;
  background: transparent;
  outline: none;
  transition: background 0.5s ease, color 0.5s ease;
  @include tablet-min{
    font-size: 12px;
    padding: 6px 20px 5px 20px;
  }
  body:not(.touch) &:hover{
    background: $c-dark;
    color: $c-white;
  }
}


// router view transition
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}
.fade-enter-active {
  transition-delay: 0.25s;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
