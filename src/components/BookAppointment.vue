<template>
    <SideBar />
    <div class="content">
        <h1 class="mb-4">Book Appointment</h1>
        <form @submit.prevent="bookAppointment">
            <div class="form-group">
                <label for="doctor">Doctor</label>
                <select v-model="appointment.doctor_id" class="form-control" required>
                    <option class="doc" value="">Select Doctor</option>
                    <option v-for="doctor in doctors" :value="doctor.user_id" :key="doctor.user_id">{{ doctor.name }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="appointment_date">Date</label>
                <input type="datetime-local" v-model="appointment.appointment_date" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">Book Appointment</button>
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
            doctors: [],
            appointment: {
                
                doctor_id: '',
                patient_id: JSON.parse(localStorage.getItem('user')).id,
                appointment_date: '',
                status: 'booked',
               
            }
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
        async bookAppointment() {
            // Format the appointment date
            const formattedDate = new Date(this.appointment.appointment_date).toISOString().slice(0, 19).replace('T', ' ');

            // Update the appointment object with the formatted date
            this.appointment.appointment_date = formattedDate;

            try {
                const response = await axios.post('/appointments', this.appointment, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                console.log('Appointment booked successfully:', response.data);
                this.$router.push('/appointments');
            } catch (error) {
                console.error('Error booking appointment:', error);
            }
        }

    }
};
</script>

<style>
.doc{
    color: red;
}
</style>