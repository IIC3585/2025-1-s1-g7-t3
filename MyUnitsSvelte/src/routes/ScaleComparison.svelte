<script lang="ts">
  import { TEXTS, type Language, type ScaleItemType } from "../utils/appTexts";
  import { SCALES, type ScaleCategory} from "../utils/scaleItems";
	import type { UnitName } from "../utils/unitCategories";
  import { CONVERSIONS, convert } from "../utils/unitConversions";

  let {
    value = $bindable(),
    unit = $bindable(),
    category,
    lang,
    dark
  }: {
    value: number,
    unit: UnitName,
    category: ScaleCategory,
    lang: Language,
    dark: boolean
  } = $props();

  let baseUnit = $derived(Object.keys(CONVERSIONS[category])[0] as UnitName);
  let convertedValue = $derived(convert(value, unit, baseUnit, category));

  function handleItemClick(threshold: number) {
    unit = baseUnit;
    value = threshold;
  }
</script>

<main class:dark-mode={dark}>
  <h2>{TEXTS[lang].scaleComparison}</h2>
  <div class="scale-items">
    {#each SCALES[category] as item}
    <button
      class="item-box"
      class:active={convertedValue >= item.threshold}
      onclick={() => handleItemClick(item.threshold)}
    >
      {item.icon}
      <span>{TEXTS[lang].scaleItems[item.name as ScaleItemType]}</span>
      <small>{item.value}</small>
    </button>
    {/each}
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
  div.scale-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  button.item-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    background-color: #f9fafb;
    border: 2px solid #eaecef;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease;
  }
  button.item-box:hover {
  cursor: pointer;
}
  button.item-box.active {
    background-color: #eff6ff;
    border-color: #5998e6;
  }
  main.dark-mode button.item-box {
    background-color: #374151;
    border-color: #46505e;
  }
  main.dark-mode button.item-box.active {
    background-color: #1e3a8a;
  }
  small {
    font-size: 0.75rem;
    color: #6b7280;
  }
</style>