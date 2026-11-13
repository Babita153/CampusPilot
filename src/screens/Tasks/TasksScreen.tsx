import React, { useMemo, useState } from 'react';
import {Alert,Pressable,ScrollView,StyleSheet,Text,View} from 'react-native';

import { Screen } from '../../components/Screen';
import { SectionTitle } from '../../components/SectionTitle';
import { PrimaryButton } from '../../components/PrimaryButton';
import { FormModal } from '../../components/FormModal';
import { TextField } from '../../components/TextField';
import { useApp } from '../../hooks/useApp';
import { TaskPriority } from '../../types';
import { COLORS } from '../../constants/theme';
import { formatDate, isOverdue, todayISO } from '../../utils/helpers';

const priorities: TaskPriority[] = ['Low', 'Medium', 'High'];

const priorityColors: Record<TaskPriority, string> = {
  Low: '#16845B',
  Medium: '#B7791F',
  High: '#C24141',
};

const priorityBackgrounds: Record<TaskPriority, string> = {
  Low: '#EAF7F0',
  Medium: '#FFF7E8',
  High: '#FFF0F0',
};

export function TasksScreen() {
  const { data, addTask, toggleTask, deleteTask } = useApp();

  const [filter, setFilter] = useState<
    'All' | 'Pending' | 'Completed'
  >('All');

  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(todayISO());
  const [priority, setPriority] = useState<TaskPriority>('Medium');

  const total = data.tasks.length;
  const completed = data.tasks.filter(t => t.completed).length;
  const pending = total - completed;

  const overdue = data.tasks.filter(
    t => isOverdue(t.dueDate, t.completed)
  ).length;

  const tasks = useMemo(
    () =>
      data.tasks.filter(
        t =>
          filter === 'All' ||
          (filter === 'Completed' ? t.completed : !t.completed)
      ),
    [data.tasks, filter]
  );

  const resetForm = () => {
    setTitle('');
    setDueDate(todayISO());
    setPriority('Medium');
  };

  const save = () => {
    if (!title.trim()) {
      return Alert.alert(
        'Task title required',
        'Enter a short name for your task.'
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
      return Alert.alert(
        'Invalid date',
        'Use YYYY-MM-DD format.'
      );
    }

    addTask({
      title: title.trim(),
      dueDate,
      priority,
    });

    resetForm();
    setVisible(false);
  };

  const confirmDelete = (id: string) => {
    Alert.alert(
      'Delete task?',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTask(id),
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
          <View>
            <Text style={styles.eyebrow}>TASK MANAGEMENT</Text>
            <Text style={styles.heading}>My Tasks</Text>
            <Text style={styles.subtitle}>
              Organise your work and stay on track.
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>✓</Text>
          </View>
        </View>

        {/* TASK SUMMARY */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{total}</Text>
            <Text style={styles.summaryLabel}>Total tasks</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{pending}</Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{completed}</Text>
            <Text style={styles.summaryLabel}>Completed</Text>
          </View>
        </View>

        {/* PROGRESS */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>
              Overall progress
            </Text>
            <Text style={styles.progressPercent}>
              {total ? Math.round((completed / total) * 100) : 0}%
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${
                    total ? (completed / total) * 100 : 0
                  }%`,
                },
              ]}
            />
          </View>

          <Text style={styles.progressSubtitle}>
            {completed} of {total} tasks completed
          </Text>
        </View>

        {/* ADD TASK */}
        <View style={styles.addCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.addTitle}>
              Plan your next task
            </Text>
            <Text style={styles.addSubtitle}>
              Add something you want to accomplish.
            </Text>
          </View>

          <Pressable
            style={styles.addButton}
            onPress={() => setVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </Pressable>
        </View>

        {/* TASK FILTERS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your tasks</Text>
          <Text style={styles.taskCount}>
            {tasks.length} items
          </Text>
        </View>

        <View style={styles.filters}>
          {(['All', 'Pending', 'Completed'] as const).map(f => {
            const count =
              f === 'All'
                ? total
                : f === 'Pending'
                  ? pending
                  : completed;

            return (
              <Pressable
                key={f}
                onPress={() => setFilter(f)}
                style={[
                  styles.filter,
                  filter === f && styles.activeFilter,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    filter === f && styles.activeFilterText,
                  ]}
                >
                  {f}
                </Text>

                <View
                  style={[
                    styles.filterCount,
                    filter === f && styles.activeFilterCount,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterCountText,
                      filter === f && styles.activeFilterText,
                    ]}
                  >
                    {count}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* OVERDUE INFO */}
        {filter !== 'Completed' && overdue > 0 && (
          <View style={styles.overdueBanner}>
            <Text style={styles.overdueIcon}>!</Text>
            <Text style={styles.overdueBannerText}>
              You have {overdue} overdue task{overdue > 1 ? 's' : ''}.
              Review your deadlines.
            </Text>
          </View>
        )}

        {/* TASK LIST */}
        {tasks.map(task => {
          const isLate = isOverdue(task.dueDate, task.completed);

          return (
            <View
              key={task.id}
              style={[
                styles.taskCard,
                task.completed && styles.completedCard,
              ]}
            >
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: task.completed }}
                onPress={() => toggleTask(task.id)}
                style={[
                  styles.checkbox,
                  task.completed && styles.checkboxChecked,
                ]}
              >
                <Text style={styles.checkboxText}>
                  {task.completed ? '✓' : ''}
                </Text>
              </Pressable>

              <View style={styles.taskContent}>
                <Text
                  style={[
                    styles.taskTitle,
                    task.completed && styles.completedTitle,
                  ]}
                >
                  {task.title}
                </Text>

                <View style={styles.taskMeta}>
                  <Text style={styles.metaText}>
                    Due {formatDate(task.dueDate)}
                  </Text>

                  <View style={styles.metaDot} />

                  <View
                    style={[
                      styles.priorityBadge,
                      {
                        backgroundColor:
                          priorityBackgrounds[task.priority],
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.priorityText,
                        {
                          color: priorityColors[task.priority],
                        },
                      ]}
                    >
                      {task.priority}
                    </Text>
                  </View>
                </View>

                {isLate && (
                  <Text style={styles.overdueText}>
                    Overdue
                  </Text>
                )}

                {task.completed && (
                  <Text style={styles.completedLabel}>
                    Completed
                  </Text>
                )}
              </View>

              <Pressable
                onPress={() => confirmDelete(task.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteText}>✕</Text>
              </Pressable>
            </View>
          );
        })}

        {/* EMPTY STATE */}
        {tasks.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>
              {filter === 'Completed' ? '✓' : '—'}
            </Text>

            <Text style={styles.emptyTitle}>
              {filter === 'Completed'
                ? 'No completed tasks'
                : filter === 'Pending'
                  ? 'All caught up!'
                  : 'No tasks created yet'}
            </Text>

            <Text style={styles.emptySubtitle}>
              {filter === 'Completed'
                ? 'Completed tasks will appear here.'
                : filter === 'Pending'
                  ? 'You have no pending tasks at the moment.'
                  : 'Add your first task to start organising your day.'}
            </Text>
          </View>
        )}

        <View style={{ height: 25 }} />

      </ScrollView>

      {/* ADD TASK MODAL */}
      <FormModal
        visible={visible}
        title="Create a new task"
        onClose={() => setVisible(false)}
      >
        <TextField
          label="Task name *"
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. Practice JavaScript"
        />

        <TextField
          label="Due date (YYYY-MM-DD)"
          value={dueDate}
          onChangeText={setDueDate}
          placeholder="2026-11-20"
        />

        <Text style={styles.modalLabel}>Priority level</Text>

        <View style={styles.priorityRow}>
          {priorities.map(p => (
            <Pressable
              key={p}
              onPress={() => setPriority(p)}
              style={[
                styles.priorityOption,
                priority === p && {
                  backgroundColor: priorityBackgrounds[p],
                  borderColor: priorityColors[p],
                },
              ]}
            >
              <Text
                style={[
                  styles.priorityOptionText,
                  priority === p && {
                    color: priorityColors[p],
                    fontWeight: '800',
                  },
                ]}
              >
                {p}
              </Text>
            </Pressable>
          ))}
        </View>

        <PrimaryButton
          title="Save task"
          onPress={save}
        />
      </FormModal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 22,
  },

  eyebrow: {
    fontSize: 10,
    letterSpacing: 1.4,
    color: COLORS.primary,
    fontWeight: '900',
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

  headerIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: COLORS.softBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerIconText: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: '900',
  },

  summaryContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  summaryNumber: {
    fontSize: 23,
    fontWeight: '900',
    color: COLORS.text,
  },

  summaryLabel: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 5,
    fontWeight: '600',
  },

  progressCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 17,
    marginBottom: 15,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  progressTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
  },

  progressPercent: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
  },

  progressTrack: {
    height: 8,
    backgroundColor: '#EEF0F5',
    borderRadius: 10,
    marginTop: 14,
    overflow: 'hidden',
  },

  progressFill: {
    height: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },

  progressSubtitle: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 9,
  },

  addCard: {
    backgroundColor: COLORS.softBlue,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 23,
  },

  addTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.text,
  },

  addSubtitle: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 4,
  },

  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.text,
  },

  taskCount: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '700',
  },

  filters: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    marginBottom: 12,
  },

  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 9,
    backgroundColor: '#F1F2F6',
  },

  activeFilter: {
    backgroundColor: COLORS.softBlue,
  },

  filterText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.muted,
  },

  activeFilterText: {
    color: COLORS.primary,
  },

  filterCount: {
    minWidth: 18,
    height: 18,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },

  activeFilterCount: {
    backgroundColor: '#FFFFFF',
  },

  filterCountText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.muted,
  },

  overdueBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1F1',
    padding: 11,
    borderRadius: 10,
    marginBottom: 10,
    gap: 9,
  },

  overdueIcon: {
    color: '#C24141',
    fontSize: 15,
    fontWeight: '900',
  },

  overdueBannerText: {
    color: '#C24141',
    fontSize: 11,
    fontWeight: '700',
    flex: 1,
  },

  taskCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  completedCard: {
    backgroundColor: '#FAFBFC',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#BFC5D2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxChecked: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },

  checkboxText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
  },

  taskContent: {
    flex: 1,
  },

  taskTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.text,
  },

  completedTitle: {
    textDecorationLine: 'line-through',
    color: COLORS.muted,
  },

  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 7,
    flexWrap: 'wrap',
  },

  metaText: {
    fontSize: 10,
    color: COLORS.muted,
  },

  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#B6BAC6',
  },

  priorityBadge: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
  },

  priorityText: {
    fontSize: 9,
    fontWeight: '800',
  },

  overdueText: {
    fontSize: 10,
    color: '#C24141',
    fontWeight: '800',
    marginTop: 6,
  },

  completedLabel: {
    fontSize: 10,
    color: '#16845B',
    fontWeight: '800',
    marginTop: 6,
  },

  deleteButton: {
    padding: 7,
    borderRadius: 8,
    backgroundColor: '#FFF1F1',
  },

  deleteText: {
    color: '#C24141',
    fontSize: 13,
    fontWeight: '800',
  },

  emptyContainer: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 5,
  },

  emptyIcon: {
    fontSize: 30,
    color: COLORS.primary,
    fontWeight: '800',
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 12,
  },

  emptySubtitle: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 18,
  },

  modalLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 9,
  },

  priorityRow: {
    flexDirection: 'row',
    gap: 9,
    marginBottom: 18,
  },

  priorityOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F4F5F8',
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },

  priorityOptionText: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '700',
  },
});
