import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building, Clock, Link, MapPin, Users } from "lucide-react";

interface GitHubUserCardProps {
  user: {
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
  };
}

export const GitHubUserCard = ({ user }: GitHubUserCardProps) => (
  <Card className="lg:col-span-3">
    <CardHeader
      className="p-6 text-white"
      style={{
        backgroundImage:
          "linear-gradient(to right, hsl(221, 83%, 53%), hsl(250, 84%, 38%))",
      }}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-white">
          <AvatarImage src={user.avatar_url} alt={user.login} />
          <AvatarFallback>
            {user.login.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold">
            {user.name || user.login}
          </h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors inline-block"
          >
            @{user.login}
          </a>
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-6 grid gap-4 md:grid-cols-2">
      {user.bio && (
        <div className="md:col-span-2">
          <p className="text-muted-foreground">{user.bio}</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">
          <strong>{user.followers}</strong> followers ·{" "}
          <strong>{user.following}</strong> following
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">
          Joined{" "}
          {new Date(user.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      {user.location && (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{user.location}</span>
        </div>
      )}

      {user.company && (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{user.company}</span>
        </div>
      )}

      {user.blog && (
        <div className="flex items-center gap-2">
          <Link className="h-4 w-4 text-muted-foreground" />
          <a
            href={
              user.blog.startsWith("http") ? user.blog : `https://${user.blog}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            {user.blog.length > 30
              ? `${user.blog.substring(0, 30)}...`
              : user.blog}
          </a>
        </div>
      )}
    </CardContent>
  </Card>
);
