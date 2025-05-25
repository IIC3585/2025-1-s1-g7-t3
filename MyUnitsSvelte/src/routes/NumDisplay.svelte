<script lang="ts">
  import { unitCategories } from "./unitConversions";
  import type { UnitCategory } from "./unitConversions";

  let {
    value = $bindable(),
    unit = $bindable(),
    category,
    isInput
  }: {
    value: number,
    unit: string,
    category: UnitCategory,
    isInput?: boolean
  } = $props();

  let units = $derived(Object.keys(unitCategories[category]));

  $effect(() => {
    unit = isInput ? units[0]: units[1];
  })

  let copied = $state(false);
  async function copyToClipboard() {
    await navigator.clipboard.writeText(value.toString());
    copied = true;
    setTimeout(() => copied = false, 1000);
  }
</script>

<div>
  {#if isInput}
    <input type="number" bind:value={value} step="any" />
  {:else}
    <button
      type="button"
      onclick={copyToClipboard}
      class:copied={copied}
      class="copy-button"
      title="Copy to clipboard"
    >
    <strong>
      {value}
    </strong>
    </button>
  {/if}
  <select bind:value={unit}>
    {#each units as u}
      <option value={u}>{u}</option>
    {/each}
  </select>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  input {
    padding: 0.5rem 0 0.5rem 0;
    text-align: center;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    width: 100%;
  }

  button {
    padding: 0.5rem;
    text-align: center;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    width: 100%;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease;
  }

  button:hover {
    background-color: #f0f0f0;
  }

  button.copied {
    background-color: #d0ffd0;
    border-color: #80c080;
  }

  select {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    width: 100%;
  }
</style>