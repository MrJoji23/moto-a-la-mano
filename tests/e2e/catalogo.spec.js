import { test, expect } from '@playwright/test'

test.describe('Catálogo y filtros', () => {
  test('la home lista las marcas y navega al catálogo', async ({ page }) => {
    await page.goto('/')

    const marcas = page.locator('#marcas')
    await marcas.scrollIntoViewIfNeeded()
    await expect(marcas).toBeVisible()

    await marcas.getByRole('link', { name: /Bajaj/ }).click()
    await expect(page).toHaveURL(/\/bajaj$/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  for (const [marca, catalogo, card] of [
    ['bajaj', '#bajaj-catalogo', '.bajaj-card'],
    ['auteco', '#auteco-catalogo', '.auteco-mcard'],
  ]) {
    test(`${marca}: filtra por segmento con chips y actualiza el contador`, async ({ page }) => {
      await page.goto(`/${marca}`)

      const grid = page.locator(catalogo)
      await grid.scrollIntoViewIfNeeded()
      await expect(grid).toBeVisible()

      const totalInicial = await grid.locator(card).count()
      expect(totalInicial).toBeGreaterThan(0)

      // Los filtros son chips, no <select> (§10)
      await expect(grid.locator('select')).toHaveCount(0)

      const grupoSegmento = grid.getByTestId('filtro-tipo')
      await expect(grupoSegmento).toBeVisible()

      const chips = grupoSegmento.getByRole('button')
      const totalChips = await chips.count()
      expect(totalChips).toBeGreaterThan(1)

      // El primer chip es "Todos" y arranca activo
      await expect(chips.first()).toHaveAttribute('aria-pressed', 'true')

      const chipFiltro = chips.nth(1)
      const nombreChip = (await chipFiltro.innerText()).trim()
      await chipFiltro.click()
      await expect(chipFiltro).toHaveAttribute('aria-pressed', 'true')
      await expect(chips.first()).toHaveAttribute('aria-pressed', 'false')

      const contador = grid.getByRole('status')
      await expect(contador).toContainText(/\d+/)
      await expect(grid.getByText(nombreChip).first()).toBeVisible()

      await grid.getByRole('button', { name: /limpiar/i }).click()
      await expect(chips.first()).toHaveAttribute('aria-pressed', 'true')
      expect(await grid.locator(card).count()).toBe(totalInicial)
    })

    test(`${marca}: los chips del catálogo son alcanzables con teclado`, async ({ page }) => {
      await page.goto(`/${marca}`)

      const grid = page.locator(catalogo)
      await grid.scrollIntoViewIfNeeded()

      const chip = grid.getByTestId('filtro-tipo').getByRole('button').nth(1)
      await chip.focus()
      await expect(chip).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(chip).toHaveAttribute('aria-pressed', 'true')
      await page.keyboard.press(' ')
      await expect(chip).toHaveAttribute('aria-pressed', 'true')
    })

    test(`${marca}: la tarjeta de moto no usa borde de color grueso`, async ({ page }) => {
      await page.goto(`/${marca}`)

      const grid = page.locator(catalogo)
      await grid.scrollIntoViewIfNeeded()

      const tarjeta = grid.locator(card).first()
      await tarjeta.scrollIntoViewIfNeeded()

      const borde = await tarjeta.evaluate((el) => getComputedStyle(el).borderTopColor)
      // Sin rojo ni azul de marca en el borde de la tarjeta
      expect(borde).not.toBe('rgb(204, 31, 37)')
      expect(borde).not.toBe('rgb(59, 130, 246)')

      const grosor = await tarjeta.evaluate((el) => getComputedStyle(el).borderTopWidth)
      expect(Number.parseFloat(grosor)).toBeLessThanOrEqual(2)

      // Sin franja de color de 3px al pie de la tarjeta
      await expect(tarjeta.locator('[class$="__bar"]')).toHaveCount(0)
    })
  }

  test('bajaj: el selector de líneas acota el catálogo', async ({ page }) => {
    await page.goto('/bajaj')

    const chips = page.getByRole('button', { name: /pulsar/i }).first()
    await chips.scrollIntoViewIfNeeded()
    await chips.click()
    await expect(chips).toHaveAttribute('aria-pressed', 'true')

    const grid = page.locator('#bajaj-catalogo')
    await expect(grid).toBeVisible()
    await expect(grid.getByRole('heading', { level: 2 })).toContainText(/Pulsar/i)
  })

  test('abre el detalle de una moto y lo cierra con Escape', async ({ page }) => {
    await page.goto('/bajaj')

    const grid = page.locator('#bajaj-catalogo')
    await grid.scrollIntoViewIfNeeded()
    await grid.locator('.bajaj-card__hit').first().click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })

  test('el botón de cotización abre WhatsApp con el modelo correcto', async ({ page }) => {
    await page.goto('/auteco')

    const grid = page.locator('#auteco-catalogo')
    await grid.scrollIntoViewIfNeeded()

    const tarjeta = grid.locator('.auteco-mcard').first()
    const nombre = (await tarjeta.locator('h3').first().innerText()).trim()

    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      tarjeta.getByRole('button', { name: /whatsapp|cotizar/i }).first().click(),
    ])

    const url = new URL(popup.url())
    expect(url.hostname).toBe('wa.me')
    expect(decodeURIComponent(url.searchParams.get('text'))).toContain(nombre)
  })

  test('auteco: la sección de eléctricas es alcanzable', async ({ page }) => {
    await page.goto('/auteco')

    const chip = page.getByRole('button', { name: /eléctric/i }).first()
    await chip.scrollIntoViewIfNeeded()
    await chip.click()

    await expect(page.locator('.honda-tile__countdown')).toHaveCount(0)
    await expect(page.getByText(/eléctric/i).first()).toBeVisible()
  })

  test('no hay scroll horizontal en móvil', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 })

    for (const ruta of ['/bajaj', '/auteco', '/financiamiento', '/pqrs', '/sobre-nosotros']) {
      await page.goto(ruta)
      await page.waitForLoadState('domcontentloaded')

      const desborde = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(desborde, `desborde horizontal en ${ruta}`).toBeLessThanOrEqual(1)
    }
  })
})
