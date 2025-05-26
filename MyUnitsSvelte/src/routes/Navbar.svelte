<script lang="ts">
  import { TEXTS, LANGUAGES, type Language } from "../utils/appTexts";

  let {
    lang = $bindable(),
    dark = $bindable(),
  }: {
    lang: Language,
    dark: boolean
  } = $props();
</script>

<main class:dark-mode={dark}>
  <div class="navbar-actions">
    <div class="dark-toggle">
      <button onclick={() => dark = !dark} title={dark ? "Modo claro" : "Modo oscuro"}>
        {dark ? "🌙" : "☀️"}
      </button>
    </div>
    <div class="lang-select">
      <select bind:value={lang}>
        {#each LANGUAGES as language}
          <option value={language.value}>
            {language.flag} {language.code}
          </option>
        {/each}
      </select>
    </div>
  </div>
	<h1>{TEXTS[lang]['appTitle']}</h1>
</main>

<style>
  main {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 1rem;
    align-items: center;
    margin: 1rem 0;
    padding: 1rem 1rem;
    border-bottom: 1px solid #ccc;
  }

  .navbar-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    z-index: 1;
  }

  .lang-select select {
    padding: 0.4rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    background-color: white;
  }

  main.dark-mode .lang-select select {
    background-color: #1e293b;
    color: white;
    border-color: #555;
  }

  .dark-toggle button {
    padding: 0.4rem 0.8rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    background-color: white;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .dark-toggle button:hover {
    background-color: #f0f0f0;
  }

  main.dark-mode .dark-toggle button {
    background-color: #1e293b;
    color: white;
    border-color: #666;
  }

  main.dark-mode .dark-toggle button:hover {
    background-color: #555;
  }

  h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    font-size: 1.5rem;
    white-space: nowrap;
    pointer-events: none;
    z-index: 0;
  }
</style>