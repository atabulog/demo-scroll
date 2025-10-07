<script lang="ts">
    import tl_logo from "../assets/logo.svg";
    import { get } from "svelte/store";
    import { project, updateTitle } from "../stores/projectStore";

    let editing = false;
    let newTitle = "";

    // Start editing
    function startEditing() {
        newTitle = $project?.title ?? "";
        editing = true;
    }

    // Commit edit when Enter pressed or focus lost
    async function commitEdit() {
        editing = false;
        const trimmed = newTitle.trim();
        if (trimmed && trimmed !== get(project)?.title) {
            await updateTitle(trimmed);
        }
    }

    // Handle Enter key
    function handleKey(e: KeyboardEvent) {
        if (e.key === "Enter") {
            commitEdit();
        } else if (e.key === "Escape") {
            editing = false;
        }
    }
</script>

<div class="toolbar">
    <div class="nav"></div>
    <div class="title" title="click to edit">
        {#if editing}
            <input
                bind:value={newTitle}
                on:blur={commitEdit}
                on:keydown={handleKey}
                autofocus
            />
        {:else}
            <span on:click={startEditing}>
                {$project?.title ?? "New Project"}
            </span>
        {/if}
    </div>
    <img src={tl_logo} alt="logo" class="logo" />
</div>

<style>
</style>
