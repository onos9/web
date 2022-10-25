<script lang="ts">
  import { goto } from "$app/navigation";
  import Auth from "$lib/graphql/auth";
  import type { User } from "$lib/interface/user_interface";
  export let response: any;

  let user: User = {
    fullName: "",
    email: "",
    password: "",
    role: "prospective",
  };

  const handleSubmit = async (e: any) => {
    const resp = await Auth.queryPublic("signUp", user);
    response = resp.data?.signUp;
    if (!!resp.errors && resp.errors[0]?.message.includes("E11000")) {
      return;
    }

    if (!!response) goto("/signup/verify");
  };
</script>

<div>
  <h5 class="text-primary text-center">Register account</h5>
  <p class="text-muted text-center">Get your free Adullam account</p>
</div>

<div class="mt-4">
  <form
    on:submit|preventDefault={handleSubmit}
    class="needs-validation"
    novalidate
  >
    <div class="mb-3">
      <label for="">Account Type</label>
      <select bind:value={user.role} class="form-select">
        <option value="prospective">Prospective Student</option>
        <option value="tutor">Tutor</option>
        <option value="partner">Partner</option>
        <option value="guest">Guest</option>
      </select>
    </div>
    <hr />
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="fullname"
        placeholder="Enter fullname"
        bind:value={user.fullName}
        required
      />
      <label for="fullname" class="form-label">Full Name</label>
      <div class="invalid-feedback">Please Enter Username</div>
    </div>

    <div class="form-floating mb-3">
      <input
        type="email"
        class="form-control"
        id="email"
        placeholder="Enter email"
        bind:value={user.email}
        required
      />
      <label for="useremail" class="form-label">Email</label>
      <div class="invalid-feedback">Please Enter Email</div>
    </div>

    <div class="form-floating mb-3">
      <input
        type="password"
        class="form-control"
        id="password"
        placeholder="Enter password"
        bind:value={user.password}
        required
      />
      <label for="userpassword" class="form-label">Password</label>
      <div class="invalid-feedback">Please Enter Password</div>
    </div>

    <div>
      <p class="mb-0">
        By registering you agree to the Skote <a href={"#"} class="text-primary"
          >Terms of Use</a
        >
      </p>
    </div>

    <div class="mt-4 d-grid">
      <button
        class="btn btn-primary w-md waves-effect waves-light"
        type="submit">Register</button
      >
    </div>

    <div class="mt-4 text-center">
      <h5 class="font-size-14 mb-3">Sign up using</h5>

      <ul class="list-inline">
        <li class="list-inline-item">
          <a
            href={"#"}
            class="social-list-item bg-primary text-white border-primary"
          >
            <i class="mdi mdi-facebook" />
          </a>
        </li>
        <li class="list-inline-item">
          <a href={"#"} class="social-list-item bg-info text-white border-info">
            <i class="mdi mdi-twitter" />
          </a>
        </li>
        <li class="list-inline-item">
          <a
            href={"#"}
            class="social-list-item bg-danger text-white border-danger"
          >
            <i class="mdi mdi-google" />
          </a>
        </li>
      </ul>
    </div>
  </form>

  <div class="mt-5 text-center">
    <p>
      Already have an account ?{" "}
      <a href="auth-login-2" class="fw-medium text-primary">
        {" "}
        Login
      </a>{" "}
    </p>
  </div>
</div>
