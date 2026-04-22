<script lang="ts">
  import type { Post } from '$lib/blog/types'
  import { icons } from '$lib/icons'

  type Field = 'author' | 'date' | 'readingTime'

  interface Props {
    post: Post
    show?: Field[]
  }

  interface MetaItem {
    key: Field
    label: string
    icon: string
    iso?: string
  }

  let { post, show = ['author', 'date', 'readingTime'] }: Props = $props()

  const formattedDate = $derived.by(() => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(new Date(post.date))
    } catch {
      return post.date
    }
  })

  const items = $derived.by<MetaItem[]>(() => {
    const out: MetaItem[] = []
    for (const field of show) {
      if (field === 'author') {
        out.push({ key: 'author', label: post.author, icon: icons.userCircle })
      } else if (field === 'date') {
        out.push({
          key: 'date',
          label: formattedDate,
          icon: icons.calendar,
          iso: post.date
        })
      } else if (field === 'readingTime') {
        out.push({ key: 'readingTime', label: post.readingTime, icon: icons.clock })
      }
    }
    return out
  })
</script>

<div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-(--color-text-secondary)">
  {#each items as item, i (item.key)}
    <span class="inline-flex items-center gap-1.5">
      <span class="w-[14px] h-[14px] inline-flex [&>svg]:w-full [&>svg]:h-full" aria-hidden="true">
        {@html item.icon}
      </span>
      {#if item.key === 'date' && item.iso}
        <time datetime={item.iso}>{item.label}</time>
      {:else}
        <span>{item.label}</span>
      {/if}
    </span>
    {#if i < items.length - 1}
      <span class="opacity-40" aria-hidden="true">·</span>
    {/if}
  {/each}
</div>
