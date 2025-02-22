<template>
  <div class="col-9 offset-1">
    <addStudent @addbtnClicked="addNewStudent" />

    <table class="table table-striped table-bordered text-center">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in students" :key="student.id">
          <td>{{ student.id }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.city }}</td>
          <td>
            <i class="fa-solid fa-trash mx-2" @click.ctrl="removeStudent(index)"></i> |
            <i class="fa-solid fa-pen-to-square mx-2" data-bs-toggle="modal" data-bs-target="#editModal"
              @click="setSelectedStudent(student)">
            </i>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="3">Number of students: {{ students.length }}</th>
        </tr>
      </tfoot>
    </table>

    <div class="modal fade" id="editModal" data-bs-keyboard="false" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="text-center">Edit Student</h4>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control my-2" v-model="selectedStudent.id" disabled>
            <input type="text" class="form-control my-2" v-model="selectedStudent.name">
            <input type="text" class="form-control my-2" v-model="selectedStudent.city">
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button class="btn btn-primary" data-bs-dismiss="modal" @click="updateStudent">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
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
    selectedStudent: { id: "", name: "", city: "" }
  }),
  async created() {
    let res = await fetch("http://localhost:5000/students");
    this.students = await res.json();
  },
  methods: {
    setSelectedStudent(student) {
      this.selectedStudent = { ...student }; // Clone to avoid modifying directly
    },
    async updateStudent() {
      const index = this.students.findIndex(s => s.id === this.selectedStudent.id);
      if (index !== -1) {
        await fetch(`http://localhost:5000/students/${this.selectedStudent.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.selectedStudent)
        });

        this.students[index] = { ...this.selectedStudent };
      }
      //document.querySelector("#editModal .btn-secondary").click();
    },
    async addNewStudent(student) {
      let newId = this.students.length ? this.students[this.students.length - 1].id + 1 : 1;
      let data = { id: newId, name: student.name, city: student.city };

      await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
      });

      this.students.push(data);
    },
    async removeStudent(index) {
      if (confirm("Are you sure you want to delete this student?")) {
        await fetch(`http://localhost:5000/students/${this.students[index].id}`, {
          method: "DELETE"
        });
        this.students.splice(index, 1);
      }
    }
  }
};
</script>

<style>
i:hover {
  cursor: pointer;
}
</style>
