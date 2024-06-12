<!-- src/App.vue -->
<template>
    <div id="app">
        <NavBar />
        <router-view />
    </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
    name: 'App',
    components: {
        NavBar
    }
};
</script>
<style>
.content {
    margin-left: 220px; /* Adjust this based on the sidebar width */
    padding: 20px;
    width: calc(100% - 220px); /* Adjust this based on the sidebar width */
}
</style>
