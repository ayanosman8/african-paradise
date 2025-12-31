import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize } from '../src/constants/theme';
import { useCart } from '../src/context/CartContext';
import {
  useOrder,
  OrderType,
  PaymentMethod,
  CustomerInfo,
  DeliveryAddress,
} from '../src/context/OrderContext';

type Step = 'info' | 'delivery' | 'payment';

export default function CheckoutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { items, totalPrice, clearCart } = useCart();
  const { createOrder } = useOrder();

  const [step, setStep] = useState<Step>('info');
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    street: '',
    apartment: '',
    city: '',
    zipCode: '',
    instructions: '',
  });

  const deliveryFee = orderType === 'delivery' ? 5.0 : 0;
  const total = totalPrice + deliveryFee;

  const handleNext = () => {
    if (step === 'info') setStep('delivery');
    else if (step === 'delivery') setStep('payment');
  };

  const handleBack = () => {
    if (step === 'payment') setStep('delivery');
    else if (step === 'delivery') setStep('info');
    else router.back();
  };

  const handlePlaceOrder = () => {
    const order = createOrder({
      items,
      customer: customerInfo,
      orderType,
      deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
      paymentMethod,
      subtotal: totalPrice,
      deliveryFee,
      total,
    });

    clearCart();
    router.replace('/confirmation');
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {(['info', 'delivery', 'payment'] as Step[]).map((s, i) => (
        <View key={s} style={styles.stepItem}>
          <View
            style={[
              styles.stepDot,
              step === s && styles.stepDotActive,
              (['info', 'delivery', 'payment'] as Step[]).indexOf(step) > i &&
                styles.stepDotComplete,
            ]}
          >
            <Text style={styles.stepNumber}>{i + 1}</Text>
          </View>
          <Text
            style={[styles.stepLabel, step === s && styles.stepLabelActive]}
          >
            {s === 'info' ? 'Info' : s === 'delivery' ? 'Delivery' : 'Payment'}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderInfoStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Your Information</Text>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or continue as guest</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputHalf}>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput
            style={styles.input}
            value={customerInfo.firstName}
            onChangeText={(text) =>
              setCustomerInfo({ ...customerInfo, firstName: text })
            }
            placeholder="John"
            placeholderTextColor={colors.foregroundMuted}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={customerInfo.lastName}
            onChangeText={(text) =>
              setCustomerInfo({ ...customerInfo, lastName: text })
            }
            placeholder="Doe"
            placeholderTextColor={colors.foregroundMuted}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          value={customerInfo.email}
          onChangeText={(text) =>
            setCustomerInfo({ ...customerInfo, email: text })
          }
          placeholder="john@example.com"
          placeholderTextColor={colors.foregroundMuted}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Phone</Text>
        <TextInput
          style={styles.input}
          value={customerInfo.phone}
          onChangeText={(text) =>
            setCustomerInfo({ ...customerInfo, phone: text })
          }
          placeholder="(555) 123-4567"
          placeholderTextColor={colors.foregroundMuted}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );

  const renderDeliveryStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Delivery Options</Text>

      <View style={styles.optionGroup}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            orderType === 'delivery' && styles.optionButtonActive,
          ]}
          onPress={() => setOrderType('delivery')}
        >
          <Text
            style={[
              styles.optionText,
              orderType === 'delivery' && styles.optionTextActive,
            ]}
          >
            Delivery
          </Text>
          <Text style={styles.optionSubtext}>30-45 min · $5.00</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionButton,
            orderType === 'pickup' && styles.optionButtonActive,
          ]}
          onPress={() => setOrderType('pickup')}
        >
          <Text
            style={[
              styles.optionText,
              orderType === 'pickup' && styles.optionTextActive,
            ]}
          >
            Pickup
          </Text>
          <Text style={styles.optionSubtext}>15-20 min · Free</Text>
        </TouchableOpacity>
      </View>

      {orderType === 'delivery' && (
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Street Address</Text>
            <TextInput
              style={styles.input}
              value={deliveryAddress.street}
              onChangeText={(text) =>
                setDeliveryAddress({ ...deliveryAddress, street: text })
              }
              placeholder="123 Main Street"
              placeholderTextColor={colors.foregroundMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Apartment/Suite (Optional)</Text>
            <TextInput
              style={styles.input}
              value={deliveryAddress.apartment}
              onChangeText={(text) =>
                setDeliveryAddress({ ...deliveryAddress, apartment: text })
              }
              placeholder="Apt 4B"
              placeholderTextColor={colors.foregroundMuted}
            />
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputHalf}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={styles.input}
                value={deliveryAddress.city}
                onChangeText={(text) =>
                  setDeliveryAddress({ ...deliveryAddress, city: text })
                }
                placeholder="New York"
                placeholderTextColor={colors.foregroundMuted}
              />
            </View>
            <View style={styles.inputHalf}>
              <Text style={styles.inputLabel}>ZIP Code</Text>
              <TextInput
                style={styles.input}
                value={deliveryAddress.zipCode}
                onChangeText={(text) =>
                  setDeliveryAddress({ ...deliveryAddress, zipCode: text })
                }
                placeholder="10001"
                placeholderTextColor={colors.foregroundMuted}
                keyboardType="number-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Delivery Instructions (Optional)</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              value={deliveryAddress.instructions}
              onChangeText={(text) =>
                setDeliveryAddress({ ...deliveryAddress, instructions: text })
              }
              placeholder="Ring doorbell, leave at door, etc."
              placeholderTextColor={colors.foregroundMuted}
              multiline
              numberOfLines={3}
            />
          </View>
        </>
      )}

      {orderType === 'pickup' && (
        <View style={styles.pickupInfo}>
          <Text style={styles.pickupTitle}>Pickup Location</Text>
          <Text style={styles.pickupAddress}>African Paradise</Text>
          <Text style={styles.pickupAddress}>2263 Morse Rd</Text>
          <Text style={styles.pickupAddress}>Columbus, OH 43229</Text>
        </View>
      )}
    </View>
  );

  const renderPaymentStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Payment Method</Text>

      <View style={styles.optionGroup}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            paymentMethod === 'card' && styles.optionButtonActive,
          ]}
          onPress={() => setPaymentMethod('card')}
        >
          <Text
            style={[
              styles.optionText,
              paymentMethod === 'card' && styles.optionTextActive,
            ]}
          >
            💳 Credit/Debit Card
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionButton,
            paymentMethod === 'cash' && styles.optionButtonActive,
          ]}
          onPress={() => setPaymentMethod('cash')}
        >
          <Text
            style={[
              styles.optionText,
              paymentMethod === 'cash' && styles.optionTextActive,
            ]}
          >
            💵 Cash on {orderType === 'delivery' ? 'Delivery' : 'Pickup'}
          </Text>
        </TouchableOpacity>
      </View>

      {paymentMethod === 'card' && (
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor={colors.foregroundMuted}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputHalf}>
              <Text style={styles.inputLabel}>Expiry</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                placeholderTextColor={colors.foregroundMuted}
              />
            </View>
            <View style={styles.inputHalf}>
              <Text style={styles.inputLabel}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                placeholderTextColor={colors.foregroundMuted}
                keyboardType="number-pad"
                secureTextEntry
              />
            </View>
          </View>
        </>
      )}

      {/* Order Summary */}
      <View style={styles.orderSummary}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        {items.map((item) => (
          <View key={item.id} style={styles.summaryItem}>
            <Text style={styles.summaryItemName}>
              {item.quantity}x {item.name}
            </Text>
            <Text style={styles.summaryItemPrice}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
        <View style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery</Text>
          <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryTotal}>Total</Text>
          <Text style={styles.summaryTotalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {renderStepIndicator()}
        {step === 'info' && renderInfoStep()}
        {step === 'delivery' && renderDeliveryStep()}
        {step === 'payment' && renderPaymentStep()}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={step === 'payment' ? handlePlaceOrder : handleNext}
        >
          <Text style={styles.nextButtonText}>
            {step === 'payment' ? 'Place Order' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  stepDotActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stepDotComplete: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  stepNumber: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: fontSize.sm,
    color: colors.foreground,
  },
  stepLabel: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.xs,
    color: colors.foregroundMuted,
  },
  stepLabelActive: {
    color: colors.primary,
  },
  stepContent: {
    marginBottom: spacing.lg,
  },
  stepTitle: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: fontSize['2xl'],
    color: colors.foreground,
    marginBottom: spacing.lg,
  },
  googleButton: {
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  googleButtonText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: fontSize.base,
    color: colors.foreground,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.sm,
    color: colors.foregroundMuted,
    paddingHorizontal: spacing.md,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  inputHalf: {
    flex: 1,
  },
  inputLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: fontSize.sm,
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.base,
    color: colors.foreground,
  },
  inputMultiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  optionGroup: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  optionButton: {
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.card,
  },
  optionText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: fontSize.base,
    color: colors.foreground,
  },
  optionTextActive: {
    color: colors.primary,
  },
  optionSubtext: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.sm,
    color: colors.foregroundMuted,
    marginTop: spacing.xs,
  },
  pickupInfo: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pickupTitle: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: fontSize.base,
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  pickupAddress: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.base,
    color: colors.foregroundMuted,
    lineHeight: 24,
  },
  orderSummary: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.lg,
  },
  summaryTitle: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: fontSize.lg,
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  summaryItemName: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.sm,
    color: colors.foregroundMuted,
    flex: 1,
  },
  summaryItemPrice: {
    fontFamily: 'DMSans_500Medium',
    fontSize: fontSize.sm,
    color: colors.foreground,
  },
  summaryDivider: {
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
  summaryTotal: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: fontSize.lg,
    color: colors.foreground,
  },
  summaryTotalValue: {
    fontFamily: 'DMSans_700Bold',
    fontSize: fontSize.lg,
    color: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.md,
  },
  backButton: {
    flex: 1,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  backButtonText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: fontSize.base,
    color: colors.foreground,
  },
  nextButton: {
    flex: 2,
    backgroundColor: colors.primary,
    padding: spacing.md,
    alignItems: 'center',
  },
  nextButtonText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: fontSize.base,
    color: colors.background,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
