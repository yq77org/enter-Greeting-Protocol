import YearCalendar from "@/components/YearCalendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Download, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">2026 年历22222</h1>
              <p className="text-sm text-muted-foreground">全年日历一览</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="w-9 h-9"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button onClick={handlePrint} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">打印</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto">
        <YearCalendar />
      </main>

      <footer className="mt-8 py-6 text-center text-sm text-muted-foreground border-t">
        <p>© 2026 年历 - 为您提供全年日历查看</p>
      </footer>
    </div>
  );
};

export default Index;
