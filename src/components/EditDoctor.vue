<!-- src/components/EditDoctor.vue -->
<template>
    <SideBar />
    <div class="content">
      <h1 class="mb-4">Edit Doctor</h1>
      <form @submit.prevent="updateDoctor">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" v-model="doctor.name" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="doctor.email" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="address">Address</label>
          <input type="text" v-model="doctor.address" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="phone">Phone</label>
          <input type="text" v-model="doctor.phone" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="birthdate">Birthdate</label>
          <input type="date" v-model="doctor.birthdate" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Update Doctor</button>
        <router-link  to="/doctors" class="btn btn-danger" v-if="user.user_type === 'admin'">Cancel</router-link>


        <router-link :to="'/profile/' + data.doctor_id" class="btn btn-danger" v-if="user.user_type === 'doctor'">Cancel</router-link>
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
        doctor: {
          name: '',
          email: '',
          address: '',
          phone: '',
          birthdate: ''
        },
         user: JSON.parse(localStorage.getItem('user')) || {},
         data: JSON.parse(localStorage.getItem('data')) || {},
      };
    },
    created() {
      this.getDoctorDetails();
    },
    methods: {
      async getDoctorDetails() {
        const doctorId = this.$route.params.id;
        try {
          const response = await axios.get(`/doctors/${doctorId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
            }
          });
          this.doctor = response.data;
        } catch (error) {
          console.error('Error fetching doctor details:', error);
        }
      },
      async updateDoctor() {
        const doctorId = this.$route.params.id;
        try {
          const response = await axios.put(`/doctors/${doctorId}`, this.doctor, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
            }
          });
          console.log('Doctor updated successfully:', response.data);
          alert('Successfully Update!');
          if (this.user.user_type === 'admin') {
            this.$router.push('/');
          }
          else {
            this.$router.push('/profile/' + this.data.doctor_id);
          }

         
        } catch (error) {
          if (error.response && error.response.status === 422) {
            console.error('Validation error:', error.response.data);
          } else {
            console.error('Error updating doctor:', error);
          }
        }
      }
    }
  };
  </script>