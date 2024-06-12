<template>
    <nav class="navbar">
        <div class="centered-label" v-if="isLoggedIn">
            <label class="nav-item">HOSPITAL MANAGEMENT SYSTEM</label>
        </div>
        <ul class="nav-list">
          
            <li class="nav-item profile-link" v-if="isLoggedIn && user.user_type !== 'admin'">
                <router-link :to="'/profile/' + data.doctor_id" v-if="user.user_type === 'doctor'">View Profile</router-link>
                <router-link :to="'/profile/' + data.patient_id" v-if="user.user_type === 'patient'">View Profile</router-link>
            </li>
        </ul>
    </nav>
    <br>
</template>

<script>
import axios from '../axios';
export default {
    name: 'NavBar',
    data() {
        return {
            isLoggedIn: false,
            user: JSON.parse(localStorage.getItem('user')) || {},
            data: JSON.parse(localStorage.getItem('data')) || {},
        };
    },
    created() {
        this.checkLoginStatus();
    },
    methods: {
        async logout() {
            try {
                await axios.post('/logout', {}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                localStorage.removeItem('auth-token');
                localStorage.removeItem('user');
                this.isLoggedIn = false;
                this.$router.push('/login');
            } catch (error) {
                console.error('Error logging out:', error);
            }
        },
        checkLoginStatus() {
            this.isLoggedIn = !!localStorage.getItem('auth-token');
        }
    },
    watch: {
        '$route'() {
            this.checkLoginStatus();
        }
    }
};
</script>

<style scoped>
.navbar {
    background-color: #333;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
}

.nav-item {
    margin-right: 20px;
}

.nav-item a {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    transition: color 0.3s ease;
}

.nav-item a:hover {
    color: #00c3ff;
}

.centered-label {
    margin-left: 190px;
    color: aliceblue;
    font-weight: bolder;
}

.profile-link {
    margin-left: auto;
}
</style>
