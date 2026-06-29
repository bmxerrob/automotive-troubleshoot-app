import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../App'

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>

const URGENCY: Record<string, { label: string; bg: string; fg: string; icon: string }> = {
  low:      { label: 'Low Priority',  bg: '#dcfce7', fg: '#166534', icon: '🟢' },
  medium:   { label: 'Moderate',      bg: '#fef9c3', fg: '#854d0e', icon: '🟡' },
  high:     { label: 'High Priority', bg: '#ffedd5', fg: '#9a3412', icon: '🟠' },
  critical: { label: 'Critical',      bg: '#fee2e2', fg: '#991b1b', icon: '🔴' },
}

export default function ResultScreen({ route, navigation }: Props) {
  const { result, vehicle } = route.params
  const u = URGENCY[result.urgencyLevel]

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      {/* Header card */}
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Diagnostic Results</Text>
            <Text style={styles.vehicle}>{vehicle.year} {vehicle.make} {vehicle.model}</Text>
          </View>
          <View style={[styles.urgencyBadge, { backgroundColor: u.bg }]}>
            <Text style={[styles.urgencyText, { color: u.fg }]}>{u.icon} {u.label}</Text>
          </View>
        </View>
        <Text style={styles.summary}>{result.summary}</Text>
      </View>

      {/* Possible causes */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>⚠️  Possible Causes</Text>
        {result.possibleCauses.map((cause, i) => (
          <View key={i} style={styles.causeRow}>
            <Text style={styles.causeNum}>{i + 1}.</Text>
            <Text style={styles.causeText}>{cause}</Text>
          </View>
        ))}
      </View>

      {/* Steps */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🔧  Troubleshooting Steps</Text>
        {result.steps.map((step, i) => {
          const su = URGENCY[step.urgency]
          return (
            <View key={i} style={styles.stepCard}>
              <View style={styles.stepHeader}>
                <View style={styles.stepNum}><Text style={styles.stepNumText}>{i + 1}</Text></View>
                <Text style={styles.stepTitle}>{step.title}</Text>
              </View>
              <View style={styles.tagRow}>
                <View style={[styles.tag, { backgroundColor: su.bg }]}>
                  <Text style={[styles.tagText, { color: su.fg }]}>{su.icon} {su.label}</Text>
                </View>
                <View style={[styles.tag, { backgroundColor: step.diy ? '#dcfce7' : '#f1f5f9' }]}>
                  <Text style={[styles.tagText, { color: step.diy ? '#166534' : '#475569' }]}>
                    {step.diy ? '🔧 DIY' : '🔑 Shop'}
                  </Text>
                </View>
              </View>
              <Text style={styles.stepDesc}>{step.description}</Text>
            </View>
          )
        })}
      </View>

      {/* Cost */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>💰  Estimated Costs</Text>
        <Text style={styles.costText}>{result.estimatedCost}</Text>
      </View>

      {/* Shop recommendation */}
      <View style={[styles.card, { backgroundColor: result.shouldSeeShop ? '#fff7ed' : '#f0fdf4', borderColor: result.shouldSeeShop ? '#fed7aa' : '#bbf7d0' }]}>
        <Text style={[styles.sectionTitle, { color: result.shouldSeeShop ? '#9a3412' : '#166534' }]}>
          🛠  Shop Visit?
        </Text>
        <Text style={{ color: result.shouldSeeShop ? '#9a3412' : '#166534', fontSize: 14, lineHeight: 20 }}>
          {result.shouldSeeShop
            ? 'A professional inspection is recommended for this issue.'
            : 'Many of these steps can be done at home.'}
        </Text>
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          <Text style={{ fontWeight: '700', color: '#fff' }}>⚠️ Safety Note: </Text>
          {result.disclaimer} AutoDiag provides informational guidance only. Always consult a certified mechanic for safety-critical repairs.
        </Text>
      </View>

      <TouchableOpacity style={styles.newButton} onPress={() => navigation.navigate('Diagnose')}>
        <Text style={styles.newButtonText}>New Diagnosis</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: '#f1f5f9' },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, gap: 10 },
  title: { fontSize: 18, fontWeight: '700', color: '#1e293b' },
  vehicle: { fontSize: 13, color: '#64748b', marginTop: 2 },
  urgencyBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
  urgencyText: { fontSize: 11, fontWeight: '700' },
  summary: { fontSize: 14, color: '#334155', lineHeight: 21 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1e293b', marginBottom: 12 },
  causeRow: { flexDirection: 'row', marginBottom: 8, gap: 6 },
  causeNum: { color: '#f97316', fontWeight: '700', fontSize: 14 },
  causeText: { flex: 1, fontSize: 14, color: '#334155', lineHeight: 20 },
  stepCard: { borderWidth: 1, borderColor: '#f1f5f9', borderRadius: 12, padding: 14, marginBottom: 10 },
  stepHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  stepNum: { backgroundColor: '#dbeafe', width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  stepNumText: { color: '#1d4ed8', fontWeight: '700', fontSize: 12 },
  stepTitle: { flex: 1, fontSize: 14, fontWeight: '600', color: '#1e293b' },
  tagRow: { flexDirection: 'row', gap: 6, marginBottom: 8 },
  tag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  tagText: { fontSize: 11, fontWeight: '600' },
  stepDesc: { fontSize: 13, color: '#475569', lineHeight: 19 },
  costText: { fontSize: 14, color: '#475569', lineHeight: 21 },
  disclaimer: { backgroundColor: '#1e293b', borderRadius: 14, padding: 14, marginBottom: 14 },
  disclaimerText: { fontSize: 12, color: '#cbd5e1', lineHeight: 18 },
  newButton: { backgroundColor: '#2563eb', paddingVertical: 15, borderRadius: 14, alignItems: 'center' },
  newButtonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
})
