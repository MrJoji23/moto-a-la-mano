import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 375, height: 812 } }); // móvil

test('home: sin scroll horizontal y CTAs funcionales', async ({ page }) => {
  await page.goto('/');
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  expect(overflow).toBe(false);

  await page.getByRole('link', { name: /ver motos bajaj/i }).click();
  await expect(page).toHaveURL(/\/bajaj$/);
});

test('home: WhatsApp abre con el mensaje de asesoría', async ({ page }) => {
  await page.goto('/');
  const wa = page.getByRole('link', { name: /hablar con un asesor/i });
  await expect(wa).toHaveAttribute('href', /api\.whatsapp\.com\/send\?phone=573224127278/);
});