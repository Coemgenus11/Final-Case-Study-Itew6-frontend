<template>
    <div class="d-flex">
        <SideBar />
        <div class="content">
            <h1 class="mb-4">Doctors</h1>
            <div v-if="user.user_type === 'admin'" class="mb-3">
                <router-link to="/register-doctor" class="btn btn-primary">Register New Doctor</router-link>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Address</th>
                        <th scope="col">Birthdate</th>
                        <th scope="col">Actions</th> <!-- New column for actions -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="doctor in doctors" :key="doctor.id">
                        <td>{{ doctor.name }}</td>
                        <td>{{ doctor.email }}</td>
                        <td>{{ doctor.phone }}</td>
                        <td>{{ doctor.address }}</td>
                        <td>{{ doctor.birthdate }}</td>
                        <td>
                            <router-link :to="'/doctor/' + doctor.id" class="btn btn-info btn-sm">Update</router-link> <!-- Button to view details -->
                            <button @click="deleteDoctor(doctor.id)" class="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
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
            doctors: [],
            user: JSON.parse(localStorage.getItem('user')) || {},
        };
    },
    created() {
        this.fetchDoctors();
    },
    methods: {
        async fetchDoctors() {
            try {
                const response = await axios.get('/doctors', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                this.doctors = response.data;
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        },
        async deleteDoctor(id) {
            if (confirm('Are you sure you want to delete this doctor?')) {
                try {
                    await axios.delete(`/doctors/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                        }
                    });
                    this.doctors = this.doctors.filter(doctor => doctor.id !== id);
                } catch (error) {
                    console.error('Error deleting doctor:', error);
                }
            }
        }
    }
};
</script>
