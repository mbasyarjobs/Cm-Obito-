/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MaintenanceNote } from './types';

export const INITIAL_NOTES: MaintenanceNote[] = [
  {
    id: 'seed-1',
    judul: 'Restart Parking Service & Status Check',
    isiCatatan: 'sudo systemctl restart parking.service\nsudo systemctl status parking.service',
    notes: 'Restart service parking setelah mengubah konfigurasi tarif atau melakukan integrasi gate baru.',
    category: 'Service',
    createdAt: 1719810000000
  },
  {
    id: 'seed-2',
    judul: 'Cek Status Nginx & Reload Konfigurasi',
    isiCatatan: 'sudo nginx -t\nsudo systemctl reload nginx\nsystemctl status nginx',
    notes: 'Selalu lakukan "nginx -t" terlebih dahulu untuk memverifikasi sintaks konfigurasi sebelum mereload server nginx.',
    category: 'Network',
    createdAt: 1719810100000
  },
  {
    id: 'seed-3',
    judul: 'Monitoring Realtime Log Service Central',
    isiCatatan: 'journalctl -u parking.service -f -n 100 --no-tail',
    notes: 'Melihat 100 baris log terakhir secara realtime (-f) khusus untuk unit parking.service.',
    category: 'Log',
    createdAt: 1719810200000
  },
  {
    id: 'seed-4',
    judul: 'Cek Penggunaan Disk & Partisi Penyimpanan',
    isiCatatan: 'df -h\nsudo du -sh /var/log/* | sort -rh | head -n 10',
    notes: 'df -h mengecek kapasitas storage sisa, sedangkan perintah du mencari 10 file/folder log terbesar.',
    category: 'System',
    createdAt: 1719810300000
  },
  {
    id: 'seed-5',
    judul: 'Backup Database PostgreSQL Central Maintenance',
    isiCatatan: 'pg_dump -U postgres -d central_db -F c -b -v -f /backup/db_cm_$(date +%Y%m%d_%H%M%S).backup',
    notes: 'Lakukan backup berkala sebelum melakukan upgrade skema atau migrasi data manual.',
    category: 'Database',
    createdAt: 1719810400000
  },
  {
    id: 'seed-6',
    judul: 'Cek Port Aktif & Koneksi Jaringan',
    isiCatatan: 'sudo ss -tulpn | grep LISTEN',
    notes: 'Melihat aplikasi apa saja yang sedang mendengarkan (listening) di port tertentu pada server.',
    category: 'Network',
    createdAt: 1719810500000
  }
];

export const CATEGORIES = ['All', 'Service', 'System', 'Network', 'Database', 'Log', 'Other'];
