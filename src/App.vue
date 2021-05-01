<template>
  <div id="app">
    <section class="main">
      <transition name="fade" @after-leave="afterLeave">
        <router-view name="list-router-view" :type="'page'" :mode="'collection'" :key="$route.params.category"></router-view>
      </transition>
    </section>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  methods: {
    afterLeave(){
      document.querySelector('body').scrollTop = 0;
    },
    isTouchDevice(){
      return 'ontouchstart' in document.documentElement;
    }
  },
  created(){
    if(this.isTouchDevice()) {
      document.querySelector('body').classList.add('touch');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
