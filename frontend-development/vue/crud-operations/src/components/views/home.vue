<template>
    <div>
        <h4 class="text-center">home section</h4>
        <div class="d-flex justify-content-center align-items-center bg-warning p-3 m-3 text-center">
            <button class="p-3 m-2 btn btn-primary" @click="counter++">+</button>
            <h6>couter: {{ counter }}</h6>
            <button class="p-3 m-2 btn btn-primary" @click="counter--">-</button>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        counter: 10
    }),
    activated() {
        if (this.counter > 20) this.counter = 10;
    }
}
</script>

<style></style>