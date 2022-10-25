<script lang="ts">
  import { browser } from "$app/environment";
  import type { Profile } from "$lib/interface/user_interface";
  import { Col, Form, FormGroup, Input, Label, Row } from "sveltestrap";
  export let profile: Profile;
  let disabled: boolean;
  let healthConditions: string[] = [];

  $: profile.healthConditions = healthConditions
</script>

<div>
  <Form>
    <div class="mb-4 ms-3">
      <Label class="text-primary" for="gender-inpu6">
        Any Health Challenges?</Label
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
                bind:group={healthConditions}
                value="Disability"
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                I have a disability
              </label>
            </div>
            <div class="form-check mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                bind:group={healthConditions}
                value="Nervous illness"
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                I have a Nervous illness
              </label>
            </div>
            <div class="form-check mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                bind:group={healthConditions}
                value="Anorexia"
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                I have a Anorexia
              </label>
            </div>
            <div class="form-check mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                bind:group={healthConditions}
                value="Had Surgery"
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                have had a surgery
              </label>
            </div>
          </Col>
          <Col lg="4">
            <div class="form-check mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                bind:group={healthConditions}
                value="Diabetese"
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                I'm Diabetic
              </label>
            </div>
            <div class="form-check mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                bind:group={healthConditions}
                value="Epilepsy"
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                I'm Epileptic
              </label>
            </div>
            <div class="form-check mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                bind:group={healthConditions}
                value="Stomach Ulcer"
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                I have stomach ulcers
              </label>
            </div>
            <div class="form-check mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                bind:group={healthConditions}
                value="Drug Addiction"
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                I'm addicted to drugs
              </label>
            </div>
          </Col>
          <Col lg="4">
            <div class="form-check mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                bind:group={healthConditions}
                value="Eat Special Diet"
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                I eat special diet
              </label>
            </div>
            <div class="form-check mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                bind:group={healthConditions}
                value="Learning disability"
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                I have learning disability
              </label>
            </div>
            <div class="form-check mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                bind:group={healthConditions}
                value="Used Illigal Drug"
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                I have used illigal drug
              </label>
            </div>
          </Col>
        </Row>
      </FormGroup>

      <Row>
        <Col lg="12">
          <FormGroup floating label="Other Health Issues Description">
            <textarea
              style="height: 100px"
              id="address-input1"
              class="form-control"
              rows="3"
              placeholder="Other Health Issues Description"
              bind:value={profile.healthIssueDescription}
            />
          </FormGroup>
        </Col>
      </Row>
    </fieldset>
  </Form>
</div>
