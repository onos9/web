<script lang="ts">
  import { browser } from "$app/environment";
  import profileImg from "$lib/assets/images/profile-img.png";
  import Breadcrumb from "$lib/common/Breadcrumb.svelte";
  import Referee from "$lib/Components/ApplicationForm/Referee.svelte";
  import SpiritBackground from "$lib/Components/ApplicationForm/SpiritBackground.svelte";
  import MiniStats from "$lib/Components/MiniStats.svelte";
  import Tabs from "$lib/Components/Tabs.svelte";
  import Wizard from "$lib/Components/Wizard.svelte";
  import user from "$lib/graphql/user";
  import { auth, userData } from "$lib/helpers/store";
  import type { Profile } from "$lib/interface/user_interface";
  import { onMount } from "svelte";
  import {
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Modal,
    Row,
  } from "sveltestrap";
  import Education from "../../lib/Components/ApplicationForm/Education.svelte";
  import HealthInfo from "../../lib/Components/ApplicationForm/HealthInfo.svelte";
  import PersonalInfo from "../../lib/Components/ApplicationForm/PersonalInfo.svelte";
  import Document from "./Document.svelte";
  import Overview from "./Overview.svelte";
  import ProfileInfo from "./ProfileInfo.svelte";

  let profile: Profile = {
    id: "",
    firstName: "",
    lastName: "",
    middleName: "",
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    progress: 0,
    godsWorkings: [],
    salvationBrief: "",
    churchName: "",
    churchAddress: "",
    pastorName: "",
    pastorEmail: "",
    pastorPhone: "",
    reason: "",
    healthConditions: [],
    healthIssueDescription: "",
  };
  let titles: string[] = ["Bio Data", "Spirituality", "Health"];
  let menus: string[] = [
    "Overview",
    "Profile",
    "Documents",
    "Activity",
    "Practicums",
    "Settings",
  ];

  let subscribemodal = false;
  let nextTab: number;
  let complete: boolean;
  let userdata: any;
  let active = 1;

  $: if (nextTab) {
    const data = Object.entries(profile);
    let total = data.filter(([key]) => key != "progress");
    let val = total.filter(([key, val]) => !!val?.length);
    profile.progress = Math.round((val.length / total.length) * 100);
    profile.id = $auth.cred?.id;
    user.query("update", { data: profile });

    data.forEach(([key, value]) => {
      if (typeof val != "number" && !!value?.length) {
        userData.update((data) => ({
          ...data,
          user: { ...data.user, [key]: value },
        }));
      }
    });

    complete = profile.progress >= 100 ? true : false;
  }

  $: if (browser && $auth.loggedIn) {
    localStorage.auth = JSON.stringify($auth);
  }

  $: if (browser && !$userData.user.id) user.query("user", { id: $auth.cred?.id });
  $: if ($userData.user.progress) {
    // console.log($userData.user.progress)
    // subscribemodal = !subscribemodal;
  }

  $: if ($userData.user.id) {
    userdata = $userData.user;
    Object.keys(profile).forEach((key) => (profile[key] = userdata[key]));
  }

  const togglesubscribemodal = () => (subscribemodal = !subscribemodal);
  const onModalOpen = () => {
    // if (browser)
    //   Object.keys(profile).forEach((key) => (profile[key] = userdata[key]));
  };
</script>

{#if $userData.user?.id}
  <div class="page-content">
    <Container fluid>
      <Breadcrumb title="Contacts" breadcrumbItem="Profile" />

      <Row>
        <Col xl="4">
          <Card class="overflow-hidden">
            <div class="bg-primary bg-soft">
              <Row>
                <Col xs="7">
                  <div class="text-primary p-3">
                    <h5 class="text-primary">Welcome Back !</h5>
                    <p>It will seem like simplified</p>
                  </div>
                </Col>
                <Col xs="5" class="align-self-end">
                  <img src={profileImg} alt="" class="img-fluid" />
                </Col>
              </Row>
            </div>
            <CardBody class="pt-0">
              <Row>
                <Col sm="4">
                  <div class="avatar-md profile-user-wid mb-4">
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
                  <h5 class="font-size-15 text-truncate">
                    {userdata?.fullName}
                  </h5>
                  <p class="text-muted mb-0 text-truncate text-capitalize">
                    {userdata?.role}
                  </p>
                </Col>

                <Col sm={8}>
                  <div class="pt-4">
                    <Row>
                      <Col xs="6">
                        <h5 class="font-size-15">0</h5>
                        <p class="text-muted mb-0">Courses</p>
                      </Col>
                      <Col xs="6">
                        <h5 class="font-size-15">0</h5>
                        <p class="text-muted mb-0">Practicums</p>
                      </Col>
                    </Row>
                    <div class="mt-4">
                      <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        on:click={togglesubscribemodal}
                      >
                        Edit Profile
                        <i class="mdi mdi-arrow-right ms-1" />
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle class="mb-4 h4">Referees</CardTitle>
              <p class="text-muted mb-4">
                <!-- Hi I'm Cynthia Price, has been the industry's standard dummy
                text href an English person, it will seem like simplified
                English, as a skeptical Cambridge. -->
              </p>
              <Referee />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <CardTitle class="mb-5">Qualifications</CardTitle>
              <Education />
            </CardBody>
          </Card>
        </Col>

        <Col xl="8">
          <Row>
            <Col md={4}>
              <Card class="mini-stats-wid">
                <CardBody>
                  <MiniStats name="Completed Courses" stat="0">
                    <i slot="icon" class="bx bx-check-circle font-size-24" />
                  </MiniStats>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card class="mini-stats-wid">
                <CardBody>
                  <MiniStats name="Pending Courses" stat="0">
                    <i slot="icon" class="bx bx-hourglass font-size-24" />
                  </MiniStats>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card class="mini-stats-wid">
                <CardBody>
                  <MiniStats name="New Converts" stat="0">
                    <i slot="icon" class="bx bx-package font-size-24" />
                  </MiniStats>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <div class="mt-4">
            <Tabs {menus} {active}>
              <div slot="id-1">
                <Overview />
              </div>
              <div slot="id-2">
                <ProfileInfo />
              </div>
              <div slot="id-3">
                <Document />
              </div>
            </Tabs>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
{/if}

{#if $userData.user.id}
  <Modal
  size="xl"
  isOpen={subscribemodal}
  toggle={togglesubscribemodal}
  backdrop="static"
  centered
  on:open={onModalOpen}
>
  <div class="modal-content">
    <div class="modal-header border-bottom-0">
      <h5 class="modal-title">Edit Profile</h5>
      <button
        type="button"
        class="btn-close"
        on:click={togglesubscribemodal}
        data-bs-dismiss="modal"
        aria-label="Close"
      />
    </div>
    <div class="modal-body">
      <Wizard bind:complete bind:nextTab bind:subscribemodal {titles}>
        <PersonalInfo bind:profile slot="slot1" />
        <SpiritBackground bind:profile slot="slot2" />
        <HealthInfo bind:profile slot="slot3" />
      </Wizard>
    </div>
  </div>
</Modal>
{/if}

