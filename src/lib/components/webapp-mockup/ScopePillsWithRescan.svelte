<script lang="ts">
  /**
   * Shared sub-composition: ScopeSelector pills (left) + Rescan
   * button (right). Mirrors webapp Dashboard.svelte:1311-1323.
   *
   * Used in two places:
   *   - HeroFloatingChips chip-float-scan (single card, alongside ScanProgress)
   *   - ScanPeriodsButtons nugget A (split layout, ScanProgress lives in nugget B)
   *
   * Fully controlled: parent owns selectedIndex + restart wiring. The
   * parent bumps a number-typed `restartSignal` on its ScanProgress to
   * reset the autoplay loop.
   */
  import ScopeSelector from './ScopeSelector.svelte'

  interface Props {
    values: string[]
    selectedIndex: number
    onSelect: (index: number) => void
    onRescan: () => void
    ariaLabel?: string
  }

  let {
    values,
    selectedIndex,
    onSelect,
    onRescan,
    ariaLabel = 'Scan time period',
  }: Props = $props()
</script>

<div class="scope-rescan-row">
  <div class="selector-slot">
    <ScopeSelector
      {values}
      selectedValueIndex={selectedIndex}
      onSelect={(v) => onSelect(values.indexOf(v))}
      {ariaLabel}
    />
  </div>
  <button
    type="button"
    onclick={onRescan}
    class="px-3 py-1.5 text-sm border border-(--color-border) rounded-md hover:bg-(--color-bg-secondary) transition-colors disabled:opacity-50"
  >
    Rescan
  </button>
</div>

<style>
  .scope-rescan-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .selector-slot {
    flex: 1;
    height: 32px;
    min-width: 0;
  }
</style>
