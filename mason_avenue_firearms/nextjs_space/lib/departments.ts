export const departments = [
  { key: 'firearms', label: 'Firearms', icon: 'Crosshair', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { key: 'jewelry', label: 'Jewelry', icon: 'Gem', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { key: 'electronics', label: 'Electronics', icon: 'Smartphone', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { key: 'tools', label: 'Tools', icon: 'Wrench', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
] as const;

export const categoryMap: Record<string, string[]> = {
  firearms: ['Handgun', 'Rifle', 'Shotgun'],
  jewelry: ['Watches', 'Chains & Necklaces', 'Rings', 'Earrings', 'Bracelets'],
  electronics: ['Laptops', 'Phones', 'Gaming', 'Audio', 'Tablets'],
  tools: ['Power Tools', 'Hand Tools', 'Tool Sets', 'Outdoor Equipment'],
};

export const brandMap: Record<string, string[]> = {
  firearms: ['Glock', 'Smith & Wesson', 'SIG Sauer', 'Springfield Armory', 'Ruger', 'Daniel Defense', 'Remington', 'Mossberg', 'Henry', 'Taurus', 'CZ', 'Beretta'],
  jewelry: ['Rolex', 'Cartier', 'Tiffany & Co.', 'David Yurman', 'Other'],
  electronics: ['Apple', 'Sony', 'Samsung', 'Bose', 'Dell', 'Other'],
  tools: ['DeWalt', 'Milwaukee', 'Snap-on', 'Makita', 'Husqvarna', 'Other'],
};
