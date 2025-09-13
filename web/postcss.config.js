import tailwindPostcss from "@tailwindcss/postcss"
import autoprefixer from "autoprefixer"

// Export ESM default with plugins as an array so Vite can import it directly.
export default {
	plugins: [
		// Use the dedicated PostCSS adapter for Tailwind v4+
		tailwindPostcss({ config: "./tailwind.config.js" }),
		autoprefixer(),
	],
}
