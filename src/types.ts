export type UserRole = 'gestor' | 'barbeiro' | 'recepcao' | 'lider';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  unitId: string;
  unitName: string;
  title: string;
  professionalId?: string; // Links to professional record if role is barbeiro or lider
}

export interface Unit {
  id: string;
  name: string;
  code: string;
  city: string;
  state: string;
  status: 'ativa' | 'em_implantacao' | 'inativa';
  managerName: string;
  professionalsCount: number;
  monthlyRevenue: number;
  monthlyTarget: number;
  averageTicket: number;
  servicesCount: number;
  growth: number;
  openedAt: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'cabelo' | 'barba' | 'combo' | 'estetica' | 'produtos';
  price: number;
  count: number;
  revenue: number;
  sharePercentage: number;
}

export interface MonthlyHistory {
  month: string; // e.g., 'Jan', 'Fev', 'Mar'
  revenue: number;
  target: number;
  appointments: number;
  averageTicket: number;
}

export interface Professional {
  id: string;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  role: string;
  unitId: string;
  unitName: string;
  avatarUrl: string;
  status: 'ativo' | 'em_atendimento' | 'folga' | 'inativo';
  rankingPosition: number;
  previousRankingPosition: number;
  revenue: number;
  target: number;
  commissionRate: number; // percentage, e.g. 45
  commissionAmount: number;
  targetPercentage: number;
  appointments: number;
  averageTicket: number;
  growthPercentage: number;
  satisfactionRate: number;
  leaderId?: string;
  isLeader?: boolean;
  
  // Detailed metrics for individual view
  dailyPacingRequired: number;
  projectedRevenue: number;
  topServices: ServiceItem[];
  monthlyHistory: MonthlyHistory[];
  strengths: string[];
  attentionPoints: string[];
  activeChallengesCount: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatarUrl?: string;
  status: 'ativo' | 'inativo' | 'novo' | 'recorrente';
  unitId: string;
  unitName: string;
  preferredProfessionalId: string;
  preferredProfessionalName: string;
  lastVisit: string;
  appointmentsCount: number;
  totalSpent: number;
  averageTicket: number;
  memberSince: string;
  tags: string[];
  notes?: string;
  churnRisk: 'baixo' | 'medio' | 'alto';
  recentServices: {
    date: string;
    serviceName: string;
    professionalName: string;
    price: number;
  }[];
}

export interface Goal {
  id: string;
  title: string;
  type: 'unidade' | 'individual' | 'servico';
  period: 'diario' | 'semanal' | 'mensal';
  unitId?: string;
  professionalId?: string;
  targetAmount: number;
  currentAmount: number;
  progressPercentage: number;
  remainingAmount: number;
  dailyRequiredAmount: number;
  projectedAmount: number;
  status: 'em_andamento' | 'atingida' | 'em_risco';
  deadline: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  progressPercentage: number;
  deadline: string;
  period: 'hoje' | 'semana' | 'mes';
  reward: string;
  category: 'faturamento' | 'atendimentos' | 'ticket_medio' | 'combo';
  status: 'ativo' | 'concluido' | 'expirado';
  forRole?: UserRole[];
  professionalId?: string;
}

export interface OperationalInsight {
  id: string;
  type: 'positivo' | 'alerta' | 'oportunidade' | 'projecao';
  title: string;
  description: string;
  metric?: string;
  change?: string;
  actionableRecommendation?: string;
  createdAt: string;
}

export interface ExecutiveSummary {
  headline: string;
  situation: 'excelente' | 'estavel' | 'atencao';
  positivePoints: string[];
  attentionPoints: string[];
  recommendations: {
    id: string;
    title: string;
    description: string;
    impact: 'alto' | 'medio' | 'baixo';
    professionalName?: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ia';
  text: string;
  timestamp: string;
  suggestions?: string[];
  metricsData?: {
    label: string;
    value: string;
  }[];
}

export interface ImportBatch {
  id: string;
  type: 'faturamento' | 'profissionais' | 'clientes' | 'atendimentos' | 'servicos' | 'outros';
  title: string;
  description: string;
  status: 'idle' | 'uploading' | 'validating' | 'preview' | 'importing' | 'completed' | 'error';
  fileName?: string;
  fileSize?: string;
  totalRows?: number;
  validRows?: number;
  errorRows?: number;
  lastImportedAt?: string;
  sampleColumns: string[];
  samplePreview: Record<string, string | number>[];
}
