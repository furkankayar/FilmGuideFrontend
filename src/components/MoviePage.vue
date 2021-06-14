<template>
  <div class="container info">
    <movie :id="id" :type="'page'"></movie>
  </div>
</template>

<script>
import Movie from './Movie.vue';
export default {
  name: 'MoviePage',
  components: { Movie },
  data(){
    return {
      id: 0
    }
  },
  methods: {
    init(){
      this.id = this.$route.params.id;
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
