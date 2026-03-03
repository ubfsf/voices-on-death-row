"use client";

export default function LocalSwitcher() {
  const handleLocaleChange = (newLocale: string) => {
    // Set the cookie so the server knows which language to load
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
    // Refresh the page to apply the change
    window.location.reload();
  };

  return (
    <div className="flex gap-4 p-4">
      {["en", "fr"].map((curr) => (
        <button 
          key={curr} 
          onClick={() => handleLocaleChange(curr)}
          className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors"
        >
          {curr.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
