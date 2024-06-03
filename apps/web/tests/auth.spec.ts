import { expect } from '@playwright/test';
import { test } from './utils.ts/baseTest';
import { AuthLoginPage } from './page-models/authLoginPage';
import { PasswordResetPage } from './page-models/passwordResetPage';
import { SignUpPage } from './page-models/signupPage';
import { assertPageShowsMessage, initializeSession } from './utils.ts/browser';
import { faker } from '@faker-js/faker';
import { clearDatabase, seedDatabase } from './utils.ts/plugins';
import { FeatureFlagsMock } from './utils.ts/featureFlagsMock';

let knownTestUser;

test.beforeAll(async () => {
  await clearDatabase();
  knownTestUser = await seedDatabase();
});
test.beforeEach(async ({ page }) => {
  const featureFlagsMock = new FeatureFlagsMock(page);
  featureFlagsMock.setFlagsToMock({
    IS_IMPROVED_ONBOARDING_ENABLED: true,
    IS_HUBSPOT_ONBOARDING_ENABLED: false,
    IS_INFORMATION_ARCHITECTURE_ENABLED: true,
    IS_BILLING_REVERSE_TRIAL_ENABLED: false,
    IS_BILLING_ENABLED: false,
    IS_TEMPLATE_STORE_ENABLED: false,
  });
});

test('should allow a visitor to sign-up and login', async ({ page }) => {
  const signUpPage = await SignUpPage.goTo(page);

  await signUpPage.fillSignUpData();
  await signUpPage.clickSignUpButton();
  await signUpPage.assertNavigationPath('/auth/application');
  await signUpPage.fillUseCaseData();
  await signUpPage.clickGetStartedButton();
  await signUpPage.assertNavigationPath('/get-started**');
});

test('should show account already exists when signing up with already registered mail', async ({ page }) => {
  const signUpPage = await SignUpPage.goTo(page);
  await signUpPage.fillSignUpData({ email: knownTestUser.email });
  await signUpPage.clickSignUpButton();
  await assertPageShowsMessage(page, 'An account with this email already exists');
});

test('should show invalid email error when signing up with invalid email', async ({ page }) => {
  const signUpPage = await SignUpPage.goTo(page);
  await signUpPage.fillSignUpData({ email: 'invalid_email_data' });
  await signUpPage.clickSignUpButton();
  await assertPageShowsMessage(page, 'Please provide a valid email');
});

test('should show password reset link sent message on any email input', async ({ page }) => {
  const passwordResetPage = await PasswordResetPage.goTo(page);
  await passwordResetPage.setEmailTo('someValid@email.com');
  await passwordResetPage.clickResetPasswordButton();
  await assertPageShowsMessage(page, `We've sent a password reset link to the account associated with your email`);
});

test('should redirect to the dashboard page when a token exists in query', async ({ page }) => {
  const { featureFlagsMock, session } = await initializeSession(page);

  featureFlagsMock.setFlagsToMock({
    IS_IMPROVED_ONBOARDING_ENABLED: true,
    IS_INFORMATION_ARCHITECTURE_ENABLED: true,
    IS_BILLING_REVERSE_TRIAL_ENABLED: false,
    IS_BILLING_ENABLED: false,
    IS_TEMPLATE_STORE_ENABLED: false,
  });

  const authLoginPage = await AuthLoginPage.goTo(page, session.token);
  await authLoginPage.assertNavigationPath('/workflows**');
});

test('should be redirect login with no auth', async ({ page }) => {
  await page.goto('/');
  expect(await page.waitForURL('/auth/login'));
});

test('should successfully login the user', async ({ page }) => {
  const authLoginPage = await AuthLoginPage.goTo(page);
  await authLoginPage.fillLoginForm({ email: knownTestUser.email, password: '123qwe!@#' });
  await authLoginPage.clickSignInButton();
  await authLoginPage.assertNavigationPath('/workflows**');
});

test('should show incorrect email or password error when authenticating with bad credentials', async ({ page }) => {
  const authLoginPage = await AuthLoginPage.goTo(page);
  await authLoginPage.fillLoginForm({ email: knownTestUser.email, password: 'bad_PASSWORD_v4|_ue' });
  await authLoginPage.clickSignInButton();
  await assertPageShowsMessage(page, 'Incorrect email or password provided');
});

test('should show invalid email error when authenticating with invalid email', async ({ page }) => {
  const authLoginPage = await AuthLoginPage.goTo(page);
  await authLoginPage.fillLoginForm({ email: 'invalid_email_value', password: 'bad_PASSWORD_v4|_ue' });
  await authLoginPage.clickSignInButton();
  await assertPageShowsMessage(page, 'Please provide a valid email');
});

test('should show incorrect email or password error when authenticating with non-existing email', async ({ page }) => {
  const authLoginPage = await AuthLoginPage.goTo(page);
  await authLoginPage.fillLoginForm({
    email: faker.internet.email(),
    password: faker.internet.password(20, true, /[A-Za-z0-9]/, 'Admin!234'),
  });
  await authLoginPage.clickSignInButton();
  await assertPageShowsMessage(page, 'Incorrect email or password provided');
});

test('should logout user when auth token is expired', async ({ page }) => {
  const authLoginPage = await AuthLoginPage.goTo(page);
  await authLoginPage.setEmailTo(knownTestUser.email);
  await authLoginPage.setPasswordTo('123qwe!@#');
  await authLoginPage.clickSignInButton();
  await authLoginPage.passAuthTokenExpirationTime();
  await page.goto('/subscribers');
  await page.waitForURL('/auth/login');
});
