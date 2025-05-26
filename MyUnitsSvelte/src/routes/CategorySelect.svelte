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

  let state = $state({
    isOpen: false,
    selectedIndex: 0
  })

  const categories = Object.keys(CATEGORIES) as UnitCategory[];

  function toggle() {
    state.isOpen = !state.isOpen;
  }

  function close() {
    state.isOpen = false;
  }

  function select(index: number) {
    state.selectedIndex = index;
    category = categories[index];
    close();
  }

  function onKeyDown(event: KeyboardEvent) {
    if (!state.isOpen && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      state.isOpen = true;
    } else if (state.isOpen) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        state.selectedIndex = (state.selectedIndex + 1) % categories.length;
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        state.selectedIndex = (state.selectedIndex - 1 + categories.length) % categories.length;
      } else if (event.key === "Enter") {
        event.preventDefault();
        select(state.selectedIndex);
      } else if (event.key === "Escape") {
        close();
      }
    }
  }

  $effect(() => {
    // Inicializar el índice seleccionado con la categoría actual
    state.selectedIndex = categories.findIndex(c => c === category);
  })

</script>

<main class:dark-mode={dark}>
  <div class="header">
    <h2>{TEXTS[lang]['selectCategory']}</h2>
    <p>{TEXTS[lang]['categoryDescription']}</p>
  </div>
  <div class="custom-select" tabindex="0" onblur={close} onkeydown={onKeyDown}>
    <div class="selected-option" onclick={toggle}>
      <span class="icon">{CATEGORIES[category].icon}</span>
      <div class="info">
        <strong>{TEXTS[lang].categories[category].name}</strong>
        <small>
          ({Object.keys(CATEGORIES[category].units).length} {TEXTS[lang].units})
        </small>
      </div>
      <span class="arrow">{state.isOpen ? "▲" : "▼"}</span>
    </div>
  
    {#if state.isOpen}
      <ul class="options">
        {#each categories as cat, i}
          <li
            class:selected={i === state.selectedIndex}
            onclick={() => select(i)}
          >
            <span class="icon">{CATEGORIES[cat].icon}</span>
            <div class="info">
              <strong>{TEXTS[lang].categories[cat].name}</strong>
              <small>
                ({Object.keys(CATEGORIES[cat].units).length} {TEXTS[lang].units})
              </small>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</main>



<style>
  main {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    text-align: center;
  }
  div.header h2 {
    margin: 0;
  }
  .custom-select {
    position: relative;
    width: 100%;
    max-width: 600px;
    outline: none;
  }

  .selected-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    cursor: pointer;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    font-size: 1rem;
  }

  .arrow {
    font-size: 0.8rem;
    opacity: 0.6;
  }

  .options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    margin-top: 0.25rem;
    padding: 0;
    list-style: none;
    max-height: 240px;
    overflow-y: auto;
    z-index: 10;
  }

  .options li {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  main.dark-mode .options {
    background-color: #323c4c;
    color: white;
  }

  .options li:hover,
  .options li.selected {
    background-color: #3b82f6;
  }

  .icon {
    font-size: 1.5rem;
    line-height: 1;
    flex-shrink: 0;
  }

  .info {
    display: flex;
    flex-direction: column;
  }

  .info strong {
    font-weight: 600;
  }

  .info small {
    font-size: 0.85rem;
    opacity: 0.7;
  }
</style>