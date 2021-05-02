<template>
    <div class="login-popup">
        <div class="login-popup__box" @click.stop>
            <button class="login-popup__close" @click="$emit('close')"></button>
            <div class="login">
	<h1>Login</h1>
    <form method="post">
    	<input type="text" name="username" placeholder="Username" required="required" />
        <input type="password" name="password" placeholder="Password" required="required" />
        <button type="submit" class="btn btn-primary btn-block btn-large">Submit</button>
    </form>
</div>
        </div>
       
    </div>
</template>

<script>

export default {
    created(){
        window.addEventListener('keyup', function(e){
            if (e.keyCode == 27) {
                this.$emit('close');
            }
        }.bind(this));
    }
}
</script>

<style lang="scss">
@import "./src/scss/variables";
@import "./src/scss/media-queries";

.login-popup{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100vh;
  background: rgba($c-dark-blue, 0.92);
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  &__box{
    width: 100%;
    max-width: 768px;
    min-height: 500px;
    position: relative;
    display: flex;
    background-image: url('~assets/poster-wall.jpg');
    flex-direction: row;
    flex-wrap: wrap;
      border-radius: 20px;

    justify-content: center;
    align-items: center;
    z-index: 5;
    padding-bottom: 50px;
    @include tablet-min{
      padding-bottom: 0;
      margin: 40px auto;
    }
    @include mobile_only{
        top: calc((100vh - 500px) / 2);
        border-radius: 0;
    }
    &:before{
      content: "";
      position: absolute;
      @include tablet-min{
        border-radius: 20px;
      }
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba($c-dark-blue, 0.7);
    }
  }
  &__close{
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
    border-radius: 0 20px 0 0;
    @include mobile_only{
        border-radius: 0;
    }
    background: transparent;
    width: 40px;
    height: 40px;
    transition: background 0.5s ease;
    cursor: pointer;
    &:before,
    &:after{
      content: "";
      display: block;
      position: absolute;
      top: 19px;
      left: 10px;
      width: 20px;
      height: 2px;
      background: $c-white;
    }
    &:before{
      transform: rotate(45deg);
    }
    &:after{
      transform: rotate(-45deg);
    }
    &:hover{
      background: $c-yellow;
    }
  }
}



@import url(https://fonts.googleapis.com/css?family=Open+Sans);
.login .btn { display: inline-block; *display: inline; *zoom: 1; padding: 4px 10px 4px; margin-bottom: 0; font-size: 13px; line-height: 18px; color: #333333; text-align: center;text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75); vertical-align: middle; background-color: #f5f5f5; background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6); background-image: -ms-linear-gradient(top, #ffffff, #e6e6e6); background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6)); background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6); background-image: -o-linear-gradient(top, #ffffff, #e6e6e6); background-image: linear-gradient(top, #ffffff, #e6e6e6); background-repeat: repeat-x; filter: progid:dximagetransform.microsoft.gradient(startColorstr=#ffffff, endColorstr=#e6e6e6, GradientType=0); border-color: #e6e6e6 #e6e6e6 #e6e6e6; border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25); border: 1px solid #e6e6e6; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05); -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05); cursor: pointer; *margin-left: .3em; }
.login .btn:hover, .btn:active, .btn.active, .btn.disabled, .btn[disabled] { background-color: $c-yellow; }
.login .btn-large { padding: 9px 14px; font-size: 15px; line-height: normal; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; }
.login .btn:hover { color: #333333; text-decoration: none; background-color: #e6e6e6; background-position: 0 -15px; -webkit-transition: background-position 0.1s linear; -moz-transition: background-position 0.1s linear; -ms-transition: background-position 0.1s linear; -o-transition: background-position 0.1s linear; transition: background-position 0.1s linear; }
.login .btn-primary, .btn-primary:hover { text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25); color: #ffffff; }
.login .btn-primary.active { color: rgba(255, 255, 255, 0.75); }
.login .btn-primary { background-color: $c-yellow; background-image: -moz-linear-gradient(top, $c-yellow, $c-yellow); background-image: -ms-linear-gradient(top, $c-yellow, $c-yellow); background-image: -webkit-gradient(linear, 0 0, 0 100%, from($c-yellow), to($c-yellow)); background-image: -webkit-linear-gradient(top, $c-yellow, $c-yellow); background-image: -o-linear-gradient(top, $c-yellow, #4a77d4); background-image: linear-gradient(top, #6eb6de, #4a77d4); background-repeat: repeat-x; filter: progid:dximagetransform.microsoft.gradient(startColorstr=#6eb6de, endColorstr=#4a77d4, GradientType=0);  border: 1px solid $c-yellow; text-shadow: 1px 1px 1px rgba(0,0,0,0.4); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.5); }
.login .btn-primary:hover, .btn-primary:active, .btn-primary.active, .btn-primary.disabled, .btn-primary[disabled] { filter: none; background-color: $c-yellow; }
.login .btn-block { width: 100%; display:block; }

.login { 
    z-index: 1;
    padding: 30px;
    background: rgba($c-dark-blue, 0.85);
    border-radius: 20px;
    @include mobile_only{
        margin: 20px;
    }
}
.login h1 { color: #fff; text-shadow: 0 0 10px rgba(0,0,0,0.3); letter-spacing:1px; text-align:center; }

.login input { 
	width: 100%; 
	margin-bottom: 20px; 
	background: rgba($c-dark-blue,0.7);
	border: none;
	outline: none;
	padding: 10px;
	font-size: 13px;
	color: #fff;
	border-radius: 4px;
	box-shadow: inset 0 -5px 45px rgba(100,100,100,0.1), 0 1px 1px rgba(255,255,255,0.1);
	-webkit-transition: box-shadow .5s ease;
	-moz-transition: box-shadow .5s ease;
	-o-transition: box-shadow .5s ease;
	-ms-transition: box-shadow .5s ease;
	transition: box-shadow .5s ease;
}
.login input:focus { box-shadow: inset 0 -5px 45px rgba(100,100,100,0.4), 0 1px 1px rgba(255,255,255,0.2); }

</style>

