import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../App'

type Props = NativeStackScreenProps<RootStackParamList, 'Pricing'>

// Point this at your deployed web app's checkout (or an in-app purchase flow).
const CHECKOUT_URL = 'https://autodiag.app/pricing'

const PRO_FEATURES = [
  'Unlimited AI-powered diagnoses',
  'Advanced OBD-II code explanations',
  'Maintenance schedule tracker',
  'Repair history log & reminders',
  'Priority response (faster AI)',
  'Export diagnostic reports (PDF)',
  'Email support',
]

export default function PricingScreen(_: Props) {
  const [loading, setLoading] = useState(false)

  async function handleSubscribe() {
    setLoading(true)
    try {
      await Linking.openURL(CHECKOUT_URL)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <View style={styles.hero}>
        <Text style={styles.crown}>👑</Text>
        <Text style={styles.heroTitle}>Upgrade to AutoDiag Pro</Text>
        <Text style={styles.heroSub}>Unlimited diagnostics & more — for less than a single shop visit.</Text>
      </View>

      <View style={styles.priceCard}>
        <Text style={styles.popular}>MOST POPULAR</Text>
        <Text style={styles.planName}>Pro</Text>
        <Text style={styles.price}>$50<Text style={styles.priceUnit}>/month</Text></Text>

        <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.subscribeText}>👑  Subscribe — $50/month</Text>}
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          {PRO_FEATURES.map((f) => (
            <View key={f} style={styles.featureRow}>
              <Text style={styles.check}>✓</Text>
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.note}>Cancel anytime · Secure checkout powered by Stripe</Text>

      <View style={styles.freeCard}>
        <Text style={styles.freePlanName}>Free</Text>
        <Text style={styles.freePrice}>$0<Text style={styles.freePriceUnit}>/month</Text></Text>
        <Text style={styles.freeDesc}>Basic diagnostics · 3 per day · Step-by-step troubleshooting</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  hero: { alignItems: 'center', marginBottom: 24 },
  crown: { fontSize: 36, marginBottom: 8 },
  heroTitle: { fontSize: 24, fontWeight: '800', color: '#1e293b', textAlign: 'center' },
  heroSub: { fontSize: 14, color: '#64748b', textAlign: 'center', marginTop: 8, lineHeight: 20 },
  priceCard: { backgroundColor: '#fff', borderRadius: 20, borderWidth: 2, borderColor: '#3b82f6', padding: 24, position: 'relative' },
  popular: {
    position: 'absolute', top: -11, alignSelf: 'center', backgroundColor: '#2563eb', color: '#fff',
    fontSize: 11, fontWeight: '700', paddingHorizontal: 14, paddingVertical: 4, borderRadius: 999, overflow: 'hidden',
  },
  planName: { fontSize: 18, fontWeight: '700', color: '#1e293b', marginTop: 4 },
  price: { fontSize: 44, fontWeight: '800', color: '#1e293b', marginTop: 8, marginBottom: 20 },
  priceUnit: { fontSize: 16, color: '#94a3b8', fontWeight: '500' },
  subscribeButton: { backgroundColor: '#2563eb', paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  subscribeText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  featureRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 10 },
  check: { color: '#2563eb', fontWeight: '800', fontSize: 14 },
  featureText: { flex: 1, fontSize: 14, color: '#475569', lineHeight: 20 },
  note: { textAlign: 'center', fontSize: 13, color: '#64748b', marginTop: 16, marginBottom: 24 },
  freeCard: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0', padding: 20 },
  freePlanName: { fontSize: 16, fontWeight: '700', color: '#1e293b' },
  freePrice: { fontSize: 32, fontWeight: '800', color: '#1e293b', marginTop: 4 },
  freePriceUnit: { fontSize: 14, color: '#94a3b8', fontWeight: '500' },
  freeDesc: { fontSize: 13, color: '#64748b', marginTop: 8, lineHeight: 19 },
})
