<script lang="ts">
  import Toolbar from "./components/toolbar.svelte";
  import { loadProject, project } from "./stores/projectStore";
  import { onMount } from "svelte";

  onMount(() => {
    //load stores
    loadProject();
  });
</script>

<main>
  <Toolbar />
</main>

<style>

</style>
