/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MaintenanceNote {
  id: string;
  judul: string;
  isiCatatan: string; // The Linux command block (can have multiple lines)
  notes: string;      // The gray description under the command block
  category: string;   // Category, e.g., "Service", "System", "Log", "Database", "Network"
  createdAt: number;
}

export type ThemeMode = 'sharingan' | 'rinnegan' | 'kamui';
