import { Form, NavLink, redirect, useNavigation } from "react-router";
import type { LoginResponse } from "~/domains/auth/interfaces";
import { supabaseErrors } from "~/shared/errors/codes/MapErrorsSupabase";
import ErrorMessage from "~/shared/errors/ErrorMessage";

import { loginClient } from "~/domains/auth/login/clients";
import type { Route } from "./+types/Login";


export async function clientAction({
  request,
}: Route.ClientActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email") as string;
  let password = formData.get("password") as string;
  const response:LoginResponse = await loginClient(email, password)
  console.log("INFO: clientAction response:", response);
  if(!response.error){
    return redirect("/dashboard");
  }
  return response as LoginResponse;
}


const Login = ({ actionData }: Route.ComponentProps) => {

  const fetcher = useNavigation();

  const { error } = actionData ?? {error: null};

  const message = supabaseErrors[ error?.code as string];

  const buttomSubmitting = fetcher.state === "submitting" ? "Iniciando sesión..." : "Iniciar sesión";

  return (
    <div className="form-page">
      <div className="form-card">
        <h1 className="form-title">Iniciar sesión</h1>

        <Form method="post" className="form-body">
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Correo electrónico"
            required
          />
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Contraseña"
            required
          />
          <button type="submit" className="btn-primary" disabled={fetcher.state === "submitting"}>
            {buttomSubmitting}
          </button>
        </Form>

        {error && (
          <div className="mt-2">
            <ErrorMessage message={message} />
          </div>
        )}

        <div className="mt-4 text-center">
          <NavLink to="/signup" className="text-sm text-[var(--color-primary)] hover:underline">
            ¿No tienes una cuenta? Crear cuenta
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;