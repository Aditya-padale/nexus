'use client';

import React, { useState } from 'react';
import {
    format,
    subMonths,
    addMonths,
    startOfWeek,
    addDays,
    isSameDay,
    lastDayOfWeek,
    getWeek,
    addWeeks,
    startOfMonth,
    endOfMonth,
    isSameMonth,
    eachDayOfInterval
} from 'date-fns';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Lecture = {
    id: string;
    title: string;
    description: string;
    time: string;
    type: 'lecture' | 'workshop' | 'event';
};

type DayData = {
    date: Date;
    lectures: Lecture[];
};

// Generate dummy data: 2 lectures per week for the current month and adjacent months
const generateDummyData = (date: Date): Record<string, Lecture[]> => {
    const data: Record<string, Lecture[]> = {};
    const start = startOfWeek(startOfMonth(subMonths(date, 1)));
    const end = lastDayOfWeek(endOfMonth(addMonths(date, 1)));

    const days = eachDayOfInterval({ start, end });

    // Lecture topics pool
    const topics = [
        'Web Development Fundamentals',
        'React Hooks Deep Dive',
        'CSS Grid & Flexbox Mastery',
        'Introduction to TypeScript',
        'Node.js & Express Basics',
        'Building RESTful APIs',
        'Database Design with SQL',
        'Deployment Strategies with Docker',
        'Next.js 14 Features',
        'State Management Patterns',
        'UI/UX Design Principles',
        'Accessibility in Web Apps'
    ];

    let weekNumber = 0;
    let lastWeek = -1;

    days.forEach((day) => {
        const currentWeek = getWeek(day);
        if (currentWeek !== lastWeek) {
            weekNumber++;
            lastWeek = currentWeek;
        }

        const dayOfWeek = day.getDay();
        const dateKey = format(day, 'yyyy-MM-dd');

        // Add lectures on Tuesday (2) and Thursday (4)
        if (dayOfWeek === 2 || dayOfWeek === 4) {
            // Pick a random topic based on the date to stay consistent
            const topicIndex = (day.getDate() + day.getMonth()) % topics.length;

            data[dateKey] = [
                {
                    id: `lec-${dateKey}-1`,
                    title: topics[topicIndex],
                    description: 'Join us for an in-depth session on modern web technologies. Bring your laptop!',
                    time: dayOfWeek === 2 ? '18:00 - 20:00' : '19:00 - 21:00',
                    type: 'lecture'
                }
            ];
        }
    });

    return data;
};

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Memoize data generation or move outside if static, but for now generating based on current view
    // In a real app, this would be fetched
    const [events] = useState(() => generateDummyData(new Date()));

    const changeMonth = (btnType: 'prev' | 'next') => {
        if (btnType === 'prev') {
            setCurrentMonth(subMonths(currentMonth, 1));
        }
        if (btnType === 'next') {
            setCurrentMonth(addMonths(currentMonth, 1));
        }
        setSelectedDate(null);
    };

    const onDateClick = (day: Date) => {
        setSelectedDate(day);
    };

    const renderHeader = () => {
        const dateFormat = 'MMMM yyyy';
        return (
            <div className="flex items-center justify-between py-6 px-4">
                <div className="text-3xl font-bold tracking-tight text-white">
                    {format(currentMonth, dateFormat)}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => changeMonth('prev')}
                        className="rounded-full border border-zinc-700 bg-zinc-800/50 p-2 text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
                        aria-label="Previous month"
                    >
                        <ChevronLeft className="size-5" />
                    </button>
                    <button
                        onClick={() => changeMonth('next')}
                        className="rounded-full border border-zinc-700 bg-zinc-800/50 p-2 text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
                        aria-label="Next month"
                    >
                        <ChevronRight className="size-5" />
                    </button>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const days = [];
        const dateFormat = 'EEEE';
        const startDate = startOfWeek(currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="py-3 text-center text-sm font-semibold uppercase tracking-wider text-zinc-500" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="grid grid-cols-7 border-b border-zinc-800">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = lastDayOfWeek(monthEnd);

        const dateFormat = 'd';
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = '';

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;

                const dateKey = format(day, 'yyyy-MM-dd');
                const dayEvents = events[dateKey] || [];
                const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
                const isToday = isSameDay(day, new Date());
                const isCurrentMonth = isSameMonth(day, monthStart);

                days.push(
                    <motion.div
                        key={day.toString()}
                        layoutId={`day-${day.toString()}`}
                        className={`group relative flex min-h-[140px] cursor-pointer flex-col border-b border-r border-zinc-800 p-3 transition-colors hover:bg-zinc-900/50
                            ${!isCurrentMonth ? 'bg-zinc-900/20 text-zinc-600' : 'text-zinc-300'}
                            ${isSelected ? 'bg-zinc-800 !border-zinc-700 z-10' : ''}
                        `}
                        onClick={() => onDateClick(cloneDay)}
                    >
                        <div className="flex items-center justify-between">
                            <span className={`flex size-8 items-center justify-center rounded-full text-sm font-bold
                                ${isToday ? 'bg-blue-600 text-white' : ''}
                                ${isSelected && !isToday ? 'bg-zinc-700 text-white' : ''}
                            `}>
                                {formattedDate}
                            </span>
                        </div>

                        <div className="mt-2 flex flex-col gap-1.5 overflow-y-auto max-h-[100px] scrollbar-hide">
                            {dayEvents.map((event) => (
                                <div key={event.id}
                                    className={`
                                        rounded px-2 py-1.5 text-xs font-medium border
                                        ${event.type === 'lecture'
                                            ? 'bg-blue-500/10 text-blue-300 border-blue-500/20 group-hover:border-blue-500/40'
                                            : 'bg-purple-500/10 text-purple-300 border-purple-500/20'}
                                    `}>
                                    <span className="block truncate">{event.time}</span>
                                    <span className="block truncate font-semibold">{event.title}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="grid grid-cols-7" key={day.toString()}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="border-l border-t border-zinc-800 bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden">{rows}</div>;
    };

    const renderDetails = () => {
        if (!selectedDate) return null;

        const dateKey = format(selectedDate, 'yyyy-MM-dd');
        const dayEvents = events[dateKey] || [];

        return (
            <AnimatePresence>
                {selectedDate && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedDate(null)}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-zinc-950 border-l border-zinc-800 p-6 shadow-2xl overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-8 sticky top-0 bg-zinc-950 z-10 py-2">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">
                                        {format(selectedDate, 'EEEE')}
                                    </h2>
                                    <p className="text-zinc-400">
                                        {format(selectedDate, 'MMMM d, yyyy')}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedDate(null)}
                                    className="rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
                                >
                                    <X className="size-6" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {dayEvents.length > 0 ? (
                                    dayEvents.map((event) => (
                                        <div key={event.id} className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-zinc-700 hover:bg-zinc-900">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/80" />
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400 uppercase tracking-wide border border-blue-500/20">
                                                    {event.type}
                                                </span>
                                                <span className="text-sm font-mono text-zinc-400">{event.time}</span>
                                            </div>
                                            <h3 className="mb-2 text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{event.title}</h3>
                                            <p className="text-zinc-400 text-sm leading-relaxed">{event.description}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 text-center text-zinc-500">
                                        <div className="mb-4 rounded-full bg-zinc-900 p-4 ring-1 ring-zinc-800">
                                            <span className="text-4xl grayscale opacity-50">📅</span>
                                        </div>
                                        <h3 className="text-lg font-medium text-white mb-2">No events scheduled</h3>
                                        <p className="text-sm max-w-[200px]">Enjoy your free time or catch up on previous lectures!</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        );
    };

    return (
        <div className="relative">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
            {renderDetails()}
        </div>
    );
}
