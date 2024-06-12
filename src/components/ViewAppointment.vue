<template>
    <div class="d-flex">
        <SideBar />
        <div class="content">
            <h1 class="mb-4">Appointment Details</h1>
            <router-link to="/appointments" class="btn btn-secondary mb-3">Back to Appointments</router-link>
            <hr>
            <div v-if="appointment">
                <p><strong>Doctor:</strong> {{ appointment.doctor.name }}</p>
                <p><strong>Patient:</strong> {{ appointment.patient.name }}</p>
                <p><strong>Date:</strong> {{ appointment.appointment_date }}</p>
                <p><strong>Status:</strong> {{ appointment.status }}</p>
                <button v-if="appointment.status !== 'canceled' && appointment.status !== 'completed' && user.user_type === 'doctor'" @click="markAsCompleted" class="btn btn-success">Mark as Complete</button>
                <button v-if="appointment.status !== 'canceled' && appointment.status !== 'completed' && user.user_type === 'doctor'" @click="markAsApproved" class="btn btn-primary">Approved</button>
                <button v-if="appointment.status !== 'canceled' && appointment.status !== 'approved' && appointment.status !== 'completed' && user.user_type === 'doctor'" @click="markAsCanceled" class="btn btn-danger">Cancel</button>
            </div>
            <div v-else>
                <p>Loading appointment details...</p>
            </div>
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
            appointment: null,
            user: JSON.parse(localStorage.getItem('user')) || {},

        };
    },
    created() {
        this.getAppointmentDetails();
    },
    methods: {
        async getAppointmentDetails() {
            const appointmentId = this.$route.params.id;
            try {
                const response = await axios.get(`/appointments/${appointmentId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                this.appointment = response.data;
            } catch (error) {
                console.error('Error fetching appointment details:', error);
            }
        },
        async markAsCompleted() {
            const appointmentId = this.$route.params.id;
            try {
                const response = await axios.put(`/appointments/${appointmentId}/status`, { status: 'completed' }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                this.appointment.status = response.data.status;
            } catch (error) {
                console.error('Error updating appointment status:', error);
            }
        },
        async markAsApproved() {
            const appointmentId = this.$route.params.id;
            try {
                const response = await axios.put(`/appointments/${appointmentId}/status`, { status: 'approved' }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                this.appointment.status = response.data.status;
            } catch (error) {
                console.error('Error updating appointment status:', error);
            }
        },
        async markAsCanceled() {
            const appointmentId = this.$route.params.id;
            try {
                const response = await axios.put(`/appointments/${appointmentId}/status`, { status: 'canceled' }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                this.appointment.status = response.data.status;
            } catch (error) {
                console.error('Error updating appointment status:', error);
            }
        }
    }
};
</script>

<style scoped>
.d-flex {
    display: flex;
}

.content {
    margin-left: 200px;
    padding: 20px;
    width: 100%;
}

.btn {
    margin-top: 20px;
}
</style>
