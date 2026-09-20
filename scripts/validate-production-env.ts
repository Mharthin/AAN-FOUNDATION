import { validateProductionEnv } from "../src/lib/config/env";

try {
  validateProductionEnv();
  console.log("Production environment variables are valid.");
} catch (error) {
  console.error("Production environment validation failed.");
  if (error && typeof error === "object" && "issues" in error && Array.isArray(error.issues)) {
    console.error(error.issues.map((issue: { path?: string[]; message?: string }) => `${issue.path?.join(".") || "environment"}: ${issue.message || "invalid value"}`).join("\n"));
  } else if (error instanceof Error) {
    console.error(error.message);
  }
  process.exitCode = 1;
}
