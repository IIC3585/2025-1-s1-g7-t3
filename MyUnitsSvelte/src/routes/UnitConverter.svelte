<script lang="ts">
  import { TEXTS } from "../utils/appTexts";
  import type { Language } from "../utils/appTexts";
  import { CATEGORIES } from "../utils/unitCategories";
  import type { UnitCategory, UnitName } from "../utils/unitCategories";

  import NumDisplay from "./NumDisplay.svelte";

  let {
    value = $bindable(),
    result = $bindable(),
    from = $bindable(),
    to = $bindable(),
    category,
    lang,
    dark
  }: {
    value: number,
    result: number,
    from: UnitName,
    to: UnitName,
    category: UnitCategory,
    lang: Language,
    dark: boolean
  } = $props();

  function switcheroo() {
		value = result;

		const temp = from;
		from = to;
		to = temp;
	}
</script>

<main class:dark-mode={dark}>
  <div class="header">
    <h2>
      <span class="icon">{CATEGORIES[category].icon}</span>
      {TEXTS[lang].categories[category].name}
    </h2>
    <p>{TEXTS[lang].categories[category].description}</p>
  </div>
  <div class="convertor">
    <NumDisplay
      bind:value={value}
      bind:unit={from}
      category={category}
      isInput={true}
      {lang}
      {dark}
    />
    <button onclick={switcheroo}> &lt=&gt </button>
    <NumDisplay
      value={result}
      bind:unit={to}
      category={category}
      {lang}
      {dark}
    />
  </div>
</main>


<style>
  main {
    width: 60%;
    border: #ccc 1px solid;
    border-radius: 0.5rem;
    padding: 1rem;
    transition: background-color 0.3s ease;
  }
  main.dark-mode {
    background-color: #1e293b;
    color: white;
  }
  div.header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }
  div.header h2 {
    margin: 0;
  }
  div.convertor {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: space-around;
		width: 100%;
	}

	button {
		padding: 0.5rem;
		border-radius: 0.5rem;
		border: 1px solid #ccc;
		font-size: 1rem;
		cursor: pointer;
		background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
	}
	button:hover {
		background-color: #e0e0e0;
	}
</style>