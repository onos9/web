<script lang="ts">
  import { page } from "$app/stores";
  import Prospective from "./Prospective.svelte";
  import UserDetail from "./UserDetail.svelte";
  let slug: string;

  $: slug = $page.params.slug;
</script>

<div>
  {#if slug == "prospectives"}
    <Prospective />
  {:else}
    <UserDetail />
  {/if}
</div>
