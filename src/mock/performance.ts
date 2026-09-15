export interface DailyRevenue {
  day: number;
  dateStr: string;
  revenue: number;
  targetDaily: number;
  appointments: number;
  ticket: number;
}

export interface MonthlyComparison {
  month: string;
  anoAtual: number;
  anoAnterior: number;
  meta: number;
}

export const MOCK_DAILY_REVENUE: DailyRevenue[] = [
  { day: 1, dateStr: '01/Set', revenue: 3120, targetDaily: 3333, appointments: 32, ticket: 97.50 },
  { day: 2, dateStr: '02/Set', revenue: 3450, targetDaily: 3333, appointments: 35, ticket: 98.57 },
  { day: 3, dateStr: '03/Set', revenue: 3280, targetDaily: 3333, appointments: 33, ticket: 99.39 },
  { day: 4, dateStr: '04/Set', revenue: 4100, targetDaily: 3333, appointments: 41, ticket: 100.00 },
  { day: 5, dateStr: '05/Set', revenue: 4890, targetDaily: 3333, appointments: 48, ticket: 101.87 },
  { day: 6, dateStr: '06/Set', revenue: 5320, targetDaily: 3333, appointments: 52, ticket: 102.30 },
  { day: 7, dateStr: '07/Set', revenue: 1450, targetDaily: 2000, appointments: 15, ticket: 96.66 }, // Feriado / horário reduzido
  { day: 8, dateStr: '08/Set', revenue: 3420, targetDaily: 3333, appointments: 35, ticket: 97.71 },
  { day: 9, dateStr: '09/Set', revenue: 3680, targetDaily: 3333, appointments: 37, ticket: 99.45 },
  { day: 10, dateStr: '10/Set', revenue: 3950, targetDaily: 3333, appointments: 40, ticket: 98.75 },
  { day: 11, dateStr: '11/Set', revenue: 4210, targetDaily: 3333, appointments: 42, ticket: 100.23 },
  { day: 12, dateStr: '12/Set', revenue: 4620, targetDaily: 3333, appointments: 46, ticket: 100.43 },
  { day: 13, dateStr: '13/Set', revenue: 4980, targetDaily: 3333, appointments: 49, ticket: 101.63 },
  { day: 14, dateStr: '14/Set', revenue: 2100, targetDaily: 2500, appointments: 22, ticket: 95.45 },
  { day: 15, dateStr: '15/Set', revenue: 3550, targetDaily: 3333, appointments: 36, ticket: 98.61 },
  { day: 16, dateStr: '16/Set', revenue: 3720, targetDaily: 3333, appointments: 38, ticket: 97.89 },
  { day: 17, dateStr: '17/Set', revenue: 3890, targetDaily: 3333, appointments: 39, ticket: 99.74 },
  { day: 18, dateStr: '18/Set', revenue: 4150, targetDaily: 3333, appointments: 41, ticket: 101.21 },
  { day: 19, dateStr: '19/Set', revenue: 4780, targetDaily: 3333, appointments: 47, ticket: 101.70 },
  { day: 20, dateStr: '20/Set', revenue: 5210, targetDaily: 3333, appointments: 51, ticket: 102.15 },
  { day: 21, dateStr: '21/Set', revenue: 2240, targetDaily: 2500, appointments: 23, ticket: 97.39 },
  { day: 22, dateStr: '22/Set', revenue: 3640, targetDaily: 3333, appointments: 37, ticket: 98.37 },
  { day: 23, dateStr: '23/Set', revenue: 3810, targetDaily: 3333, appointments: 39, ticket: 97.69 },
  { day: 24, dateStr: '24/Set', revenue: 3950, targetDaily: 3333, appointments: 40, ticket: 98.75 },
];

export const MOCK_MONTHLY_COMPARISON: MonthlyComparison[] = [
  { month: 'Abr', anoAtual: 72400, anoAnterior: 64100, meta: 75000 },
  { month: 'Mai', anoAtual: 76800, anoAnterior: 68200, meta: 80000 },
  { month: 'Jun', anoAtual: 81200, anoAnterior: 71500, meta: 85000 },
  { month: 'Jul', anoAtual: 83900, anoAnterior: 74900, meta: 88000 },
  { month: 'Ago', anoAtual: 85200, anoAnterior: 77100, meta: 92000 },
  { month: 'Set', anoAtual: 87450, anoAnterior: 80600, meta: 100000 }, // Projeção fecha em 103k
];

export const MOCK_SERVICE_CATEGORIES = [
  { name: 'Combos (Corte + Barba)', value: 41200, percentage: 47.1 },
  { name: 'Cortes & Cabelo', value: 27500, percentage: 31.4 },
  { name: 'Barboterapia & Barba', value: 12850, percentage: 14.7 },
  { name: 'Produtos & Home Care', value: 5900, percentage: 6.8 },
];

export const MOCK_PEAK_HOURS = [
  { hour: '09h - 11h', occupancy: 65, appointments: 142 },
  { hour: '11h - 13h', occupancy: 82, appointments: 186 },
  { hour: '13h - 15h', occupancy: 74, appointments: 160 },
  { hour: '15h - 18h', occupancy: 91, appointments: 218 },
  { hour: '18h - 21h', occupancy: 98, appointments: 236 },
];
