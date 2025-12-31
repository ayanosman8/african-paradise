import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize } from '../../src/constants/theme';
import { categories } from '../../src/data/menu';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.subtitle}>Welcome to</Text>
        <Text style={styles.title}>African Paradise</Text>
        <Text style={styles.tagline}>Authentic African Cuisine</Text>
        <Text style={styles.description}>
          Experience the rich flavors and traditions of African cooking, crafted with love and the finest ingredients.
        </Text>
        <TouchableOpacity
          style={styles.heroButton}
          onPress={() => router.push('/menu')}
        >
          <Text style={styles.heroButtonText}>View Menu</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Menu</Text>
        <View style={styles.categories}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => router.push('/menu')}
            >
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutText}>
            African Paradise brings the authentic tastes of African cuisine to your table.
            Our recipes have been passed down through generations, featuring traditional spices
            and cooking techniques that create unforgettable flavors.
          </Text>
        </View>
      </View>

      {/* Hours */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hours</Text>
        <View style={styles.hoursCard}>
          <View style={styles.hoursRow}>
            <Text style={styles.hoursDay}>Monday - Friday</Text>
            <Text style={styles.hoursTime}>8:00 AM - 10:00 PM</Text>
          </View>
          <View style={styles.hoursRow}>
            <Text style={styles.hoursDay}>Saturday - Sunday</Text>
            <Text style={styles.hoursTime}>9:00 AM - 11:00 PM</Text>
          </View>
        </View>
      </View>

      {/* Contact */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <View style={styles.contactCard}>
          <Text style={styles.contactText}>📍 123 Paradise Street</Text>
          <Text style={styles.contactText}>📞 (555) 123-4567</Text>
          <Text style={styles.contactText}>✉️ info@africanparadise.com</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  hero: {
    padding: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.sm,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
  title: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: fontSize['5xl'],
    color: colors.foreground,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  tagline: {
    fontFamily: 'CormorantGaramond_400Regular',
    fontSize: fontSize.xl,
    color: colors.foregroundMuted,
    marginBottom: spacing.md,
  },
  description: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.base,
    color: colors.foregroundMuted,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  heroButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 0,
  },
  heroButtonText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: fontSize.base,
    color: colors.background,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  section: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lastSection: {
    borderBottomWidth: 0,
  },
  sectionTitle: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: fontSize['2xl'],
    color: colors.foreground,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  categories: {
    gap: spacing.md,
  },
  categoryCard: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  categoryName: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: fontSize.xl,
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  categoryDescription: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.sm,
    color: colors.foregroundMuted,
  },
  aboutCard: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  aboutText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.base,
    color: colors.foregroundMuted,
    lineHeight: 24,
  },
  hoursCard: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  hoursDay: {
    fontFamily: 'DMSans_500Medium',
    fontSize: fontSize.base,
    color: colors.foreground,
  },
  hoursTime: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.base,
    color: colors.primary,
  },
  contactCard: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  contactText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: fontSize.base,
    color: colors.foregroundMuted,
  },
});
