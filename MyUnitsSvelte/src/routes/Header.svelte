<script lang="ts">
  import { TEXTS } from "../utils/appTexts";
  import type { Language } from "../utils/appTexts";

  let {
    lang = $bindable(),
    dark = $bindable(),
  }: {
    lang: Language,
    dark: boolean
  } = $props();
</script>

<div>
	<h1>{TEXTS[lang]['appTitle']}</h1>
</div>

<style>
  div {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 2rem 0;
	}

	h1 {
		margin: 0;
	}
</style>