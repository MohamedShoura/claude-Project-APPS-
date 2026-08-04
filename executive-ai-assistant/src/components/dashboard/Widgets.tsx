import { format } from "date-fns";
import { Cloud, Sun, CloudRain, Wind } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNow } from "@/lib/useNow";

/** A large live clock widget. */
export function ClockWidget() {
  const now = useNow();
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col items-center justify-center gap-1 p-5 text-center">
        <p className="tabular text-4xl font-bold tracking-tight">{format(now, "h:mm")}</p>
        <p className="tabular text-sm font-medium text-muted-foreground">
          {format(now, "ss")}s · {format(now, "a")}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{format(now, "EEEE, MMMM d")}</p>
      </CardContent>
    </Card>
  );
}

/** A placeholder weather widget (static sample — a real API can drop in here). */
export function WeatherWidget() {
  return (
    <Card className="h-full overflow-hidden">
      <CardContent className="relative flex h-full flex-col justify-between p-5">
        <div className="absolute -right-4 -top-4 text-warning/20">
          <Sun className="h-24 w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Sun className="h-5 w-5 text-warning" />
          <span className="text-sm font-medium">Dubai</span>
        </div>
        <div>
          <p className="tabular text-3xl font-bold">34°</p>
          <p className="text-xs text-muted-foreground">Sunny · feels like 38°</p>
        </div>
        <div className="flex gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Wind className="h-3 w-3" /> 12 km/h
          </span>
          <span className="inline-flex items-center gap-1">
            <CloudRain className="h-3 w-3" /> 0%
          </span>
          <span className="inline-flex items-center gap-1">
            <Cloud className="h-3 w-3" /> 10%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
