import { expect, test } from '@playwright/test'

test.describe('invitation layers', () => {
  test('documents the docs-to-app invitation flow', async ({ page }, testInfo) => {
    await page.goto('/')

    const navCta = page.getByRole('link', { name: 'Build Your Circle' }).first()
    const heroCta = page.getByRole('link', { name: 'Where am I?' })
    const homeSection = page.getByRole('heading', { name: 'A way to keep human things at the center.' })
    const whyHeading = page.getByRole('heading', { name: /Human values shouldn't change because of the way we use technology/i })
    const homeTopicSection = page.getByRole('heading', { name: 'Enter by the question that already has hold of you.' })

    await expect(navCta).toBeVisible()
    await expect(heroCta).toBeVisible()
    await expect(homeSection).toBeVisible()
    await expect(whyHeading).toBeVisible()
    await expect(homeTopicSection).toBeVisible()
    await expect(navCta).toHaveAttribute('href', 'https://app.lowtechmonk.com')
    await expect(heroCta).toHaveAttribute('href', /\/the-why(\.html)?$/)

    const heroBox = await page.locator('.VPHero').boundingBox()
    const whyBox = await whyHeading.boundingBox()
    expect(heroBox).not.toBeNull()
    expect(whyBox).not.toBeNull()
    expect(whyBox!.y - (heroBox!.y + heroBox!.height)).toBeGreaterThan(24)

    await page.screenshot({
      path: testInfo.outputPath('home-invitation-layer.png'),
      fullPage: true,
    })

    await page.goto('/the-way')

    const contextualBlock = page.getByText('If this way makes sense to you, the next step is not only to agree with it.')
    await expect(contextualBlock).toBeVisible()
    await page.screenshot({
      path: testInfo.outputPath('the-way-contextual-invitation.png'),
      fullPage: true,
    })

    await page.goto('/from-reading-to-practice')

    const bridgeHeading = page.getByRole('heading', { name: 'From Reading to Practice' })
    const bridgeCta = page.locator('.vp-doc').getByRole('link', { name: 'Build Your Circle' }).first()

    await expect(bridgeHeading).toBeVisible()
    await expect(bridgeCta).toBeVisible()
    await expect(bridgeCta).toHaveAttribute('href', 'https://app.lowtechmonk.com/#/flames')
    await page.screenshot({
      path: testInfo.outputPath('bridge-page.png'),
      fullPage: true,
    })
  })
})
