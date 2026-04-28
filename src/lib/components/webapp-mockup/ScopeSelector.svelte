<script lang="ts">
  /**
   * Near-byte port of webapp/src/components/SlidingSelector.svelte.
   * BEM classnames + CSS preserved verbatim so the visuals match the
   * real product. The only intentional divergence: this mirror uses
   * `var(--color-bg-secondary-solid)` for the track background (the
   * marketing site exposes the solid variant, not the rgba one used by
   * the webapp).
   */

  interface Props {
    values: string[]
    selectedValueIndex: number
    onSelect: (value: string) => void
    ariaLabel?: string
    disabled?: boolean
  }

  let {
    values,
    selectedValueIndex,
    onSelect,
    ariaLabel = 'Selector',
    disabled = false,
  }: Props = $props()

  const fillPercentage = $derived.by(() => {
    const n = values.length
    const i = selectedValueIndex
    return ((i + 1) / n) * 100
  })

  function handleKeydown(event: KeyboardEvent) {
    if (disabled) return
    if (event.key === 'ArrowRight' && selectedValueIndex < values.length - 1) {
      event.preventDefault()
      onSelect(values[selectedValueIndex + 1])
    } else if (event.key === 'ArrowLeft' && selectedValueIndex > 0) {
      event.preventDefault()
      onSelect(values[selectedValueIndex - 1])
    }
  }
</script>

<div
  class="sliding-selector"
  class:sliding-selector--disabled={disabled}
  role="radiogroup"
  aria-label={ariaLabel}
  aria-disabled={disabled}
>
  <!-- Gradient fill track -->
  <div class="sliding-selector__track">
    <div
      class="sliding-selector__fill"
      style="width: {fillPercentage}%"
    >
      <div
        class="sliding-selector__gradient"
        style="width: {fillPercentage > 0 ? 100 / (fillPercentage / 100) : 100}%"
      ></div>
    </div>
  </div>

  <!-- Pill buttons -->
  <div class="sliding-selector__pills">
    {#each values as value, index (value)}
      {@const isSelected = index === selectedValueIndex}
      {@const isCovered = index <= selectedValueIndex}
      <button
        class="sliding-selector__pill"
        class:sliding-selector__pill--selected={isSelected}
        class:sliding-selector__pill--covered={isCovered && !isSelected}
        class:sliding-selector__pill--uncovered={!isCovered}
        role="radio"
        aria-checked={isSelected}
        tabindex={isSelected ? 0 : -1}
        {disabled}
        onclick={() => {
          if (!disabled) onSelect(values[index])
        }}
        onkeydown={handleKeydown}
      >
        <span class="sliding-selector__label">{value}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .sliding-selector {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .sliding-selector--disabled {
    opacity: 0.5;
  }

  .sliding-selector--disabled .sliding-selector__pill {
    cursor: not-allowed;
  }

  .sliding-selector--disabled .sliding-selector__pill:hover {
    background-color: transparent;
  }

  .sliding-selector--disabled .sliding-selector__pill--covered:hover {
    background-color: transparent;
    border-color: rgba(13, 148, 136, 0.2);
  }

  .sliding-selector--disabled .sliding-selector__pill--uncovered:hover {
    background-color: transparent;
    border-color: transparent;
  }

  :global(.dark) .sliding-selector--disabled .sliding-selector__pill--covered:hover {
    background-color: transparent;
    border-color: rgba(20, 184, 166, 0.15);
  }

  .sliding-selector--disabled .sliding-selector__pill--uncovered:hover .sliding-selector__label {
    opacity: 0.7;
  }

  /* Track */
  .sliding-selector__track {
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    overflow: hidden;
    background-color: var(--color-bg-secondary-solid);
    border: 1px solid var(--color-border);
  }

  /* Animated fill container */
  .sliding-selector__fill {
    height: 100%;
    border-radius: 9999px;
    overflow: hidden;
    transition: width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .sliding-selector__gradient {
    height: 100%;
    background: linear-gradient(to right, #ccfbf1, #5eead4 35%, #14b8a6 70%, #0d9488);
    opacity: 0.3;
  }

  :global(.dark) .sliding-selector__gradient {
    background: linear-gradient(to right, #042f2e, #115e59 35%, #0f766e 70%, #14b8a6);
    opacity: 0.45;
  }

  /* Pills container */
  .sliding-selector__pills {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    padding: 3px;
    z-index: 1;
  }

  .sliding-selector__pill {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    border: 1px solid transparent;
    background: transparent;
    cursor: pointer;
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease,
      box-shadow 0.2s ease;
    outline: none;
    padding: 0 4px;
  }

  .sliding-selector__pill:focus-visible {
    box-shadow:
      0 0 0 2px var(--color-bg),
      0 0 0 4px #14b8a6;
  }

  .sliding-selector__pill--selected {
    border-color: #0d9488;
  }

  :global(.dark) .sliding-selector__pill--selected {
    border-color: #14b8a6;
  }

  .sliding-selector__pill--covered {
    border-color: rgba(13, 148, 136, 0.2);
  }

  :global(.dark) .sliding-selector__pill--covered {
    border-color: rgba(20, 184, 166, 0.15);
  }

  .sliding-selector__pill--uncovered {
    border-color: transparent;
  }

  /* Hover */
  .sliding-selector__pill--covered:hover {
    background-color: rgba(20, 184, 166, 0.08);
    border-color: rgba(13, 148, 136, 0.35);
  }

  .sliding-selector__pill--uncovered:hover {
    background-color: var(--color-button-ghost-bg-hover);
    border-color: var(--color-border);
  }

  :global(.dark) .sliding-selector__pill--covered:hover {
    background-color: rgba(20, 184, 166, 0.12);
    border-color: rgba(20, 184, 166, 0.3);
  }

  /* Label */
  .sliding-selector__label {
    font-size: 0.75rem;
    line-height: 1;
    font-weight: 500;
    letter-spacing: 0.01em;
    white-space: nowrap;
    user-select: none;
    transition: color 0.2s ease, font-weight 0.2s ease;
  }

  .sliding-selector__pill--selected .sliding-selector__label {
    color: #0d9488;
    font-weight: 600;
  }

  :global(.dark) .sliding-selector__pill--selected .sliding-selector__label {
    color: #2dd4bf;
  }

  .sliding-selector__pill--covered .sliding-selector__label {
    color: var(--color-text-secondary);
  }

  .sliding-selector__pill--uncovered .sliding-selector__label {
    color: var(--color-text-secondary);
    opacity: 0.7;
  }

  .sliding-selector__pill--uncovered:hover .sliding-selector__label {
    opacity: 1;
  }
</style>
