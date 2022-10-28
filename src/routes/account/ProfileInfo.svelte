<script lang="ts">
  import { browser } from "$app/environment";
  import Info from "$lib/Components/Info.svelte";
  import user from "$lib/graphql/user";
  import { auth, userData } from "$lib/helpers/store";
  import type { Profile } from "$lib/interface/user_interface";
  import { onMount } from "svelte";
  import {
    Card,
    CardBody,
    CardTitle,
    Col,
    Label,
    Row,
    Table,
  } from "sveltestrap";

  let edited: string;

  $: if (browser && $auth.loggedIn) {
    localStorage.auth = JSON.stringify($auth);
  }

  $: if (browser && !$userData.user?.id)
    user.query("user", { id: $auth.cred?.id });
  let userdata: any;
  $: userdata = $userData.user;

  var emailid = "admin@themesbrand.com";
</script>

{#if $userData.user?.id}
  <div>
    <Row>
      <Col lg="4">
        <Card>
          <CardBody>
            <CardTitle class="mb-4 h4">Profile Picture</CardTitle>
            <div class="avatar-md mb-3">
              {#if !userdata?.avatarUrl}
                <span class="avatar-title fs-1 rounded-circle">
                  {userdata?.fullName.charAt(0)}
                </span>
              {:else}
                <img
                  class="img-thumbnail rounded-circle"
                  src={userdata?.avatarUrl}
                  alt=""
                />
              {/if}
            </div>
            <div class="avatar-sm w-100" style="cursor:pointer">
              <Label class="avatar-title rounded bg-light">
                <i class="text-primary fs-1 bx bxs-cloud-upload" />
                <input hidden type="file" />
              </Label>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col lg="8">
        <Card>
          <CardBody>
            <CardTitle class="mb-4 h4">About Me</CardTitle>
            <p class="text-muted mb-4">
              Hi I'm <span class="fw-bold">{userdata?.fullName}</span>, has been
              the industry's standard dummy text href an English person, it will
              seem like simplified English, as a skeptical Cambridge.
            </p>
          </CardBody>
        </Card>
      </Col>
    </Row>

    <Row>
      <Col xs="12">
        <Card>
          <CardBody>
            <CardTitle class="mb-4 h4">Personal Information</CardTitle>
            <Info class="mb-3" name="Full Name" bind:edited />
            <Info class="mb-3" name="Email" bind:edited />
            <Info class="mb-3" name="Phone" bind:edited />
          </CardBody>
        </Card>
      </Col>
      <Col xs="12">
        <Card>
          <CardBody>
            <CardTitle class="mb-4 h4">Personal Information</CardTitle>
            <div class="table-responsive">
              <Table class="table-nowrap mb-0">
                <tbody>
                  <tr>
                    <th scope="row">Full Name :</th>
                    <td>{userdata?.fullName}</td>
                  </tr>
                  <tr>
                    <th scope="row">Mobile :</th>
                    <td>{userdata?.phone}</td>
                  </tr>
                  <tr>
                    <th scope="row">E-mail :</th>
                    <td>{emailid}</td>
                  </tr>
                  <tr>
                    <th scope="row">Location :</th>
                    <td>California, United States</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </div>
{/if}
