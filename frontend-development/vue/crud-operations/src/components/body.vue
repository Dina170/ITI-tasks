<template>
  <div class="col-9 offset-1">
    <addStudent @addbtnClicked="addNewStudent" />
    <table class="table table-stripped table-bordered text-center">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.id }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.city }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="3">Number of students: {{ students.length }}</th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import students from "@/students.js";
import addStudent from "./addStudent.vue";
export default {
  components: {
    addStudent
  },
  data: () => ({
    students: students,
  }),
  methods: {
    addNewStudent(student) {
      this.students.push({id: this.students[this.students.length - 1].id + 1, name: student.name, city: student.city})
    }
  }
};
</script>

<style></style>
