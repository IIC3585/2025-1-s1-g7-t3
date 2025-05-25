<script lang="ts">
  import { unitCategories, convert } from "./unitConversions";
  import type { UnitCategory } from "./unitConversions";
  import NumDisplay from "./NumDisplay.svelte";

  let CATEGORIES = Object.keys(unitCategories);

  let uState = $state({
    category: 'length' as UnitCategory,
    value: 1,
    from: 'meter',
    to: 'kilometer',
  })

  let result = $derived(convert(uState.value, uState.from, uState.to, uState.category));

  function switcheroo() {
    uState.value = result;

    const temp = uState.from;
    uState.from = uState.to;
    uState.to = temp;
  }
</script>

<header>
  <h1>MyUnits</h1>
  <p>Unit converter</p>
</header>

<main>
  <select bind:value={uState.category}>
    {#each CATEGORIES as category}
      <option value={category}>{category}</option>
    {/each}
  </select>

  <div>
    <NumDisplay bind:value={uState.value} bind:unit={uState.from} category={uState.category} isInput={true}/>
    <button onclick={switcheroo}>
      &lt=&gt
    </button>
    <NumDisplay bind:value={result} bind:unit={uState.to} category={uState.category}/>
  </div>
</main>

<style>
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0;
  }

  header h1, p {
    margin: 0;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  select {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    width: 60%;
  }

  div {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-around;
    width: 60%;
  }

  button {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    cursor: pointer;
    background-color: #f0f0f0;
  }
  button:hover {
    background-color: #e0e0e0;
  }
</style>