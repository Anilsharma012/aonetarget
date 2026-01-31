
export enum LeadStatus {
  NEW = 'NEW',
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  NOT_INTERESTED = 'NOT_INTERESTED',
  FOLLOW_UP_REQUIRED = 'FOLLOW_UP_REQUIRED'
}

export enum StudentStage {
  ENQUIRY = 'ENQUIRY',
  DEMO_ATTENDED = 'DEMO_ATTENDED',
  COUNSELLING_DONE = 'COUNSELLING_DONE',
  DOCUMENTS_SUBMITTED = 'DOCUMENTS_SUBMITTED',
  FEE_PENDING = 'FEE_PENDING',
  ENROLLED = 'ENROLLED'
}

export enum LeadSource {
  FB_ADS = 'FB_ADS',
  GOOGLE_ADS = 'GOOGLE_ADS',
  WALK_IN = 'WALK_IN',
  WEBSITE = 'WEBSITE',
  REFERRAL = 'REFERRAL'
}

export interface LeadTimeline {
  date: string;
  event: string;
  staff: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  alternatePhone?: string;
  fatherName?: string;
  motherName?: string;
  email?: string;
  address?: string;
  school?: string;
  class?: string;
  details: string;
  requirements: string;
  status: LeadStatus;
  studentStage: StudentStage;
  source: LeadSource;
  assignedStaffId?: string;
  lastResponse?: string;
  lastUpdatedBy?: string;
  lastUpdatedTime?: string;
  createdAt: string;
  exam: string;
  timeline: LeadTimeline[];
}

export interface Staff {
  id: string;
  name: string;
  role: 'Admin' | 'Staff' | 'Teacher';
  email: string;
  department: string;
  subject?: string;
  joiningDate: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Infrastructure' | 'Electronics' | 'Furniture' | 'Stationary' | 'Monthly Expense';
  cost: number;
  purchaseDate: string;
}

export interface Batch {
  id: string;
  name: string;
  course: string;
  teacherName: string;
  studentCount: number;
  mode: 'Online' | 'Offline';
  investmentCost?: number;
}
