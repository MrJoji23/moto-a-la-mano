import { test, expect } from '@playwright/test'

/* Contraste WCAG para "Sobre nosotros" (tema claro).
   Ejecutar: npx playwright test tests/e2e/aboutUs.spec.js */

/* ── Utilidades de contraste (fórmula oficial WCAG 2.1) ── */
const srgb = (c) => {
  const v = c / 255
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}
const luminancia = (rgb) =>
  0.2126 * srgb(rgb[0]) + 0.7152 * srgb(rgb[1]) + 0.0722 * srgb(rgb[2])
const contraste = (a, b) => {
  const [hi, lo] = [luminancia(a), luminancia(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
const parse = (css) => css.match(/[\d.]+/g).slice(0, 3).map(Number)

/** Color de fondo efectivo, subiendo por los ancestros con alfa. */
const fondoEfectivo = (el) =>
  el.evaluate((node) => {
    let n = node
    while (n && n !== document.documentElement) {
      const c = getComputedStyle(n).backgroundColor
      const a = (c.match(/[\d.]+/g) || [])[3]
      if (c && c !== 'rgba(0, 0, 0, 0)' && (a === undefined || Number(a) > 0.85)) return c
      n = n.parentElement
    }
    return getComputedStyle(document.body).backgroundColor
  })

const ratio = async (locator) => {
  const [fg, bg] = await Promise.all([
    locator.evaluate((el) => getComputedStyle(el).color),
    fondoEfectivo(locator),
  ])
  return contraste(parse(fg), parse(bg))
}

const sel = (page, name) => page.locator(`[class*="${name}"]`).first()

test.describe('Sobre nosotros — legibilidad', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sobre-nosotros')
  })

  test('el título del banner es blanco fijo, no el token de texto reapuntado', async ({ page }) => {
    const titulo = sel(page, 'bannerTitle')
    await expect(titulo).toBeVisible()

    const color = await titulo.evaluate((el) => getComputedStyle(el).color)
    expect(color).toBe('rgb(255, 255, 255)')

    // El subtítulo usa blanco al 88%
    const sub = await sel(page, 'bannerSubtitle')
      .evaluate((el) => getComputedStyle(el).color)
    const alfa = Number(sub.match(/[\d.]+/g)[3])
    expect(alfa).toBeGreaterThanOrEqual(0.85)
  })

  test('las cards no usan --mm-text como fondo', async ({ page }) => {
    for (const nombre of ['mvCard', 'valorCard', 'politicaItem']) {
      const card = sel(page, nombre)
      await expect(card, nombre).toBeVisible()

      const fondo = await card.evaluate((el) => getComputedStyle(el).backgroundColor)
      // #2E3339 era el valor de --mm-text reapuntado: fondo ilegible
      expect(fondo, `${nombre} no debe usar fondo oscuro`).not.toBe('rgb(46, 51, 57)')
    }
  })

  test('títulos, párrafos y texto secundario superan 4.5:1', async ({ page }) => {
    const casos = [
      ['mvText', 4.5],
      ['politicaContenido', 4.5],
      ['valorDescripcion', 4.5],
      ['valorTitulo', 4.5],
      ['politicaTitulo', 4.5],
      ['metaLine', 4.5],
      ['politicaFirmante', 4.5],
    ]

    for (const [nombre, minimo] of casos) {
      const el = sel(page, nombre)
      await expect(el, nombre).toBeVisible()
      const r = await ratio(el)
      expect(r, `${nombre} necesita >= ${minimo}:1, dio ${r.toFixed(2)}:1`).toBeGreaterThanOrEqual(minimo)
    }
  })

  test('el cuerpo de texto es >= 16px con interlineado ~1.65', async ({ page }) => {
    const cuerpos = ['mvText', 'politicaContenido', 'valorDescripcion', 'valorLista']
    for (const nombre of cuerpos) {
      const el = sel(page, nombre)
      await expect(el, nombre).toBeVisible()
      const { fontSize, lineHeight } = await el.evaluate((n) => {
        const s = getComputedStyle(n)
        return { fontSize: parseFloat(s.fontSize), lineHeight: parseFloat(s.lineHeight) }
      })
      expect(fontSize, `${nombre} = ${fontSize}px`).toBeGreaterThanOrEqual(16)
      expect(lineHeight / fontSize, `${nombre} line-height`).toBeGreaterThanOrEqual(1.5)
    }
  })

  test('el acento profundo se mantiene en eyebrows y enlaces', async ({ page }) => {
    for (const nombre of ['mvEyebrow', 'politicaCodigo']) {
      const el = sel(page, nombre)
      await expect(el, nombre).toBeVisible()
      expect(await el.evaluate((n) => getComputedStyle(n).color)).toBe('rgb(138, 82, 0)')
    }
  })
})
