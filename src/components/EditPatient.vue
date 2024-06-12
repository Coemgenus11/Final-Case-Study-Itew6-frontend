<!-- src/components/EditPatient.vue -->
<template>
    <SideBar />
    <div class="content">
      <h1 class="mb-4">Edit Patient</h1>
      <form @submit.prevent="updatePatient">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" v-model="patient.name" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="patient.email" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="address">Address</label>
          <input type="text" v-model="patient.address" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="phone">Phone</label>
          <input type="text" v-model="patient.phone" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="birthdate">Birthdate</label>
          <input type="date" v-model="patient.birthdate" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Update Patient</button>
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
        patient: {
          name: '',
          email: '',
          address: '',
          phone: '',
          birthdate: ''
        }
      };
    },
    created() {
      this.getPatientDetails();
    },
    methods: {
      async getPatientDetails() {
        const patientId = this.$route.params.id;
        try {
          const response = await axios.get(`/patients/${patientId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
            }
          });
          this.patient = response.data;
        } catch (error) {
          console.error('Error fetching patient details:', error);
        }
      },
      async updatePatient() {
        const patientId = this.$route.params.id;
        try {
          const response = await axios.put(`/patients/${patientId}`, this.patient, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
            }
          });
          console.log('Patient updated successfully:', response.data);
          alert('Successfully Update!');
          this.$router.push('/patients');
        } catch (error) {
          if (error.response && error.response.status === 422) {
            console.error('Validation error:', error.response.data);
          } else {
            console.error('Error updating patient:', error);
          }
        }
      }
    }
  };
  </script>