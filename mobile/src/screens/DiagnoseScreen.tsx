import React, { useState } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput,
  ActivityIndicator, Modal, FlatList, Pressable,
} from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../App'
import { VEHICLE_MAKES, YEARS, getModelsForMake } from '../lib/vehicles'
import { getDiagnosticResult } from '../lib/diagnostics'

type Props = NativeStackScreenProps<RootStackParamList, 'Diagnose'>

const EXAMPLES = [
  'Check engine light came on',
  'Grinding noise when braking',
  "Car won't start in the morning",
  'A/C blows warm air',
  'Engine is overheating',
  'Shaking at highway speeds',
]

type PickerField = 'year' | 'make' | 'model' | null

export default function DiagnoseScreen({ navigation }: Props) {
  const [year, setYear] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [problem, setProblem] = useState('')
  const [loading, setLoading] = useState(false)
  const [picker, setPicker] = useState<PickerField>(null)

  const models = getModelsForMake(make)
  const canSubmit = year && make && model && problem.trim().length > 10

  function openPicker(field: PickerField) {
    setPicker(field)
  }

  function pickerOptions(): { label: string; value: string }[] {
    if (picker === 'year') return YEARS.map((y) => ({ label: String(y), value: String(y) }))
    if (picker === 'make') return VEHICLE_MAKES.map((m) => ({ label: m.name, value: m.name }))
    if (picker === 'model') return models.map((m) => ({ label: m, value: m }))
    return []
  }

  function handlePick(value: string) {
    if (picker === 'year') setYear(value)
    if (picker === 'make') { setMake(value); setModel('') }
    if (picker === 'model') setModel(value)
    setPicker(null)
  }

  async function handleDiagnose() {
    if (!canSubmit) return
    setLoading(true)
    // Local diagnostic engine — works fully offline.
    setTimeout(() => {
      const result = getDiagnosticResult(problem, make, model, year)
      setLoading(false)
      navigation.navigate('Result', { result, vehicle: { year, make, model } })
    }, 600)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, paddingBottom: 48 }}>
      <Text style={styles.heading}>Select Your Vehicle</Text>
      <Text style={styles.sub}>All makes and models supported</Text>

      <SelectRow label="Year" value={year} placeholder="Select Year" onPress={() => openPicker('year')} />
      <SelectRow label="Make" value={make} placeholder="Select Make" onPress={() => openPicker('make')} />
      <SelectRow label="Model" value={model} placeholder={make ? 'Select Model' : 'Select make first'} disabled={!make} onPress={() => openPicker('model')} />

      <Text style={[styles.heading, { marginTop: 28 }]}>Describe the Problem</Text>
      <Text style={styles.sub}>The more detail, the better the diagnosis</Text>

      <View style={styles.chipRow}>
        {EXAMPLES.map((ex) => (
          <TouchableOpacity key={ex} style={styles.chip} onPress={() => setProblem(ex)}>
            <Text style={styles.chipText}>{ex}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.textArea}
        placeholder="E.g. My car makes a grinding noise when braking, especially at highway speeds. Started about a week ago..."
        placeholderTextColor="#94a3b8"
        multiline
        numberOfLines={5}
        value={problem}
        onChangeText={setProblem}
        textAlignVertical="top"
      />
      <Text style={styles.charCount}>{problem.length} characters</Text>

      <TouchableOpacity
        style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
        onPress={handleDiagnose}
        disabled={!canSubmit || loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Get Diagnosis</Text>}
      </TouchableOpacity>

      {/* Picker modal */}
      <Modal visible={picker !== null} animationType="slide" transparent onRequestClose={() => setPicker(null)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setPicker(null)}>
          <Pressable style={styles.modalSheet}>
            <Text style={styles.modalTitle}>
              {picker === 'year' ? 'Select Year' : picker === 'make' ? 'Select Make' : 'Select Model'}
            </Text>
            <FlatList
              data={pickerOptions()}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => handlePick(item.value)}>
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              style={{ maxHeight: 420 }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  )
}

function SelectRow({
  label, value, placeholder, onPress, disabled,
}: { label: string; value: string; placeholder: string; onPress: () => void; disabled?: boolean }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TouchableOpacity style={[styles.select, disabled && styles.selectDisabled]} onPress={onPress} disabled={disabled}>
        <Text style={[styles.selectText, !value && styles.selectPlaceholder]}>{value || placeholder}</Text>
        <Text style={styles.selectChevron}>▾</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  heading: { fontSize: 20, fontWeight: '700', color: '#1e293b' },
  sub: { fontSize: 13, color: '#64748b', marginTop: 2, marginBottom: 16 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 6 },
  select: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 13,
  },
  selectDisabled: { opacity: 0.5 },
  selectText: { fontSize: 15, color: '#1e293b' },
  selectPlaceholder: { color: '#94a3b8' },
  selectChevron: { color: '#64748b', fontSize: 14 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  chip: { backgroundColor: '#eef2f7', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: '#e2e8f0' },
  chipText: { fontSize: 12, color: '#475569' },
  textArea: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, padding: 14,
    fontSize: 15, color: '#1e293b', minHeight: 120,
  },
  charCount: { fontSize: 12, color: '#94a3b8', marginTop: 6, marginBottom: 18 },
  submitButton: { backgroundColor: '#2563eb', paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  submitButtonDisabled: { backgroundColor: '#cbd5e1' },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 32 },
  modalTitle: { fontSize: 17, fontWeight: '700', color: '#1e293b', marginBottom: 12 },
  modalItem: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  modalItemText: { fontSize: 16, color: '#334155' },
})
