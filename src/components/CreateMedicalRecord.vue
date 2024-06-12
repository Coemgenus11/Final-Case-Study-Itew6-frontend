<template>
    <div class="d-flex">
        <SideBar />
        <div class="content">
            <h1 class="mb-4">Create Medical Record</h1>
            <router-link to="/patients" class="btn btn-secondary mb-4">Back to Patients</router-link>
            <form @submit.prevent="submitMedicalRecord">
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" v-model="description" class="form-control" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary mt-3">Submit</button>
            </form>
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
            description: '',
            user: JSON.parse(localStorage.getItem('user')) || {},
        };
    },
    methods: {
        async submitMedicalRecord() {
            const medicalRecord = {
                doctor_id: this.user.id,
                patient_id: this.$route.params.id,
                record_date: new Date().toISOString().slice(0, 19).replace('T', ' '), // Current date in YYYY-MM-DD format
                description: this.description
            };
            console.log(medicalRecord);

            try {
                await axios.post('/medical-records', medicalRecord, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                this.$router.push('/patients');
            } catch (error) {
                console.error('Error creating medical record:', error);
            }
        }
    }
};
</script>
