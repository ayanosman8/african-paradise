import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, fontSize } from '../../src/constants/theme';
import { menuItems } from '../../src/data/menu';
import { getLocalImage } from '../../src/data/images';
import { useCart } from '../../src/context/CartContext';

export default function MenuItemDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addItem, items } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const scaleAnim = useState(new Animated.Value(1))[0];

  const item = menuItems.find((i) => i.id === id);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Item not found</Text>
      </View>
    );
  }

  const cartItem = items.find((i) => i.id === item.id);
  const totalPrice = item.price * quantity;

  const handleAddToCart = () => {
    setIsAdded(true);

    // Animate button
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    // Add items
    for (let i = 0; i < quantity; i++) {
      addItem(item);
    }

    // Reset and go back after delay
    setTimeout(() => {
      setIsAdded(false);
      router.back();
    }, 800);
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  // Get category display name
  const categoryName = item.category.charAt(0).toUpperCase() + item.category.slice(1);

  // Check for local image
  const localImage = getLocalImage(item.name);
  const imageSource = localImage || { uri: item.image };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Item Info */}
        <View style={styles.infoSection}>
          <Text style={styles.category}>{categoryName}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>

        {/* Quantity Selector */}
        <View style={styles.quantitySection}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={decrementQuantity}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <View style={styles.quantityDisplay}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={incrementQuantity}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Already in cart notice */}
        {cartItem && (
          <View style={styles.inCartNotice}>
            <Text style={styles.inCartText}>
              Already in cart: {cartItem.quantity} item{cartItem.quantity > 1 ? 's' : ''}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleAddToCart}
          disabled={isAdded}
        >
          <Animated.View
            style={[
              styles.addButton,
              isAdded && styles.addButtonSuccess,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <Text style={styles.addButtonText}>
              {isAdded ? '✓ Added to Cart' : `Add to Cart · $${totalPrice.toFixed(2)}`}
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingBottom: spacing.xl,
  },
  errorText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.base,
    color: colors.foregroundMuted,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoSection: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  category: {
    fontFamily: 'DMSans_500Medium',
    fontSize: fontSize.sm,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
  name: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: fontSize['3xl'],
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  price: {
    fontFamily: 'DMSans_700Bold',
    fontSize: fontSize.xl,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  description: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.base,
    color: colors.foregroundMuted,
    lineHeight: 26,
  },
  quantitySection: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: fontSize.lg,
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 56,
    height: 56,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: fontSize['2xl'],
    color: colors.foreground,
  },
  quantityDisplay: {
    width: 80,
    height: 56,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: fontSize.xl,
    color: colors.foreground,
  },
  inCartNotice: {
    margin: spacing.lg,
    padding: spacing.md,
    backgroundColor: 'rgba(212, 165, 116, 0.1)',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  inCartText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: fontSize.sm,
    color: colors.primary,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  addButtonSuccess: {
    backgroundColor: colors.success,
  },
  addButtonText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: fontSize.base,
    color: colors.background,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
