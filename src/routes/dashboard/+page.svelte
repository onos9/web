<script>
  import { browser } from "$app/environment";
  import user from "$lib/graphql/user";
  import { auth, userData } from "$lib/helpers/store";
  import Dashboard from "./index.svelte";

  $: if (browser && !$userData.user?.id)
    user.query("user", { id: $auth.cred?.id });
  // $: console.log("$userData.user.id");
</script>

{#if $userData.user?.id}
  <Dashboard />
{/if}
