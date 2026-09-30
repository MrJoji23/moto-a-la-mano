import { test, expect } from '@playwright/test'

const WA_COMERCIAL = '300000000'

test.describe('Home', () => {
  test('sin scroll horizontal en móvil', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    )
    expect(overflow).toBe(false)
  })

  test('el hero muestra un único H1, un subtítulo y dos CTAs', async ({ page }) => {
    await page.goto('/')

    const hero = page.getByRole('region', { name: 'Modelos destacados' })
    await expect(hero).toBeVisible()

    // Un solo H1 en toda la vista (§9 SEO)
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    await expect(hero.getByRole('heading', { level: 1 })).toBeVisible()

    // Dos CTAs y nada más
    const ctas = hero.getByRole('link')
    await expect(ctas).toHaveCount(2)
  })

  test('el hero no monta banner de anuncio ni contador de slides', async ({ page }) => {
    await page.goto('/')

    const hero = page.getByRole('region', { name: 'Modelos destacados' })
    // La promo se muestra como chip discreto, no como barra fija
    await expect(hero.locator('.hero__chip')).toHaveCount(1)
    await expect(hero.locator('.carousel__progress')).toHaveCount(0)
    await expect(hero.locator('.carousel__count')).toHaveCount(0)
  })

  test('el CTA principal del hero lleva al catálogo Bajaj', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('region', { name: 'Modelos destacados' })
      .getByRole('link', { name: /ver motos/i })
      .click()
    await expect(page).toHaveURL(/\/bajaj$/)
  })

  test('el CTA de WhatsApp del hero apunta al número comercial', async ({ page }) => {
    await page.goto('/')

    const wa = page
      .getByRole('region', { name: 'Modelos destacados' })
      .getByRole('link', { name: /hablar con un asesor/i })
    await expect(wa).toHaveAttribute(
      'href',
      new RegExp(`api\\.whatsapp\\.com/send\\?phone=${WA_COMERCIAL}`),
    )
  })

  test('los controles del carrusel son accesibles por teclado', async ({ page }) => {
    await page.goto('/')

    const hero = page.getByRole('region', { name: 'Modelos destacados' })
    const puntos = hero.getByRole('tab')
    await expect(puntos).toHaveCount(5)
    await expect(puntos.first()).toHaveAttribute('aria-selected', 'true')

    const siguiente = hero.getByRole('button', { name: 'Modelo siguiente' })
    await siguiente.focus()
    await expect(siguiente).toBeFocused()
    await page.keyboard.press('Enter')

    await expect(puntos.nth(1)).toHaveAttribute('aria-selected', 'true')
  })

  test('el hero respeta prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    const puntos = page
      .getByRole('region', { name: 'Modelos destacados' })
      .getByRole('tab')
    await expect(puntos.first()).toHaveAttribute('aria-selected', 'true')

    // Con reduced motion el autoplay no debe avanzar el slide activo
    await page.waitForTimeout(1200)
    await expect(puntos.first()).toHaveAttribute('aria-selected', 'true')
  })

  test('la franja de confianza muestra los datos duros', async ({ page }) => {
    await page.goto('/')

    const franja = page.getByRole('region', { name: /por qué comprar/i })
    await franja.scrollIntoViewIfNeeded()
    await expect(franja).toBeVisible()
    await expect(franja.getByText('Sedes')).toBeVisible()
    await expect(franja.getByText('Financieras')).toBeVisible()
    await expect(franja.getByText('Garantía')).toBeVisible()

    // La franja no repite el titular del hero
    await expect(franja.getByRole('heading', { level: 1 })).toHaveCount(0)
  })

  test('las tarjetas de marca no llevan borde de color por marca', async ({ page }) => {
    await page.goto('/')

    const marcas = page.locator('#marcas')
    await marcas.scrollIntoViewIfNeeded()

    const tile = marcas.locator('.brand-tile').first()
    await expect(tile).toBeVisible()

    const borde = await tile.evaluate((el) => getComputedStyle(el).borderTopColor)
    // Borde neutro: sin rojo (#CC1F25) ni azul (#3B82F6) de marca
    expect(borde).not.toBe('rgb(204, 31, 37)')
    expect(borde).not.toBe('rgb(59, 130, 246)')
  })

  test('las tarjetas de marca normalizan el logo y ponen el nombre debajo', async ({ page }) => {
    await page.goto('/')

    const marcas = page.locator('#marcas')
    await marcas.scrollIntoViewIfNeeded()

    // Sólo Bajaj y Auteco (el teaser Honda usa otro wrap y queda intacto)
    const placas = marcas.locator('a.brand-tile .brand-tile__logo-wrap')
    await expect(placas).toHaveCount(2)

    const medidas = await placas.evaluateAll((nodos) =>
      nodos.map((el) => {
        const caja = el.getBoundingClientRect()
        return { w: Math.round(caja.width), h: Math.round(caja.height) }
      }),
    )
    for (const m of medidas) {
      expect(m.w).toBe(medidas[0].w)
      expect(m.h).toBe(medidas[0].h)
      // Placa cuadrada, no una caja arbitraria
      expect(Math.abs(m.w - m.h)).toBeLessThanOrEqual(1)
    }

    // Ningún logo se deforma ni se recorta (contain, tamaño intrínseco)
    const distort = await marcas
      .locator('a.brand-tile .brand-tile__logo')
      .evaluateAll((nodos) =>
        nodos.map((img) => {
          const natural = img.naturalWidth / img.naturalHeight
          const caja = img.getBoundingClientRect()
          const render = caja.width / caja.height
          return Math.abs(natural - render)
        }),
      )
    for (const d of distort) expect(d).toBeLessThanOrEqual(0.05)

    // El nombre es el primer elemento de texto bajo la placa
    for (const nombre of ['Bajaj', 'Auteco']) {
      const tile = marcas.locator('a.brand-tile').filter({ hasText: nombre })
      const heading = tile.locator('.brand-tile__name')
      await expect(heading).toHaveText(nombre)

      const orden = await tile.evaluate((el) => {
        const placa = el.querySelector('.brand-tile__logo-wrap').getBoundingClientRect()
        const h3 = el.querySelector('.brand-tile__name').getBoundingClientRect()
        return h3.top >= placa.bottom - 1
      })
      expect(orden, `«${nombre}» debe quedar debajo de su logo`).toBe(true)
    }
  })

  test('el botón flotante de WhatsApp es visible y persistente', async ({ page }) => {
    await page.goto('/')

    const fab = page.getByRole('link', { name: /whatsapp/i }).last()
    await expect(fab).toBeVisible()
    await expect(fab).toHaveAttribute(
      'href',
      new RegExp(`api\\.whatsapp\\.com/send\\?phone=${WA_COMERCIAL}`),
    )
  })

  test('todos los enlaces de WhatsApp apuntan al mismo número de ejemplo', async ({ page }) => {
    for (const ruta of ['/', '/bajaj', '/auteco', '/financiamiento']) {
      await page.goto(ruta)

      const numeros = await page.evaluate(() => {
        const selectores = [
          'a[href*="api.whatsapp.com/send?phone="]',
          'a[href*="wa.me/"]',
        ]
        return [...document.querySelectorAll(selectores.join(','))]
          .map((a) => new URL(a.href).searchParams.get('phone') || new URL(a.href).pathname)
          .map((valor) => (valor || '').replace(/^\//, ''))
      })

      expect(numeros.length, `enlaces de WhatsApp en ${ruta}`).toBeGreaterThan(0)
      for (const n of numeros) expect(n).toBe(WA_COMERCIAL)
    }
  })

  test('el formulario de financiamiento expone sus campos', async ({ page }) => {
    await page.goto('/financiamiento')

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const campos = page.locator('input, select')
    await expect(campos.first()).toBeVisible()
  })

  test('"parte de pago" está centrado, con label, título, subtítulo y CTA', async ({ page }) => {
    await page.goto('/')

    const seccion = page.locator('section.tradein')
    await seccion.scrollIntoViewIfNeeded()
    await expect(seccion).toBeVisible()

    // Label, título y subtítulo corto
    await expect(seccion.getByText(/¿moto usada\?/i)).toBeVisible()
    await expect(seccion.getByRole('heading', { level: 2 })).toContainText(/parte de pago/i)
    await expect(seccion.locator('.tradein__sub')).toBeVisible()
    await expect(seccion.getByRole('button', { name: /más información/i })).toBeVisible()

    // Contenido centrado horizontalmente
    const alineacion = await seccion.locator('.tradein__inner').evaluate(
      (el) => getComputedStyle(el).textAlign,
    )
    expect(alineacion).toBe('center')

    // Sin imagen, sin icono circular y sin columnas
    await expect(seccion.locator('img')).toHaveCount(0)
    await expect(seccion.locator('.tradein__icon-wrap')).toHaveCount(0)
    await expect(seccion.locator('svg.fa-motorcycle')).toHaveCount(0)
    const radios = await seccion.locator('*').evaluateAll((nodos) =>
      nodos
        .map((n) => getComputedStyle(n).borderTopLeftRadius)
        .filter((r) => r === '50%' || (r.endsWith('px') && parseFloat(r) >= 150)),
    )
    expect(radios, 'quedan radios circulares ≥150px').toEqual([])
  })

  test('el CTA de "parte de pago" sigue abriendo el mismo WhatsApp', async ({ page }) => {
    await page.goto('/')

    const seccion = page.locator('section.tradein')
    await seccion.scrollIntoViewIfNeeded()

    const cta = seccion.getByRole('button', { name: /más información/i })

    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      cta.click(),
    ])

    const url = new URL(popup.url())
    expect(url.hostname).toBe('wa.me')
    expect(url.pathname).toBe(`/${WA_COMERCIAL}`)
    expect(decodeURIComponent(url.searchParams.get('text'))).toMatch(
      /tengo una moto usada/i,
    )
  })

  test('"parte de pago" no desborda en móvil', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 })
    await page.goto('/')

    const seccion = page.locator('section.tradein')
    await seccion.scrollIntoViewIfNeeded()

    const display = await seccion
      .locator('.tradein__inner')
      .evaluate((el) => getComputedStyle(el).display)
    expect(display).toBe('flex')

    const desborde = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(desborde).toBeLessThanOrEqual(1)
  })

  test('"Nuestros Servicios" está centrado en móvil, sin desplazamiento a la derecha', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 })
    await page.goto('/')

    const grid = page.locator('section.services .services__grid')
    await grid.scrollIntoViewIfNeeded()

    // El <ul> no arrastra el padding por defecto del navegador
    const padding = await grid.evaluate(
      (el) => parseFloat(getComputedStyle(el).paddingLeft),
    )
    expect(padding, 'padding izquierdo residual de <ul>').toBe(0)

    // En móvil, una sola columna
    const columnas = await grid.evaluate(
      (el) => getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length,
    )
    expect(columnas).toBe(1)

    // El espacio a la izquierda y a la derecha del grid es simétrico
    const simetria = await grid.evaluate((el) => {
      const caja = el.getBoundingClientRect()
      return {
        izquierda: caja.left,
        derecha: document.documentElement.clientWidth - caja.right,
      }
    })
    expect(Math.abs(simetria.izquierda - simetria.derecha)).toBeLessThanOrEqual(2)
  })
})
