<template>
    <li class="review">
        <div class="review__container">
            <div class="review__header">
                <div class="review__titlebody">
                    <span class="review__rate">
                        <span class="fa fa-star review__rate-star" v-for="item in 10" :key="item" :class="{ checked: isStarColored(item) }" ></span>
                    </span>
                    <span class="review__title">
                        {{ title }}
                    </span>
                </div>
                <div>
                    <span class="review__date">
                        {{ date }}
                    </span>
                    <span style="font-size: 12px;">
                         | by
                    </span>
                    <span class="review__reviewer">
                        <router-link :to="{name: 'user', params: {id: id}}">
                            {{ user }}
                        </router-link>
                    </span>
                </div>
                
            </div>
            <div class="review__content">
                {{ review }}
            </div>
        </div>
    </li>
</template>

<script>

export default{
    data(){
        return{
            id: 223,
            rate: 7,
            title: "Still trying to absorb what I've seen",
            review: "Going into this movie I had one wish: To leave feeling that it was a successful conclusion to a two-part film. Taking Reloaded/Revolutions as a single (very large) movie with an intermission is the best way to evaluate it. Viewed that way I think it succeeded. I thought Revolutions was the equal of Reloaded, yet I can see how many will think it failed. The ending gave us everything we needed to know, but did not show us all we wanted to see. I'm speaking of the last twenty minutes or so here. After a visually robust middle, in which I felt my eyes grow larger in their sockets more than once, the ending seemed like an anticlimax. It needed to be longer, and I would gladly have traded some of the fx flair used earlier to give the final part of the film it's justified due. It will be awhile before",
            user: "furkankayar",
            date: "12.02.2021"
        }
    },
    methods:{
        isStarColored(key){
            return key <= this.rate
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
}

.checked {
  color:$c-yellow;
}

</style>