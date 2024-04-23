import baseConfig from "@diariofin/ui/tailwind.config"

export default {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/components/**/*.{ts,tsx}"],
  presets: [baseConfig],
}
