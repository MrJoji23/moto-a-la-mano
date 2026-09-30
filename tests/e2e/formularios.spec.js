import { test, expect } from '@playwright/test'

test.describe('Formulario PQRSF', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pqrs')
  })

  test('todos los campos visibles tienen etiqueta asociada', async ({ page }) => {
    const form = page.locator('form')
    await form.scrollIntoViewIfNeeded()

    for (const name of ['tipoSolicitud', 'documento', 'celular', 'correo', 'descripcion', 'adjunto']) {
      const field = form.locator(`#${name}`)
      await expect(field).toHaveCount(1)

      const label = page.locator(`label[for="${name}"]`)
      await expect(label).toHaveCount(1)
      await expect(label).not.toBeEmpty()
    }
  })

  test('el botón de enviar está deshabilitado (solo de vista)', async ({ page }) => {
    const form = page.locator('form')
    await form.scrollIntoViewIfNeeded()

    const submitBtn = form.locator('button[type="submit"]')
    await expect(submitBtn).toBeVisible()
    await expect(submitBtn).toBeDisabled()
    await expect(submitBtn).toHaveText('Enviar Solicitud')

    const adjunto = form.locator('#adjunto')
    await expect(adjunto).toBeVisible()
    await expect(adjunto).toBeEnabled()
  })

  test('exige un documento válido y un correo válido', async ({ page }) => {
    const form = page.locator('form')
    await form.scrollIntoViewIfNeeded()

    await form.locator('#documento').fill('abc')
    await form.locator('#correo').fill('no-es-un-correo')
    await form.locator('#descripcion').fill('Prueba de validación')
    await form.locator('#celular').fill('3160000000')
    await form.locator('#tipoSolicitud').selectOption({ index: 1 })

    expect(await form.evaluate((el) => el.checkValidity())).toBe(false)

    await form.locator('#documento').fill('1012345678')
    await form.locator('#correo').fill('cliente@correo.com')

    expect(await form.evaluate((el) => el.checkValidity())).toBe(true)
  })

  test('muestra el nombre del archivo adjunto', async ({ page }) => {
    const form = page.locator('form')
    await form.scrollIntoViewIfNeeded()

    await form.locator('#adjunto').setInputFiles({
      name: 'soporte.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('%PDF-1.4 test'),
    })

    await expect(form.locator('.pqrs-page__uploadLabel')).toContainText('soporte.pdf')
  })

  test('el envío está bloqueado: no se dispara ninguna petición ni estado de éxito', async ({
    page,
  }) => {
    let peticiones = 0
    await page.route('**/api/pqrs', (route) => {
      peticiones += 1
      route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
    })

    const form = page.locator('form')
    await form.scrollIntoViewIfNeeded()

    await form.locator('#tipoSolicitud').selectOption({ index: 1 })
    await form.locator('#documento').fill('1012345678')
    await form.locator('#celular').fill('3160000000')
    await form.locator('#correo').fill('cliente@correo.com')
    await form.locator('#descripcion').fill('Solicito información sobre el financiamiento.')

    await form.evaluate((el) => el.requestSubmit())

    await expect(page.getByText(/gracias/i)).toHaveCount(0)
    await expect(form.locator('button[type="submit"]')).toBeDisabled()
    expect(peticiones).toBe(0)
  })
})

test.describe('Aviso de cookies', () => {
  test('se muestra la primera vez y recuerda la aceptación', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()

    const banner = page.getByRole('complementary', { name: 'Aviso de cookies' })
    await expect(banner).toBeVisible()

    await banner.getByRole('button', { name: 'Aceptar' }).click()
    await expect(banner).toBeHidden()

    await page.reload()
    await expect(
      page.getByRole('complementary', { name: 'Aviso de cookies' }),
    ).toBeHidden()
  })

  test('el enlace de cookies lleva a una página existente', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()

    await page.getByRole('link', { name: 'uso de cookies' }).click()
    await expect(page).toHaveURL(/\/politica-de-cookies$/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Cookies/i)
  })
})

test.describe('Página 404', () => {
  test('una ruta inexistente muestra el enlace de inicio', async ({ page }) => {
    await page.goto('/ruta-que-no-existe')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await page.getByRole('link', { name: /inicio/i }).first().click()
    await expect(page).toHaveURL(/\/$/)
  })
})
