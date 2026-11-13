import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

import { HomeScreen } from '../screens/Home/HomeScreen';
import { TasksScreen } from '../screens/Tasks/TasksScreen';
import { ApplicationsScreen } from '../screens/Applications/ApplicationsScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';

import { COLORS } from '../constants/theme';
import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const icons: Record<
  keyof MainTabParamList,
  keyof typeof Ionicons.glyphMap
> = {
  Home: 'home-outline',
  Tasks: 'checkbox-outline',
  Applications: 'briefcase-outline',
  Profile: 'person-outline',
};

const activeIcons: Record<
  keyof MainTabParamList,
  keyof typeof Ionicons.glyphMap
> = {
  Home: 'home',
  Tasks: 'checkbox',
  Applications: 'briefcase',
  Profile: 'person',
};

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#9298A7',

        tabBarHideOnKeyboard: true,

        tabBarStyle: styles.tabBar,

        tabBarItemStyle: styles.tabItem,

        tabBarLabelStyle: styles.tabLabel,

        tabBarIcon: ({ focused, color }) => (
          <View
            style={[
              styles.iconContainer,
              focused && styles.activeIconContainer,
            ]}
          >
            <Ionicons
              name={
                focused
                  ? activeIcons[route.name]
                  : icons[route.name]
              }
              size={21}
              color={color}
            />
          </View>
        ),

      })}
    >

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />

      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{ tabBarLabel: 'Tasks' }}
      />

      <Tab.Screen
        name="Applications"
        component={ApplicationsScreen}
        options={{ tabBarLabel: 'Jobs' }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 68,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E9EBF1',
    paddingTop: 5,
    paddingBottom: 5,
    elevation: 8,
  },

  tabItem: {
    paddingVertical: 2,
  },

  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },

  iconContainer: {
    width: 42,
    height: 32,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeIconContainer: {
    backgroundColor: COLORS.softBlue,
  },
});
