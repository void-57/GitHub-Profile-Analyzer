import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, GitFork, Star } from "lucide-react";

interface GitHubReposListProps {
  repos: Array<{
    id: number;
    name: string;
    description: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
  }>;
  selectedRepo: string | null;
  onSelectRepo: (repoName: string) => void;
}

export const GitHubReposList = ({ repos, selectedRepo, onSelectRepo }: GitHubReposListProps) => (
    <Card className="lg:col-span-2">
    <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        <span className="font-semibold">Repositories ({repos.length})</span>
        </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2">
        {repos.map((repo) => (
          <Card
            key={repo.id}
            className={`transition-colors ${
              selectedRepo === repo.name
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-medium">{repo.name}</h4>
                  {repo.description && (
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {repo.language && <span>{repo.language}</span>}
                    <span className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                    <span className="flex items-center gap-1 text-blue-500">
                      <GitFork className="h-4 w-4" />
                      <span>{repo.forks_count}</span>
                    </span>
                    <span>
                      Updated{" "}
                      {new Date(repo.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={
                    selectedRepo === repo.name ? "default" : "outline"
                  }
                  onClick={() => onSelectRepo(repo.name)}
                  className="shrink-0"
                >
                  {selectedRepo === repo.name ? "Selected" : "Select"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </CardContent>
  </Card>
);