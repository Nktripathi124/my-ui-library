import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './index';
import type { Column } from './types';

// 1. Define types and sample data first
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const sampleData: User[] = [
  { id: 1, name: 'Jane Cooper', email: 'jane.cooper@example.com', role: 'Admin' },
  { id: 2, name: 'Cody Fisher', email: 'cody.fisher@example.com', role: 'Owner' },
  { id: 3, name: 'Esther Howard', email: 'esther.howard@example.com', role: 'Member' },
  { id: 4, name: 'Jenny Wilson', email: 'jenny.wilson@example.com', role: 'Member' },
];

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'email', title: 'Email' },
  { key: 'role', title: 'Role', sortable: true },
];

// 2. Configure the component's story
const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

// 3. Export each story
export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
    rowKey: 'id',
  },
};

export const Selectable: Story = {
  args: {
    ...Default.args, // Use the same data as the Default story
    selectable: true,
    onRowSelect: (selectedRows) => {
      console.log('Selected Rows:', selectedRows);
    },
  },
};


export const Loading: Story = {
  args: {
    ...Default.args,
    data: [], 
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    data: [],
  },
};