import baseConfig from "@fluxozen/ui/tailwind.config"

export default {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/components/**/*.{ts,tsx}"],
  presets: [baseConfig],
}
