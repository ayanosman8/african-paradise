"use client";

import { useOrder } from "../context/OrderContext";

interface OrderConfirmationProps {
  onClose: () => void;
}

export default function OrderConfirmation({ onClose }: OrderConfirmationProps) {
  const { currentOrder } = useOrder();

  if (!currentOrder) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card border border-border overflow-hidden">
        {/* Success Header */}
        <div className="p-8 text-center border-b border-border">
          <div className="w-16 h-16 mx-auto mb-4 border-2 border-primary flex items-center justify-center">
            <svg
              className="h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-serif mb-2">Order Confirmed!</h2>
          <p className="text-foreground-muted">
            Thank you for your order, {currentOrder.customer.firstName}
          </p>
        </div>

        {/* Order Details */}
        <div className="p-6 space-y-6">
          {/* Order ID & Time */}
          <div className="flex justify-between items-center p-4 bg-background border border-border">
            <div>
              <p className="text-sm text-foreground-muted">Order ID</p>
              <p className="font-mono font-medium">{currentOrder.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-foreground-muted">Estimated Time</p>
              <p className="font-medium text-primary">{currentOrder.estimatedTime}</p>
            </div>
          </div>

          {/* Order Type Info */}
          <div className="p-4 border border-border">
            <div className="flex items-start gap-4">
              {currentOrder.orderType === "delivery" ? (
                <svg className="h-6 w-6 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )}
              <div>
                <h4 className="font-medium">
                  {currentOrder.orderType === "delivery" ? "Delivery Address" : "Pickup Location"}
                </h4>
                {currentOrder.orderType === "delivery" && currentOrder.deliveryAddress ? (
                  <div className="text-sm text-foreground-muted mt-1">
                    <p>{currentOrder.deliveryAddress.street}</p>
                    {currentOrder.deliveryAddress.apartment && (
                      <p>{currentOrder.deliveryAddress.apartment}</p>
                    )}
                    <p>{currentOrder.deliveryAddress.city}, {currentOrder.deliveryAddress.zipCode}</p>
                  </div>
                ) : (
                  <div className="text-sm text-foreground-muted mt-1">
                    <p>African Paradise</p>
                    <p>123 Savanna Street</p>
                    <p>City Center, CA 90210</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h4 className="text-sm font-medium mb-3">Order Items</h4>
            <div className="border border-border divide-y divide-border max-h-40 overflow-y-auto">
              {currentOrder.items.map((item) => (
                <div key={item.id} className="p-3 flex justify-between text-sm">
                  <span>
                    <span className="text-foreground-muted">{item.quantity}x</span>
                    <span className="ml-2">{item.name}</span>
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4 border-t border-border">
            <span className="font-medium">Total Paid</span>
            <span className="text-xl font-serif text-primary">${currentOrder.total.toFixed(2)}</span>
          </div>

          {/* Payment Method */}
          <div className="flex items-center gap-2 text-sm text-foreground-muted">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span>
              {currentOrder.paymentMethod === "card"
                ? "Paid by card"
                : `Cash on ${currentOrder.orderType}`
              }
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border space-y-3">
          <p className="text-sm text-foreground-muted text-center">
            A confirmation email has been sent to {currentOrder.customer.email}
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary hover:bg-primary-hover text-background font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
