<script lang="ts">
    import tl_logo from "../assets/logo.svg";
    import { onMount } from "svelte";
    import { project, updateTitle, loadProject } from "../stores/projectStore";
    import MenuIcon from "../icons/menuIcon.svelte";

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
    <div class="nav">
        <button class="toolbar-nav-con">
            <MenuIcon size={48} />
        </button>
    </div>
    <div class="title">
        {#if editing}
            <input bind:value={newTitle} on:blur={commitEdit} />
        {:else}
            <span on:click={startEditing}>
                {$project?.title ?? "Loading..."}
            </span>
        {/if}
    </div>
    <img src={tl_logo} alt="logo" class="logo" />
</div>

<style>
    div.toolbar {
        display: flex;
        flex-direction: row;
        flex: 0 0 100%;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        height: 75px;

        border: 10px solid red;
    }

    button.toolbar-nav-con {
        color: var(--accent-color);
        background-color: transparent;
    }
    .toolbar .title {
        font-size: 36px;
    }
</style>
