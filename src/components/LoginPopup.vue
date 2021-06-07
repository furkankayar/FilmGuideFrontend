<template>
    <div class="login-popup">
        <div class="login-popup__box" @click.stop>
            <button class="login-popup__close" @click="$emit('close')"></button>
  <div class="form">
	<h1>Login</h1>
    <label v-if="showError" class="alert alert__error" >{{errorLabelText}}</label>
    <form method="post">
    	<input v-model="loginForm.username" type="text" name="username" placeholder="Username" required="required" />
        <input v-model="loginForm.password" type="password" name="password" placeholder="Password" required="required" />
        <button  type="submit" @click="loginButtonPressed" class="btn btn-primary btn-block btn-large">Submit</button>
    </form>
</div>
        </div>
       
    </div>
</template>

<script>
import api from '../api.js';

export default {
    data() {
      return {
        loginForm: {
          username: "",
          password: ""
        },
        showError: false,
        errorLabelText: ""
      }
    },
    created(){
        window.addEventListener('keyup', function(e){
            if (e.keyCode == 27) {
                this.$emit('close');
            }
        }.bind(this));
    }, 
    methods: {
      async loginButtonPressed(e) {
        e.preventDefault();

        this.loginForm.username = this.loginForm.username.trim();
        this.loginForm.password = this.loginForm.password.trim();

        if(this.loginForm.username === ""){
          this.showError = true;
          this.errorLabelText = "Missing username!";
          return;
        } else if (this.loginForm.password === ""){
          this.showError = true;
          this.errorLabelText = "Missing password!";
          return;
        } else {
          this.showError = false; 
        }

        try{
          let response = await api.login(this.loginForm);
          if(response.status === 200){
            eventHub.$emit('setUserStatus');
            eventHub.$emit('closeLoginPopup');
            window.location = "/";
          } else {
            this.showError = true;
            this.errorLabelText = "An error occurred!";
          }
        }
        catch(error){
          if(error.response){
            this.showError = true;
            this.errorLabelText = error.response.data.messages[0];
          } else {
            this.showError = true;
            this.errorLabelText = "An error occurred!";
          }
        }
      }
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
    min-height: calc(100% - 100px);
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
      margin: 50px auto;
    }
    @include mobile_only{
        top: 50px;
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
    border-radius: 0 20px 0 20px;

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
      background-color: $c-yellow;
    }
  }
}


</style>

