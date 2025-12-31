import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from './CartContext';

export type OrderType = 'delivery' | 'pickup';
export type PaymentMethod = 'card' | 'cash';
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface DeliveryAddress {
  street: string;
  apartment: string;
  city: string;
  zipCode: string;
  instructions: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  orderType: OrderType;
  deliveryAddress?: DeliveryAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  estimatedTime: string;
}

interface OrderContextType {
  currentOrder: Order | null;
  orderHistory: Order[];
  createOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt' | 'estimatedTime'>) => Order;
  clearCurrentOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return `AP-${timestamp}${random}`.toUpperCase();
}

function getEstimatedTime(orderType: OrderType): string {
  return orderType === 'pickup' ? '15-20 minutes' : '30-45 minutes';
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  const createOrder = (
    orderData: Omit<Order, 'id' | 'status' | 'createdAt' | 'estimatedTime'>
  ): Order => {
    const newOrder: Order = {
      ...orderData,
      id: generateOrderId(),
      status: 'confirmed',
      createdAt: new Date(),
      estimatedTime: getEstimatedTime(orderData.orderType),
    };

    setCurrentOrder(newOrder);
    setOrderHistory((prev) => [newOrder, ...prev]);

    return newOrder;
  };

  const clearCurrentOrder = () => {
    setCurrentOrder(null);
  };

  return (
    <OrderContext.Provider
      value={{
        currentOrder,
        orderHistory,
        createOrder,
        clearCurrentOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
