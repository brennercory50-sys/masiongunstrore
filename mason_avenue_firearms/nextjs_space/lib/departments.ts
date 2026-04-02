export const departments = [
  { key: 'firearms', label: 'Firearms', icon: 'Crosshair', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { key: 'ammo', label: 'Ammo', icon: 'Target', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { key: 'accessories', label: 'Accessories', icon: 'Package', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { key: 'jewelry', label: 'Jewelry', icon: 'Gem', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { key: 'electronics', label: 'Electronics', icon: 'Smartphone', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { key: 'tools', label: 'Tools', icon: 'Wrench', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
] as const;

export const categoryMap: Record<string, string[]> = {
  firearms: ['Handgun', 'Rifle', 'Shotgun'],
  ammo: ['Handgun Ammo', 'Rifle Ammo', 'Shotgun Shells', 'Bulk Ammo', 'Rimfire'],
  accessories: ['Optics', 'Magazines', 'Holsters', 'Cases', 'Cleaning Kits', 'Safety Gear', 'Sights', 'Lights & Lasers'],
  jewelry: ['Watches', 'Chains & Necklaces', 'Rings', 'Earrings', 'Bracelets'],
  electronics: ['Laptops', 'Phones', 'Gaming', 'Audio', 'Tablets'],
  tools: ['Power Tools', 'Hand Tools', 'Tool Sets', 'Outdoor Equipment'],
};

export const brandMap: Record<string, string[]> = {
  firearms: ['Glock', 'Smith & Wesson', 'SIG Sauer', 'Springfield Armory', 'Ruger', 'Daniel Defense', 'Remington', 'Mossberg', 'Henry', 'Taurus', 'CZ', 'Beretta'],
  ammo: ['Federal', 'Hornady', ' Winchester', 'Remington', 'CCI', 'Speer', 'Magtech', 'Fiocchi'],
  accessories: ['Vortex', 'Leupold', 'Trijicon', 'Streamlight', 'Magpul', 'Blackhawk', '5.11', 'Alien Gear', 'Safariland', 'SureFire'],
  jewelry: ['Rolex', 'Cartier', 'Tiffany & Co.', 'David Yurman', 'Other'],
  electronics: ['Apple', 'Sony', 'Samsung', 'Bose', 'Dell', 'Other'],
  tools: ['DeWalt', 'Milwaukee', 'Snap-on', 'Makita', 'Husqvarna', 'Other'],
};
