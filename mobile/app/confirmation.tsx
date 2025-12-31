import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize } from '../src/constants/theme';
import { useOrder } from '../src/context/OrderContext';

export default function ConfirmationScreen() {
  const router = useRouter();
  const { currentOrder, clearCurrentOrder } = useOrder();

  const handleBackToHome = () => {
    clearCurrentOrder();
    router.replace('/(tabs)');
  };

  if (!currentOrder) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No order found</Text>
        <TouchableOpacity style={styles.button} onPress={handleBackToHome}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Success Header */}
      <View style={styles.header}>
        <Text style={styles.checkmark}>✓</Text>
        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.subtitle}>
          Thank you for your order, {currentOrder.customer.firstName}
        </Text>
      </View>

      {/* Order ID */}
      <View style={styles.orderIdCard}>
        <Text style={styles.orderIdLabel}>Order Number</Text>
        <Text style={styles.orderId}>{currentOrder.id}</Text>
      </View>

      {/* Estimated Time */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {currentOrder.orderType === 'delivery' ? 'Estimated Delivery' : 'Ready for Pickup'}
        </Text>
        <Text style={styles.estimatedTime}>{currentOrder.estimatedTime}</Text>
        {currentOrder.orderType === 'pickup' && (
          <View style={styles.pickupAddress}>
            <Text style={styles.addressText}>African Paradise</Text>
            <Text style={styles.addressText}>2263 Morse Rd</Text>
            <Text style={styles.addressText}>Columbus, OH 43229</Text>
          </View>
        )}
      </View>

      {/* Order Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Order Details</Text>
        {currentOrder.items.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemName}>
              {item.quantity}x {item.name}
            </Text>
            <Text style={styles.itemPrice}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>
            ${currentOrder.subtotal.toFixed(2)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>
            ${currentOrder.deliveryFee.toFixed(2)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>
            ${currentOrder.total.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Delivery Address */}
      {currentOrder.orderType === 'delivery' && currentOrder.deliveryAddress && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delivery Address</Text>
          <Text style={styles.addressText}>
            {currentOrder.deliveryAddress.street}
          </Text>
          {currentOrder.deliveryAddress.apartment && (
            <Text style={styles.addressText}>
              {currentOrder.deliveryAddress.apartment}
            </Text>
          )}
          <Text style={styles.addressText}>
            {currentOrder.deliveryAddress.city}, {currentOrder.deliveryAddress.zipCode}
          </Text>
        </View>
      )}

      {/* Payment Method */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payment Method</Text>
        <Text style={styles.paymentMethod}>
          {currentOrder.paymentMethod === 'card'
            ? '💳 Credit/Debit Card'
            : `💵 Cash on ${currentOrder.orderType === 'delivery' ? 'Delivery' : 'Pickup'}`}
        </Text>
      </View>

      {/* Contact Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact Information</Text>
        <Text style={styles.contactText}>
          {currentOrder.customer.firstName} {currentOrder.customer.lastName}
        </Text>
        <Text style={styles.contactText}>{currentOrder.customer.email}</Text>
        <Text style={styles.contactText}>{currentOrder.customer.phone}</Text>
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.button} onPress={handleBackToHome}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  checkmark: {
    fontSize: 64,
    color: colors.success,
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: fontSize['3xl'],
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.base,
    color: colors.foregroundMuted,
    textAlign: 'center',
  },
  orderIdCard: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  orderIdLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: fontSize.sm,
    color: colors.background,
    opacity: 0.8,
    marginBottom: spacing.xs,
  },
  orderId: {
    fontFamily: 'DMSans_700Bold',
    fontSize: fontSize['2xl'],
    color: colors.background,
    letterSpacing: 2,
  },
  card: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: fontSize.lg,
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  estimatedTime: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: fontSize.xl,
    color: colors.primary,
  },
  pickupAddress: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  itemName: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.base,
    color: colors.foregroundMuted,
    flex: 1,
  },
  itemPrice: {
    fontFamily: 'DMSans_500Medium',
    fontSize: fontSize.base,
    color: colors.foreground,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  summaryLabel: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.base,
    color: colors.foregroundMuted,
  },
  summaryValue: {
    fontFamily: 'DMSans_500Medium',
    fontSize: fontSize.base,
    color: colors.foreground,
  },
  totalLabel: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: fontSize.lg,
    color: colors.foreground,
  },
  totalValue: {
    fontFamily: 'DMSans_700Bold',
    fontSize: fontSize.lg,
    color: colors.primary,
  },
  addressText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.base,
    color: colors.foregroundMuted,
    lineHeight: 24,
  },
  paymentMethod: {
    fontFamily: 'DMSans_500Medium',
    fontSize: fontSize.base,
    color: colors.foreground,
  },
  contactText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.base,
    color: colors.foregroundMuted,
    lineHeight: 24,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  buttonText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: fontSize.base,
    color: colors.background,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  errorText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.base,
    color: colors.foregroundMuted,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
});
