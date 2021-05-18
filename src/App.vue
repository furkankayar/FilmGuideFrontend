<template>
  <div class="container" id="app">
    <navigation></navigation>

    <login-popup v-if="loginPopupIsVisible" @close="closeLoginPopup"></login-popup>
    <register-popup v-if="registerPopupIsVisible" @close="closeRegisterPopup"></register-popup>

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
import RegisterPopup from './components/RegisterPopup.vue';

export default {
  name: 'app',
  components: {
    Navigation, 
    LoginPopup,
    RegisterPopup
  },
  data(){
    return {
      loginPopupIsVisible: false,
      registerPopupIsVisible: false,
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
    },
    openRegisterPopup(){
      this.registerPopupIsVisible = true;
      document.querySelector('body').classList.add('hidden');
    },
    closeRegisterPopup(){
      this.registerPopupIsVisible = false;
      document.querySelector('body').classList.remove('hidden');
      window.history.back();
    }
  },
  created(){
    eventHub.$on('openLoginPopup', this.openLoginPopup);
    eventHub.$on('openRegisterPopup', this.openRegisterPopup);
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


.form .btn { display: inline-block; *display: inline; *zoom: 1; padding: 4px 10px 4px; margin-bottom: 0; font-size: 13px; font-weight: 600; line-height: 18px; color: $c-dark; text-align: center;vertical-align: middle; cursor: pointer; *margin-left: .3em; border: none; transition: 0.3s; }
.form .btn:hover, .btn:active, .btn.active, .btn.disabled, .btn[disabled] { background-color: $c-yellow; }
.form .btn-large { padding: 9px 14px; font-size: 15px; line-height: normal; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; }
.form .btn-primary { background-color: $c-yellow; transition: 0.3s; }
.form .btn-primary:hover, .btn-primary.disabled, .btn-primary[disabled] { background-color: $c-dark-yellow; }
.form .btn-primary:active, .btn-primary.active { background-color: $c-dark-blue; color: $c-light; }
.form .btn-block { width: 100%; display:block; }

.form { 
    z-index: 1;
    max-width: 400px;
    padding: 30px;
    background: rgba($c-dark-blue, 0.85);
    border-radius: 20px;
    @include mobile_only{
        margin: 20px;
    }
}

.form h1 { color: $c-light; letter-spacing:1px; text-align:center; }

.form input { 
	width: 100%; 
	margin-bottom: 20px; 
	background: rgba($c-dark-blue,0.7);
	border: none;
	outline: none;
	padding: 10px;
	font-size: 13px;
	color: $c-light;
	border-radius: 4px;
	box-shadow: inset 0 0 0 rgba(100,100,100,0), 0 1px 0px rgba(255,255,255,0.4);
	-webkit-transition: box-shadow .3s ease-in;
	-moz-transition: box-shadow .3s ease-in;
	-o-transition: box-shadow .3s ease-in;
	-ms-transition: box-shadow .3s ease-in;
	transition: box-shadow .3s ease-in;
}
.form input:focus { box-shadow: inset 0 0 0 rgba(100,100,100,0.7), 0 1px 0px $c-yellow; }



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
