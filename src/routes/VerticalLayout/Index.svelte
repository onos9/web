<script>
  import Navbar from "./Navbar.svelte";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import Rightbar from "$lib/Components/Rightbar.svelte";
  import {
    addMessages,
    dictionary,
    getLocaleFromNavigator,
    init,
  } from "svelte-i18n";
  import en from "$lib/lang/en.json";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  let open = false;
  if (browser) {
    dictionary.subscribe((lc) => {
      // console.log(lc);
    });
  }
  addMessages("en", en);
  init({
    fallbackLocale: "en",
    initialLocale: getLocaleFromNavigator(),
  });
</script>

<div id="layout-wrapper">
  <Header bind:sidebar={open} />
  <Navbar />
  <div class="main-content" id="maincontent">
    <slot />
  </div>
  <Footer />

  <Rightbar layout="vertical" bind:open />
</div>
