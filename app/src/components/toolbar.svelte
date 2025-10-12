<script lang="ts">
    import tl_logo from "../assets/logo.svg";
    import { onMount } from "svelte";
    import { project, updateTitle, loadProject } from "../stores/projectStore";

    let editing = false;
    let newTitle = "";

    onMount(() => {
        loadProject(); // only triggers once due to guard
    });

    // Start editing
    function startEditing() {
        newTitle = $project?.title ?? "";
        editing = true;
    }

    // Commit edit when Enter pressed or focus lost
    async function commitEdit() {
        if (newTitle.trim() && newTitle !== $project?.title) {
            await updateTitle(newTitle.trim());
        }
        editing = false;
    }
</script>

<div class="toolbar">
    <div class="nav"></div>
    <div class="title">
        {#if editing}
            <input bind:value={newTitle} on:blur={commitEdit} />
        {:else}
            <span on:click={startEditing}>
                {$project?.title ?? "Loading..."}
            </span>
        {/if}
    </div>
    <div class="version">V:{$project?.version ?? "--"}</div>
    <img src={tl_logo} alt="logo" class="logo" />
</div>

<style>
</style>
