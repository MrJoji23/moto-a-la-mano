import { test, expect } from '@playwright/test'

test.describe('Navbar', () => {
  test('muestra el logo, los enlaces y el CTA en escritorio', async ({ page }) => {
    await page.goto('/')

    const nav = page.getByRole('navigation', { name: 'Navegación principal' })
    await expect(nav).toBeVisible()
    await expect(nav.getByRole('link', { name: /MotoCenter/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Inicio' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Financiamiento' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Nosotros' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'PQRSF' })).toBeVisible()
    await expect(nav.getByRole('button', { name: 'Contáctanos' })).toBeVisible()
  })

  test('el logo no apunta a un recurso inexistente', async ({ page }) => {
    const failed = []
    page.on('response', (res) => {
      if (res.status() >= 400) failed.push(`${res.status()} ${res.url()}`)
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const logo = page.getByRole('navigation').getByRole('img')
    await expect(logo).toBeVisible()
    const naturalWidth = await logo.evaluate((img) => img.naturalWidth)
    expect(naturalWidth).toBeGreaterThan(0)
    expect(failed).toEqual([])
  })

  test('el desplegable de Marcas abre y navega a cada marca', async ({ page }) => {
    await page.goto('/')

    const toggle = page.getByRole('button', { name: 'Marcas' })
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')

    const menu = page.locator('#marcas-menu')
    await expect(menu).toBeVisible()
    await expect(menu.getByRole('link', { name: 'Bajaj' })).toBeVisible()
    await expect(menu.getByRole('link', { name: 'Auteco' })).toBeVisible()

    await menu.getByRole('link', { name: 'Bajaj' }).click()
    await expect(page).toHaveURL(/\/bajaj$/)
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  test('Escape cierra el desplegable', async ({ page }) => {
    await page.goto('/')

    const toggle = page.getByRole('button', { name: 'Marcas' })
    await toggle.click()
    await expect(page.locator('#marcas-menu')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.locator('#marcas-menu')).toBeHidden()
  })

  test('marca el enlace de la ruta activa', async ({ page }) => {
    await page.goto('/bajaj')
    await expect(page.getByRole('link', { name: 'Bajaj' })).toHaveClass(
      /mm-nav-link--active/,
    )
  })

  test('el menú móvil se abre, navega y bloquea el scroll', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const burger = page.getByRole('button', { name: 'Abrir menú' })
    await expect(burger).toBeVisible()
    await expect(burger).toHaveAttribute('aria-expanded', 'false')

    await burger.click()
    await expect(burger).toHaveAttribute('aria-expanded', 'true')

    const menu = page.locator('#mobile-menu')
    await expect(menu).toBeVisible()
    await expect(menu.getByRole('link', { name: 'PQRSF' })).toBeVisible()

    const overflow = await page.evaluate(() => document.body.style.overflow)
    expect(overflow).toBe('hidden')

    await menu.getByRole('link', { name: 'PQRSF' }).click()
    await expect(page).toHaveURL(/\/pqrs$/)
    await expect(menu).toBeHidden()

    const overflowAfter = await page.evaluate(() => document.body.style.overflow)
    expect(overflowAfter).not.toBe('hidden')
  })

  test('el skip link lleva al contenido principal', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')

    const skip = page.getByRole('link', { name: 'Saltar al contenido' })
    await expect(skip).toBeFocused()
    await skip.press('Enter')

    await expect(page).toHaveURL(/#contenido$/)
  })

  test('el CTA abre el modal de contacto', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Contáctanos' }).first().click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('button', { name: /cerrar/i })).toBeVisible()
  })
})
