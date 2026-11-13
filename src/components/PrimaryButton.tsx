import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants/theme';

export function PrimaryButton({ title, onPress, loading = false, disabled = false }: { title: string; onPress: () => void; loading?: boolean; disabled?: boolean }) {
  return( 
  <Pressable accessibilityRole="button" disabled={disabled || loading} onPress={onPress} style={({ pressed }) => [styles.button, (disabled || loading) && styles.disabled, pressed && styles.pressed]}>
    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
  </Pressable>
  );
}
const styles = StyleSheet.create({ button: { backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 14, alignItems: 'center' }, text: { color: '#fff', fontSize: 15, fontWeight: '700' }, disabled: { opacity: .55 }, pressed: { transform: [{ scale: .99 }] } });
