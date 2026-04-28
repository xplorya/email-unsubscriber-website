<script lang="ts">
  /**
   * Shared 3-tone filters cluster (Active / Unsubscribed / Still emailing).
   *
   * Mirrors the inline filter chips in the real webapp Dashboard
   *   (webapp/src/modules/dashboard/dashboard-screen/Dashboard.svelte:1287-1340)
   * and is reused by:
   *   - HeroFloatingChips chip 1 (selected = 'active')
   *   - ResultsListButtons nugget A (selected = 'violation')
   *
   * Each chip is independently togglable (multi-select). Initial state is
   * seeded from the `selectedTone` prop — that tone is active on mount,
   * the others inactive. After mount, the prop is no longer read; chips
   * track their own state. Pure UI, no callback wiring.
   */
  import { untrack } from 'svelte'
  import Chip from './Chip.svelte'

  type Tone = 'active' | 'unsubscribed' | 'violation'

  interface Props {
    selectedTone: Tone
    activeCount?: number
    unsubscribedCount?: number
    violationCount?: number
  }

  let {
    selectedTone,
    activeCount = 90,
    unsubscribedCount = 9,
    violationCount = 2,
  }: Props = $props()

  // Seed active set once from `selectedTone`. Subsequent prop changes are
  // ignored — chips own their state after mount.
  const activeTones = $state<Set<Tone>>(new Set([untrack(() => selectedTone)]))

  function toggle(tone: Tone) {
    if (activeTones.has(tone)) {
      activeTones.delete(tone)
    } else {
      activeTones.add(tone)
    }
  }
</script>

<div class="flex flex-wrap gap-1.5">
  <Chip
    tone="active"
    active={activeTones.has('active')}
    count={activeCount}
    label="Active"
    onclick={() => toggle('active')}
  />
  <Chip
    tone="unsubscribed"
    active={activeTones.has('unsubscribed')}
    count={unsubscribedCount}
    label="Unsubscribed"
    onclick={() => toggle('unsubscribed')}
  />
  <Chip
    tone="violation"
    active={activeTones.has('violation')}
    count={violationCount}
    label="Still emailing"
    onclick={() => toggle('violation')}
  />
</div>
