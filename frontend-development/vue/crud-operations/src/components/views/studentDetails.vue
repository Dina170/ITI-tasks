<template>
    <div>
        <h4>student details</h4>
        <template>{{ loadStdData($route.params.id) }}</template>
        <p>id: {{ selectedStudent.id }}</p>
        <p>name: {{ selectedStudent.name }}</p>
        <p>city: {{ selectedStudent.city }}</p>
    </div>
</template>

<script>
import students from '@/students';

export default {
    data: () => ({
        selectedStudent: { id: "", name: "", city: "" }

    }),
    methods: {
        async created() {
            this.loadStdData(this.$route.params.id);
        },
        async loadStdData(id) {
            let res = await fetch(`http://localhost:5000/students/${id}`);
            let student = await res.json()
            this.selectedStudent = { ...student };

        }
    }
}
</script>

<style></style>