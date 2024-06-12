// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Register from '../components/RegisterUser.vue';
import Login from '../components/LoginUser.vue';
import UserDashboard from '../components/UserDashboard.vue';
import RegisterDoctor from '../components/RegisterDoctor.vue';
import RegisterPatient from '../components/RegisterPatient.vue';
import ViewDoctors from '../components/ViewDoctors.vue';
import ViewPatients from '../components/ViewPatients.vue';
import EditDoctor from '../components/EditDoctor.vue';
import EditPatient from '../components/EditPatient.vue';
import AppointmentRecord from '../components/AppointmentRecord.vue';
import BookAppointment from '../components/BookAppointment.vue';
import ViewAppointment from '../components/ViewAppointment.vue';
import ViewProfile from '../components/ViewProfile.vue';

import CreateMedicalRecord from '../components/CreateMedicalRecord.vue';
import ViewMedicalRecords from '../components/ViewMedicalRecords.vue';
import ViewMedicalDetails from '../components/ViewMedicalDetails.vue';
import EditMedicalRecord from '../components/EditMedicalRecord.vue';
import PatientMedicalRecords from '../components/PatientMedicalRecords.vue';


const routes = [
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/',
        name: 'Login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('auth-token')) {
                next('/dashboard');
            } else {
                next();
            }
        }
    },
    {
        path: '/dashboard',
        name: 'UserDashboard',
        component: UserDashboard,
        meta: { requiresAuth: true }
    },
    { 
        path: '/register-doctor', 
        component: RegisterDoctor, 
        meta: { 
            requiresAuth: true, 
            requiresAdmin: true 
        } 
    },
    { 
        path: '/register-patient', 
        component: RegisterPatient, 
        meta: { 
            requiresAuth: true, 
            requiresAdmin: true 
        } 
    },
    {
        path: '/doctors',
        name: 'ViewDoctors',
        component: ViewDoctors,
        meta: { requiresAuth: true }
    },
    {
        path: '/patients',
        name: 'ViewPatients',
        component: ViewPatients,
        meta: { requiresAuth: true }
    },
    {
        path: '/doctor/:id',
        name: 'EditDoctor',
        component: EditDoctor,
        meta: { requiresAuth: true }
    },
    {
        path: '/patient/:id',
        name: 'EditPatient',
        component: EditPatient,
        meta: { requiresAuth: true }
    },
    {
        path: '/appointments',
        name: 'AppointmentRecord',
        component: AppointmentRecord,
        meta: { requiresAuth: true }
    },
    {
        path: '/book-appointment',
        name: 'BookAppointment',
        component: BookAppointment,
        meta: { requiresAuth: true }
    },
    {
        path: '/appointment/:id',
        name: 'ViewAppointment',
        component: ViewAppointment,
        meta: { requiresAuth: true }
    },
    {
        path: '/profile/:id',
        name: 'ViewProfile',
        component: ViewProfile,
        meta: { requiresAuth: true }
    },
    {
        path: '/make-med-rec/:id',
        name: 'CreateMedicalRecord',
        component: CreateMedicalRecord,
        meta: { requiresAuth: true }
    },
    {
        path: '/medical-records',
        name: 'ViewMedicalRecords',
        component: ViewMedicalRecords,
        meta: { requiresAuth: true }
    },
    {
        path: '/view-medical-record/:id',
        name: 'ViewMedicalDetails',
        component: ViewMedicalDetails,
        meta: { requiresAuth: true }
    },
    {
        path: '/edit-medical-record/:id',
        name: 'EditMedicalRecord',
        component: EditMedicalRecord,
        props: true
    },
    {
        path: '/patient-medical-records/:id',
        name: 'PatientMedicalRecords',
        component: PatientMedicalRecords,
        meta: { requiresAuth: true }
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('auth-token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next({ name: 'Login' });
        } else {
            if (to.matched.some(record => record.meta.requiresAdmin)) {
                if (user?.user_type === 'admin') {
                    next();
                } else {
                    next({ name: 'UserDashboard' });
                }
            } else {
                next();
            }
        }
    } else {
        next();
    }
});

export default router;
