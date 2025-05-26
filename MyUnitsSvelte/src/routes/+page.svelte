<script lang="ts">
	import { convert } from '../utils/unitConversions';
	import type { UnitCategory, UnitName } from '../utils/unitCategories';
  import type { Language } from '../utils/appTexts';
	import { type ScaleCategory, ScalarCategories } from '../utils/scaleItems';

  import NavBar from './Navbar.svelte';
  import CategorySelect from './CategorySelect.svelte';
	import UnitConverter from './UnitConverter.svelte';
  import ScaleComparison from './ScaleComparison.svelte';

	let appState = $state({
		category: 'length' as UnitCategory,
		value: 1,
		from: 'meter' as UnitName,
		to: 'kilometer' as UnitName,
    lang: 'en' as Language,
    dark: false,
	});

	let result = $derived(convert(appState.value, appState.from, appState.to, appState.category));
</script>

<svelte:head>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    body.dark-mode {
      background-color: #0f172a;
      color: white;
    }
  </style>
</svelte:head>

<main class:dark-mode={appState.dark}>
  <NavBar bind:lang={appState.lang} bind:dark={appState.dark} />

  <div>
    <CategorySelect bind:category={appState.category} lang={appState.lang} dark={appState.dark} />
    <UnitConverter
      bind:value={appState.value}
      bind:result={result}
      bind:from={appState.from}
      bind:to={appState.to}
      category={appState.category}
      lang={appState.lang}
      dark={appState.dark}
    />
    {#if appState.category in ScalarCategories}
    <ScaleComparison
      bind:value={appState.value}
      bind:unit={appState.from}
      category={appState.category as ScaleCategory}
      lang={appState.lang}
      dark={appState.dark}
    />
    {/if}
  </div>
</main>


<style>
  main {
    min-height: 100vh;
    padding: 0.125rem 1rem;
    box-sizing: border-box;
    transition: background-color 0.3s ease;
  }

  main.dark-mode {
    background-color: #0f172a;
    color: white;
  }

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
</style>
