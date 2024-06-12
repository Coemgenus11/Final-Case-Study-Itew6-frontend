<!-- src/components/UserDashboard.vue -->
<template>
    
        <SideBar />
        <div class="content" v-if="user.user_type === 'admin'">
            <h1>{{ user.user_type }} Dashboard</h1>
            <p>Welcome, {{ data.name }}</p>
        </div>
        
        <div class="content" v-if="user.user_type === 'patient'">
            <h1>{{ user.user_type }} Dashboard</h1>
            <p>Welcome, {{ data.name }}</p>
        </div>

        <div class="content" v-if="user.user_type === 'doctor'">
            <h1>{{ user.user_type }} Dashboard</h1>
            <p>Welcome, {{ data.name }}</p>
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
            user: JSON.parse(localStorage.getItem('user')) || {},
            data: JSON.parse(localStorage.getItem('data')) || {},
        };
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        async getUserInfo() {
            try {
                const response = await axios.get('/user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                this.user = response.data;
                localStorage.setItem('user', JSON.stringify(this.user));
            } catch (error) {
                console.error('Error fetching user info:', error);
                // Redirect to login if not authenticated
                this.$router.push('/');
            }
        }
    }
};
</script>

<style scoped>
.dashboard-container {
    display: flex;
}

.content {
    margin-left: 220px; /* Adjust this based on the sidebar width */
    padding: 20px;
    width: calc(100% - 220px); /* Adjust this based on the sidebar width */
}
</style>
