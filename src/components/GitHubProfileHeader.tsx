import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GitHubLogoIcon from "../../public/github-icon.svg";
import { Search } from "lucide-react";

interface GitHubProfileHeaderProps {
  username: string;
  loading: boolean;
  error: string | null;
  onUsernameChange: (value: string) => void;
  onSearch: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export const GitHubProfileHeader = ({
  username,
  loading,
  error,
  onUsernameChange,
  onSearch,
  onKeyDown,
}: GitHubProfileHeaderProps) => (
    <header className="mb-8">
    <div className="flex flex-col items-center text-center mb-6">
      <div className="flex items-center justify-center gap-2 mb-3">
        <img src={GitHubLogoIcon} className="h-8 w-8" alt="GitHub Logo" />
        <h1 className="text-2xl sm:text-3xl font-bold">
          GitHub Profile Analyzer
        </h1>
      </div>
      <p className="text-muted-foreground max-w-lg">
        Explore GitHub user profiles and repository analytics
      </p>
    </div>

    <div className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
      <Input
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => onUsernameChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="flex-1"
        disabled={loading}
      />
      <Button
        onClick={onSearch}
        disabled={loading}
        className="min-w-[120px]"
      >
        {loading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </span>
        ) : (
          <>
            <Search className="h-4 w-4 mr-2" /> Analyze
          </>
        )}
      </Button>
    </div>

    {error && (
      <p className="text-sm text-destructive text-center mt-2 max-w-2xl mx-auto">
        {error}
      </p>
    )}
  </header>
);