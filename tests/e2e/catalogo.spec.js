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

  for (const [marca, catalogo] of [
    ['bajaj', '#bajaj-catalogo'],
    ['auteco', '#auteco-catalogo'],
  ]) {
    test(`${marca}: filtra por segmento y muestra el contador`, async ({ page }) => {
      await page.goto(`/${marca}`)

      const grid = page.locator(catalogo)
      await grid.scrollIntoViewIfNeeded()
      await expect(grid).toBeVisible()

      const totalInicial = await grid.locator('article, .moto-card').count()
      expect(totalInicial).toBeGreaterThan(0)

      const selectSegmento = grid.getByLabel('Segmento')
      const opciones = await selectSegmento.locator('option').count()
      expect(opciones).toBeGreaterThan(1)

      const valor = await selectSegmento
        .locator('option')
        .nth(1)
        .getAttribute('value')
      await selectSegmento.selectOption(valor)

      const contador = grid.getByRole('status')
      await expect(contador).toContainText(/\d+/)
      expect(await grid.locator('article, .moto-card').count()).toBeGreaterThan(0)

      await grid.getByRole('button', { name: /limpiar/i }).click()
      expect(await grid.locator('article, .moto-card').count()).toBe(totalInicial)
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
    await grid.locator('article, .moto-card').first().click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })

  test('el botón de cotización abre WhatsApp con el modelo correcto', async ({ page }) => {
    await page.goto('/auteco')

    const grid = page.locator('#auteco-catalogo')
    await grid.scrollIntoViewIfNeeded()

    const tarjeta = grid.locator('article, .moto-card').first()
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
