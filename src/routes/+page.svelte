<script>
  import { browser } from "$app/environment";
  import user from "$lib/graphql/user";
  import { auth, userData } from "$lib/helpers/store";
  import Dashboard from "./dashboard/index.svelte";

  $: if (browser && !$userData.user?.id) user.query("user", { id: $auth.cred?.id });
</script>

{#if $userData.user?.id}
  <Dashboard />
{/if}
