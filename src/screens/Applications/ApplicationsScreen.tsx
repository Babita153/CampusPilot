
import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import { Screen } from '../../components/Screen';
import { SectionTitle } from '../../components/SectionTitle';
import { PrimaryButton } from '../../components/PrimaryButton';
import { FormModal } from '../../components/FormModal';
import { TextField } from '../../components/TextField';
import { useApp } from '../../hooks/useApp';
import { ApplicationStatus } from '../../types';
import { COLORS } from '../../constants/theme';
import { formatDate, todayISO } from '../../utils/helpers';

const statuses: ApplicationStatus[] = [
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
];

const statusColors: Record<ApplicationStatus, string> = {
  Applied: '#2563EB',
  Interview: '#D97706',
  Offer: '#059669',
  Rejected: '#DC2626',
};

const statusBackgrounds: Record<ApplicationStatus, string> = {
  Applied: '#EFF6FF',
  Interview: '#FFFBEB',
  Offer: '#ECFDF5',
  Rejected: '#FEF2F2',
};

export function ApplicationsScreen() {
  const {
    data,
    addApplication,
    updateApplicationStatus,
    deleteApplication,
  } = useApp();

  const [visible, setVisible] = useState(false);

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [appliedDate, setAppliedDate] = useState(todayISO());

  const applications = data.applications;

  const offers = applications.filter(a => a.status === 'Offer').length;
  const interviews = applications.filter(a => a.status === 'Interview').length;

  const resetForm = () => {
    setCompany('');
    setRole('');
    setLocation('');
    setAppliedDate(todayISO());
  };

  const save = () => {
    if (!company.trim() || !role.trim()) {
      return Alert.alert(
        'Missing details',
        'Company and role are required.'
      );
    }

    addApplication({
      company: company.trim(),
      role: role.trim(),
      location: location.trim() || 'Not specified',
      appliedDate,
      status: 'Applied',
    });

    resetForm();
    setVisible(false);
  };

  const confirmDelete = (id: string) => {
    Alert.alert(
      'Delete application?',
      'Are you sure you want to remove this application?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteApplication(id),
        },
      ]
    );
  };

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>CAREER MANAGEMENT</Text>
            <Text style={styles.heading}>My Applications</Text>
            <Text style={styles.subtitle}>
              Track your job search journey.
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Text style={{ fontSize: 25 }}>💼</Text>
          </View>
        </View>

        {/* SUMMARY CARDS */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryIcon}>📋</Text>
            <Text style={styles.summaryNumber}>
              {applications.length}
            </Text>
            <Text style={styles.summaryLabel}>Total Applied</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryIcon}>🎯</Text>
            <Text style={styles.summaryNumber}>
              {interviews}
            </Text>
            <Text style={styles.summaryLabel}>Interviews</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryIcon}>🏆</Text>
            <Text style={styles.summaryNumber}>
              {offers}
            </Text>
            <Text style={styles.summaryLabel}>Offers</Text>
          </View>
        </View>

        {/* ADD APPLICATION */}
        <View style={styles.addContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.addTitle}>Your next opportunity awaits!</Text>
            <Text style={styles.addSubtitle}>
              Keep track of every application.
            </Text>
          </View>

          <Pressable
            style={styles.addButton}
            onPress={() => setVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </Pressable>
        </View>

        {/* SECTION TITLE */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Recent Applications</Text>
            <Text style={styles.sectionSubtitle}>
              {applications.length} opportunities tracked
            </Text>
          </View>
        </View>

        {/* APPLICATION LIST */}
        {applications.map(app => (
          <View key={app.id} style={styles.card}>

            <View style={styles.cardHeader}>

              <View style={styles.logo}>
                <Text style={styles.logoText}>
                  {app.company.slice(0, 1).toUpperCase()}
                </Text>
              </View>

              <View style={styles.companyInfo}>
                <Text style={styles.role}>{app.role}</Text>

                <Text style={styles.company}>
                  {app.company}
                </Text>

                <Text style={styles.location}>
                  📍 {app.location}
                </Text>
              </View>

              <Pressable
                onPress={() => confirmDelete(app.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteText}>✕</Text>
              </Pressable>

            </View>

            <View style={styles.divider} />

            {/* DATE */}
            <View style={styles.dateRow}>
              <Text style={styles.dateIcon}>📅</Text>
              <Text style={styles.date}>
                Applied on {formatDate(app.appliedDate)}
              </Text>

              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: statusBackgrounds[app.status],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: statusColors[app.status] },
                  ]}
                >
                  {app.status}
                </Text>
              </View>
            </View>

            {/* STATUS UPDATE */}
            <Text style={styles.statusHeading}>
              UPDATE APPLICATION STATUS
            </Text>

            <View style={styles.statusContainer}>
              {statuses.map(status => (
                <Pressable
                  key={status}
                  onPress={() =>
                    updateApplicationStatus(app.id, status)
                  }
                  style={[
                    styles.statusButton,
                    app.status === status && {
                      backgroundColor: statusBackgrounds[status],
                      borderColor: statusColors[status],
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusButtonText,
                      app.status === status && {
                        color: statusColors[status],
                        fontWeight: '800',
                      },
                    ]}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>

          </View>
        ))}

        {/* EMPTY STATE */}
        {applications.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📂</Text>

            <Text style={styles.emptyTitle}>
              No applications yet
            </Text>

            <Text style={styles.emptySubtitle}>
              Start tracking your job applications
              and manage your career journey in one place.
            </Text>

            <Pressable
              style={styles.emptyButton}
              onPress={() => setVisible(true)}
            >
              <Text style={styles.emptyButtonText}>
                + Track your first application
              </Text>
            </Pressable>
          </View>
        )}

        <View style={{ height: 25 }} />

      </ScrollView>

      {/* ADD APPLICATION MODAL */}
      <FormModal
        visible={visible}
        title="Add New Application"
        onClose={() => setVisible(false)}
      >
        <TextField
          label="Company Name *"
          value={company}
          onChangeText={setCompany}
          placeholder="e.g. Google"
        />

        <TextField
          label="Job Role *"
          value={role}
          onChangeText={setRole}
          placeholder="e.g. React Native Developer"
        />

        <TextField
          label="Location"
          value={location}
          onChangeText={setLocation}
          placeholder="Remote / Mohali"
        />

        <TextField
          label="Applied Date (YYYY-MM-DD)"
          value={appliedDate}
          onChangeText={setAppliedDate}
        />

        <PrimaryButton
          title="Save Application"
          onPress={save}
        />
      </FormModal>

    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 22,
  },

  eyebrow: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: COLORS.primary,
    fontWeight: '900',
  },

  heading: {
    fontSize: 27,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 7,
  },

  subtitle: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 5,
  },

  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: COLORS.softBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  summaryContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },

  summaryIcon: {
    fontSize: 19,
    marginBottom: 7,
  },

  summaryNumber: {
    fontSize: 23,
    fontWeight: '900',
    color: COLORS.text,
  },

  summaryLabel: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 4,
    fontWeight: '600',
  },

  addContainer: {
    backgroundColor: COLORS.softBlue,
    borderRadius: 17,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 10,
  },

  addTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.text,
  },

  addSubtitle: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 5,
  },

  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 11,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  sectionHeader: {
    marginBottom: 5,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.text,
  },

  sectionSubtitle: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 4,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 17,
    marginTop: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },

  logo: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.softBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
  },

  companyInfo: {
    flex: 1,
  },

  role: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.text,
  },

  company: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 4,
  },

  location: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 5,
  },

  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#FFF1F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteText: {
    color: '#E11D48',
    fontSize: 15,
    fontWeight: '800',
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  dateIcon: {
    fontSize: 13,
  },

  date: {
    flex: 1,
    fontSize: 11,
    color: COLORS.muted,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: '900',
  },

  statusHeading: {
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '900',
    color: COLORS.muted,
    marginTop: 18,
    marginBottom: 9,
  },

  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },

  statusButton: {
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 9,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  statusButtonText: {
    fontSize: 10,
    color: COLORS.muted,
    fontWeight: '700',
  },

  emptyContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 30,
    marginTop: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  emptyIcon: {
    fontSize: 42,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.text,
  },

  emptySubtitle: {
    fontSize: 12,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 8,
  },

  emptyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 11,
    marginTop: 18,
  },

  emptyButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
});
