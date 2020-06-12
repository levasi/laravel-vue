<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            Users
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
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
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
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
                          <option value="standard">Standard</option>
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
                      <button type="submit" class="btn btn-primary">Create</button>
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
                  <button>edit</button>
                  <button>delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      users: {},
      form: new form({
        name: "",
        email: "",
        password: "",
        type: "",
        bio: "",
        photo: ""
      })
    };
  },
  created() {
    this.loadUsers();
  },
  methods: {
    loadUsers() {
      axios.get("/api/user").then(({ data }) => {
        console.log(data);

        this.users = data.data;
      });
    },
    createUser() {
      this.$Progress.start();
      this.form.post("/api/user");
      this.$Progress.finish();
    }
  }
};
</script>
