<!-- src/components/Register.vue -->
<template>
    <div class="register-container">
        <h2>Register</h2>
        <form @submit.prevent="register" class="register-form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" v-model="name" required>
            </div>
            <div class="form-group">
                <label for="birthdate">Birthdate</label>
                <input class="form-control" type="date" id="birthdate" v-model="birthdate" required>
            </div>
            <div class="form-group">
                <label for="address">Address</label>
                <input type="text" id="phone" v-model="phone" required>
            </div>
            <div class="form-group">
                <label for="phone">Phone</label>
                <input type="text" id="address" v-model="address" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <div class="form-group">
                <label for="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" v-model="password_confirmation" required>
            </div>
            <button type="submit" class="register-button">Register</button>
        </form>

        <p>Have an account? Click <router-link to="/">Login</router-link></p>
    </div>
</template>

<script>
import axios from '../axios';

export default {
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
                this.$router.push('/');
                
            } catch (error) {
                console.error('Error registering:', error);
            }
        }
    }
};
</script>

<style scoped>
.register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
}

h2 {
    text-align: center;
}

.register-form {
    margin-top: 20px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.register-button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.register-button:hover {
    background-color: #0056b3;
}
</style>
