<template>
    <li class="review">
        <div class="review__container">
            <div class="review__header">
                <div class="review__titlebody">
                    <span class="review__rate">
                        <span class="fa fa-star review__rate-star" v-for="item in 10" :key="item" :class="{ checked: isStarColored(item) }" ></span>
                    </span>
                    <span class="review__title">
                        {{ review.title }}
                    </span>
                    <div class="review__likesection">
                        <span class="fa fa-heart review__like" :class="{ checked: review.liked }" @click="likeComment()"></span>
                        <span class="review__likecount"> {{ review.likeCount }}</span>
                    </div>
                </div>
                <div>
                    <span class="review__date">
                        {{ review.date }}
                    </span>
                    <span style="font-size: 12px;">
                         | by
                    </span>
                    <span class="review__reviewer">
                        <router-link :to="{name: 'user', params: {username: review.user.username}}">
                            {{ review.user.username }}
                        </router-link>
                    </span>
                </div>
                
            </div>
            <div class="review__content">
                {{ review.content }}
            </div>
        </div>
        <hr class="separator" style="margin:20px 0px;"/>
    </li>
</template>

<script>

import api from '../api'

export default{
    props: ['reviewProp'],
    data(){
        return{
            review: {}
        }
    },
    beforeMount(){
        this.review = this.reviewProp;
    },
    methods:{
        isStarColored(key){
            return key <= this.review.rating
        },
        likeComment(){
            api.likeReview(this.review.id)
            .then(response => {
                if(response.status === 200){
                    this.review = response.data.review;
                }
            })
        }
    }
}
</script>

<style lang="scss">
@import "./src/scss/variables";
@import "./src/scss/media-queries";

.review {
    list-style-type: none;
    &__titlebody{
        display: flex;
       line-height: 16px;
    }
    &__title{
        margin-left: 10px;
        font-weight: 600;
        font-size: 14px;
    }
    &__date{
        font-size: 12px;
    }
    &__content{
        margin-top: 10px;
        font-size: 14px;
    }
    &__reviewer{
        font-weight: 500;
        font-size: 12px;
        a{
            color: $c-yellow;
            text-decoration: none;
        }
    }
    &__rate{
        &-star{
            font-size: 14px;
        }
    }
    &__likesection{
        margin-left: auto;
    }
    &__like{
        transition: 0.3s;
        cursor: pointer;
        font-size: 14px;
    }
    &__likecount{
        font-size: 14px;
    }
}

.checked {
  color:$c-yellow;
}

</style>