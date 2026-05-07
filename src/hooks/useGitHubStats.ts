import { useCallback, useEffect, useMemo, useState } from 'react';

interface GitHubUser {
  avatar_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  description: string | null;
}

export interface GitHubStatsData {
  user: GitHubUser;
  repos: GitHubRepo[];
  totalStars: number;
  languages: { name: string; count: number; pct: number }[];
  recentRepos: GitHubRepo[];
}

const CACHE_TTL = 1000 * 60 * 20;

export const useGitHubStats = (username: string) => {
  const cacheKey = useMemo(() => `github-stats:${username}`, [username]);
  const [data, setData] = useState<GitHubStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (force = false) => {
    setError(null);
    setRefreshing(force);

    if (!force) {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as { timestamp: number; data: GitHubStatsData };
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          setData(parsed.data);
          setLoading(false);
          return;
        }
      }
    }

    try {
      setLoading(true);
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`),
      ]);

      if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API unavailable');

      const user = (await userRes.json()) as GitHubUser;
      const repos = (await reposRes.json()) as GitHubRepo[];
      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const languageCounts = repos.reduce<Record<string, number>>((acc, repo) => {
        if (!repo.language) return acc;
        acc[repo.language] = (acc[repo.language] ?? 0) + 1;
        return acc;
      }, {});
      const totalLanguageRepos = Object.values(languageCounts).reduce((sum, count) => sum + count, 0) || 1;
      const languages = Object.entries(languageCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, count, pct: Math.round((count / totalLanguageRepos) * 100) }));

      const nextData = { user, repos, totalStars, languages, recentRepos: repos.slice(0, 4) };
      localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: nextData }));
      setData(nextData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load GitHub stats');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [cacheKey, username]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refreshing, refresh: () => load(true) };
};
