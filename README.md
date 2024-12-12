# Next.js + Tailwind + Shadcn Boilerplate

## Overview

The Next.js + Tailwind + Shadcn Boilerplate is an internal project designed to streamline the process of starting new applications across our development teams. Built with modern technologies like Next.js, TailwindCSS, and Shadcn, this boilerplate provides a solid foundation that reduces setup time, promotes consistency, and enforces best practices.

## Key Objectives:

- **Accelerate Project Initiation**: Eliminate repetitive setup tasks and get projects up and running faster.
- **Promote Standards**: Ensure adherence to company-wide development guidelines and best practices.
- **Enhance Maintainability**: Provide a clean, modular codebase that simplifies scaling and feature additions.
## Sign-In

The Sign-In page is powered by NextAuth.js with a Credentials Provider, ensuring a secure and customizable authentication process.

Features:

- **User-Friendly Error Handling**: Clear and descriptive error messages guide users through any issues during the login process.
- **Real-Time Validation**: Form inputs are validated as users type, ensuring a seamless and error-free experience.
- **Convenient Navigation**: Includes a direct link to the Forgot Password page for users who need to reset their credentials.

This page is the entry point for users, setting the foundation for a secure and intuitive application experience.
## Forgot Page

The Forgot Page facilitates the password recovery process with a secure and user-friendly workflow.
Workflow:

- **Send OTP**: Users can request a one-time password (OTP), which is sent via email.
- **Verify OTP**: Users must enter the received OTP to proceed.
- **Reset Password**: After verifying the OTP, users can securely reset their password.

Features:

- **Email-Based OTP Delivery**: The OTP is sent to the user's registered email address.
- **Time-Sensitive Security**: The OTP expires after 15 minutes, ensuring secure and timely use.
- **User-Friendly Messages**: Clear messages guide users through the process, without revealing whether the email exists in the system, enhancing security.

This page is designed to provide a smooth recovery experience while maintaining high security standards.
## Dashboard Page

The Dashboard Page serves as the central hub for users, providing a quick overview and access to key features.

Features:

- **Sample Charts**: Includes simple, example charts to demonstrate how data can be visualized effectively.

This page is designed to be easily extendable, allowing development teams to customize and expand it based on project requirements.
## List Page

The List Page is designed to display data in a structured and interactive table format.
Features:

- **Example Product Listing**: Pre-configured to display a list of sample products, serving as a template for various data types.
- **Search Functionality**: Users can quickly find specific entries using the built-in search bar.
- **Filters**: Advanced filtering options allow users to narrow down the displayed data based on specific criteria.
- **Pagination**: Ensures a seamless experience when navigating through large datasets.

This page provides a robust starting point for creating dynamic and user-friendly lists.
## Account Page

The Account Page allows users to manage and update their personal information and account settings.

Features:

- **Update Personal Information**: Users can update their first name and last name to keep their profile information accurate.
- **Change Password**: To change the password, users must first provide their current password for security reasons. New passwords are validated to ensure they meet strength requirements.
- **Password Strength Validation**: The page includes real-time validation to ensure that new passwords are strong and secure.

This page is designed to give users control over their account settings while maintaining high-security standards.
## Other Features

### Internationalization

This project supports Internationalization through the use of next-intl, allowing for easy localization and language switching.

Features:

- **Page-Based Translations**: Translations are organized by pages, with each page having its own separate translation file for better maintainability.
- **Supported Languages**: Currently, the project supports English and Spanish, with the flexibility to easily add more languages as needed.
- **Language Switcher**: A `LanguageSwitcher` component, implemented as a select dropdown, allows users to choose their preferred language seamlessly.

This internationalization setup ensures that the application can cater to users from different language backgrounds with minimal effort.
