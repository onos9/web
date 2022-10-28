<script lang="ts">
  import { browser } from "$app/environment";
  import user from "$lib/graphql/user";
  import { auth, userData } from "$lib/helpers/store";
  import {
    Card,
    CardBody,
    CardTitle,
    Col,
    Dropdown,
    DropdownMenu,
    DropdownToggle,
    Modal,
    Row,
    Table,
  } from "sveltestrap";
  import Dropzone from "svelte-file-dropzone";
  import file from "$lib/graphql/file";
  import { onMount } from "svelte";
  import { formatDate } from "$lib/helpers/utils";

  let documents: any;
  let isOpen = false;

  let uploaded: any;
  let title: string;
  let category: string;

  $: if (browser && $auth.loggedIn) {
    localStorage.auth = JSON.stringify($auth);
  }
  // $: user.query("user", { id: $auth.cred?.id });

  const toggle = () => (isOpen = !isOpen);

  const onFileSelected = (e: any) => {
    uploaded = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(uploaded);
    reader.onload = (e: any) => {
      let preview = e.target.result;
    };
  };

  const handleSubmit = () => {
    let payload = { userId: $auth.cred?.id, title, category, file: null };
    file.query("create", payload, uploaded);
    isOpen = !isOpen;
  };

  const getDocuments = async () => {
    const { data } = await file.query("files", {});
    documents = data.files;
  };

  $: if (!documents) getDocuments();
  // $: console.log(documents);

  const fileIcons = {
    zip: "mdi mdi-folder-zip font-size-16 align-middle text-warning me-2",
    image: "mdi mdi-image font-size-16 align-middle text-muted me-2",
    msword: "mdi-file-word font-size-16 align-middle text-muted me-2",
    text: "mdi mdi-text-box font-size-16 align-middle text-muted me-2",
    folder: "mdi mdi-folder font-size-16 align-middle text-warning me-2",
    file: "bx bxs-file font-size-16 align-middle text-primary me-2",
    pdf: "mdi-file-pdf font-size-16 align-middle text-primary me-2",
  };
</script>

<div>
  <Row>
    <Col lg={12}>
      <div class="mb-4 float-end">
        <button type="button" class="btn btn-primary btn-md" on:click={toggle}>
          <i class="bx bx-plus ms-1" />
          Add Document
        </button>
      </div>
    </Col>
  </Row>
  {#if documents}
    <Row>
      <Col lg={12}>
        <Card>
          <CardBody>
            <div class="d-flex flex-wrap">
              <h5 class="font-size-16 me-3">Documents</h5>
              <div class="ms-auto">
                <Dropdown>
                  <DropdownToggle
                    color=""
                    class="fw-medium text-reset text-muted dropdown-toggle"
                    tag="a"
                  >
                    <i class="bx bx-filter-alt" /> Category
                  </DropdownToggle>

                  <DropdownMenu direction="right" class="dropdown-menu-end">
                    <a class="dropdown-item" href={"#"}>Application</a>
                    <a class="dropdown-item" href={"#"}>School</a>
                    <a class="dropdown-item" href={"#"}>Accommodation</a>
                    <a class="dropdown-item" href={"#"}>ID</a>
                    <a class="dropdown-item" href={"#"}>SSCE</a>
                    <a class="dropdown-item" href={"#"}>Degree</a>
                    <a class="dropdown-item" href={"#"}>Transcript</a>
                    <!-- <a class="dropdown-item" href={"#"}>Others</a> -->
                    <div class="dropdown-divider" />
                    <a class="dropdown-item" href={"#"}>All</a>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <hr class="mt-2" />

            <div class="table-responsive">
              <Table class="table align-middle table-nowrap table-hover mb-0">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Date Uploaded</th>
                    <th scope="col" colSpan="2"> Size </th>
                  </tr>
                </thead>
                <tbody>
                  {#each documents as recentfile}
                    <tr>
                      <td>
                        <a href={"#"} class="text-dark fw-medium">
                          <i
                            class={"bx bxs-file font-size-16 align-middle text-primary me-2"}
                          />
                          {recentfile.filename}
                        </a>
                      </td>
                      <td>{recentfile.category}</td>
                      <td>{formatDate(recentfile.updatedAt)}</td>
                      <td>{recentfile.size / 1000} KB</td>
                      <td>
                        <Dropdown>
                          <DropdownToggle
                            color=""
                            class="font-size-16 text-muted dropdown-toggle"
                            tag="a"
                          >
                            <i class="mdi mdi-dots-horizontal" />
                          </DropdownToggle>

                          <DropdownMenu
                            direction="right"
                            class="dropdown-menu-end"
                          >
                            <a class="dropdown-item" href={"#"}>Open</a>
                            <a class="dropdown-item" href={"#"}>Edit</a>
                            <a class="dropdown-item" href={"#"}>Rename</a>
                            <div class="dropdown-divider" />
                            <a class="dropdown-item" href={"#"}>Remove</a>
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  {/if}
</div>

<Modal
  backdrop="static"
  header="Add Document"
  size="md"
  {isOpen}
  {toggle}
  body
  centered
>
  <form>
    <div class="row ps-5 pe-5">
      <div class="col-lg-12">
        <div class="form-group mb-3">
          <select
            bind:value={category}
            id="basicpill-namecard-input"
            class="form-select"
          >
            <option>Select Category</option>
            <option value="Application">Proof of Application Fee</option>
            <option value="School">Proof of School Fee</option>
            <option value="Accommodation">Proof of Accommodation Fee</option>
            <option>Official ID</option>
            <option value="SSCE">Secondary School Certificate</option>
            <option value="Degree">Barchelor’s Degree</option>
            <option>Transcript</option>
            <option>Others</option>
          </select>
        </div>
        <div class="form-group mb-3">
          <input
            class="form-control"
            type="file"
            id="formFile"
            on:change={(e) => onFileSelected(e)}
          />
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
