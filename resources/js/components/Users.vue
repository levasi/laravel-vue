<template>
  <div class="container">
    <div v-if="$gate.isAdminOrAuthor()" class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            Users
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              @click="modalMode = 'create'"
            >Add user</button>
            <!-- Modal -->
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5
                      v-if="modalMode === 'create'"
                      class="modal-title"
                      id="exampleModalLabel"
                    >Create User</h5>
                    <h5
                      v-if="modalMode === 'update'"
                      class="modal-title"
                      id="exampleModalLabel"
                    >Update User</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form @submit.prevent="createUser">
                    <div class="modal-body">
                      <div class="form-group">
                        <input
                          v-model="form.name"
                          placeholder="name"
                          type="text"
                          name="username"
                          class="form-control"
                          :class="{ 'is-invalid': form.errors.has('name') }"
                        />
                        <has-error :form="form" field="name"></has-error>
                      </div>
                      <div class="form-group">
                        <input
                          v-model="form.email"
                          placeholder="Email"
                          type="text"
                          name="email"
                          class="form-control"
                          :class="{ 'is-invalid': form.errors.has('email') }"
                        />
                        <has-error :form="form" field="email"></has-error>
                      </div>
                      <div class="form-group">
                        <textarea
                          v-model="form.bio"
                          placeholder="Short Bio (optional)"
                          type="text"
                          name="bio"
                          class="form-control"
                          :class="{ 'is-invalid': form.errors.has('bio') }"
                        />
                        <has-error :form="form" field="bio"></has-error>
                      </div>
                      <div class="form-group">
                        <select
                          v-model="form.type"
                          class="form-control"
                          name="type"
                          :class="{
                        'is-invalid': form.errors.has('type')
                      }"
                        >
                          <option value>Select user role</option>
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                          <option value="author">Author</option>
                        </select>
                        <has-error :form="form" field="type"></has-error>
                      </div>
                      <div class="form-group">
                        <input
                          v-model="form.password"
                          placeholder="Password"
                          type="password"
                          name="password"
                          class="form-control"
                          :class="{ 'is-invalid': form.errors.has('password') }"
                        />
                        <has-error :form="form" field="password"></has-error>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button
                        v-if="modalMode === 'create'"
                        type="submit"
                        class="btn btn-primary"
                      >Create</button>
                      <button
                        v-if="modalMode === 'update'"
                        class="btn btn-success"
                        @click.prevent="updateUser"
                      >Update</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Type</th>
                <th scope="col">Created at</th>
                <th scope="col">Modify</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <td>{{user.id}}</td>
                <td>{{user.name | upTxt}}</td>
                <td>{{user.email}}</td>
                <td>{{user.type}}</td>
                <td>{{user.updated_at | momentDate}}</td>
                <td>
                  <button @click="editModal(user)">edit</button>
                  <button @click="deleteUser(user.id)">delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <not-found v-if="!$gate.isAdminOrAuthor()"></not-found>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      users: {},
      form: new Form({
        id: "",
        name: "",
        email: "",
        password: "",
        type: "",
        bio: "",
        photo: ""
      }),
      modalMode: null
    };
  },
  created() {
    this.loadUsers();
  },
  methods: {
    deleteUser(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        this.form
          .delete(`api/user/${id}`)
          .then(response => {
            if (result.value) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              console.log(response);
              this.loadUsers();
            }
          })
          .catch(() => {
            Swal("Failed", "there was something wrong", "warning");
          });
      });
    },
    loadUsers() {
      if (this.$gate.isAdminOrAuthor()) {
        axios.get("/api/user").then(({ data }) => {
          console.log(data);
          this.users = data.data;
        });
      }
    },
    editModal(user) {
      this.modalMode = "update";
      console.log(user);
      this.form.fill(user);
      $("#exampleModal").modal("show");
    },
    createUser() {
      this.$Progress.start();
      this.form.post("/api/user").then(response => {
        if (response) {
          this.$Progress.finish();
          Toast.fire({
            icon: "success",
            title: "New user created"
          });
          $("#exampleModal").modal("hide");
          this.loadUsers();
          this.form.reset();
        }
      });
    },
    updateUser() {
      console.log("update user");
      this.$Progress.start();
      this.form
        .put("api/user/" + this.form.id)
        .then(() => {
          // success
          this.loadUsers();
          this.$Progress.finish();
          $("#exampleModal").modal("hide");
          Toast.fire({
            icon: "success",
            title: "User was updated"
          });
        })
        .catch(error => {
          console.log(error);
          this.$Progress.fail();
        });
    }
  }
};
</script>
