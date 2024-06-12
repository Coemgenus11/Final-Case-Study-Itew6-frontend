<!-- src/components/ViewProfile.vue -->
<template>
    <SideBar />
    <div class="content" v-if="data.user_type === 'doctor'">
        <h1 class="mb-4">Doctor Profile</h1>
        <div v-if="doctor">
            <p><strong>Name:</strong> {{ doctor.name }}</p>
            <p><strong>Email:</strong> {{ doctor.email }}</p>
            <p><strong>Specialization:</strong> {{ doctor.address }}</p>
            <p><strong>Phone:</strong> {{ doctor.phone }}</p>
            <p><strong>Birthdate:</strong> {{ doctor.birthdate }}</p>
            <router-link :to="'/doctor/' + data.doctor_id" class="btn btn-secondary">Update</router-link>
        </div>
    </div>

    <div class="content" v-if="data.user_type === 'patient'">
        <h1 class="mb-4">Patient Profile</h1>
        <div v-if="patient">
            <p><strong>Name:</strong> {{ patient.name }}</p>
            <p><strong>Email:</strong> {{ patient.email }}</p>
            <p><strong>Specialization:</strong> {{ patient.address }}</p>
            <p><strong>Phone:</strong> {{ patient.phone }}</p>
            <p><strong>Birthdate:</strong> {{ patient.birthdate }}</p>
            <!-- <router-link :to="'/doctor/' + data.patient_id" class="btn btn-secondary">Update</router-link> -->
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
            doctor: null,
            patient: null,
            data: JSON.parse(localStorage.getItem('data')) || {},
        };
    },
    created() {
        this.getDoctorProfile();
        this.getPatientProfile();
    },
    methods: {
        async getDoctorProfile() {
            const doctorId = this.$route.params.id;
            try {
                const response = await axios.get(`/doctors/${doctorId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                this.doctor = response.data;
            } catch (error) {
                console.error('Error fetching doctor profile:', error);
            }
        },
        async getPatientProfile() {
            const patientId = this.$route.params.id;
            try {
                const response = await axios.get(`/patients/${patientId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                this.patient = response.data;
            } catch (error) {
                console.error('Error fetching patient profile:', error);
            }
        }
    }
};
</script>
