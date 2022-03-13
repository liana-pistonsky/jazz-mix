import { useState, useMemo, useCallback } from 'react';
import { SectionList, StyleSheet, SectionBase, ListRenderItem, View as RNView, SectionListRenderItem } from 'react-native';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { RootTabScreenProps } from '../types';

type TimetableItem = {
  id: number;
  name: string;
  color: string;
  date: string;
  time: string;
  room: string;
  tutor: string;
}

interface Section extends SectionBase<TimetableItem> {
  date: string;
}

const fakeTimetable: TimetableItem[] = [
  {
    id: 1,
    name: 'Pole Dance',
    color: '#A9FF8B',
    date: 'Понедельник, 25 мая',
    time: '10:30',
    room: '3A',
    tutor: 'Александр Сергеевич Пистонский',
  },
  {
    id: 2,
    name: 'Twerk',
    color: '#FF8383',
    date: 'Понедельник, 25 мая',
    time: '12:40',
    room: '4C',
    tutor: 'Светлана Сергеевна Лопаткина',
  },
  {
    id: 3,
    name: 'Pole Dance',
    color: '#A9FF8B',
    date: 'Вторник, 26 мая',
    time: '10:30',
    room: '3A',
    tutor: 'Александр Сергеевич Пистонский',
  },
  {
    id: 4,
    name: 'Twerk',
    color: '#FF8383',
    date: 'Вторник, 26 мая',
    time: '12:40',
    room: '4C',
    tutor: 'Светлана Сергеевна Лопаткина',
  },
]

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [data, setData] = useState<TimetableItem[]>(fakeTimetable);

  const renderItem: ListRenderItem<TimetableItem> = useCallback(({ item }) => (
    <View style={styles.card} lightColor={Colors.light.cardBackground} darkColor={Colors.dark.cardBackground}>
      <View style={styles.colorStripe} lightColor={item.color} darkColor={item.color} />
      <RNView style={styles.content}>
        <Text style={styles.h3}>{item.name}</Text>
        <RNView style={styles.mainInfo}>
          <Text style={styles.h2}>{item.time}</Text>
          <Text style={styles.h2}>{item.room}</Text>
        </RNView>
        <Text style={styles.body}>{item.tutor}</Text>
      </RNView>
    </View>
  ), []);

  const renderSectionHeader = useCallback((info: { section: Section }) => (
    <RNView style={styles.dateContainer}>
      <Text style={styles.h3}>{info.section.date}</Text>
    </RNView>
  ), []);

  const sections = useMemo(() => {
    const result: Section[] = [];
    let currentDate: string | undefined;
    let currentItems: TimetableItem[] = [];
    data.forEach((item) => {
      const { date } = item;
      if (date === currentDate) {
        currentItems.push(item);
      } else if (currentDate === undefined) {
        currentItems.push(item);
        currentDate = date;
      } else {
        result.push({
          key: currentDate,
          date: currentDate,
          data: currentItems,
        });
        currentDate = date;
        currentItems = [item];
      }
    });
    if (currentDate !== undefined) {
      result.push({
        key: currentDate,
        date: currentDate,
        data: currentItems,
      });
    }
    return result;
  }, [data]);

  return (
    <SectionList<TimetableItem> style={styles.container} sections={sections} renderItem={renderItem} renderSectionHeader={renderSectionHeader} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    marginTop: 16,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  colorStripe: {
    width: 8,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingLeft: 10,
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700',
  },
  h3: {
    fontSize: 14,
    fontWeight: '500',
  },
  body: {
    opacity: 0.5,
    fontSize: 12,
  },
  dateContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  }
});
