<script lang="ts">
  import { TEXTS } from "../utils/appTexts";
  import type { Language } from "../utils/appTexts";
  import { CATEGORIES } from "../utils/unitCategories";
  import type { UnitCategory } from "../utils/unitCategories";

  let {
    category = $bindable(),
    lang,
    dark
  }: {
    category: UnitCategory,
    lang: Language,
    dark: boolean
  } = $props();
</script>

<main>
  <h2>{TEXTS[lang]['selectCategory']}</h2>
  <p>{TEXTS[lang]['categoryDescription']}</p>
  <select bind:value={category}>
    {#each Object.keys(CATEGORIES) as cat}
      <option value={cat}>
        {CATEGORIES[cat as UnitCategory].icon}
        {TEXTS[lang]['categories'][cat as UnitCategory]['name']}
        ({Object.keys(CATEGORIES[cat as UnitCategory]['units']).length}
        {TEXTS[lang]['units']} )
      </option>
    {/each}
  </select>
</main>


<style>
  main {
		width: 60%;
  }
  select {
		padding: 0.5rem;
		border-radius: 0.5rem;
		border: 1px solid #ccc;
		font-size: 1rem;
    width: 100%;
	}
</style>