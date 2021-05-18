<template>
    <div class="register-popup">
        <div class="register-popup__box" @click.stop>
            <button class="register-popup__close" @click="$emit('close')"></button>
            <div class="form">
	<h1>Register</h1>
    <label v-if="showError" class="alert alert__error" >{{errorLabelText}}</label>
    <label v-if="showSuccess" class="alert alert__success" >{{successLabelText}}</label>

    <form method="post">
    	<input type="text" v-model="registerForm.username" name="username" placeholder="Username" required="required" />
        <input type="email" v-model="registerForm.email" name="email" placeholder="Email" required="required" />
        <input type="text" v-model="registerForm.firstName" name="firstName" placeholder="First Name" required="required" />
        <input type="text" v-model="registerForm.lastName" name="lastName" placeholder="Last Name" required="required" />
        <input type="password" v-model="registerForm.password" name="password" placeholder="Password" required="required" />
        <button type="submit" class="btn btn-primary btn-block btn-large" @click="registerButtonClicked" >Submit</button>
    </form>
</div>
        </div>
       
    </div>
</template>

<script>
import api from '../api.js';

export default {
    data(){
        return {
            registerForm: {
                username: "",
                email: "", 
                firstName: "",
                lastName: "",
                password: ""
            },
            showError: false,
            errorLabelText: "",
            showSuccess: false,
            successLabelText: ""
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
        async registerButtonClicked(e){
            e.preventDefault();

            this.registerForm = {
                username: this.registerForm.username.trim(),
                email: this.registerForm.email.trim(),
                firstName: this.registerForm.firstName.trim(),
                lastName: this.registerForm.lastName.trim(),
                password: this.registerForm.password.trim()
            };
            
            this.showError = false;
            this.showSuccess = false;

            try{
                let response = await api.register(this.registerForm);
                if(response.status === 200){
                    this.successLabelText = response.data.message;
                    this.showSuccess = true;
                    this.registerForm = {
                        username: "",
                        email: "",
                        firstName: "",
                        lastName: "",
                        password: ""
                    }
                } else {
                    this.errorLabelText = "An error occurred!";
                    this.showError = true;
                }
            }
            catch(error){
                if(error.response){
                    let errors = "";
                    error.response.data.messages.forEach(function (val, index) {
                        errors += val + "\n";
                    });
                    this.errorLabelText = errors;
                    this.showError = true;
                } else {
                    this.errorLabelText = "An error occurred!";
                    this.showError = true;
                }
            }
        }
    }
}
</script>

<style lang="scss">
@import "./src/scss/variables";
@import "./src/scss/media-queries";

.register-popup{
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
    height: calc(100% - 100px);
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
      background: $c-yellow;
    }
  }
}


</style>

