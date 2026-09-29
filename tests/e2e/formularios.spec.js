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

  test('bloquea el envío con campos vacíos y muestra errores de validación nativos', async ({
    page,
  }) => {
    const form = page.locator('form')
    await form.scrollIntoViewIfNeeded()

    await form.locator('button[type="submit"]').click()

    const validos = await form.evaluate((el) => el.checkValidity())
    expect(validos).toBe(false)
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

  test('muestra estado de éxito al enviar correctamente', async ({ page }) => {
    await page.route('**/api/pqrs', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }),
    )

    const form = page.locator('form')
    await form.scrollIntoViewIfNeeded()

    await form.locator('#tipoSolicitud').selectOption({ index: 1 })
    await form.locator('#documento').fill('1012345678')
    await form.locator('#celular').fill('3160000000')
    await form.locator('#correo').fill('cliente@correo.com')
    await form.locator('#descripcion').fill('Solicito información sobre el financiamiento.')
    await form.locator('button[type="submit"]').click()

    await expect(form.getByText(/gracias/i).first()).toBeVisible()
  })

  test('muestra estado de error si la API falla', async ({ page }) => {
    await page.route('**/api/pqrs', (route) =>
      route.fulfill({ status: 500, contentType: 'application/json', body: '{}' }),
    )

    const form = page.locator('form')
    await form.scrollIntoViewIfNeeded()

    await form.locator('#tipoSolicitud').selectOption({ index: 1 })
    await form.locator('#documento').fill('1012345678')
    await form.locator('#celular').fill('3160000000')
    await form.locator('#correo').fill('cliente@correo.com')
    await form.locator('#descripcion').fill('Prueba de error.')
    await form.locator('button[type="submit"]').click()

    await expect(form.getByText(/error|no pudimos/i).first()).toBeVisible()
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
