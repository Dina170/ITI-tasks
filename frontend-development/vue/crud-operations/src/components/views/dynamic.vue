<template>
    <div class="container mt-5">
        <div class="row border border-primary g-0">
            <ul class="d-flex list-unstyled justify-content-evenly align-items-center">
                <li><a href="#" @click.prevent="targetCompontent = 'home'">Home</a></li>
                <li><a href="#" @click.prevent="targetCompontent = 'contact'">Contact</a></li>
                <li><a href="#" @click.prevent="targetCompontent = 'about'">About</a></li>
            </ul>
        </div>
        <div class="row border border-warning g-0 py-5">
            <h4 class="text-center">dynamic</h4>
            <keep-alive>
                <component :is="targetCompontent" />
            </keep-alive>
        </div>
    </div>
</template>

<script>
import home from './home.vue';
import contact from './contact.vue';
import about from './about.vue';

export default {
    data: () => ({
        targetCompontent: 'home'
    }),
    components: {
        home, contact, about
    }
}
</script>

<style></style>