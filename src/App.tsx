import { useState } from "react";
import { GitHubEmptyState } from "./components/GitHubEmptyState";
import { GitHubLoading } from "./components/GitHubLoading";
import { GitHubReposList } from "./components/GitHubReposList";
import { GitHubProfileHeader } from "./components/GitHubProfileHeader";
import { GitHubUserCard } from "./components/GitHubUserCard";
import GitHubCommitActivity from "./components/GitHubCommitActivity";

interface GitHubUser {
  avatar_url: string;
  login: string;
  name: string;
  followers: number;
  following: number;
  created_at: string;
  location?: string;
  company?: string;
  blog?: string;
  bio?: string;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export default function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    setUsername(username.trim());

    setLoading(true);
    setError(null);

    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      const repoRes = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
      );

      if (!userRes.ok) throw new Error("User not found");
      if (!repoRes.ok) throw new Error("Failed to load repositories");
      const userData = await userRes.json();
      const repoData = await repoRes.json();

      setUser(userData);
      setRepos(
        repoData.sort(
          (a: GitHubRepo, b: GitHubRepo) =>
            b.stargazers_count - a.stargazers_count
        )
      );
      setSelectedRepo(repoData[0]?.name || null);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setUser(null);
      setRepos([]);
      setSelectedRepo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      fetchUserData();
    }
  };

  return (
    <div className="container py-6 px-4 max-w-7xl mx-auto min-h-screen">
      <GitHubProfileHeader
        username={username}
        loading={loading}
        error={error}
        onUsernameChange={setUsername}
        onSearch={fetchUserData}
        onKeyDown={handleKeyDown}
      />

      {loading && !user && <GitHubLoading />}

      {!user && !loading && <GitHubEmptyState />}

      {user && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GitHubUserCard user={user} />

          <GitHubReposList
            repos={repos}
            selectedRepo={selectedRepo}
            onSelectRepo={setSelectedRepo}
          />

          <GitHubCommitActivity
            username={username}
            selectedRepo={selectedRepo}
            repoStats={
              repos.find((repo) => repo.name === selectedRepo)
                ? {
                    stars: repos.find((repo) => repo.name === selectedRepo)!
                      .stargazers_count,
                    forks: repos.find((repo) => repo.name === selectedRepo)!
                      .forks_count,
                    lastUpdated: repos.find(
                      (repo) => repo.name === selectedRepo
                    )!.updated_at,
                    languages: repos.find((repo) => repo.name === selectedRepo)!
                      .language
                      ? [
                          repos.find((repo) => repo.name === selectedRepo)!
                            .language,
                        ]
                      : [],
                  }
                : undefined
            }
          />
        </div>
      )}
    </div>
  );
}
