**GitHub Repository:**  
https://github.com/Noorhesham/doctor-task

---

## Doctor Appointment Scheduler

A React application that lets users browse doctors, filter by specialty/location, search by name, and book appointments. Built with **React**, **ShadCN/UI**, **React Hook Form**, **Zod**, **Framer Motion**, and **React Toastify**.

---

### 🛠️ Tech Stack

- **Framework:** React 18 (Next.js‑style client app)
- **Styling & Components:** [ShadCN/UI](https://github.com/shadcn/ui)
- **State & Forms:** React Hook Form, Zod (validation)
- **Animations:** Framer Motion
- **Notifications:** React Toastify
- **Icons:** Lucide‑React
- **Layout:** CSS Grid + Tailwind CSS

---

## 🚀 Setup Instructions

1. **Clone the repo**

   ```bash
   git clone https://github.com/yourusername/doctor-appointment-app.git
   cd doctor-task
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run locally**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## 🤖 How We Used AI Tools

- **ChatGPT (OpenAI)**
  - Generated the json data for all doctors and filters
  - Crafted the README, validation schema, and improved keyboard‑accessibility.
  - Reviewed filtering logic and suggested keyboard‑accessible patterns.
- **GitHub Copilot**
  - Auto‑completed boilerplate code for React components.
  - Suggested TypeScript types and default prop values.

---

## ⚠️ Known Limitations & Next Steps

1. **No Backend Integration**

   - _Limitation:_ Currently uses hard‑coded `DOCTORS` constants.
   - _Next Step:_ Hook up a real API (e.g., GraphQL/REST) and handle loading/error states.

2. **Timezone & Localization**

   - _Limitation:_ Dates are formatted in `yyyy‑MM‑dd` by default.
   - _Next Step:_ Add i18n support (NextIntl) and timezone handling.

3. **Form Validation UX**

   - _Limitation:_ Basic Zod validation; error placement could be enhanced.
   - _Next Step:_ disable the submit button until valid.

4. **Testing Coverage**

   - _Limitation:_ No unit or integration tests yet.
   - _Next Step:_ Add Jest/React Testing Library tests for components, validation, and filters.

5. **Performance Optimizations**

   - _Limitation:_ All doctors are loaded into memory.
   - _Next Step:_ Implement server‑side pagination or virtualization (e.g., React Window).

6. **Accessibility Audit**
   - _Limitation:_ Basic ARIA roles applied, but not fully audited.
   - _Next Step:_ Run an a11y audit (axe, Lighthouse), refine keyboard navigation and screen reader labels.
