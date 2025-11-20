export interface PriceItem {
  category: string;
  price: number;
  details?: string;
}

export interface MenuItem {
  name: string;
  items: string[];
  price: number;
}

export interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
}