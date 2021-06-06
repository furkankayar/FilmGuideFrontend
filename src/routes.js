import VueRouter from 'vue-router';


let routes = [
    {
        name: 'home',
        path: '/',
        components: {
            'list-router-view': require('./components/Home.vue')
        }
    },
    {
        name: 'home-category',
        path: '/movies/:category',
        components: {
            'list-router-view': require('./components/MoviesList.vue')
        }
    },
    {
        name: 'movie',
        path: '/movie/:id',
        components: {
            'page-router-view': require('./components/MoviePage.vue')
        }
    },
    {
        name: 'user',
        path: '/user/:username',
        components: {
            'page-router-view': require('./components/Profile.vue') 
        }
    },
    {
        name: 'profile',
        path: '/profile',
        components: {
            'page-router-view': require('./components/Profile.vue')
        }
    },
    {
        name: 'search',
        path: '/search/:query',
        components: {
          'page-router-view': require('./components/MoviesList.vue')
        }
      },
]

const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: 'is-active'
});

export default router;