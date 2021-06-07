import VueRouter from 'vue-router';
import api from './api'; 

let routes = [
    {
        name: 'home',
        path: '/',
        components: {
            'list-router-view': require('./components/Home.vue')
        },
        beforeEnter: (to, from, next) => {
            api.whoami()
            .then(response => {
                if(response.status === 200){
                    to.params.showButton = true;
                    next();
                }
                else{
                    to.params.showButton = false;
                    next();
                }
            })
            .catch(error => {
                to.params.showButton = false;
                next();
            });
        }
    },
    {
        name: 'home-category',
        path: '/movies/:category',
        components: {
            'list-router-view': require('./components/MoviesList.vue')
        },
        beforeEnter: (to, from, next) => {
            api.whoami()
            .then(response => {
                if(response.status === 200){
                    to.params.showButton = true;
                    next();
                }
                else{
                    to.params.showButton = false;
                    next();
                }
            })
            .catch(error => {
                to.params.showButton = false;
                next();
            });
        }
    },
    {
        name: 'movie',
        path: '/movie/:id',
        components: {
            'page-router-view': require('./components/MoviePage.vue')
        },
        beforeEnter: (to, from, next) => {
            api.getMovie(to.params.id)
            .then(response =>{
                if(response.status === 200){
                    to.params.movie = response.data;
                    next();
                }
            })
            .catch(error => {
                if(error.response.status === 403){
                    eventHub.$emit("openLoginPopup");
                }
            })
        }
    },
    {
        name: 'user',
        path: '/user/:username',
        components: {
            'page-router-view': require('./components/Profile.vue') 
        },
        beforeEnter: (to, from, next) => {
            api.getWatchlist(to.params.username)
            .then(response => {
                if(response.status === 200){
                    to.params.watchlist = response.data;
                    next();
                }
            })
            .catch(error => {
                if(error.response.status === 403){
                    next("/");
                }
            })
        }
    },
    {
        name: 'profile',
        path: '/profile',
        components: {
            'page-router-view': require('./components/Profile.vue')
        },
        beforeEnter: (to, from, next) => {
            api.getWatchlist(localStorage.getItem("username"))
            .then(response => {
                if(response.status === 200){
                    to.params.watchlist = response.data;
                    next();
                }
            })
            .catch(error => {
                if(error.response.status === 403){
                    next("/");
                }
            })
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