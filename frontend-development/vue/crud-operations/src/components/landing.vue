<template>
    <div class="container my-2">
        <h4 class="text-center p-5">landing page</h4>
        <div class="row border border-primary g-0">
            <ul class="d-flex list-unstyled justify-content-evenly align-items-center">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/contact">Contact</router-link></li>
                <li><router-link to="/about">About</router-link></li>
                <li><router-link to="/dynamic">Dynamic</router-link></li>
            </ul>
        </div>
        <div class="row border border-warning g-0 py-5">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style></style>