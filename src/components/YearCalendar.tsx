import { Card } from "@/components/ui/card";

interface DayInfo {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
}

const YearCalendar = () => {
  const year = 2026;
  const today = new Date();
  const isToday = (month: number, date: number) => {
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === date
    );
  };

  const getMonthDays = (month: number): DayInfo[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: DayInfo[] = [];

    // Add previous month's days
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      const date = prevMonthLastDay - startingDayOfWeek + i + 1;
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isWeekend: i === 0 || i === 6,
      });
    }

    // Add current month's days
    for (let date = 1; date <= daysInMonth; date++) {
      const dayOfWeek = new Date(year, month, date).getDay();
      days.push({
        date,
        isCurrentMonth: true,
        isToday: isToday(month, date),
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
      });
    }

    // Add next month's days
    const remainingDays = 42 - days.length;
    for (let date = 1; date <= remainingDays; date++) {
      const dayOfWeek = (lastDay.getDay() + date) % 7;
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
      });
    }

    return days;
  };

  const monthNames = [
    "一月", "二月", "三月", "四月", "五月", "六月",
    "七月", "八月", "九月", "十月", "十一月", "十二月"
  ];

  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {monthNames.map((monthName, monthIndex) => (
        <Card key={monthIndex} className="p-4 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-3 text-center text-primary">
            {monthName}
          </h3>
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day, index) => (
              <div
                key={day}
                className={`text-center text-xs font-medium py-1 ${
                  index === 0 || index === 6
                    ? "text-[hsl(var(--weekend))]"
                    : "text-muted-foreground"
                }`}
              >
                {day}
              </div>
            ))}
            {getMonthDays(monthIndex).map((day, index) => (
              <div
                key={index}
                className={`
                  text-center text-sm py-1 rounded-md transition-colors
                  ${!day.isCurrentMonth ? "text-muted-foreground/30" : ""}
                  ${day.isToday
                    ? "bg-[hsl(var(--today))] text-white font-bold"
                    : day.isWeekend && day.isCurrentMonth
                    ? "text-[hsl(var(--weekend))]"
                    : ""
                  }
                  ${day.isCurrentMonth && !day.isToday ? "hover:bg-accent/50" : ""}
                `}
              >
                {day.date}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default YearCalendar;
