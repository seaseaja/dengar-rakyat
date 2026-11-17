# Implementation Plan

## Overview

This implementation plan follows the exploratory bugfix workflow: first write tests to demonstrate the bug exists, then apply the fix while preserving existing behavior. All dropdown menu items must become clickable while maintaining outside-click closure behavior.

## Task Dependency Graph

```json
{
  "waves": [
    {
      "name": "Phase 1: Exploration & Preservation Testing",
      "tasks": [
        {
          "id": "1",
          "title": "Bug Condition Exploration Test (Property 1)",
          "dependsOn": []
        },
        {
          "id": "2",
          "title": "Preservation Property Tests (Property 2)",
          "dependsOn": ["1"]
        }
      ]
    },
    {
      "name": "Phase 2: Implementation & Validation",
      "tasks": [
        {
          "id": "3",
          "title": "Fix Implementation",
          "dependsOn": ["1", "2"],
          "subtasks": [
            { "id": "3.1", "title": "Replace onBlur with document click detection", "dependsOn": [] }
          ]
        },
        {
          "id": "3.2",
          "title": "Verify Bug Condition Test Passes",
          "dependsOn": ["3"]
        },
        {
          "id": "3.3",
          "title": "Verify Preservation Tests Pass",
          "dependsOn": ["3.2"]
        }
      ]
    },
    {
      "name": "Phase 3: Final Validation",
      "tasks": [
        {
          "id": "4",
          "title": "Checkpoint - Ensure All Tests Pass",
          "dependsOn": ["3.2", "3.3"]
        }
      ]
    }
  ]
}
```

**Task Flow:**
- Tasks 1 and 2 are exploratory/preservation tests written on UNFIXED code
- Task 3 implements the fix based on findings from tasks 1 and 2
- Tasks 3.2 and 3.3 re-run the same tests on FIXED code to validate the fix
- Task 4 is the final checkpoint to ensure all tests pass and no regressions exist

---

## Tasks

### Phase 1: Exploration & Preservation Testing

- [ ] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Dropdown Menu Items Click Propagation
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the bug exists
  - **Scoped PBT Approach**: For this deterministic bug, scope the property to concrete failing cases: clicking menu items (Buat Laporan Baru, Laporan Saya, Profil Saya, Logout) while dropdown is open
  - Test implementation details from Bug Condition in design:
    - Simulate opening Laporan dropdown menu
    - Simulate clicking "Buat Laporan Baru" link
    - Assert that the click event propagates and navigation occurs (href navigation to `/laporan/baru`)
    - Simulate opening Profile dropdown menu
    - Simulate clicking "Profil Saya" link
    - Assert that the click event propagates and navigation occurs
    - Simulate opening Profile dropdown menu
    - Simulate clicking "Logout" button
    - Assert that the click event propagates and logout handler executes
  - The test assertions should match the Expected Behavior Properties from design:
    - Menu item click handlers execute
    - Navigation or logout action completes
    - Menu closes after navigation (due to page change, not premature blur)
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found to understand root cause (e.g., "clicking menu item does not navigate because menu closes before click event propagates")
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Outside Click and Keyboard Behavior
  - **IMPORTANT**: Follow observation-first methodology
  - Run UNFIXED code with non-buggy inputs to observe baseline behavior
  - Document observed behaviors to preserve:
    - Observe: Clicking outside dropdown closes the menu immediately
    - Observe: Pressing Escape key while dropdown open closes the menu
    - Observe: Clicking on navbar button toggles menu open/closed
    - Observe: Laporan menu only shows for "warga" role users
    - Observe: Profile menu shows for all authenticated users
    - Observe: Opening one dropdown closes the other
    - Observe: Active state styling applied to open dropdown button
    - Observe: Hover states and focus states work correctly
  - Write property-based tests capturing observed behavior patterns from Preservation Requirements:
    - Property: For any click outside the dropdown container, dropdown closes (test random outside click positions)
    - Property: For any Escape key press while dropdown open, dropdown closes
    - Property: For any button click to toggle, menu state inverts correctly
    - Property: For any user role, appropriate menu items are visible (warga vs non-warga)
    - Property: For any sequence of menu open/close actions, state remains consistent
    - Property: For any focus event outside dropdown, menu closes without affecting page state
  - Property-based testing generates many test cases for stronger preservation guarantees
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

### Phase 2: Implementation & Validation

- [ ] 3. Fix for Navbar Dropdown Button Clickability Issue

  - [ ] 3.1. Replace onBlur handler with document click detection
    - Add `useRef` for `laporanMenuRef` and `profileMenuRef` to reference dropdown containers
    - Create a `useEffect` hook that adds a click listener to `document`
    - When click event occurs, check if click target is inside the dropdown refs
    - If click is outside both dropdowns, close both menus
    - If click is inside a dropdown, do not close that dropdown (let click event propagate to menu items)
    - Handle cleanup: remove click listener when component unmounts
    - Update button `onBlur` handlers to check `event.relatedTarget`
    - If `relatedTarget` is within the dropdown container, do NOT close the menu
    - If `relatedTarget` is outside or null, close the menu
    - Remove the `setTimeout` from blur handlers - state updates should be synchronous
    - Add `useEffect` hook to listen for `keydown` events with key === "Escape"
    - When Escape is pressed, close any open dropdown menus
    - Ensure Escape handler doesn't interfere with other keyboard interactions
    - _Bug_Condition: isBugCondition(input) where input = click on menu item while dropdown open_
    - _Expected_Behavior: Click event should propagate to menu item before menu closes_
    - _Preservation: Outside click, Escape key, and role-based visibility must remain unchanged_
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4_

  - [ ] 3.2. Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Dropdown Menu Items Click Propagation
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test from step 1:
      - Simulate clicking "Buat Laporan Baru" link while Laporan dropdown open → verify navigation occurs
      - Simulate clicking "Laporan Saya" link while Laporan dropdown open → verify navigation occurs
      - Simulate clicking "Profil Saya" link while Profile dropdown open → verify navigation occurs
      - Simulate clicking "Logout" button while Profile dropdown open → verify logout executes
    - All tests should pass, demonstrating that menu items are now clickable
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
    - Document any issues encountered and how they were resolved
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ] 3.3. Verify preservation tests still pass
    - **Property 2: Preservation** - Outside Click and Keyboard Behavior
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2:
      - Verify outside clicks still close dropdown immediately
      - Verify Escape key still closes dropdown
      - Verify button clicks still toggle menu state correctly
      - Verify role-based visibility is unchanged
      - Verify opening one dropdown still closes the other
      - Verify focus states and styling are unchanged
    - All tests should pass, demonstrating no regressions
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Document any edge cases encountered during preservation testing
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

### Phase 3: Final Validation

- [ ] 4. Checkpoint - Ensure All Tests Pass
  - Run full test suite for Navbar component
  - Run all Property 1 (Bug Condition) tests - should PASS
  - Run all Property 2 (Preservation) tests - should PASS
  - Run any existing unit tests for Navbar component
  - Verify no new test failures introduced
  - Verify no regressions in other components that use Navbar
  - **EXPECTED OUTCOME**: All tests pass
  - If any tests fail, diagnose root cause and fix before marking complete
  - Ensure all tests pass, ask the user if questions arise.

---

## Summary

The implementation follows the bug condition methodology:
- **C(X)**: Click on menu item while dropdown open → menu should remain clickable
- **P(result)**: Click event propagates, menu item action executes, menu closes after action
- **¬C(X)**: Outside clicks, Escape key, role-based visibility → existing behavior preserved
- **F**: Original unfixed code with unreliable onBlur + setTimeout
- **F'**: Fixed code with document-level click detection and proper blur handling

The fix replaces the unreliable onBlur timeout approach with:
1. Document-level click listener for reliable outside-click detection
2. Updated blur handler that checks relatedTarget to avoid premature closure
3. Escape key handler for keyboard navigation
4. Refs for dropdown containers to identify click targets
5. All role-based visibility and styling preserved

---

## Notes

### Testing Considerations

- **Bug Condition Tests**: Run on unfixed code first to confirm the bug exists and gather counterexamples. This validates the root cause analysis. The tests will fail on unfixed code, then pass after fix.
- **Preservation Tests**: Written using observation-first methodology - run on unfixed code to document baseline behavior, then verify the same tests pass after fix.
- **Property-Based Testing**: Recommended for preservation tests to generate many automatic test cases and catch edge cases in focus and click handling.

### Implementation Notes

- The fix focuses on replacing `onBlur` + `setTimeout` with document-level click detection
- All existing role-based visibility (Laporan for "warga" only) must be preserved
- Active state styling, hover states, and focus states should remain unchanged
- Mobile navigation behavior should not be affected by this fix
- Both Laporan and Profile dropdowns use the same pattern, so fix should apply to both consistently

### Verification Checklist

Before marking tasks complete:
- [ ] Bug condition test fails on unfixed code (confirms bug exists)
- [ ] Bug condition test passes after fix (confirms bug is fixed)
- [ ] Preservation tests pass on unfixed code (confirms baseline behavior documented)
- [ ] Preservation tests pass after fix (confirms no regressions)
- [ ] All menu items are clickable (Buat Laporan Baru, Laporan Saya, Profil Saya, Logout)
- [ ] Outside clicks still close dropdowns
- [ ] Escape key still closes dropdowns
- [ ] Role-based visibility unchanged (Laporan for warga, Profile for all users)
- [ ] No regressions in other navbar functionality
