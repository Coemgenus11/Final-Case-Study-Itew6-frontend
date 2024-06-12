<!-- src/components/RegisterDoctor.vue -->
<template>
    <SideBar />
   <div class="content">
       <h2 class="mb-4">Register Patient</h2>
       <form @submit.prevent="register" class="register-form">
           <div class="form-group">
               <label for="name">Name</label>
               <input type="text" class="form-control" id="name" v-model="name" required>
           </div>
           <div class="form-group">
               <label for="birthdate">Birthdate</label>
               <input type="date" class="form-control" id="birthdate" v-model="birthdate" required>
           </div>
           <div class="form-group">
               <label for="address">Address</label>
               <input type="text" class="form-control" id="address" v-model="address" required>
           </div>
           <div class="form-group">
               <label for="phone">Phone</label>
               <input type="text" class="form-control" id="phone" v-model="phone" required>
           </div>
           <div class="form-group">
               <label for="email">Email</label>
               <input type="email" class="form-control" id="email" v-model="email" required>
           </div>
           <div class="form-group">
               <label for="password">Password</label>
               <input type="password" class="form-control" id="password" v-model="password" required>
           </div>
           <div class="form-group">
               <label for="confirm-password">Confirm Password</label>
               <input type="password" class="form-control" id="confirm-password" v-model="password_confirmation" required>
           </div>
           <button type="submit" class="btn btn-primary">Register Patient</button>
           <router-link to="/patients" class="btn btn-danger">Cancel</router-link>
       </form>
   </div>

</template>

<script>
import axios from '../axios';
import SideBar from './SideBar.vue';

export default {
    components: {
        SideBar
    },
    data() {
        return {
            name: '',
            birthdate: '',
            address: '',
            phone: '',
            email: '',
            password: '',
            password_confirmation: ''
        };
    },
    methods: {
        async register() {
            try {
                await axios.post('/register', {
                    name: this.name,
                    birthdate: this.birthdate,
                    address: this.address,
                    phone: this.phone,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,

                    user_type: 'patient'
                });
                alert('Registration successful!');
                this.$router.push('/patients');
                
            } catch (error) {
                console.error('Error registering:', error);
            }
        }
    }
};
</script>

<style scoped>
/* Add your styles here */
</style>
