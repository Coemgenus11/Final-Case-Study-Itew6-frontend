<template>
    <div class="d-flex">
        <SideBar />
        <div class="content">
            <h1 class="mb-4">Edit Medical Record</h1>
            <form @submit.prevent="updateMedicalRecord">
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea ref="descriptionTextarea" v-model="medicalRecord.description" id="description" class="form-control" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn btn-success">Update</button>
                <router-link :to="'/view-medical-record/' + medicalRecord.id" class="btn btn-secondary">Cancel</router-link>
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
            medicalRecord: {
                description: ''
            },
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
        async updateMedicalRecord() {
            const recordId = this.$route.params.id;
            try {
                const response = await axios.put(`/medical-records/${recordId}`, this.medicalRecord, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                console.log('Medical record updated successfully:', response.data);
                this.$router.push('/view-medical-record/' + recordId);
            } catch (error) {
                console.error('Error updating medical record:', error);
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

.form-group {
    margin-bottom: 20px;
}

.btn {
    margin-top: 10px;
    margin-right: 10px;
}
</style>
