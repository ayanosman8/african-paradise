import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize } from '../../src/constants/theme';
import { categories, menuItems, MenuItem } from '../../src/data/menu';
import { useCart } from '../../src/context/CartContext';

function MenuItemCard({ item }: { item: MenuItem }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const checkOpacity = useRef(new Animated.Value(0)).current;
  const plusOpacity = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    router.push(`/menu/${item.id}`);
  };

  const handleAddToCart = () => {
    if (isAdded) return;

    setIsAdded(true);
    addItem(item);

    // Animate button press
    Animated.sequence([
      // Scale down
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      // Scale up with bounce
      Animated.spring(scaleAnim, {
        toValue: 1.1,
        friction: 3,
        tension: 200,
        useNativeDriver: true,
      }),
      // Settle back
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // Fade out plus, fade in check
    Animated.parallel([
      Animated.timing(plusOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(checkOpacity, {
        toValue: 1,
        duration: 200,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Reset after delay
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(checkOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(plusOpacity, {
          toValue: 1,
          duration: 200,
          delay: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsAdded(false);
      });
    }, 1200);
  };

  return (
    <TouchableOpacity
      style={styles.menuItem}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemDescription} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleAddToCart}
        disabled={isAdded}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Animated.View
          style={[
            styles.addButton,
            isAdded && styles.addButtonSuccess,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Animated.Text
            style={[styles.addButtonText, { opacity: plusOpacity }]}
          >
            +
          </Animated.Text>
          <Animated.Text
            style={[
              styles.addButtonText,
              styles.checkText,
              { opacity: checkOpacity },
            ]}
          >
            ✓
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function MenuScreen() {
  const [activeCategory, setActiveCategory] = useState<string>('breakfast');

  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <View style={styles.container}>
      {/* Category Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.tab,
                activeCategory === category.id && styles.tabActive,
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeCategory === category.id && styles.tabTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Menu Items */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemCard item={item} />}
        contentContainerStyle={styles.menuList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  tab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: fontSize.sm,
    color: colors.foregroundMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tabTextActive: {
    color: colors.background,
  },
  menuList: {
    padding: spacing.md,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItemContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  menuItemName: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: fontSize.lg,
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  menuItemDescription: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.sm,
    color: colors.foregroundMuted,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  menuItemPrice: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: fontSize.base,
    color: colors.primary,
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  addButtonSuccess: {
    backgroundColor: colors.success,
  },
  addButtonText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: fontSize.xl,
    color: colors.background,
    position: 'absolute',
  },
  checkText: {
    fontSize: 22,
  },
});
