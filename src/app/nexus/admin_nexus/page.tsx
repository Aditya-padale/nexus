import { Metadata } from 'next';
import AdminNexusClient from './AdminNexusClient';

export const metadata: Metadata = {
  title: 'Admin Panel',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminNexusPage() {
  return <AdminNexusClient />;
}
