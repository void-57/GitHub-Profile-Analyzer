import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Calendar, GitFork, LineChartIcon, Star } from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Skeleton } from "./ui/skeleton";

const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const SafeXAxis = XAxis as unknown as React.FC<any>;
const SafeYAxis = YAxis as unknown as React.FC<any>;

interface PunchCardData {
  day: string;
  hour: number;
  commits: number;
}

interface CommitActivityProps {
  selectedRepo: string;
  username: string;
  repoStats?: {
    stars: number;
    forks: number;
    lastUpdated: string;
    languages: string[];
  };
}

const GitHubCommitActivity = ({
  selectedRepo,
  username,
  repoStats,
}: CommitActivityProps) => {
  const [punchCardData, setPunchCardData] = useState<PunchCardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPunchCardData = async () => {
      if (!selectedRepo) return;

      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://api.github.com/repos/${username}/${selectedRepo}/stats/punch_card`
        );

        if (res.status === 202) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          const retryRes = await fetch(
            `https://api.github.com/repos/${username}/${selectedRepo}/stats/punch_card`
          );
          if (retryRes.ok) {
            const data = await retryRes.json();
            processData(data);
          }
        } else if (res.ok) {
          const data = await res.json();
          processData(data);
        } else {
          throw new Error(`API error: ${res.status}`);
        }
      } catch (err) {
        setError("Failed to load commit activity data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    const processData = (data: any) => {
      if (Array.isArray(data)) {
        const formatted = data.map(([day, hour, commits]: number[]) => ({
          day: dayMap[day],
          hour,
          commits,
        }));
        setPunchCardData(formatted);
      } else {
        setPunchCardData([]);
      }
    };

    fetchPunchCardData();
  }, [selectedRepo, username]);

  const dailyData = dayMap.map((dayLabel) => {
    const dayCommits = punchCardData
      .filter((d) => d.day === dayLabel)
      .reduce((sum, d) => sum + d.commits, 0);
    return {
      day: dayLabel,
      commits: dayCommits,
    };
  });

  const calculateStats = () => {
    const totalCommits = dailyData.reduce((sum, day) => sum + day.commits, 0);
    const averageCommits = Math.round(totalCommits / 7) || 0;
    const busiestDay = dailyData.reduce(
      (max, day) => (day.commits > max.commits ? day : max),
      dailyData[0]
    );

    return { averageCommits, busiestDay: busiestDay?.day || "None" };
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-4 shadow-sm">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {label}
            </span>
            <span className="font-bold text-primary">
              {payload[0].value} commits
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Commit Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Commit Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const { averageCommits, busiestDay } = calculateStats();
  const formatDate = (isoString: string) => {
    if (!isoString) return "N/A";

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const year = isoString.substring(0, 4);
    const month = monthNames[parseInt(isoString.substring(5, 7)) - 1];
    const day = parseInt(isoString.substring(8, 10));

    return `${month} ${day}, ${year}`;
  };
  const formattedDate = formatDate(repoStats.lastUpdated);
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center text-primary">
          <div className="flex items-center space-x-2">
            <LineChartIcon className="h-5 w-5" />
            <span>Weekly Commit Activity</span>
          </div>
          <span className="text-sm text-muted-foreground font-normal">
            7 Days
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        {punchCardData.length > 0 ? (
          <>
            <div className="h-[150px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dailyData}
                  margin={{ top: 5, right: 5, left: 10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#000"
                    strokeOpacity={0.2}
                  />
                  <SafeXAxis
                    dataKey="day"
                    axisLine={true}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <SafeYAxis
                    axisLine={true}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    width={20}
                    domain={[0, "dataMax + 2"]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="commits"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {repoStats && (
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs">{repoStats.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitFork className="h-3 w-3 text-blue-500" />
                    <span className="text-xs">{repoStats.forks}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Updated {formattedDate}</span>
                </div>
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              <p>Avg. {averageCommits} commits/day</p>
              <p>Busiest day: {busiestDay}</p>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            No commit activity data available
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default GitHubCommitActivity;
