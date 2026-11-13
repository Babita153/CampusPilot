import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/theme';
export function StatCard({ label, value, tint = COLORS.softBlue }: { label: string; value: number | string; tint?: string }) {
  return <View style={[styles.card, { backgroundColor: tint }]}><Text style={styles.value}>{value}</Text><Text style={styles.label}>{label}</Text></View>;
}
const styles = StyleSheet.create({ card: { flex: 1, minWidth: 105, borderRadius: 16, padding: 16 }, value: { fontSize: 25, fontWeight: '800', color: COLORS.text }, label: { color: COLORS.muted, fontSize: 12, marginTop: 5, fontWeight: '600' } });
