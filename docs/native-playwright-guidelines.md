# Native Playwright Guidelines

This repo is being moved away from Java-style wrappers and toward plain Playwright.

## Prefer

- `page.getByRole(...)`, `page.getByText(...)`, `page.getByLabel(...)`, and `page.locator(...)`
- small page object methods that do one thing clearly
- page methods like `login(user)` or `completeDefaultOnboarding()` instead of long chained scenarios
- returning the next page object only when navigation actually happens
- assertions close to the behavior they verify

## Avoid

- custom locator builders
- `.build()` style indirection on locators
- assertion wrappers for simple visibility/text checks
- base classes that hide normal Playwright APIs
- long chains that exist only to make fluent syntax possible

## Current examples

- [`LoginPage`](../tests/src/main/ts/pages/other/LoginPage.ts) now exposes `login(user)` and `loginWithOnboarding(user)`.
- [`OnboardingPage`](../tests/src/main/ts/pages/other/OnboardingPage.ts) now groups the default flow in `completeDefaultOnboarding()`.
- [`LoginScenario`](../tests/src/main/ts/scenarios/other/LoginScenario.ts) and [`LoginWithOnboardingScenario`](../tests/src/main/ts/scenarios/other/LoginWithOnboardingScenario.ts) now call those page methods directly.
- The old locator builder layer under `tests/src/main/ts/common/locatorBuilder` has been removed.
- The old `assertThat(...).isVisible()` facade has been removed. Assertion classes now call native Playwright `expect(...)` matchers directly.
- The old `check(...).endAssertion()` shell has been removed from the tests and from the shared page base.

## Next refactor passes

- delete or consolidate the now-unused assertion classes if we do not want a temporary migration fallback
- convert the remaining Java-translated page objects to `this.`-based, valid TypeScript
- migrate the sync-looking flows to real `async`/`await` Playwright usage
