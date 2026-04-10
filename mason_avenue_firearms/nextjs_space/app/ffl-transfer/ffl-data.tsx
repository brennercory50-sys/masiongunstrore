import { Shield, CheckCircle, User, FileText, MapPin } from 'lucide-react';

export const processSteps = [
  { num: '1', title: 'Buy Online', desc: 'Purchase from any online retailer like Brownells, Primary Arms, or GunBroker.' },
  { num: '2', title: 'Ship to Us', desc: 'At checkout, enter our FFL info: Mason Avenue Firearms, 347 Mason Ave, Daytona Beach, FL.' },
  { num: '3', title: 'We Receive It', desc: 'We\'ll notify you when your firearm arrives. We inspect and verify everything.' },
  { num: '4', title: 'Complete Transfer', desc: 'Come in with valid ID, complete the background check, and take your firearm home.' },
];

export const whyItems = [
  { icon: <Shield className="w-5 h-5" />, title: 'Licensed FFL Dealer', desc: 'All transfers done properly — fully compliant with federal and state law.' },
  { icon: <CheckCircle className="w-5 h-5" />, title: 'Smooth Process', desc: 'We handle the paperwork so you don\'t have to worry.' },
  { icon: <User className="w-5 h-5" />, title: 'Local Support', desc: 'Real people, real help. Call or visit us with questions.' },
  { icon: <CheckCircle className="w-5 h-5" />, title: 'Fast Updates', desc: 'We\'ll call or text as soon as your firearm arrives.' },
];

export const requirements = [
  { icon: <User className="w-4 h-4" />, text: 'Valid government-issued photo ID' },
  { icon: <FileText className="w-4 h-4" />, text: 'Pass background check (NICS)' },
  { icon: <Shield className="w-4 h-4" />, text: 'Be 21+ for handguns, 18+ for long guns' },
  { icon: <MapPin className="w-4 h-4" />, text: 'Florida residency or valid FL concealed carry' },
];

export const pricing = {
  handguns: 25,
  longGuns: 35,
  backgroundCheck: 5,
};

export const fflInfo = {
  name: 'Mason Avenue Firearms',
  address: '347 Mason Ave, Daytona Beach, FL 32117',
  phone: '(386) 226-4653',
  email: 'ffl@masonavenue.com',
};

export const faqs = [
  { q: 'How long does a transfer take?', a: 'Most transfers are completed the same day once your firearm arrives and clears background check.' },
  { q: 'What do I need to bring?', a: 'Valid government-issued photo ID. For handguns, you must be 21+; for long guns, 18+.' },
  { q: 'Can I transfer multiple firearms?', a: 'Yes! Ask about our multi-gun discount. Each transfer is still $25/$35 plus the $5 background check.' },
  { q: 'Do you accept all online retailers?', a: 'Yes, we accept transfers from any licensed FFL dealer. Just enter our FFL info at checkout.' },
  { q: 'What if my background check is delayed?', a: 'We will contact you with updates. Most checks clear within 15-30 minutes.' },
  { q: 'Can I transfer to someone else?', a: 'All transfers must be to the actual purchaser. ID must match the person picking up.' },
];