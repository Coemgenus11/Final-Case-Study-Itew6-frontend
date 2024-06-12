<template>
    <div class="d-flex">
        <SideBar />
        <div class="content">
            <h1 class="mb-4">Patients</h1>
            <div v-if="user.user_type === 'admin'" class="mb-3">
                <router-link to="/register-patient" class="btn btn-primary">Register New Patient</router-link>
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
                    <tr v-for="patient in patients" :key="patient.id">
                        <td>{{ patient.name }}</td>
                        <td>{{ patient.email }}</td>
                        <td>{{ patient.phone }}</td>
                        <td>{{ patient.address }}</td>
                        <td>{{ patient.user_id }}</td>
                        <td>
                            <router-link :to="'/patient/' + patient.id" class="btn btn-info btn-sm">Update</router-link> <!-- Button to view details -->
                            <router-link :to="'/make-med-rec/' + patient.user_id" v-if="user.user_type === 'doctor'" class="btn btn-primary btn-sm">Create Medical Record</router-link> <!-- New button to create medical record -->
                            <router-link :to="'/patient-medical-records/' + patient.user_id" class="btn btn-secondary btn-sm">View Medical Records</router-link> <!-- New button to view medical records -->
                            <button v-if="user.user_type === 'admin'" @click="deletePatient(patient.id)" class="btn btn-danger btn-sm">Delete</button>
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
            patients: [],
            user: JSON.parse(localStorage.getItem('user')) || {},
        };
    },
    created() {
        this.fetchPatients();
    },
    methods: {
        async fetchPatients() {
            try {
                const response = await axios.get('/patients', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                this.patients = response.data;
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        },
        
        async deletePatient(id) {
            if (confirm('Are you sure you want to delete this patient?')) {
                try {
                    await axios.delete(`/patients/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                        }
                    });
                    this.patients = this.patients.filter(patient => patient.id !== id);
                } catch (error) {
                    console.error('Error deleting patient:', error);
                }
            }
        }
    }
};
</script>
