<script lang="ts">
  import { browser } from "$app/environment";
  import Auth from "$lib/graphql/auth";
  import { goto } from "$app/navigation";
  import { auth } from "$lib/helpers/store";
  export let response: any;

  let count = 2;
  let code: string = "";
  let lastDigit: string = "";
  $: console.log(code + lastDigit);

  const handleClick = async () => {
    const resp = await Auth.queryPublic("verifyEmail", {
      id: response?.id,
      code: code + lastDigit,
    });

    response = resp.data?.verifyEmail;
    if (!!resp.data) goto("/signup/program");
  };

  const handleKeyup = ({ target }) => {
    if (browser) document.getElementById("digit" + count + "-input")?.focus();
    count = count + 1;
    code += target.value;
  };
</script>

<div class="text-center">
  <div class="avatar-md mx-auto">
    <div class="avatar-title rounded-circle bg-light">
      <i class="bx bxs-envelope h1 mb-0 text-primary" />
    </div>
  </div>
  <div class="p-2 mt-4">
    <h4>Verify your email</h4>
    <p>
      Please enter the 4 digit code sent to{" "}
      <span class="fw-semibold">{$auth.cred?.email}</span>
    </p>

    <form>
      <div class="row">
        <div class="col-3">
          <div class="mb-3">
            <label for="digit1-input" class="visually-hidden">Dight 1</label>
            <input
              type="text"
              class="form-control form-control-lg text-center"
              on:keyup|preventDefault={handleKeyup}
              maxLength="1"
              id="digit1-input"
            />
          </div>
        </div>

        <div class="col-3">
          <div class="mb-3">
            <label for="digit2-input" class="visually-hidden">Dight 2</label>
            <input
              type="text"
              class="form-control form-control-lg text-center"
              on:keyup|preventDefault={handleKeyup}
              maxLength="1"
              id="digit2-input"
            />
          </div>
        </div>

        <div class="col-3">
          <div class="mb-3">
            <label for="digit3-input" class="visually-hidden">Dight 3</label>
            <input
              type="text"
              class="form-control form-control-lg text-center"
              on:keyup|preventDefault={handleKeyup}
              maxLength="1"
              id="digit3-input"
            />
          </div>
        </div>

        <div class="col-3">
          <div class="mb-3">
            <label for="digit4-input" class="visually-hidden">Dight 4</label>
            <input
              type="text"
              class="form-control form-control-lg text-center"
              bind:value={lastDigit}
              maxLength="1"
              id="digit4-input"
            />
          </div>
        </div>
      </div>
    </form>

    <div class="mt-4">
      <button on:click={handleClick} class="btn btn-success w-md">
        Confirm
      </button>
    </div>
  </div>
</div>
