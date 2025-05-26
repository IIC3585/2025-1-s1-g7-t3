<script lang="ts">
	import { CONVERSIONS, convert } from '../utils/unitConversions';
	import type { UnitCategory } from '../utils/unitCategories';
	import { TEXTS } from '../utils/appTexts';
  import type { Language } from '../utils/appTexts';

  import Header from './Header.svelte';
  import CategorySelect from './CategorySelect.svelte';
	import NumDisplay from './NumDisplay.svelte';

	let appState = $state({
		category: 'length' as UnitCategory,
		value: 1,
		from: 'meter',
		to: 'kilometer',
    lang: 'en' as Language,
    dark: false,
	});

	let result = $derived(convert(appState.value, appState.from, appState.to, appState.category));

	function switcheroo() {
		appState.value = result;

		const temp = appState.from;
		appState.from = appState.to;
		appState.to = temp;
	}
</script>

<Header bind:lang={appState.lang} bind:dark={appState.dark} />

<main>
	<CategorySelect bind:category={appState.category} lang={appState.lang} dark={appState.dark} />

	<div>
		<NumDisplay
			bind:value={appState.value}
			bind:unit={appState.from}
			category={appState.category}
			isInput={true}
		/>
		<button onclick={switcheroo}> &lt=&gt </button>
		<NumDisplay
      bind:value={result}
      bind:unit={appState.to}
      category={appState.category}
    />
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
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
