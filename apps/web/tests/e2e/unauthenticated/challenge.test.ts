import { test, expect } from '@playwright/test';
import { prisma } from '@repo/db';

test.use({ storageState: 'playwright/.auth/unauthenticated.json' });

test('challenge page', async ({ page }) => {
  const challengeId = 4;

  // delete replies
  await prisma.comment.deleteMany({
    where: {
      rootChallengeId: challengeId,
      parentId: {
        not: null,
      },
    },
  });
  await prisma.comment.deleteMany({
    where: {
      rootChallengeId: challengeId,
    },
  });
  await prisma.sharedSolution.deleteMany({
    where: {
      challengeId,
    },
  });
  await prisma.submission.deleteMany({
    where: {
      challengeId,
    },
  });

  await page.goto(`/challenge/pick`);

  await expect(page.getByRole('heading', { name: 'Pick' })).toBeVisible();
  await expect(
    page.getByText('Implement the built-in Pick<T, K> generic without using it.'),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Comments' }).click();
  await expect(page.getByRole('button', { name: 'Preview' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Comment', exact: true })).toBeDisabled();

  await page.getByRole('button', { name: 'Comments' }).click();
  await expect(page.getByText('No comments yet, be the first to comment!')).toBeVisible();

  await page.getByRole('tab', { name: 'Solutions' }).click();
  await expect(
    page.getByText('No solutions yet, complete the challenge to submit one!'),
  ).toBeVisible();

  await page.getByRole('tab', { name: 'Submissions' }).click();
  await expect(page.getByText('No submissions yet, submit the challenge!')).toBeVisible();

  await page.getByRole('button', { name: 'Tests' }).click();

  await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();
});

test('reset challenge', async ({ page }) => {
  await page.goto('/challenge/pick');

  await expect(page.getByText('type MyPick<T, K> = any')).toBeVisible();

  await page.getByLabel('Editor content').first().fill('');
  await expect(page.getByText('type MyPick<T, K> = any')).not.toBeVisible();

  await page.locator('button[name="reset"]').click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText('type MyPick<T, K> = any')).toBeVisible();
});
