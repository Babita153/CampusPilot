
import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Screen } from '../../components/Screen';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useApp } from '../../hooks/useApp';
import { COLORS } from '../../constants/theme';

export function ProfileScreen() {
  const { data, resetData } = useApp();

  const completed = data.tasks.filter(
    task => task.completed
  ).length;

  const confirmReset = () => {
    Alert.alert(
      'Clear all app data?',
      'This will permanently remove all tasks and job applications saved on this device.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear data',
          style: 'destructive',
          onPress: resetData,
        },
      ]
    );
  };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>ACCOUNT & SETTINGS</Text>
          <Text style={styles.heading}>Profile</Text>
          <Text style={styles.subtitle}>
            Manage your workspace and app information.
          </Text>
        </View>

        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <View style={styles.profileTop}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>CP</Text>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.name}>CampusPilot User</Text>
              <Text style={styles.email}>
                Personal productivity workspace
              </Text>

              <View style={styles.activeBadge}>
                <View style={styles.activeDot} />
                <Text style={styles.activeText}>
                  Local workspace
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.profileDivider} />

          <Text style={styles.profileDescription}>
            Stay organised, manage your daily tasks and keep
            track of your placement journey with CampusPilot.
          </Text>
        </View>

        {/* WORKSPACE STATISTICS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Workspace overview</Text>
          <Text style={styles.sectionSubtitle}>
            Your current activity
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>☑</Text>
            <Text style={styles.statValue}>
              {data.tasks.length}
            </Text>
            <Text style={styles.statLabel}>Total tasks</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>✓</Text>
            <Text style={styles.statValue}>
              {completed}
            </Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>▤</Text>
            <Text style={styles.statValue}>
              {data.applications.length}
            </Text>
            <Text style={styles.statLabel}>Applications</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>◷</Text>
            <Text style={styles.statValue}>
              {data.tasks.length - completed}
            </Text>
            <Text style={styles.statLabel}>Pending tasks</Text>
          </View>
        </View>

        {/* ABOUT SECTION */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionSubtitle}>
            Application information
          </Text>
        </View>

        <View style={styles.panel}>
          <View style={styles.aboutHeader}>
            <View style={styles.aboutIcon}>
              <Text style={styles.aboutIconText}>CP</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.aboutTitle}>CampusPilot</Text>
              <Text style={styles.aboutSubtitle}>
                Student Productivity & Placement Tracker
              </Text>
            </View>

            <View style={styles.versionBadge}>
              <Text style={styles.versionText}>v1.0.0</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.aboutDescription}>
            CampusPilot helps students organise their daily
            activities, manage tasks and monitor job application
            progress from one place.
          </Text>

          <View style={styles.featureList}>
            <View style={styles.featureRow}>
              <Text style={styles.check}>✓</Text>
              <Text style={styles.featureText}>
                Task management and tracking
              </Text>
            </View>

            <View style={styles.featureRow}>
              <Text style={styles.check}>✓</Text>
              <Text style={styles.featureText}>
                Job application tracking
              </Text>
            </View>

            <View style={styles.featureRow}>
              <Text style={styles.check}>✓</Text>
              <Text style={styles.featureText}>
                Progress overview
              </Text>
            </View>
          </View>
        </View>

        {/* STORAGE INFORMATION */}
        <View style={styles.storageCard}>
          <View style={styles.storageIcon}>
            <Text style={{ fontSize: 19 }}>▣</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.storageTitle}>
              Local data storage
            </Text>
            <Text style={styles.storageDescription}>
              Your tasks and applications are saved locally
              on this device using AsyncStorage.
            </Text>
          </View>
        </View>

        {/* DANGER ZONE */}
        <View style={styles.dangerPanel}>
          <Text style={styles.dangerTitle}>Data management</Text>

          <Text style={styles.dangerDescription}>
            Clear all saved tasks and applications from
            this device. This action cannot be undone.
          </Text>

          <View style={styles.dangerButton}>
            <PrimaryButton
              title="Clear all local data"
              onPress={confirmReset}
            />
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>CampusPilot</Text>
          <Text style={styles.footerText}>
            Made to keep your goals on track.
          </Text>
          <Text style={styles.footerVersion}>
            Application Version 1.0.0
          </Text>
        </View>

      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },

  header: {
    marginTop: 10,
    marginBottom: 22,
  },

  eyebrow: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: COLORS.primary,
    fontWeight: '800',
  },

  heading: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 7,
  },

  subtitle: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 5,
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  avatar: {
    width: 65,
    height: 65,
    borderRadius: 19,
    backgroundColor: COLORS.softBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
  },

  profileInfo: {
    flex: 1,
  },

  name: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.text,
  },

  email: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 5,
  },

  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 8,
    backgroundColor: '#EAF7F0',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
    gap: 5,
  },

  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: '#16845B',
  },

  activeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#16845B',
  },

  profileDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },

  profileDescription: {
    fontSize: 12,
    lineHeight: 19,
    color: COLORS.muted,
  },

  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.text,
  },

  sectionSubtitle: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 4,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 11,
  },

  statCard: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 15,
  },

  statIcon: {
    fontSize: 19,
    color: COLORS.primary,
    marginBottom: 9,
  },

  statValue: {
    fontSize: 23,
    fontWeight: '900',
    color: COLORS.text,
  },

  statLabel: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 4,
  },

  panel: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },

  aboutIcon: {
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: COLORS.softBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  aboutIconText: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.primary,
  },

  aboutTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.text,
  },

  aboutSubtitle: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 4,
  },

  versionBadge: {
    backgroundColor: '#F1F3F7',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 7,
  },

  versionText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.muted,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 15,
  },

  aboutDescription: {
    fontSize: 12,
    color: COLORS.muted,
    lineHeight: 19,
  },

  featureList: {
    marginTop: 15,
    gap: 11,
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  check: {
    color: '#16845B',
    fontSize: 13,
    fontWeight: '900',
  },

  featureText: {
    fontSize: 11,
    color: COLORS.text,
    fontWeight: '600',
  },

  storageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.softBlue,
    padding: 15,
    borderRadius: 14,
    marginTop: 17,
    gap: 12,
  },

  storageIcon: {
    width: 39,
    height: 39,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  storageTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.text,
  },

  storageDescription: {
    fontSize: 10,
    lineHeight: 16,
    color: COLORS.muted,
    marginTop: 4,
  },

  dangerPanel: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0DADA',
    borderRadius: 16,
    padding: 17,
    marginTop: 20,
  },

  dangerTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.text,
  },

  dangerDescription: {
    fontSize: 11,
    lineHeight: 18,
    color: COLORS.muted,
    marginTop: 7,
    marginBottom: 15,
  },

  dangerButton: {
    borderWidth: 1,
    borderColor: '#F1D5D5',
    borderRadius: 11,
    overflow: 'hidden',
  },

  footer: {
    alignItems: 'center',
    marginTop: 27,
  },

  footerTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.text,
  },

  footerText: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 5,
  },

  footerVersion: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 7,
  },
});
