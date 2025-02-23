<template>
    <div>
        <h4 class="p-5">landing page</h4>
        <div class="row border border-primary g-0">
            <ul class="d-flex list-unstyled justify-content-evenly align-items-center">
                <li><a href="#" @click.prevent="targetCompontent = 'home'">Home</a></li>
                <li><a href="#" @click.prevent="targetCompontent = 'contact'">Contact</a></li>
                <li><a href="#" @click.prevent="targetCompontent = 'about'">About</a></li>
            </ul>
        </div>
        <div class="row border border-warning g-0 py-5">
            <h4 class="text-center">dynamic</h4>

        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style></style>