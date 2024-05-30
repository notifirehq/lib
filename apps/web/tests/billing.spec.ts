import { expect, Page } from '@playwright/test';
import { test } from './utils.ts/baseTest';
import { initializeSession } from './utils.ts/browser';
import { BillingPage } from './page-models/billingPage';
import { BillingRouteMocks } from './rest-mocks/BillingRouteMocks';
import { OrganizationRouteMocks } from './rest-mocks/OrganizationRouteMocks';

const GREEN = 'rgb(77, 153, 128)';
const YELLOW = 'rgb(253, 224, 68)';

test.beforeEach(async ({ page }) => {
  const { featureFlagsMock } = await initializeSession(page, { noTemplates: true });
  featureFlagsMock.setFlagsToMock({
    IS_IMPROVED_ONBOARDING_ENABLED: false,
    IS_INFORMATION_ARCHITECTURE_ENABLED: true,
    IS_BILLING_REVERSE_TRIAL_ENABLED: true,
    IS_BILLING_ENABLED: false,
    IS_TEMPLATE_STORE_ENABLED: false,
  });
});

test('should display billing page', async ({ page }) => {
  await BillingRouteMocks.mockActiveSubscription(page);
  const billingPage = await BillingPage.goTo(page);
  await page.waitForTimeout(1000);
  await billingPage.assertBillingPlansTitle('Plans');
});

async function assertDynamicTimeLeftLabel(billingPage: BillingPage, timeInTrial: number) {
  await billingPage.assertTrialLabelContains(30 - timeInTrial + '');
}

test('should display free trial widget', async ({ page }) => {
  const billingPage = await testDynamicBannersInTrial(page, 0);
  await expect(billingPage.getTrialProgressBar()).toHaveCSS('width', '0px');
});

test('should display free trial widget after 10 days', async ({ page }) => {
  const billingPage = await testDynamicBannersInTrial(page, 10);
  await billingPage.assertTrialBarColor(GREEN);
});

test('should display free trial widget after 20 days', async ({ page }) => {
  const billingPage = await testDynamicBannersInTrial(page, 20);
  await billingPage.assertTrialBarColor(YELLOW);
  await billingPage.assertContactSalesBannerText('Contact sales');
});

test('should not display free trial widget after 30 days', async ({ page }) => {
  await BillingRouteMocks.mockActiveSubscription(page);
  const billingPage = await BillingPage.goTo(page);
  await billingPage.settingsMenu.assertNoFreeTrial();
  await billingPage.assertNoFreeTrial();
});

test('should display free trail info on billing page', async ({ page }) => {
  await BillingRouteMocks.mockSubscriptionTrial(page, 0);
  await OrganizationRouteMocks.augmentOrganizationToServiceLevelBusiness(page);
  const billingPage = await BillingPage.goTo(page);
  await billingPage.assertBillingPlansTitle('Plans');
  await billingPage.assertTrialWidgetText('30 days left on your trial');
});

test('should be able to manage subscription', async ({ page }) => {
  await BillingRouteMocks.mockActiveSubscription(page);
  await OrganizationRouteMocks.augmentOrganizationToServiceLevelBusiness(page);
  const billingPage = await BillingPage.goTo(page);
  await billingPage.assertPlansIsTitle();
  await billingPage.waitForPlanBusinessCurrent();
  await billingPage.waitForPlanBusinessManage();
});

test('should be able to upgrade from free', async ({ page }) => {
  await BillingRouteMocks.mockActiveSubscription(page);
  await OrganizationRouteMocks.augmentOrganizationCallServiceLevel(page, 'free');
  const billingPage = await BillingPage.goTo(page);
  await billingPage.assertPlansIsTitle();
  await billingPage.waitForPlanFreeCurrent();
  await billingPage.waitForUpgradeButton();
});
test('full user flow from subscription to active', async ({ page }) => {
  await assertStateOnTrial(page);
  await assertTrialFinished(page);
});
async function assertStateOnTrial(page: Page) {
  await BillingRouteMocks.mockSubscriptionTrial(page, 20);
  await OrganizationRouteMocks.augmentOrganizationToServiceLevelBusiness(page);
  const billingPage = await BillingPage.goTo(page);
  await billingPage.assertPlansIsTitle();
  await billingPage.waitForPlanBusinessCurrent();
  await billingPage.waitForPlanBusinessAndPayment();
  await billingPage.waitForFreeTrialWidget();
  await billingPage.assertTrialWidgetText('10 days left on your trial');
  await billingPage.waitForFreeTrialBanner();
}
async function testDynamicBannersInTrial(page: Page, timeInTrial: number) {
  await OrganizationRouteMocks.augmentOrganizationCallServiceLevel(page, 'business');
  await BillingRouteMocks.mockSubscriptionTrial(page, timeInTrial);
  const billingPage = await BillingPage.goTo(page);
  await assertDynamicTimeLeftLabel(billingPage, timeInTrial);
  await billingPage.assertUpgradeButtonTextContains('Upgrade');

  return billingPage;
}

async function assertTrialFinished(page: Page) {
  await BillingRouteMocks.mockActiveSubscription(page);
  const billingPage = await BillingPage.goTo(page);
  await billingPage.assertNoFreeTrial();
  await billingPage.settingsMenu.assertNoFreeTrial();
  await billingPage.assertNoFreeTrialBanner();
}
