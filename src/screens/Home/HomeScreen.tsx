
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Screen } from '../../components/Screen';
import { SectionTitle } from '../../components/SectionTitle';
import { StatCard } from '../../components/StatCard';
import { useApp } from '../../hooks/useApp';
import { COLORS } from '../../constants/theme';
import { formatDate, isOverdue } from '../../utils/helpers';

const STATUS_COLORS: Record<string, string> = {
  Applied: '#2563EB',
  Interview: '#B7791F',
  Offer: '#16845B',
  Rejected: '#C24141',
};

const STATUS_BG: Record<string, string> = {
  Applied: '#EFF5FF',
  Interview: '#FFF7E8',
  Offer: '#EAF7F0',
  Rejected: '#FFF0F0',
};

export function HomeScreen() {
  const { data, loading, error } = useApp();

  const completed = data.tasks.filter(t => t.completed).length;
  const pending = data.tasks.length - completed;

  const interviews = data.applications.filter(
    a => a.status === 'Interview'
  ).length;

  const overdue = data.tasks.filter(
    t => isOverdue(t.dueDate, t.completed)
  ).length;

  const progress = data.tasks.length
    ? (completed / data.tasks.length) * 100
    : 0;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.muted}>Loading workspace...</Text>
      </View>
    );
  }

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>WORKSPACE</Text>
            <Text style={styles.heading}>Dashboard</Text>
            <Text style={styles.sub}>
              Here's what's happening with your work.
            </Text>
          </View>

          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>W</Text>
          </View>
        </View>

        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.error}>{error}</Text>
          </View>
        ) : null}

        {/* OVERVIEW */}
        <SectionTitle
          title="Overview"
          subtitle="Your activity at a glance"
        />

        <View style={styles.stats}>
          <StatCard
            label="Total tasks"
            value={data.tasks.length}
          />

          <StatCard
            label="Completed"
            value={completed}
            tint={COLORS.softGreen}
          />
        </View>

        <View style={styles.stats}>
          <StatCard
            label="Applications"
            value={data.applications.length}
            tint={COLORS.softOrange}
          />

          <StatCard
            label="Interviews"
            value={interviews}
            tint="#F0EAFE"
          />
        </View>

        {/* TASK PROGRESS */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.cardTitle}>Task completion</Text>
              <Text style={styles.cardSubtitle}>
                Your overall productivity
              </Text>
            </View>

            <Text style={styles.percentage}>
              {Math.round(progress)}%
            </Text>
          </View>

          <View style={styles.track}>
            <View
              style={[
                styles.fill,
                { width: `${progress}%` },
              ]}
            />
          </View>

          <View style={styles.progressFooter}>
            <Text style={styles.progressLabel}>
              {completed} completed
            </Text>

            <Text style={styles.progressLabel}>
              {pending} remaining
            </Text>
          </View>
        </View>

        {/* FOCUS SECTION */}
        <SectionTitle
          title="Needs attention"
          subtitle="A quick check of your pending work"
        />

        <View style={styles.attentionCard}>
          <View style={styles.attentionRow}>
            <View style={[styles.attentionIcon, { backgroundColor: '#FFF5E8' }]}>
              <Text style={styles.iconText}>!</Text>
            </View>

            <View style={styles.attentionContent}>
              <Text style={styles.attentionTitle}>
                Pending tasks
              </Text>
              <Text style={styles.attentionSubtitle}>
                Tasks waiting to be completed
              </Text>
            </View>

            <Text style={styles.attentionCount}>{pending}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.attentionRow}>
            <View style={[styles.attentionIcon, { backgroundColor: '#FFF0F0' }]}>
              <Text style={[styles.iconText, { color: '#C24141' }]}>◷</Text>
            </View>

            <View style={styles.attentionContent}>
              <Text style={styles.attentionTitle}>
                Overdue tasks
              </Text>
              <Text style={styles.attentionSubtitle}>
                Tasks past their due date
              </Text>
            </View>

            <Text
              style={[
                styles.attentionCount,
                overdue > 0 && { color: '#C24141' },
              ]}
            >
              {overdue}
            </Text>
          </View>
        </View>

        {/* RECENT APPLICATIONS */}
        <View style={styles.recentHeader}>
          <SectionTitle
            title="Recent applications"
            subtitle="Your latest job opportunities"
          />
          <Text style={styles.recentCount}>
            {data.applications.length}
          </Text>
        </View>

        <View style={styles.applicationCard}>
          {data.applications.slice(0, 4).map((a, index) => (
            <View key={a.id}>
              <View style={styles.application}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {a.company.slice(0, 1).toUpperCase()}
                  </Text>
                </View>

                <View style={styles.applicationInfo}>
                  <Text style={styles.applicationRole}>
                    {a.role}
                  </Text>

                  <Text style={styles.applicationCompany}>
                    {a.company}
                  </Text>

                  <Text style={styles.applicationDate}>
                    Applied {formatDate(a.appliedDate)}
                  </Text>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        STATUS_BG[a.status] || '#F1F3F7',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          STATUS_COLORS[a.status] || COLORS.muted,
                      },
                    ]}
                  >
                    {a.status}
                  </Text>
                </View>
              </View>

              {index !== Math.min(data.applications.length, 4) - 1 && (
                <View style={styles.separator} />
              )}
            </View>
          ))}

          {data.applications.length === 0 && (
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>
                No applications yet
              </Text>
              <Text style={styles.emptySubtitle}>
                Your tracked job applications will appear here.
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.footer}>
          Stay organised. Keep making progress.
        </Text>

      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    gap: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 25,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: COLORS.primary,
  },

  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 7,
    letterSpacing: -0.7,
  },

  sub: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 5,
  },

  profileIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: COLORS.softBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileInitial: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.primary,
  },

  errorBox: {
    backgroundColor: '#FFF0F0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  error: {
    color: COLORS.danger,
    fontSize: 12,
  },

  stats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },

  progressCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    marginTop: 13,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
  },

  cardSubtitle: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 5,
  },

  percentage: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
  },

  track: {
    height: 8,
    backgroundColor: '#EEF0F5',
    borderRadius: 10,
    marginTop: 19,
    overflow: 'hidden',
  },

  fill: {
    height: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },

  progressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 11,
  },

  progressLabel: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '600',
  },

  attentionCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 12,
    marginBottom: 13,
  },

  attentionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },

  attentionIcon: {
    width: 37,
    height: 37,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  iconText: {
    fontSize: 19,
    fontWeight: '900',
    color: '#B7791F',
  },

  attentionContent: {
    flex: 1,
  },

  attentionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.text,
  },

  attentionSubtitle: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 4,
  },

  attentionCount: {
    fontSize: 19,
    fontWeight: '900',
    color: COLORS.text,
  },

  separator: {
    height: 1,
    backgroundColor: COLORS.border,
  },

  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  recentCount: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '700',
  },

  applicationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  application: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    gap: 10,
  },

  avatar: {
    width: 41,
    height: 41,
    borderRadius: 12,
    backgroundColor: COLORS.softBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.primary,
  },

  applicationInfo: {
    flex: 1,
  },

  applicationRole: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.text,
  },

  applicationCompany: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 4,
  },

  applicationDate: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 4,
  },

  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 7,
  },

  statusText: {
    fontSize: 9,
    fontWeight: '800',
  },

  empty: {
    alignItems: 'center',
    paddingVertical: 27,
  },

  emptyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
  },

  emptySubtitle: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 6,
    textAlign: 'center',
  },

  muted: {
    color: COLORS.muted,
    fontSize: 12,
  },

  footer: {
    textAlign: 'center',
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 22,
  },
});
