export const supabaseErrors: Record<string, string> = {
  weak_password: "La contraseña debe tener al menos 6 caracteres",
  invalid_email: "Correo electrónico inválido",
  email_taken: "El correo electrónico ya está registrado",
  invalid_credentials: "Correo o contraseña incorrectos",
  missing_password: "Debe ingresar una contraseña",
  email_not_confirmed: "El correo electrónico no ha sido confirmado",
  generic: "Error desconocido, por favor intenta de nuevo",
};