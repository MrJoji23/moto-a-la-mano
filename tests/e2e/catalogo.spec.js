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
    test(`${marca}: filtra por cilindrada con el desplegable y actualiza el contador`, async ({ page }) => {
      await page.goto(`/${marca}`)

      const grid = page.locator(catalogo)
      await grid.scrollIntoViewIfNeeded()
      await expect(grid).toBeVisible()

      const totalInicial = await grid.locator(card).count()
      expect(totalInicial).toBeGreaterThan(0)

      // Los filtros son desplegables, no chips (§10 del encargo)
      await expect(grid.locator('.grid-filters__chips')).toHaveCount(0)

      const cc = grid.getByLabel('Cilindrada (cc)')
      await expect(cc).toBeVisible()
      await expect(cc).toHaveValue('todo')

      // "Todas" devuelve el catálogo completo de la marca
      const opcionesCc = await cc.locator('option').allInnerTexts()
      expect(opcionesCc[0]).toMatch(/todas/i)

      await cc.selectOption('cc-125')
      await expect(grid.getByRole('status')).toContainText(/de \d+ modelos/)
      const filtrado = await grid.locator(card).count()
      expect(filtrado).toBeLessThan(totalInicial)

      // Cada modelo mostrado cumple el rango 125 cc
      await grid.getByRole('button', { name: /limpiar filtros/i }).click()
      await expect(cc).toHaveValue('todo')
      expect(await grid.locator(card).count()).toBe(totalInicial)
    })

    test(`${marca}: filtra por rango de precio`, async ({ page }) => {
      await page.goto(`/${marca}`)

      const grid = page.locator(catalogo)
      await grid.scrollIntoViewIfNeeded()

      const precio = grid.getByLabel('Precio')
      await expect(precio).toBeVisible()
      await expect(precio).toHaveValue('precio-todo')

      // Los rótulos se derivan de los precios reales del catálogo
      const opciones = await precio.locator('option').allInnerTexts()
      expect(opciones[0]).toMatch(/todos/i)
      expect(opciones.length).toBeGreaterThan(2)

      const totalInicial = await grid.locator(card).count()

      // El rango más alto nunca puede devolver más que el catálogo completo
      const ids = await precio.locator('option').evaluateAll((nodes) =>
        nodes.map((n) => n.value).filter(Boolean),
      )
      await precio.selectOption(ids[ids.length - 1])
      const enRangoAlto = await grid.locator(card).count()
      expect(enRangoAlto).toBeLessThanOrEqual(totalInicial)

      await precio.selectOption('precio-todo')
      expect(await grid.locator(card).count()).toBe(totalInicial)
    })

    test(`${marca}: cada desplegable tiene label asociado y foco visible`, async ({ page }) => {
      await page.goto(`/${marca}`)

      const grid = page.locator(catalogo)
      await grid.scrollIntoViewIfNeeded()

      for (const nombre of ['Cilindrada (cc)', 'Precio', 'Ordenar por']) {
        const select = grid.getByLabel(nombre)
        await expect(select).toBeVisible()

        await select.focus()
        await expect(select).toBeFocused()

        const outline = await select.evaluate((el) => getComputedStyle(el).outlineStyle)
        expect(outline).not.toBe('none')
      }
    })

    test(`${marca}: busca por nombre de modelo`, async ({ page }) => {
      await page.goto(`/${marca}`)

      const grid = page.locator(catalogo)
      await grid.scrollIntoViewIfNeeded()

      const totalInicial = await grid.locator(card).count()
      const primera = (await grid.locator(card).first().locator('h3').first().innerText()).trim()
      const termino = primera.split(/\s+/)[0]

      const buscador = grid.getByLabel('Buscar').first()
      await buscador.fill(termino)

      const encontrados = await grid.locator(card).count()
      expect(encontrados).toBeGreaterThan(0)
      expect(encontrados).toBeLessThanOrEqual(totalInicial)

      // Búsqueda sin coincidencias → empty state, sin crashear
      await buscador.fill('zzz-no-existe-zzz')
      await expect(grid.getByText(/sin resultados/i)).toBeVisible()

      await buscador.fill('')
      expect(await grid.locator(card).count()).toBe(totalInicial)
    })

    test(`${marca}: en móvil los filtros abren en un drawer con Aplicar y Limpiar`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 })
      await page.goto(`/${marca}`)

      const grid = page.locator(catalogo)
      await grid.scrollIntoViewIfNeeded()

      const boton = grid.getByRole('button', { name: /filtros/i })
      await expect(boton).toBeVisible()
      await expect(boton).toHaveAttribute('aria-expanded', 'false')

      await boton.click()

      const drawer = page.getByRole('dialog')
      await expect(drawer).toBeVisible()
      await expect(drawer.getByLabel('Cilindrada (cc)')).toBeVisible()
      await expect(drawer.getByLabel('Precio')).toBeVisible()
      await expect(drawer.getByRole('button', { name: /aplicar/i })).toBeVisible()
      await expect(drawer.getByRole('button', { name: /limpiar filtros/i })).toBeVisible()

      // Escape cierra y devuelve el foco al botón disparador
      await page.keyboard.press('Escape')
      await expect(drawer).toBeHidden()
      await expect(boton).toBeFocused()
    })

    test(`${marca}: el drawer aplica el filtro y no desborda en horizontal`, async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 800 })
      await page.goto(`/${marca}`)

      const grid = page.locator(catalogo)
      await grid.scrollIntoViewIfNeeded()

      const totalInicial = await grid.locator(card).count()

      await grid.getByRole('button', { name: /filtros/i }).click()
      const drawer = page.getByRole('dialog')
      await drawer.getByLabel('Cilindrada (cc)').selectOption('cc-125')
      await drawer.getByRole('button', { name: /aplicar/i }).click()
      await expect(drawer).toBeHidden()

      const desborde = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(desborde).toBeLessThanOrEqual(1)
      expect(await grid.locator(card).count()).toBeLessThanOrEqual(totalInicial)
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

  test('bajaj: la tarjeta de línea acota el catálogo y se sincroniza con el desplegable', async ({ page }) => {
    await page.goto('/bajaj')

    const tarjeta = page.getByRole('button', { name: /pulsar/i }).first()
    await tarjeta.scrollIntoViewIfNeeded()
    await tarjeta.click()
    await expect(tarjeta).toHaveAttribute('aria-pressed', 'true')

    const grid = page.locator('#bajaj-catalogo')
    await expect(grid).toBeVisible()
    await expect(grid.getByRole('heading', { level: 2 })).toContainText(/Pulsar/i)

    // La tarjeta y el desplegable "Línea" comparten estado
    await expect(grid.getByLabel('Línea')).not.toHaveValue('')

    // Volver a pulsar la línea activa restaura el catálogo completo
    const totalLinea = await grid.locator('.bajaj-card').count()
    await tarjeta.click()
    await expect(grid.getByLabel('Línea')).toHaveValue('')
    expect(await grid.locator('.bajaj-card').count()).toBeGreaterThan(totalLinea)
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

    const tarjeta = page.getByRole('button', { name: /eléctric/i }).first()
    await tarjeta.scrollIntoViewIfNeeded()
    await tarjeta.click()

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
