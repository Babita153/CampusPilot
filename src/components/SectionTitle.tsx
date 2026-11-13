import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/theme';
export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}
const styles = StyleSheet.create({ wrap: { marginBottom: 14 }, title: { fontSize: 21, fontWeight: '800', color: COLORS.text }, subtitle: { color: COLORS.muted, marginTop: 4, fontSize: 13 } });
