<!-- src/components/AppointmentRecord.vue -->
<template>
    <div class="d-flex">
        <SideBar />

        <div class="content"  v-if="user.user_type === 'admin'">
            <h1 class="mb-4">View Appointments</h1>
            
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Patient </th>
                        <th scope="col">Doctor</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="appointment in appointments" :key="appointment.id" >
                        <td>{{ appointment.patient.name }}</td>
                        <td>{{ appointment.doctor.name }}</td>
                        <td>{{ appointment.appointment_date }}</td>
                        <td>{{ appointment.status }}</td>
                        <td>
                            <router-link :to="'/appointment/' + appointment.id" class="btn btn-info btn-sm">View</router-link>
                            <!-- <button @click="cancelAppointment(appointment.id)" class="btn btn-danger btn-sm">Cancel</button> -->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="content"  v-if="user.user_type === 'patient'">
            <h1 class="mb-4">My Appointments</h1>
            <router-link to="/book-appointment" class="btn btn-primary mb-3">Book New Appointment</router-link>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Patient</th>
                        <th scope="col">Doctor</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="appointment in filteredAppointments" :key="appointment.id">
                        <td>{{ appointment.patient.name }}</td>
                        <td>{{ appointment.doctor.name }}</td>
                        <td>{{ appointment.appointment_date }}</td>
                        <td>{{ appointment.status }}</td>
                        <td>
                            <router-link :to="'/appointment/' + appointment.id" class="btn btn-info btn-sm">View</router-link>
                            <button @click="cancelAppointment(appointment.id)" class="btn btn-danger btn-sm">Cancel</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="content"  v-if="user.user_type === 'doctor'">
            <h1 class="mb-4">My Appointments</h1>
            <!-- <router-link to="/book-appointment" class="btn btn-primary mb-3">Book New Appointment</router-link> -->
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Patient</th>
                        <th scope="col">Doctor</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="appointment in filteredDoctorAppointments" :key="appointment.id">
                        <td>{{ appointment.patient.name }}</td>
                        <td>{{ appointment.doctor.name }}</td>
                        <td>{{ appointment.appointment_date }}</td>
                        <td>{{ appointment.status }}</td>
                        <td>
                            <router-link :to="'/appointment/' + appointment.id" class="btn btn-info btn-sm">View</router-link>
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
            appointments: [],
            user: JSON.parse(localStorage.getItem('user')) || {},
        };
    },
    created() {
        this.fetchAppointments();
    },
    methods: {
        async fetchAppointments() {
            try {
                const response = await axios.get('/appointments', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                this.appointments = response.data;
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        },
        async cancelAppointment(id) {
            if (confirm('Are you sure you want to cancel this appointment?')) {
                try {
                    await axios.delete(`/appointments/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                        }
                    });
                    this.appointments = this.appointments.filter(appointment => appointment.id !== id);
                } catch (error) {
                    console.error('Error canceling appointment:', error);
                }
            }
        }
    },
    computed: {
        filteredAppointments() {
            return this.appointments.filter(appointment => appointment.patient.user_id === this.user.id);
        },
        filteredDoctorAppointments() {
            return this.appointments.filter(appointment => appointment.doctor.user_id === this.user.id);
        }
    }
};
</script>
