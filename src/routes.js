import VueRouter from 'vue-router';


let routes = [
    {
        name: 'home',
        path: '/',
        components: {
            'list-router-view': require('./components/Home.vue')
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: 'is-active'
});

export default router;