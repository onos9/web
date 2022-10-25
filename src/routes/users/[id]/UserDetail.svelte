<script lang="ts">
  import { browser } from "$app/environment";
  import profileImg from "$lib/assets/images/profile-img.png";
  import avatarImg from "$lib/assets/images/users/avatar-1.jpg";
  import Breadcrumb from "$lib/common/Breadcrumb.svelte";
  import Info from "$lib/Components/Info.svelte";
  import MiniStats from "$lib/Components/MiniStats.svelte";
  import Tabs from "$lib/Components/Tabs.svelte";
  import user from "$lib/graphql/user";
  import { auth, userData } from "$lib/helpers/store";
  import { onMount, setContext } from "svelte";
  import {
    Card,
    CardBody,
    CardImg,
    CardTitle,
    Col,
    Container,
    Row,
    Table,
  } from "sveltestrap";

  setContext("breadcrumb", { title: "Users", breadcrumbItem: "Profile" });
  let container: HTMLElement;
  let subscribemodal = false;
  let edited: string;

  let menus: string[] = [
    "Overview",
    "Profile",
    "Activity",
    "Practicums",
    "Settings",
  ];

  $: if (browser && $auth.loggedIn) {
    localStorage.auth = JSON.stringify($auth);
  }

  const togglesubscribemodal = () => (subscribemodal = !subscribemodal);

  // $: console.log($userData?.user);
  $: if (browser && !$userData.user?.id)
    user.query("user", { id: $auth.cred?.id });

  // onMount(async () => {
  //   if (browser && $userData.user?.id) {
  //     const ApexCharts = (await import("apexcharts")).default;
  //     const chart = new ApexCharts(container, data.options);
  //     chart.render();
  //   }
  // });

  let userdata: any;
  $: userdata = $userData.user;

  var emailid = "admin@themesbrand.com";
</script>

{#if $userData.user?.id}
  <div class="page-content">
    <Container fluid>
      <Breadcrumb title="Users" breadcrumbItem="Profile" />
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
                Hi I'm Cynthia Price, has been the industry's standard dummy
                text href an English person, it will seem like simplified
                English, as a skeptical Cambridge.
              </p>
              <div slot="header">Personal Information</div>
              <div class="table-responsive">
                <div class="table-responsive">
                  <Table class="table-nowrap mb-3 border">
                    <tbody>
                      <tr>
                        <th scope="row">Full Name :</th>
                        <td>Cynthia Price</td>
                      </tr>
                      <tr>
                        <th scope="row">Mobile :</th>
                        <td>(123) 123 1234</td>
                      </tr>
                      <tr>
                        <th scope="row">E-mail :</th>
                        <td>{emailid}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table class="table-nowrap mb-3 border">
                    <tbody>
                      <tr>
                        <th scope="row">Full Name :</th>
                        <td>Cynthia Price</td>
                      </tr>
                      <tr>
                        <th scope="row">Mobile :</th>
                        <td>(123) 123 1234</td>
                      </tr>
                      <tr>
                        <th scope="row">E-mail :</th>
                        <td>{emailid}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <CardTitle class="mb-5">Qualifications</CardTitle>
              <div class="">
                <ul class="verti-timeline list-unstyled">
                  <li class="event-list active">
                    <div class="event-timeline-dot">
                      <i class="bx bx-right-arrow-circle bx-fade-right" />
                    </div>
                    <div class="d-flex">
                      <div class="flex-shrink-0 me-3">
                        <i class="bx bx-server h4 text-primary" />
                      </div>
                      <div class="flex-grow-1">
                        <div>
                          <h5 class="font-size-15">
                            <a href={"/#"} class="text-dark"
                              >Back end Developer</a
                            >
                          </h5>
                          <span class="text-primary">2016 - 19</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="event-list">
                    <div class="event-timeline-dot">
                      <i class="bx bx-right-arrow-circle" />
                    </div>
                    <div class="d-flex">
                      <div class="flex-shrink-0 me-3">
                        <i class="bx bx-code h4 text-primary" />
                      </div>
                      <div class="flex-grow-1">
                        <div>
                          <h5 class="font-size-15">
                            <a href={"/#"} class="text-dark"
                              >Front end Developer</a
                            >
                          </h5>
                          <span class="text-primary">2013 - 16</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="event-list">
                    <div class="event-timeline-dot">
                      <i class="bx bx-right-arrow-circle" />
                    </div>
                    <div class="d-flex">
                      <div class="flex-shrink-0 me-3">
                        <i class="bx bx-edit h4 text-primary" />
                      </div>
                      <div class="flex-grow-1">
                        <div>
                          <h5 class="font-size-15">
                            <a href={"/#"} class="text-dark">UI /UX Designer</a>
                          </h5>
                          <span class="text-primary">2011 - 13</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl="8">
          <Row>
            <Col md={4}>
              <Card class="mini-stats-wid">
                <CardBody>
                  <MiniStats name="Completed Courses" stat="12">
                    <i slot="icon" class="bx bx-check-circle font-size-24" />
                  </MiniStats>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card class="mini-stats-wid">
                <CardBody>
                  <MiniStats name="Pending Courses" stat="12">
                    <i slot="icon" class="bx bx-hourglass font-size-24" />
                  </MiniStats>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card class="mini-stats-wid">
                <CardBody>
                  <MiniStats name="New Converts" stat="2,345">
                    <i slot="icon" class="bx bx-package font-size-24" />
                  </MiniStats>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <div class="mt-4">
            <Tabs {menus}>
              <div slot="id-1">
                <Card>
                  <CardBody>
                    <CardTitle class="mb-4 h4">Converts Stats</CardTitle>
                    <div
                      bind:this={container}
                      id="revenue-chart"
                      class="apex-charts"
                    />
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle class="mb-4 h4">My Courses</CardTitle>
                    <div class="table-responsive">
                      <Table class="table-nowrap table-hover mb-0">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Courses</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">Deadline</th>
                            <th scope="col">Code</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Skote admin UI</td>
                            <td>2 Sep, 2019</td>
                            <td>20 Oct, 2019</td>
                            <td>506</td>
                          </tr>

                          <tr>
                            <th scope="row">2</th>
                            <td>Skote admin Logo</td>
                            <td>1 Sep, 2019</td>
                            <td>2 Sep, 2019</td>
                            <td>94</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Redesign - Landing page</td>
                            <td>21 Sep, 2019</td>
                            <td>29 Sep, 2019</td>
                            <td>156</td>
                          </tr>
                          <tr>
                            <th scope="row">4</th>
                            <td>App Landing UI</td>
                            <td>29 Sep, 2019</td>
                            <td>04 Oct, 2019</td>
                            <td>122</td>
                          </tr>
                          <tr>
                            <th scope="row">5</th>
                            <td>Blog Template</td>
                            <td>05 Oct, 2019</td>
                            <td>16 Oct, 2019</td>
                            <td>164</td>
                          </tr>
                          <tr>
                            <th scope="row">6</th>
                            <td>Redesign - Multipurpose Landing</td>
                            <td>17 Oct, 2019</td>
                            <td>05 Nov, 2019</td>
                            <td>192</td>
                          </tr>
                          <tr>
                            <th scope="row">7</th>
                            <td>Logo Branding</td>
                            <td>04 Nov, 2019</td>
                            <td>05 Nov, 2019</td>
                            <td>94</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div slot="id-2">
                <Card>
                  <CardBody>
                    <CardTitle class="mb-4 h4">About Me</CardTitle>
                    <Row>
                      <Col lg="2">
                        <CardImg
                          src={avatarImg}
                          alt="Beznet"
                          class="rounded avatar-md"
                        />
                      </Col>
                      <Col lg="10"
                        ><p class="text-muted mb-4">
                          Hi I'm Cynthia Price, has been the industry's standard
                          dummy text href an English person, it will seem like
                          simplified English, as a skeptical Cambridge.
                        </p></Col
                      ></Row
                    >
                  </CardBody>
                  <Row>
                    <Col lg="2" />
                    <Col lg="10" />
                  </Row>
                </Card>

                <Row>
                  <Col xs="12">
                    <Card>
                      <CardBody>
                        <CardTitle class="mb-4 h4"
                          >Personal Information</CardTitle
                        >
                        <Info class="mb-3" name="Full Name" bind:edited />
                        <Info class="mb-3" name="Email" bind:edited />
                        <Info class="mb-3" name="Phone" bind:edited />
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xs="12">
                    <Card>
                      <CardBody>
                        <CardTitle class="mb-4 h4"
                          >Personal Information</CardTitle
                        >
                        <div class="table-responsive">
                          <Table class="table-nowrap mb-0">
                            <tbody>
                              <tr>
                                <th scope="row">Full Name :</th>
                                <td>Cynthia Price</td>
                              </tr>
                              <tr>
                                <th scope="row">Mobile :</th>
                                <td>(123) 123 1234</td>
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
            </Tabs>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
{/if}
