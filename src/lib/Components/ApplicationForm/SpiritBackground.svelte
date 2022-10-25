<script lang="ts">
  import { Col, Form, FormGroup, Input, Label, Row } from "sveltestrap";
  import type { Profile } from "$lib/interface/user_interface";
  export let profile: Profile;
  let disabled: boolean;
  let godsWorkings: string[] = [];

  $: profile.godsWorkings = godsWorkings
</script>

{#if profile.id}
  <div>
    <Form>
      <div class="mb-4 ms-3">
        <Label class="text-primary" for="gender-inpu6"
          >Any Spiritual Attributes?</Label
        >
        <FormGroup>
          <Input
            id="r1"
            type="radio"
            bind:group={disabled}
            value={true}
            label="Yes"
          />
          <Input
            id="r2"
            type="radio"
            bind:group={disabled}
            value={false}
            label="No"
          />
        </FormGroup>
      </div>
      <hr />
      <fieldset disabled={!disabled}>
        <FormGroup class="mb-3 ms-3">
          <Row>
            <Col lg="4">
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  bind:group={godsWorkings}
                  value="Bourn Again"
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  Bourn Again
                </label>
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  bind:group={godsWorkings}
                  value="Holygost Baptism"
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  I'm baptized of the Holygost
                </label>
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  bind:group={godsWorkings}
                  value="Water Baptism"
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  I'm baptized of water
                </label>
              </div>
            </Col>
            <Col lg="4">
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  bind:group={godsWorkings}
                  value="Speak in Tongues"
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  I Speak in Tongues
                </label>
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  bind:group={godsWorkings}
                  value="Spiritual Gift"
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  I have at least one spiritual gift
                </label>
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  bind:group={godsWorkings}
                  value="Involved with a Church"
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  I'm involved with a church
                </label>
              </div>
            </Col>
            <Col lg="4">
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  bind:group={godsWorkings}
                  value="Called of God"
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  I'm called of God
                </label>
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  bind:group={godsWorkings}
                  value="Into Ministry"
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  I'm into ministry
                </label>
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  bind:group={godsWorkings}
                  value="Baptized"
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  I'm Baptized
                </label>
              </div>
            </Col>
          </Row>
        </FormGroup>
      </fieldset>
      <Row>
        <Col lg="12">
          <FormGroup floating label="Salvation Experience">
            <textarea
              style="height: 100px"
              id="salvationExp"
              class="form-control"
              rows="2"
              placeholder="Salvation Experience"
              bind:value={profile.salvationBrief}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <FormGroup floating label="Reason for Applying">
            <textarea
              style="height: 100px"
              id="reason"
              class="form-control"
              rows="2"
              placeholder="Reason for Applying"
              bind:value={profile.reason}
            />
          </FormGroup>
        </Col>
      </Row>
      <hr />
      <p class="text-muted mb-4">The following fields are optional</p>
      <Row>
        <Col lg="4">
          <FormGroup floating label="Pastor's Fullname">
            <Input
              type="text"
              class="form-control"
              id="pastorName"
              placeholder="First Name"
              bind:value={profile.pastorName}
            />
          </FormGroup>
        </Col>
        <Col lg="4">
          <FormGroup floating label="Pastor's Email">
            <Input
              type="text"
              class="form-control"
              id="pastorEmail"
              placeholder="Last Name"
              bind:value={profile.pastorEmail}
            />
          </FormGroup>
        </Col>
        <Col lg="4">
          <FormGroup floating label="Pastor's Phone Number">
            <Input
              type="text"
              class="form-control"
              id="pastorPhone"
              placeholder="Middle Name"
              bind:value={profile.pastorPhone}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          <FormGroup floating label="Name of Ministry">
            <Input
              type="text"
              class="form-control"
              id="churchName"
              placeholder="Name of Ministry"
              bind:value={profile.churchName}
            />
          </FormGroup>
        </Col>
        <Col lg="6">
          <FormGroup floating label="Ministry Address">
            <textarea
              rows="1"
              class="form-control"
              id="churchAddress"
              placeholder="Ministry Address"
              bind:value={profile.churchAddress}
            />
          </FormGroup>
        </Col>
      </Row>
    </Form>
  </div>
{/if}
