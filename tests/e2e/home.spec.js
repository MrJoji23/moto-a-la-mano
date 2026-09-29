import { test, expect } from '@playwright/test'

const WA_COMERCIAL = '573054300302'

test.describe('Home', () => {
  test('sin scroll horizontal en móvil', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    )
    expect(overflow).toBe(false)
  })

  test('el CTA de la hero lleva al catálogo Bajaj', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: /ver motos bajaj/i }).click()
    await expect(page).toHaveURL(/\/bajaj$/)
  })

  test('el botón de WhatsApp apunta al número comercial correcto', async ({ page }) => {
    await page.goto('/')

    const wa = page.getByRole('link', { name: /hablar con un asesor/i })
    await expect(wa).toHaveAttribute(
      'href',
      new RegExp(`api\\.whatsapp\\.com/send\\?phone=${WA_COMERCIAL}`),
    )
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

  test('el formulario de financiamiento expone sus campos', async ({ page }) => {
    await page.goto('/financiamiento')

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const campos = page.locator('input, select')
    await expect(campos.first()).toBeVisible()
  })
})
