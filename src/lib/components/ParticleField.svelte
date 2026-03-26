<script lang="ts">
  interface Props {
    particleCount?: number
    reducedParticleCount?: number
  }

  let { particleCount = 24, reducedParticleCount = 12 }: Props = $props()

  let canvasEl: HTMLCanvasElement | undefined = $state()

  interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    radius: number
    isActive: boolean
    pulsePhase: number
  }

  $effect(() => {
    if (!canvasEl) return

    const ctx = canvasEl.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Theme detection via MutationObserver on <html> classList
    let isDark = document.documentElement.classList.contains('dark')

    // DPR scaling for crisp rendering on retina/HiDPI displays
    const dpr = window.devicePixelRatio || 1

    // Determine actual particle count (respect reduced motion)
    const count = prefersReducedMotion ? reducedParticleCount : particleCount

    let width = canvasEl.clientWidth
    let height = canvasEl.clientHeight
    canvasEl.width = width * dpr
    canvasEl.height = height * dpr
    canvasEl.style.width = `${width}px`
    canvasEl.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    // Initialize particles
    const particles: Particle[] = []
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: i === 0 ? 4 : 2 + Math.random(),
        isActive: i === 0,
        pulsePhase: Math.random() * Math.PI * 2
      })
    }

    // Static draw function for reduced motion and theme changes
    function drawStatic() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        const opacity = p.isActive
          ? (isDark ? 0.2 : 0.4)
          : (isDark ? 0.12 : 0.2)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(20, 184, 166, ${opacity})`
        ctx.fill()
      }
    }

    // Single theme observer that handles both animated and static modes
    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark')
      if (prefersReducedMotion) drawStatic()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // ResizeObserver to adapt to container size changes
    const resizeObserver = new ResizeObserver((entries) => {
      if (!canvasEl) return
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect
        width = w
        height = h
        canvasEl.width = w * dpr
        canvasEl.height = h * dpr
        canvasEl.style.width = `${w}px`
        canvasEl.style.height = `${h}px`
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        // Keep particles within new bounds
        for (const p of particles) {
          p.x = Math.min(p.x, w - 5)
          p.y = Math.min(p.y, h - 5)
        }
        if (prefersReducedMotion) drawStatic()
      }
    })
    resizeObserver.observe(canvasEl)

    // If reduced motion, render static dots and stop
    if (prefersReducedMotion) {
      drawStatic()

      return () => {
        themeObserver.disconnect()
        resizeObserver.disconnect()
      }
    }

    // IntersectionObserver to pause off-screen
    let isVisible = true
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false
      },
      { threshold: 0 }
    )
    intersectionObserver.observe(canvasEl)

    // Animation loop throttled to ~30fps
    let rafId = 0
    let lastTime = 0
    const FRAME_INTERVAL = 1000 / 30
    const EDGE_MARGIN = 30
    const EDGE_FORCE = 0.05

    function animate(now: number) {
      rafId = requestAnimationFrame(animate)

      if (!isVisible) return

      const delta = now - lastTime
      if (delta < FRAME_INTERVAL) return
      lastTime = now - (delta % FRAME_INTERVAL)

      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        // Edge repulsion
        if (p.x < EDGE_MARGIN) p.vx += EDGE_FORCE
        if (p.x > width - EDGE_MARGIN) p.vx -= EDGE_FORCE
        if (p.y < EDGE_MARGIN) p.vy += EDGE_FORCE
        if (p.y > height - EDGE_MARGIN) p.vy -= EDGE_FORCE

        // Clamp velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 0.5) {
          p.vx = (p.vx / speed) * 0.5
          p.vy = (p.vy / speed) * 0.5
        }

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Hard boundary clamp
        p.x = Math.max(2, Math.min(width - 2, p.x))
        p.y = Math.max(2, Math.min(height - 2, p.y))

        // Determine opacity
        let opacity: number
        if (p.isActive) {
          // Pulse effect on active particle (period ~8-10s)
          p.pulsePhase += 0.008
          const pulse = 0.5 + 0.5 * Math.sin(p.pulsePhase)
          const baseOpacity = isDark ? 0.2 : 0.4
          opacity = baseOpacity + pulse * 0.15
        } else {
          opacity = isDark ? 0.12 : 0.2
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(20, 184, 166, ${opacity})`
        ctx.fill()

        // Subtle glow on active particle
        if (p.isActive) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2)
          const glowOpacity = isDark ? 0.04 : 0.08
          ctx.fillStyle = `rgba(20, 184, 166, ${glowOpacity})`
          ctx.fill()
        }
      }
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      themeObserver.disconnect()
      intersectionObserver.disconnect()
      resizeObserver.disconnect()
    }
  })
</script>

<canvas bind:this={canvasEl} class="absolute inset-0 z-0 h-full w-full" aria-hidden="true"></canvas>
