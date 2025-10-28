import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaTrash, FaEdit, FaEye } from 'react-icons/fa';

// Mock data for orders
const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    date: '2025-10-10',
    status: 'Completed',
    total: 24.97,
    items: 3,
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    date: '2025-10-11',
    status: 'Processing',
    total: 45.50,
    items: 5,
  },
  {
    id: 'ORD-003',
    customer: 'Mike Johnson',
    date: '2025-10-12',
    status: 'Pending',
    total: 32.75,
    items: 2,
  },
];

const OrdersContainer = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #333;
  margin: 0;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: #f5f5f5;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  width: 300px;

  input {
    border: none;
    background: transparent;
    padding: 0.5rem;
    width: 100%;
    outline: none;
  }

  svg {
    color: #666;
    margin-right: 0.5rem;
  }
`;

const StatusFilter = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: white;
  margin-left: 1rem;
`;

const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #f8f9fa;
    font-weight: 600;
    color: #555;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover {
    background: #f9f9f9;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
  background: ${props => 
    props.status === 'completed' ? '#d4edda' : 
    props.status === 'processing' ? '#fff3cd' : 
    '#f8d7da'}; // Default for pending/other
  color: ${props => 
    props.status === 'completed' ? '#155724' : 
    props.status === 'processing' ? '#856404' : 
    '#721c24'};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  margin: 0 0.25rem;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: #333;
    background: #f0f0f0;
  }
`;

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      order.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <OrdersContainer>
      <Header>
        <Title>Orders</Title>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SearchBar>
            <FaSearch />
            <input 
              type="text" 
              placeholder="Search orders..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          <StatusFilter 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
          </StatusFilter>
        </div>
      </Header>

      <OrderTable>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Items</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>
                <StatusBadge status={order.status.toLowerCase()}>
                  {order.status}
                </StatusBadge>
              </td>
              <td>{order.items}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>
                <ActionButton title="View Order">
                  <FaEye />
                </ActionButton>
                <ActionButton title="Edit Order">
                  <FaEdit />
                </ActionButton>
                <ActionButton title="Delete Order">
                  <FaTrash />
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </OrderTable>
    </OrdersContainer>
  );
};

export default Orders;
