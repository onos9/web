<script lang="ts">
  import { browser } from "$app/environment";
  import user from "$lib/graphql/user";
  import { auth, userData } from "$lib/helpers/store";
  import { onMount } from "svelte";
  import Dashboard from "./dashboard/index.svelte";
  import type { RequiredKeys, UserData } from "$lib/interface/user_interface";

  $: if (browser && !$userData.user?.id)
    user.query("user", { id: $auth.cred?.id });

  onMount(() => {});
</script>

{#if $userData.user?.id}
  <Dashboard />
{/if}
