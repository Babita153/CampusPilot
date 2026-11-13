import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { COLORS } from '../constants/theme';
export function TextField({ label, ...props }: TextInputProps & { label: string }) {
  return <View style={styles.wrap}><Text style={styles.label}>{label}</Text><TextInput placeholderTextColor="#A0A5B5" {...props} style={[styles.input, props.style]} /></View>;
}
const styles = StyleSheet.create({ wrap: { marginBottom: 13 }, label: { color: COLORS.text, fontWeight: '700', fontSize: 13, marginBottom: 6 }, input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingHorizontal: 13, paddingVertical: 12, color: COLORS.text, backgroundColor: '#FAFBFD', fontSize: 14 } });
