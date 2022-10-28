<script lang="ts">
  import referee from "$lib/graphql/referee";
  import { auth } from "$lib/helpers/store";
  import { Col, Modal, Row, Table } from "sveltestrap";
  export let complete: boolean;
  export let alert: boolean;
  export let isRef: boolean;

  let fullName: string;
  let phone: string;
  let email: string;
  let refs: any;
  let refId: any;

  let isOpen = false;
  const toggle = () => (isOpen = !isOpen);

  $: alert = refs?.length < 2 && complete;
  $: isOpen = isRef;

  const handleSubmit = async () => {
    const resp = await referee.query("create", {
      userId: $auth.cred?.id,
      fullName,
      phone,
      email,
    });

    fullName = phone = email = "";
    const { data } = await referee.query("referees", {
      userId: $auth.cred?.id,
    });

    if (data.referees.length >= 2) {
      console.log(data);
    }
    isOpen = !isOpen;
  };

  const getReferees = async () => {
    const { data } = await referee.query("referees", {
      userId: $auth.cred?.id,
    });
    refs = data.referees;
  };

  $: if (!refs || refId) getReferees();
</script>

{#if refs}
  <div class="table-responsive">
    {#each refs as ref}
      <Table class="table-nowrap mb-4">
        <tbody>
          <tr>
            <th scope="row">Full Name :</th>
            <td>{ref.fullName}</td>
          </tr>
          <tr>
            <th scope="row">Mobile :</th>
            <td>{ref.phone}</td>
          </tr>
          <tr>
            <th scope="row">E-mail :</th>
            <td>{ref.email}</td>
          </tr>
        </tbody>
      </Table>
    {/each}
  </div>
{/if}

<Row>
  <Col lg={12}>
    <div class="mb-4 text-center">
      <button type="button" class="btn btn-primary btn-sm" on:click={toggle}>
        <i class="bx bx-plus ms-1" />
        Add Referee
      </button>
    </div>
  </Col>
</Row>

<Modal
  backdrop="static"
  header="Add Referee"
  size="md"
  {isOpen}
  {toggle}
  body
  centered
>
  <form>
    <div class="row ps-5 pe-5">
      <div class="col-lg-12">
        <div class="form-group form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="fullname"
            placeholder="Fullname"
            bind:value={fullName}
          />
          <label for="fullname">Fullname</label>
        </div>
        <div class="form-group form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="email"
            placeholder="Email"
            bind:value={email}
          />
          <label for="email">Email</label>
        </div>
        <div class="form-group form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="phone"
            placeholder="Phone Number"
            bind:value={phone}
          />
          <label for="phone">Phone Number</label>
        </div>
      </div>
    </div>
    <div class="text-center">
      <button
        on:click|preventDefault={handleSubmit}
        type="button"
        class="btn btn-primary"
      >
        Submit
      </button>
    </div>
  </form>
</Modal>
