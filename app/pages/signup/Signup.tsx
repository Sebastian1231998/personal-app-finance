import { Form, NavLink, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/Signup";
import { signupClient } from "~/domains/auth/signup/clients";
import type { SignupResponse } from "~/domains/auth/interfaces";
import ErrorMessage from "~/shared/errors/ErrorMessage";
import { supabaseErrors } from "~/shared/errors/codes/MapErrorsSupabase";


export async function clientAction({
  request,
}: Route.ClientActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email") as string;
  let password = formData.get("password") as string;

  const response:SignupResponse = await signupClient(email, password)
  console.log("INFO: clientAction response:", response);

  if(!response.error && !response.errorWalletCreation){
    return redirect("/signup-confirmation");
  }
  return response;
}

const Signup = ({ actionData }: Route.ComponentProps) => {

  const fetcher = useNavigation();
  const { error, errorWalletCreation } = actionData ?? {error: null};

  console.log("INFO: fetcher actionData:", actionData);

  const message = supabaseErrors[error?.code as string] ?? "Error desconocido, por favor intenta de nuevo";

  const buttomSubmitting = fetcher.state === "submitting" ? "Creando cuental..." : "Registrarse";

  return (
    <div className="form-page">
    <div className="form-card">
        <h1 className="form-title">Crear cuenta</h1>

        <Form method="post" className="form-body">
        <input
            type="email"
            className="input"
            name="email"
            placeholder="Correo electrónico"
            required
        />
        <input
            type="password"
            className="input"
            name="password"
            placeholder="Contraseña"
            required
        />
        <button disabled={fetcher.state === "submitting"} type="submit" className="btn-primary">
            {buttomSubmitting}
        </button>
        </Form>

        {errorWalletCreation && <div className="mt-2">  <ErrorMessage message={"Hubo un error al crear tu cuenta, por favor intenta nuevamente"} /></div>}

        {/* ErrorMessage dentro de form-card para que quede alineado */}
        {error && <div className="mt-2">
            <ErrorMessage message={message} />
            </div>
        }

        <div className="mt-4 text-center">
        <NavLink
            to="/login"
            className="text-sm text-[var(--color-primary)] hover:underline"
        >
            ¿Ya tienes una cuenta? Inicia sesión
        </NavLink>
        </div>
     </div>
    </div>
  );
};

export default Signup;