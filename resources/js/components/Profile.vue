<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card mt-3">
          <div class="card-header">Profile</div>

          <div class="card-body">
            <div class="box box-widget widget-user">
              <!-- Add the bg color to the header using any of the bg-* classes -->
              <div class="widget-user-header" :style="{'background-image': profileImage}">
                <h3 class="widget-user-username">{{form.name}}</h3>
                <h5 class="widget-user-desc">Web Designer</h5>
              </div>
              <div class="widget-user-image">
                <!-- <img class="img-circle" src alt="User Avatar" /> -->
              </div>
              <div class="box-footer">
                <div class="row">
                  <div class="col-sm-4 border-right">
                    <div class="description-block">
                      <h5 class="description-header">3,200</h5>
                      <span class="description-text">SALES</span>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                  <div class="col-sm-4 border-right">
                    <div class="description-block">
                      <h5 class="description-header">13,000</h5>
                      <span class="description-text">FOLLOWERS</span>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                  <div class="col-sm-4">
                    <div class="description-block">
                      <h5 class="description-header">35</h5>
                      <span class="description-text">PRODUCTS</span>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                </div>
                <!-- /.row -->
              </div>
            </div>
          </div>
        </div>
        <div class="tab-content">
          <div class="tab-pane active" id="settings">
            <form class="form-horizontal">
              <div class="form-group">
                <label for="inputName" class="control-label">Name</label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id="inputName"
                    placeholder="Name"
                    data-kwimpalastatus="alive"
                    data-kwimpalaid="1593026351318-1"
                    v-model="form.name"
                    :class="{ 'is-invalid': form.errors.has('name') }"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="inputEmail" class="control-label">Email</label>
                <div>
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail"
                    placeholder="Email"
                    data-kwimpalastatus="alive"
                    data-kwimpalaid="1593026351318-2"
                    v-model="form.email"
                    :class="{ 'is-invalid': form.errors.has('email') }"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="inputName" class="control-label">Password</label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id="inputName"
                    placeholder="Name"
                    data-kwimpalastatus="alive"
                    data-kwimpalaid="1593026351318-1"
                    v-model="form.password"
                    :class="{ 'is-invalid': form.errors.has('password') }"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="inputExperience">Experience</label>
                <div>
                  <textarea
                    v-model="form.bio"
                    class="form-control"
                    id="inputExperience"
                    placeholder="Experience"
                    :class="{ 'is-invalid': form.errors.has('bio') }"
                  ></textarea>
                </div>
              </div>
              <div class="form-group">
                <label for="inputSkills">Skills</label>
                <div>
                  <input type="text" class="form-control" id="inputSkills" placeholder="Skills" />
                </div>
              </div>
              <div class="form-group">
                <label for="exampleInputFile">File input</label>
                <div>
                  <input @change="uploadFile" type="file" id="exampleInputFile" />
                </div>
              </div>
              <div class="form-group">
                <div>
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" /> I agree to the
                      <a href="#">terms and conditions</a>
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div>
                  <button @click.prevent="updateProfile" type="submit" class="btn btn-danger">Update</button>
                </div>
              </div>
            </form>
          </div>
          <!-- /.tab-pane -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: new Form({
        id: "",
        name: "",
        email: "",
        password: "",
        type: "",
        bio: "",
        photo: ""
      }),
      photo: ""
    };
  },
  computed: {
    profileImage() {
      if (this.photo) {
        return `url(${this.photo})`;
      } else {
        return `url(img/profile/${this.form.photo})`;
      }
    }
  },
  methods: {
    uploadFile(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      if (file["size"] < 2111775) {
        reader.onloadend = file => {
          this.form.photo = reader.result;
          this.photo = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        // error
        Toast.fire({
          icon: "error",
          title: "File too big",
          text: "You are uploading a file that is more than 2 mb"
        });
      }
    },
    updateProfile() {
      this.form
        .put("api/profile")
        .then(response => {
          console.log(response);
        })
        .catch(() => {});
    }
  },
  created() {
    const url = "api/profile";
    axios
      .get(url)
      .then(({ data }) => {
        this.form.fill(data);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
