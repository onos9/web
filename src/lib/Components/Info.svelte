<script lang="ts">
  let className = "";
  export { className as class };
  export let name: string = "Phone";
  export let value: string = "+2348096041650";
  export let icon: string = "bx bx-pencil";
  export let edited: string;

  let isEdit: boolean = false;
  $: isEdit = edited != name ? false : true;
</script>

<div class={`${className} d-flex flex-row `}>
  <i class="bx bx-phone text-primary font-size-20" />
  <div class="ms-3  flex-grow-1">
    <h5 class="font-size-14">{name}</h5>
    <p class="text-muted">
      {value}
    </p>
    <input
      hidden={!isEdit}
      type="text"
      class="form-control"
      on:blur={() => (isEdit = false)}
      bind:value
    />
  </div>
  <a
    href="/"
    on:click|preventDefault={() => {
      edited = name;
      isEdit = !isEdit;
    }}
  >
    <i class={`${icon} text-primary ms-1`} />
  </a>
</div>
