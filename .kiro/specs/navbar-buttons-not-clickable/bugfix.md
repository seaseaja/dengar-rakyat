# Bugfix Requirements Document: Navbar Buttons Not Clickable

## Introduction

The navbar buttons in the Dengar Rakyat application are not responding to user clicks. Specifically, the "Buat Laporan Baru" (Create New Report), "Laporan Saya" (My Reports), "Profil Saya" (My Profile), and "Logout" buttons are unclickable. This prevents users from navigating to key application features and logging out. The root cause is that dropdown menus close prematurely when clicked due to blur event handling, preventing click events from reaching the menu items.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the user clicks on the "Laporan" dropdown button in the navbar THEN the dropdown menu opens correctly, but clicking on "Buat Laporan Baru" or "Laporan Saya" links does not navigate or trigger the click event

1.2 WHEN the user clicks on the profile button in the navbar THEN the profile dropdown menu opens correctly, but clicking on "Profil Saya" link does not navigate

1.3 WHEN the user clicks the Logout button in the profile menu THEN the button does not respond to the click event and logout is not triggered

1.4 WHEN any menu is open and the user clicks on a menu item (link or button) THEN the dropdown closes before the click event reaches the target element, preventing navigation or action execution

### Expected Behavior (Correct)

2.1 WHEN the user clicks on the "Laporan" dropdown button THEN the dropdown menu opens and remains open, and clicking on "Buat Laporan Baru" SHALL navigate the user to /laporan/baru

2.2 WHEN the user clicks on the "Laporan" dropdown button THEN the dropdown menu opens and remains open, and clicking on "Laporan Saya" SHALL navigate the user to /laporan

2.3 WHEN the user clicks on the profile button THEN the profile dropdown menu opens and remains open, and clicking on "Profil Saya" SHALL navigate the user to /profile

2.4 WHEN the user clicks the Logout button in the profile menu THEN the button SHALL respond to the click event and trigger the logout function, which logs the user out and redirects to /login

2.5 WHEN any menu item is clicked THEN the click event SHALL be fully processed before the menu closes, allowing navigation or action execution to complete successfully

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the user clicks outside a dropdown menu or on the navbar brand/main navigation links THEN the menu SHALL close and the user is not disrupted (existing behavior for menu closure must be preserved)

3.2 WHEN the user navigates to a different page using navbar links THEN the appropriate active state styling SHALL be maintained based on the current pathname (existing active state logic must work)

3.3 WHEN a user is not in the "warga" role THEN the Laporan dropdown SHALL not be visible in the navbar (role-based visibility must be preserved)

3.4 WHEN the dashboard page loads THEN the navbar SHALL display with correct user information and role-appropriate menu options (existing navbar rendering must not break)
