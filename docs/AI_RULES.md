# Zivaro AI Engineering Rules

This document outlines the strict rules and constraints for AI agents and developers working on the Zivaro frontend. Adherence to these rules is mandatory to maintain a scalable, premium, and robust startup architecture.

## 1. Locked Component Rules
* **Never overwrite completed components:** Once a component is marked as complete or is functioning correctly in production, do not modify its core logic unless explicitly instructed to refactor or add a specific feature.
* **Preserve existing functionality:** When extending components, always maintain backwards compatibility. Ensure that new props are optional and do not break existing implementations.
* **Do not delete working code:** Instead of deleting components to try an alternative approach, create a new variant or explicitly ask for permission.

## 2. Frozen Architecture Rules
* **Strict folder boundaries:** The structural integrity of the project must be maintained. Do not place files outside of their designated domain (e.g., no components inside `/hooks`, no business logic inside `/ui`).
* **State Management:** Local state must use `useState`/`useReducer`. Global application state must use **Zustand**. Do not introduce Redux, Context API (for global state), or other state managers without explicit approval.
* **Data Fetching:** API calls must reside in the `/services` folder. Components should only call these services, typically via custom hooks, and should not contain raw `fetch` or `axios` calls.

## 3. Design System Rules
* **Tailwind CSS ONLY:** All styling must be done using Tailwind CSS utility classes. Avoid creating custom CSS or SCSS files unless absolutely necessary for complex animations or third-party overrides.
* **shadcn/ui as the foundation:** Use shadcn/ui for base interactive elements. Do not build complex accessible components (like Modals, Selects, or Dialogs) from scratch.
* **Premium Startup Aesthetic:** Ensure the UI feels spacious and modern.
    * Use soft, Instagram-like cards with subtle shadows.
    * Incorporate subtle gradients for backgrounds or text highlights.
    * Maintain ample padding and margins (whitespace is crucial).

## 4. Animation Rules
* **Framer Motion for complex animations:** Any layout transitions, orchestration, or complex micro-interactions must use `framer-motion`.
* **Tailwind for simple transitions:** Hover states, focus states, and simple state toggles should use standard Tailwind `transition-all duration-200` utilities.
* **Keep it subtle:** Animations should enhance the user experience, not distract. Avoid long durations (>300ms) or overly bouncy spring physics unless explicitly requested.

## 5. Responsive Layout Rules
* **Mobile-First Approach:** Always design the default Tailwind classes for mobile (`xs` or default). Progressively enhance for larger screens using `sm:`, `md:`, `lg:`, and `xl:`.
* **Fluid Typography & Spacing:** Utilize relative units (rem) and Tailwind's built-in spacing scale to ensure layouts scale correctly.
* **Safe Areas:** Ensure that crucial UI elements do not overlap with native mobile notches or browser chrome.

## 6. Code Safety & Formatting Rules
* **Strict TypeScript:** All files must be `.ts` or `.tsx`. No `any` types allowed unless completely unavoidable. Define explicit interfaces in the `/types` directory.
* **Zod for Validation:** All forms and external API responses must be validated using Zod schemas.
* **Clean Imports:** Always use path aliases (`@/components/...`). Do not use long relative paths (`../../../../`).
* **Linting:** Code must pass ESLint and Prettier checks without warnings.

> **CRITICAL:** Failure to follow these rules will compromise the stability and maintainability of the Zivaro platform. When in doubt, ask for clarification.
