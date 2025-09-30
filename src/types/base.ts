// src/types/base.ts

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export enum UserRole {
  CLIENT = "client",
  DIREKTUR = "direktur", 
  KAPOKJA = "kapokja",
  PIC = "pic"
}

export interface SidebarItemProps {
  label: string;
  icon: string;
  keyName: string;
  refSection: React.RefObject<HTMLDivElement>;
}

export interface StatItem {
  number: string;
  label: string;
  color?: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface SectionConfig {
  key: string;
  ref: React.RefObject<HTMLDivElement>;
}

export enum Priority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM", 
  LOW = "LOW",
  CRITICAL = "CRITICAL"
}

export enum Status {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  ON_HOLD = "on_hold"
}

// Base project interface
export interface BaseProject {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  startDate: Date;
  endDate?: Date;
  progress: number;
  description?: string;
}