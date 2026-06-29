import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../App'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const FEATURES = [
  { emoji: '🚗', title: 'All Makes & Models', desc: 'Toyota, Honda, Ford, BMW, Tesla & more' },
  { emoji: '⚡', title: 'Instant Results', desc: 'Answers in seconds, in plain English' },
  { emoji: '🎯', title: 'Urgency Ratings', desc: 'Know what needs attention now vs. later' },
  { emoji: '💰', title: 'Cost Estimates', desc: 'Realistic repair price ranges' },
]

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.badge}>⚡ AI-Powered Diagnostics</Text>
        <Text style={styles.heroTitle}>Diagnose Your Car Problem in Seconds</Text>
        <Text style={styles.heroSubtitle}>
          Describe what's wrong — a noise, warning light, or poor performance — and get step-by-step
          troubleshooting instantly.
        </Text>
        <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('Diagnose')}>
          <Text style={styles.ctaButtonText}>Diagnose My Car  →</Text>
        </TouchableOpacity>
        <Text style={styles.freeNote}>Free to use · No sign-up required</Text>
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why AutoDiag</Text>
        {FEATURES.map((f) => (
          <View key={f.title} style={styles.featureCard}>
            <Text style={styles.featureEmoji}>{f.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Pro upsell */}
      <View style={styles.proCard}>
        <Text style={styles.proCrown}>👑</Text>
        <Text style={styles.proTitle}>AutoDiag Pro</Text>
        <Text style={styles.proPrice}>$50<Text style={styles.proPriceUnit}>/month</Text></Text>
        <Text style={styles.proDesc}>Unlimited diagnostics, maintenance tracking & more.</Text>
        <TouchableOpacity style={styles.proButton} onPress={() => navigation.navigate('Pricing')}>
          <Text style={styles.proButtonText}>See Pro Plan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  hero: { backgroundColor: '#0f172a', padding: 24, paddingTop: 32, paddingBottom: 36 },
  badge: {
    color: '#93c5fd', backgroundColor: 'rgba(59,130,246,0.2)', alignSelf: 'flex-start',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, fontSize: 12, fontWeight: '600', marginBottom: 16,
  },
  heroTitle: { color: '#fff', fontSize: 30, fontWeight: '800', lineHeight: 36, marginBottom: 12 },
  heroSubtitle: { color: '#cbd5e1', fontSize: 15, lineHeight: 22, marginBottom: 24 },
  ctaButton: { backgroundColor: '#2563eb', paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  ctaButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  freeNote: { color: '#64748b', fontSize: 13, textAlign: 'center', marginTop: 12 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: '#1e293b', marginBottom: 16 },
  featureCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 14,
    marginBottom: 12, borderWidth: 1, borderColor: '#f1f5f9', gap: 14,
  },
  featureEmoji: { fontSize: 28 },
  featureTitle: { fontSize: 15, fontWeight: '600', color: '#1e293b' },
  featureDesc: { fontSize: 13, color: '#64748b', marginTop: 2 },
  proCard: {
    backgroundColor: '#0f172a', margin: 20, padding: 24, borderRadius: 18, alignItems: 'center',
    borderWidth: 2, borderColor: '#3b82f6',
  },
  proCrown: { fontSize: 32, marginBottom: 8 },
  proTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  proPrice: { color: '#fff', fontSize: 40, fontWeight: '800', marginTop: 8 },
  proPriceUnit: { fontSize: 16, color: '#94a3b8', fontWeight: '500' },
  proDesc: { color: '#cbd5e1', fontSize: 14, textAlign: 'center', marginTop: 8, marginBottom: 20 },
  proButton: { backgroundColor: '#2563eb', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12, width: '100%', alignItems: 'center' },
  proButtonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
})
