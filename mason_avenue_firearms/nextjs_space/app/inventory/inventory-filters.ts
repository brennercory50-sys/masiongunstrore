export const conditions = ['All', 'New', 'Like New', 'Excellent', 'Good', 'Fair'];

export const priceRanges = [
  { label: 'All Prices', min: '', max: '' },
  { label: 'Under $300', min: '', max: '300' },
  { label: '$300 - $500', min: '300', max: '500' },
  { label: '$500 - $800', min: '500', max: '800' },
  { label: '$800 - $1,200', min: '800', max: '1200' },
  { label: '$1,200+', min: '1200', max: '' },
];

export const inventoryStatuses = [
  { value: 'all', label: 'All Availability' },
  { value: 'in_stock', label: 'In Stock' },
  { value: 'available_to_order', label: 'Available to Order' },
  { value: 'sourced', label: 'Request / Source' },
];

export const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'featured', label: 'Featured' },
];