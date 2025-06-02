export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // ✅ bao gồm tất cả các file trong src
    "./src/app-features/**/*.{js,ts,jsx,tsx,css}", // ✅ thêm phần app-features nếu bị bỏ sót
  ],
  safelist: [
    "group/image",
    "group-hover/image:opacity-50",
    "group-hover/image:scale-105",
  ],
};
