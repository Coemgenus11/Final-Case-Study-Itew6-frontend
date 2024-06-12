<template>
    <div class="d-flex">
        <SideBar />
        <div class="content">
            <h1 class="mb-4">Medical Record Details</h1>
            <div v-if="medicalRecord">
                <p><strong>Patient Name:</strong> {{ medicalRecord.patient.name }}</p>
                <p><strong>Doctor Name:</strong> {{ medicalRecord.doctor.name }}</p>
                <p><strong>Record Date:</strong> {{ medicalRecord.record_date }}</p>
                <p><strong>Description:</strong></p>
                <textarea ref="descriptionTextarea" v-model="medicalRecord.description" id="description" class="form-control" rows="5" readonly></textarea>

                <router-link to="/medical-records"  v-if="user.user_type === 'admin'" class="btn btn-primary">Back to Medical Records</router-link>
                <router-link to="/patients"  v-if="user.user_type === 'doctor'" class="btn btn-primary">Back to Medical Records</router-link>
                <router-link :to="'/edit-medical-record/' + medicalRecord.id" class="btn btn-warning" v-if="user.user_type === 'doctor'">Edit</router-link>
            </div>
            <div v-else>
                <p>Loading medical record details...</p>
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
            medicalRecord: null,
            user: JSON.parse(localStorage.getItem('user')) || {},
        };
    },
    watch: {
        'medicalRecord.description': function() {
            this.adjustTextareaHeight();
        }
    },
    created() {
        this.fetchMedicalRecord();
    },
    updated() {
        this.adjustTextareaHeight();
    },
    methods: {
        async fetchMedicalRecord() {
            const recordId = this.$route.params.id;
            try {
                const response = await axios.get(`/medical-records/${recordId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                this.medicalRecord = response.data;
                this.$nextTick(this.adjustTextareaHeight); // Adjust textarea height after data is loaded
            } catch (error) {
                console.error('Error fetching medical record:', error);
            }
        },
        adjustTextareaHeight() {
            const textarea = this.$refs.descriptionTextarea;
            if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
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
    margin-right: 10px;
}
</style>
