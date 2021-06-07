import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:7000'

export default{
    async execute(method, resource, body){
        let returnValue;
        try{
            returnValue = await axios({
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                url: resource,
                data: body,
                withCredentials: true
            });

            if(returnValue.status === 401){
                returnValue = undefined;
                await axios({
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    url: '/auth/refresh/token', 
                    data: {}, 
                    withCredentials: true
                })
            }
        }
        catch(error){
            if(error.response.status === 401){
                returnValue = undefined;
                await axios({
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    url: '/auth/refresh/token',
                    data: {},
                    withCredentials: true
                })
            }
            else{
                throw error;
            }
        }

        if(!returnValue){
            returnValue = await axios({
                method: method,
                headers:{
                    'Content-Type': 'application/json'
                },
                url: resource,
                data: body,
                withCredentials: true
            });
        }

        return returnValue;
    },
    async login(data){
        return this.execute('post', '/auth/login', data);
    },
    async register(data){
        return this.execute('post', '/auth/register', data);
    },
    async logout(){
        return this.execute('post', '/auth/logout', {});
    },
    async whoami(){
        return this.execute('get', '/auth/whoami', {});
    },
    async getTrendingMovies(page){
        return this.execute('get', '/movie/trending' + (page ? '?page=' + page : ''), {});
    },
    async getTopRatedMovies(page){
        return this.execute('get', '/movie/top_rated' + (page ? '?page=' + page : ''), {});
    },
    async getUpComingMovies(page){
        return this.execute('get', '/movie/upcoming' + (page ? '?page=' + page : ''), {});
    },
    async getNowPlayingMovies(page){
        return this.execute('get', '/movie/now_playing' + (page ? '?page=' + page : ''), {});
    },
    async searchMovies(query){
        return this.execute('get', '/movie/search' + "?query=" + query, {});
    },
    async addWatchlist(movieId){
        return this.execute('post', '/movie/' + movieId + '/addWatchlist', {});
    },
    async removeWatchlist(movieId){
        return this.execute('post', '/movie/' + movieId + '/removeWatchlist', {});
    },
    async getMovie(movieId){
        return this.execute('get', '/movie/' + movieId, {});
    },
    async sendReview(movieId, data){
        return this.execute('post', '/movie/' + movieId + '/review', data);
    },
    async likeReview(reviewId){
        return this.execute('post', '/movie/' + reviewId + '/like', {});
    },
    async getWatchlist(username){
        return this.execute('get', '/user/' + username + '/watchlist', {});
    }
}