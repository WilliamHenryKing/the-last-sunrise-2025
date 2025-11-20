import { PriceItem, MenuItem, ScheduleEvent } from './types';
import Pic1 from "./images/Pic1.jpg";
import Pic2 from "./images/Pic2.webp";
import Pic3 from "./images/Pic3.jpg";
import Pic4 from "./images/Pic4.jpg";
import Pic5 from "./images/Pic5.jpg";
import Pic6 from "./images/Pic6.jpg";
import Pic7 from "./images/Pic7.jpg";
import Pic8 from "./images/Pic8.jpg";
import Pic9 from "./images/Pic9.jpg";

export const CABLE_CAR_PRICES: PriceItem[] = [
  { category: "Adult One Way", price: 295 },
  { category: "Child (4-17 years)", price: 160 },
  { category: "Student", price: 180, details: "Valid Student Card Required" },
  { category: "SA Senior Citizen", price: 70, details: "SA ID Required" },
];

export const MENU_SPECIALS: MenuItem[] = [
  {
    name: "The Hearty Senior",
    items: ["Pie (Steak/Chicken)", "Milk Tart Slice", "Tea or Coffee"],
    price: 85
  },
  {
    name: "Sweet Morning",
    items: ["Cappuccino", "Chocolate Milk Tartlet"],
    price: 30
  }
];

export const HIKE_SCHEDULE: ScheduleEvent[] = [
  {
    time: "05:45 AM",
    title: "The Gathering",
    description: "Meet at Platteklip Gorge base. Prepare your gear. Feel the morning chill."
  },
  {
    time: "06:00 AM",
    title: "Ascent Begins",
    description: "We start the climb together. One step at a time towards the sky."
  },
  {
    time: "07:30 AM",
    title: "Summit Push",
    description: "The final switchbacks. The air gets thinner, the views get wider."
  },
  {
    time: "08:15 AM",
    title: "Sunrise Coffee",
    description: "Celebration at Ten67 Eatery. Bring own packed food to save money. Watch the city wake up below."
  }
];

export const PACKING_LIST = [
  { id: 1, item: "Cap/Hat", important: true },
  { id: 2, item: "2L Water", important: true },
  { id: 3, item: "Warm Jacket (Windbreaker)", important: true },
  { id: 4, item: "Charged Phone", important: false },
  { id: 5, item: "Cash for Cable Car", important: false },
  { id: 6, item: "Sunscreen", important: false },
  { id: 7, item: "Snacks", important: false },
];

export const GALLERY_IMAGES = [
  { src: Pic1, title: "Fading Light", location: "top side table mountain" },
  { src: Pic2, title: "Almost There View", location: "Upper Skeleton Gorge" },
  { src: Pic3, title: "From Afar", location: "sunset beach view" },
  { src: Pic4, title: "Resting on Top", location: "Table mountain top" },
  { src: Pic5, title: "Taking it in", location: "Cable Car View Top" },
  { src: Pic6, title: "Sun-kissed View", location: "Twelve Apostles" },
  { src: Pic7, title: "View from bridge", location: "Western Slopes" },
  { src: Pic8, title: "Chill bird", location: "View of Camps Bay" },
  { src: Pic9, title: "How Misty it can get", location: "Near top" }
];
