<script lang="ts">
  interface Props {
    class?: string
  }

  let { class: className = '' }: Props = $props()
</script>

<!-- Horizontal connector (desktop) -->
<div class="hidden md:flex items-center justify-center {className}" aria-hidden="true">
  <svg
    width="48"
    height="16"
    viewBox="0 0 48 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="0"
      y1="8"
      x2="38"
      y2="8"
      stroke="var(--color-connector-accent)"
      stroke-width="2"
      stroke-dasharray="6 4"
      stroke-linecap="round"
    />
    <polygon
      points="36,3 46,8 36,13"
      fill="var(--color-connector-accent)"
    />
  </svg>
</div>

<!-- Vertical connector (mobile) -->
<div class="flex md:hidden items-center justify-center {className}" aria-hidden="true">
  <svg
    width="16"
    height="48"
    viewBox="0 0 16 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="8"
      y1="0"
      x2="8"
      y2="38"
      stroke="var(--color-connector-accent)"
      stroke-width="2"
      stroke-dasharray="6 4"
      stroke-linecap="round"
    />
    <polygon
      points="3,36 8,46 13,36"
      fill="var(--color-connector-accent)"
    />
  </svg>
</div>
