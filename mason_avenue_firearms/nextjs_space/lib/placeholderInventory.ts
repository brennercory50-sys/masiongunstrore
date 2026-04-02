// TEMP INVENTORY — REMOVE WHEN LIVE INVENTORY CONNECTS
// Set USE_PLACEHOLDER_INVENTORY = false to disable

export const USE_PLACEHOLDER_INVENTORY = true;

export interface PlaceholderItem {
  id: string;
  name: string;
  department: string;
  category: string;
  brand?: string;
  price: number;
  condition: string;
  inventoryStatus: string;
  imageUrl: string;
  tag?: string;
  description?: string;
  featured?: boolean;
  createdAt: Date;
}

const firearms: PlaceholderItem[] = [
  { id: 'pf-001', name: 'Glock 19 Gen 5 9mm', department: 'firearms', category: 'Handgun', brand: 'Glock', price: 549, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/inventory/glock19_gen5.jpg', tag: 'Popular', featured: true, createdAt: new Date() },
  { id: 'pf-002', name: 'Smith & Wesson M&P Shield Plus', department: 'firearms', category: 'Handgun', brand: 'Smith & Wesson', price: 429, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/inventory/sw_mp_shield_plus.jpg', tag: 'New Arrival', createdAt: new Date() },
  { id: 'pf-003', name: 'SIG Sauer P320 Full Size 9mm', department: 'firearms', category: 'Handgun', brand: 'SIG Sauer', price: 599, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/inventory/sig_p320.jpg', createdAt: new Date() },
  { id: 'pf-004', name: 'Taurus G3C 9mm', department: 'firearms', category: 'Handgun', brand: 'Taurus', price: 299, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/inventory/taurus_g3c.jpg', tag: 'Deal', featured: true, createdAt: new Date() },
  { id: 'pf-005', name: 'Springfield Hellcat Pro 9mm', department: 'firearms', category: 'Handgun', brand: 'Springfield', price: 549, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/inventory/springfield_hellcat_pro.jpg', tag: 'New Arrival', createdAt: new Date() },
  { id: 'pf-006', name: 'Beretta 92FS 9mm', department: 'firearms', category: 'Handgun', brand: 'Beretta', price: 649, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/inventory/beretta_92fs.jpg', createdAt: new Date() },
  { id: 'pf-007', name: 'Ruger GP100 .357 Mag', department: 'firearms', category: 'Revolver', brand: 'Ruger', price: 579, condition: 'Like New', inventoryStatus: 'in_stock', imageUrl: '/inventory/ruger_gp100.jpg', tag: 'Just In', createdAt: new Date() },
  { id: 'pf-008', name: 'Mossberg 500 Field Pump Shotgun', department: 'firearms', category: 'Shotgun', brand: 'Mossberg', price: 349, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/inventory/mossberg_500.jpg', createdAt: new Date() },
  { id: 'pf-009', name: 'Remington 870 Express Pump', department: 'firearms', category: 'Shotgun', brand: 'Remington', price: 329, condition: 'Used', inventoryStatus: 'in_stock', imageUrl: '/inventory/remington_870.jpg', createdAt: new Date() },
  { id: 'pf-010', name: 'Henry Long Ranger .308', department: 'firearms', category: 'Rifle', brand: 'Henry', price: 799, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/inventory/henry_lever_action.jpg', tag: 'Popular', createdAt: new Date() },
  { id: 'pf-011', name: 'Daniel Defense DDM4V7 AR-15', department: 'firearms', category: 'Rifle', brand: 'Daniel Defense', price: 1199, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/inventory/daniel_defense_ar15.jpg', featured: true, createdAt: new Date() },
  { id: 'pf-012', name: 'CZ-75 PCR 9mm', department: 'firearms', category: 'Handgun', brand: 'CZ', price: 489, condition: 'Like New', inventoryStatus: 'available_to_order', imageUrl: '/inventory/cz_75.jpg', tag: 'Just In', createdAt: new Date() },
];

const jewelry: PlaceholderItem[] = [
  { id: 'pj-001', name: '14K Gold Chain 22"', department: 'jewelry', category: 'Chain', price: 899, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/jewelry-1.jpg', tag: 'Popular', createdAt: new Date() },
  { id: 'pj-002', name: 'Diamond Stud Earrings 1/2 CT', department: 'jewelry', category: 'Earrings', price: 1299, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/jewelry-2.jpg', featured: true, createdAt: new Date() },
  { id: 'pj-003', name: 'Men\'s Gold Wedding Band', department: 'jewelry', category: 'Ring', price: 449, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/jewelry-3.jpg', createdAt: new Date() },
  { id: 'pj-004', name: '18K Gold Rope Chain 20"', department: 'jewelry', category: 'Chain', price: 1199, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/jewelry-4.jpg', tag: 'Deal', createdAt: new Date() },
  { id: 'pj-005', name: 'Ladies Diamond Ring 1CT', department: 'jewelry', category: 'Ring', price: 1899, condition: 'Like New', inventoryStatus: 'in_stock', imageUrl: '/products/jewelry-1.jpg', createdAt: new Date() },
  { id: 'pj-006', name: 'Gold Herringbone Necklace', department: 'jewelry', category: 'Necklace', price: 649, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/jewelry-2.jpg', tag: 'New Arrival', createdAt: new Date() },
  { id: 'pj-007', name: 'Men\'s Rolex Style Watch', department: 'jewelry', category: 'Watch', price: 349, condition: 'Used', inventoryStatus: 'in_stock', imageUrl: '/products/jewelry-3.jpg', createdAt: new Date() },
  { id: 'pj-008', name: 'Silver Bracelet 8"', department: 'jewelry', category: 'Bracelet', price: 129, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/jewelry-4.jpg', tag: 'Deal', createdAt: new Date() },
  { id: 'pj-009', name: 'Gold Hoop Earrings 14K', department: 'jewelry', category: 'Earrings', price: 249, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/jewelry-1.jpg', createdAt: new Date() },
  { id: 'pj-010', name: 'Platinum Band Ring', department: 'jewelry', category: 'Ring', price: 799, condition: 'Like New', inventoryStatus: 'available_to_order', imageUrl: '/products/jewelry-2.jpg', createdAt: new Date() },
  { id: 'pj-011', name: 'Pearl Necklace Strand', department: 'jewelry', category: 'Necklace', price: 399, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/jewelry-3.jpg', tag: 'Just In', createdAt: new Date() },
  { id: 'pj-012', name: 'Vintage Gold Brooch', department: 'jewelry', category: 'Brooch', price: 199, condition: 'Used', inventoryStatus: 'in_stock', imageUrl: '/products/jewelry-4.jpg', createdAt: new Date() },
];

const electronics: PlaceholderItem[] = [
  { id: 'pe-001', name: 'PlayStation 5 Console', department: 'electronics', category: 'Gaming', price: 499, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/electronics-1.jpg', tag: 'Popular', featured: true, createdAt: new Date() },
  { id: 'pe-002', name: 'Xbox Series X', department: 'electronics', category: 'Gaming', price: 499, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/electronics-2.jpg', createdAt: new Date() },
  { id: 'pe-003', name: 'Samsung 55" 4K Smart TV', department: 'electronics', category: 'TV', price: 449, condition: 'Like New', inventoryStatus: 'in_stock', imageUrl: '/products/electronics-3.jpg', tag: 'Deal', createdAt: new Date() },
  { id: 'pe-004', name: 'Apple MacBook Pro 14"', department: 'electronics', category: 'Laptop', price: 1299, condition: 'Used', inventoryStatus: 'in_stock', imageUrl: '/products/electronics-4.jpg', featured: true, createdAt: new Date() },
  { id: 'pe-005', name: 'iPhone 14 Pro Max', department: 'electronics', category: 'Phone', price: 899, condition: 'Like New', inventoryStatus: 'in_stock', imageUrl: '/products/electronics-1.jpg', tag: 'New Arrival', createdAt: new Date() },
  { id: 'pe-006', name: 'Nintendo Switch OLED', department: 'electronics', category: 'Gaming', price: 349, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/electronics-2.jpg', createdAt: new Date() },
  { id: 'pe-007', name: 'Sony WH-1000XM5 Headphones', department: 'electronics', category: 'Audio', price: 299, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/electronics-3.jpg', createdAt: new Date() },
  { id: 'pe-008', name: 'iPad Pro 12.9"', department: 'electronics', category: 'Tablet', price: 799, condition: 'Like New', inventoryStatus: 'in_stock', imageUrl: '/products/electronics-4.jpg', tag: 'Just In', createdAt: new Date() },
  { id: 'pe-009', name: 'Dell XPS 15 Laptop', department: 'electronics', category: 'Laptop', price: 999, condition: 'Used', inventoryStatus: 'in_stock', imageUrl: '/products/electronics-1.jpg', createdAt: new Date() },
  { id: 'pe-010', name: 'LG 65" OLED TV', department: 'electronics', category: 'TV', price: 1299, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/electronics-2.jpg', tag: 'Popular', featured: true, createdAt: new Date() },
  { id: 'pe-011', name: 'AirPods Pro 2nd Gen', department: 'electronics', category: 'Audio', price: 199, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/electronics-3.jpg', tag: 'Deal', createdAt: new Date() },
  { id: 'pe-012', name: 'Samsung Galaxy S23 Ultra', department: 'electronics', category: 'Phone', price: 749, condition: 'Like New', inventoryStatus: 'available_to_order', imageUrl: '/products/electronics-4.jpg', createdAt: new Date() },
];

const tools: PlaceholderItem[] = [
  { id: 'pt-001', name: 'DeWalt 20V Max Drill/Driver Kit', department: 'tools', category: 'Power Tools', price: 199, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/tools-1.jpg', tag: 'Popular', createdAt: new Date() },
  { id: 'pt-002', name: 'Milwaukee M18 Impact Driver', department: 'tools', category: 'Power Tools', price: 179, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/tools-2.jpg', createdAt: new Date() },
  { id: 'pt-003', name: 'Craftsman 230-Piece Tool Set', department: 'tools', category: 'Hand Tools', price: 249, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/tools-3.jpg', tag: 'Deal', featured: true, createdAt: new Date() },
  { id: 'pt-004', name: 'Makita Circular Saw 7-1/4"', department: 'tools', category: 'Power Tools', price: 159, condition: 'Like New', inventoryStatus: 'in_stock', imageUrl: '/products/tools-4.jpg', createdAt: new Date() },
  { id: 'pt-005', name: 'Stanley 96-Piece Mechanic Set', department: 'tools', category: 'Hand Tools', price: 129, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/tools-1.jpg', tag: 'New Arrival', createdAt: new Date() },
  { id: 'pt-006', name: 'Ryobi 40V Lawn Mower', department: 'tools', category: 'Outdoor', price: 349, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/tools-2.jpg', createdAt: new Date() },
  { id: 'pt-007', name: 'Fluke Digital Multimeter', department: 'tools', category: 'Diagnostic', price: 279, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/tools-3.jpg', createdAt: new Date() },
  { id: 'pt-008', name: 'Husky 5-Drawer Tool Cabinet', department: 'tools', category: 'Storage', price: 399, condition: 'Used', inventoryStatus: 'in_stock', imageUrl: '/products/tools-4.jpg', tag: 'Just In', createdAt: new Date() },
  { id: 'pt-009', name: 'Bosch Jigsaw 120V', department: 'tools', category: 'Power Tools', price: 119, condition: 'Like New', inventoryStatus: 'in_stock', imageUrl: '/products/tools-1.jpg', createdAt: new Date() },
  { id: 'pt-010', name: 'Channellock 10pc Pliers Set', department: 'tools', category: 'Hand Tools', price: 89, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/tools-2.jpg', tag: 'Deal', createdAt: new Date() },
  { id: 'pt-011', name: 'Tekton Wrench Set 30pc', department: 'tools', category: 'Hand Tools', price: 149, condition: 'New', inventoryStatus: 'in_stock', imageUrl: '/products/tools-3.jpg', createdAt: new Date() },
  { id: 'pt-012', name: 'Kobalt 50gal Air Compressor', department: 'tools', category: 'Compressors', price: 299, condition: 'Used', inventoryStatus: 'available_to_order', imageUrl: '/products/tools-4.jpg', createdAt: new Date() },
];

export const placeholderInventory: PlaceholderItem[] = [
  ...firearms,
  ...jewelry,
  ...electronics,
  ...tools,
];

export function getPlaceholderByDepartment(department: string): PlaceholderItem[] {
  switch (department) {
    case 'firearms': return firearms;
    case 'jewelry': return jewelry;
    case 'electronics': return electronics;
    case 'tools': return tools;
    default: return placeholderInventory;
  }
}