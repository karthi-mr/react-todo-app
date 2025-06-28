export default function ThemeToggle({ onToggleTheme, darkMode }) {
  return (
    <button
      className="border px-3 py-1 rounded text-sm dark:border-gray-600 dark:text-gray-200 cursor-pointer"
      onClick={onToggleTheme}>
      {darkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
