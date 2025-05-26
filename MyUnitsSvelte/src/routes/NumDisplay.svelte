<script lang="ts">
  import { CONVERSIONS } from "../utils/unitConversions";
  import { CATEGORIES, type UnitCategory, type UnitName } from "../utils/unitCategories";
	import { TEXTS, type Language } from "../utils/appTexts";

  let {
    value = $bindable(),
    unit = $bindable(),
    category,
    isInput,
    lang,
    dark
  }: {
    value: number,
    unit: UnitName,
    category: UnitCategory,
    isInput?: boolean,
    lang: Language,
    dark: boolean
  } = $props();

  let units = $derived(Object.keys(CONVERSIONS[category]));

  $effect(() => {
    unit = isInput ? (units[0]) as UnitName: (units[1]) as UnitName;
  })

  let copied = $state(false);
  async function copyToClipboard() {
    await navigator.clipboard.writeText(value.toString());
    copied = true;
    setTimeout(() => copied = false, 1000);
  }
</script>

<main class:dark-mode={dark}>
  {#if isInput}
    <input type="number" bind:value={value} step="any" />
  {:else}
    <div class="copy-container">
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
      {#if copied}
        <span class="copied-tooltip">Copied to clipboard :)</span>
      {/if}
    </div>
  {/if}
  <select bind:value={unit}>
    {#each units as u}
      <option value={u}>{TEXTS[lang].unitNames[u as UnitName]} ({CATEGORIES[category].units[u as UnitName]})</option>
    {/each}
  </select>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    width: 40%;
  }

  input {
    padding: 0.5rem 0;
    text-align: center;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    width: 100%;
  }

  .copy-container {
    position: relative;
    width: 100%;
  }

  .copy-button {
    all: unset;
    display: block;
    width: 100%;
    padding: 0.5rem 0;
    text-align: center;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease;
  }

  main.dark-mode .copy-button:hover {
    background-color: #323c4c;
  }

  .copy-button:hover {
    background-color: #f0f0f0;
  }

  .copy-button.copied {
    background-color: #5398f9;
    border-color: #275fe2;
  }

  .copied-tooltip {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -160%);
    background-color: #333;
    color: white;
    padding: 0.3rem 0.6rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    pointer-events: none;
    opacity: 0.9;
    white-space: nowrap;
    z-index: 10;
  }

  select {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    width: 100%;
  }
</style>