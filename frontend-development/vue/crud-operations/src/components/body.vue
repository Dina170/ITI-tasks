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
import addStudent from "./addStudent.vue";
export default {
  components: {
    addStudent
  },
  data: () => ({
    students: [],
  }),
  async created() {
    let res = await fetch("http://localhost:5000/students");
    this.students = await res.json();
  },
  methods: {
    async addNewStudent(student) {
      let data = { id: this.students[this.students.length - 1].id + 1, name: student.name, city: student.city }
      await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data)
      })
      this.students.push(data)
    }
  }
};
</script>

<style></style>
