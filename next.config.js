/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
}

module.exports = {
  mode: 'jit',
 // These paths are just examples, customize them to match your project structure
 purge: [
   './public/**/*.html',
   './src/**/*.{js,jsx,ts,tsx,vue}',
 ],
 eslint: {
  // Warning: This allows production builds to successfully complete even if
  // your project has ESLint errors.
  ignoreDuringBuilds: true,
},
}
