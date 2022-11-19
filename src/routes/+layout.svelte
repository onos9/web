<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import "$lib/assets/css/app-dark.min.css";
  import "$lib/assets/css/bootstrap-dark.min.css";
  import "$lib/assets/css/custom.css";
  import "$lib/assets/css/icons.min.css";

  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import Auth from "$lib/graphql/auth";
  import { auth } from "$lib/helpers/store";
  import VerticalLayout from "../routes/VerticalLayout/Index.svelte";
  import { onMount } from "svelte";
  import { setLocale } from "$lib/helpers/i18n";

  const publicRoutes = [
    "/login",
    "/signup",
    "/signup/register",
    "/signup/verify",
    "/signup/program",
    "/signup/upload",
  ];

  let slug: string;
  $: slug = $page.params.slug;

  $: {
  }
  onMount(() => {
    setLocale();
    if (
      (browser && !publicRoutes.includes($page.url.pathname)) ||
      slug == "program"
    )
      Auth.queryPublic("refresh", {});
  });
</script>

{#if $auth.loggedIn && slug != "program"}
  <svelte:component this={VerticalLayout}>
    <slot />
  </svelte:component>
{:else if publicRoutes.includes($page.url.pathname)}
  <slot />
{:else}
  <slot />
{/if}

<style global>
  .form-floating > .form-control,
  .form-floating > .form-select {
    height: calc(2.5em + 12px);
    padding-top: 0;
    line-height: 2.25;
  }

  .form-switch .form-check-input {
    width: 2.5em;
  }

  .border-dashed {
    border-style: dashed !important;
    border-color: var(--kt-border-dashed-color);
  }
</style>
