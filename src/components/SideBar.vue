<template>
    <div :class="{ 'sidebar': !isCollapsed, 'collapsed-sidebar': isCollapsed }">
      <div class="sidebar-header">
        <button @click="toggleCollapse" class="toggle-btn">&#9776;</button>
      </div>
      <ul class="nav-list">
        <li class="nav-item"><router-link to="/dashboard">Dashboard</router-link></li>
       
       
        
        <li class="nav-item" v-if="user.user_type === 'admin'"><router-link to="/doctors">View Doctors</router-link></li>
        <li class="nav-item" v-if="user.user_type === 'doctor' || user.user_type === 'admin'"><router-link to="/patients">View Patients</router-link></li>
        <li class="nav-item"><router-link to="/medical-records"  v-if="user.user_type === 'admin'">Medical Records</router-link></li>
        <li class="nav-item"><router-link :to="'/patient-medical-records/' + user.id"  v-if="user.user_type === 'patient'">My Medical Records</router-link></li>
        <li><router-link to="/appointments" v-if="user.user_type !== 'admin'">My Appointments</router-link></li>
        <li><router-link to="/appointments" v-if="user.user_type === 'admin'">View Appointments</router-link></li>
        <li class="nav-item out"><router-link to="/" @click="logout">Logout</router-link></li>
      </ul>
      <router-view />
    </div>
  </template>
  
  <script>
  import axios from '../axios';
  
  export default {
    name: 'SideBar',
    data() {
      return {
        isCollapsed: false,
        user: JSON.parse(localStorage.getItem('user')) || {},
      };
    },
    methods: {
        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;
        },
        async logout() {
            try {
                await axios.post('/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                }
                });
                localStorage.removeItem('auth-token');
                localStorage.removeItem('user');
                localStorage.removeItem('data');
                
                // Redirect to login page
                window.location.reload();
                
                // Fetch user data again after logout
                
            } catch (error) {
                console.error('Error logging out:', error);
            }
        }

    }
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 200px;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #f8f9fa;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }
  
  .collapsed-sidebar {
    width: 50px; /* collapsed width */
  }
  
  .sidebar-header {
    text-align: right;
  }
  
  .toggle-btn {
    background-color: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  
  .nav-list {
    list-style: none;
    padding: 0;
  }
  
  .nav-item {
    margin-bottom: 10px;
  }
  
  .nav-item a {
    text-decoration: none;
    color: #333;
    display: block;
    padding: 10px;
    border-radius: 5px;
    transition: background 0.3s;
  }
  
  .nav-item a:hover {
    background-color: #ddd;
  }
  
  .nav-item .active {
    background-color: #007bff;
    color: #fff;
  }
  .out{
    position: absolute; 
    bottom: 20px; 
  }
  </style>
  