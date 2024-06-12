<template>
    <div class="d-flex">
        <SideBar />
        <div class="content">
            <h1 class="mb-4">Medical Records</h1>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Doctor Name</th>
                        <th scope="col">Record Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="record in filteredPatientMedicalRecords" :key="record.id">
                        <td>{{ record.patient.name }}</td>
                        <td>{{ record.doctor.name }}</td>
                        <td>{{ record.record_date }}</td>
                        <td :title="record.description">{{ truncateDescription(record.description) }}</td>
                        <td>
                            <router-link :to="'/view-medical-record/' + record.id" class="btn btn-info btn-sm">View</router-link>
                            <!-- <button @click="deleteRecord(record.id)" class="btn btn-danger btn-sm">Delete</button> -->
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
            medicalRecords: [],
            user: JSON.parse(localStorage.getItem('user')) || {},
        };
    },
    created() {
        this.fetchMedicalRecords();
        
    },
    methods: {
        async fetchMedicalRecords() {
            try {
                const response = await axios.get('/medical-records', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                this.medicalRecords = response.data;
                console.log(this.medicalRecords);
            } catch (error) {
                console.error('Error fetching medical records:', error);
            }
        },
        truncateDescription(description) {
            const maxLength = 50; // Define the max length for the description
            if (description.length > maxLength) {
                return description.substring(0, maxLength) + '...';
            }
            return description;
        },
        async deleteRecord(id) {
            if (confirm('Are you sure you want to delete this medical record?')) {
                try {
                    await axios.delete(`/medical-records/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                        }
                    });
                    this.medicalRecords = this.medicalRecords.filter(record => record.id !== id);
                } catch (error) {
                    console.error('Error deleting medical record:', error);
                }
            }
        }
    },
    computed: {
        filteredPatientMedicalRecords() {
            const patientId = this.$route.params.id; // Access the patient ID from route params
            return this.medicalRecords.filter(record => record.patient_id == patientId);
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

.table {
    width: 100%;
    border-collapse: collapse;
}

.table th,
.table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.table th {
    background-color: #f2f2f2;
}

.table .btn {
    margin-right: 5px;
}

.table td {
    max-width: 200px; /* Add a maximum width to table cells if needed */
    white-space: nowrap; /* Prevent text wrapping */
    overflow: hidden; /* Hide overflow text */
    text-overflow: ellipsis; /* Add ellipsis (...) to overflow text */
}
</style>
