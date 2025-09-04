import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  //public routes
  index("pages/home/home.tsx"),
  layout(
    "domains/auth/session/PublicRoute.tsx", [
    route("login", "pages/login/Login.tsx"),
    route("signup", "pages/signup/Signup.tsx"),
    route("signup-confirmation", "pages/signup-confirmation/SignupConfirmationPage.tsx"),
  ]),
  //protected routes
  layout(
    "domains/auth/session/ProtectedRoute.tsx", [
    layout("shared/theme/components/DashboardLayout.tsx", [
     route("dashboard", "pages/dashboard/Dashboard.tsx"),
     route("expenses", "pages/dashboard/expenses/Expenses.tsx"),
     route("savings", "pages/dashboard/savings/Savings.tsx")
    ]),
  ]),
] satisfies RouteConfig;