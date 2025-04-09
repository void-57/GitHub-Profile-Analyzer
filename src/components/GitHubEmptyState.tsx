import GitHubLogoIcon from "../../public/github-icon.svg";

export const GitHubEmptyState = () => (
    <div className="flex flex-col items-center justify-center mt-12 md:mt-20 text-center px-4">
    <img
      src={GitHubLogoIcon}
      className="w-16 h-16 mb-4"
      alt="GitHub Logo"
    />
    <h2 className="text-xl font-semibold mb-2">
      Enter a GitHub Username
    </h2>
    <p className="text-muted-foreground max-w-md">
      Search for any GitHub user to view their profile and repository
      statistics
    </p>
  </div>
);