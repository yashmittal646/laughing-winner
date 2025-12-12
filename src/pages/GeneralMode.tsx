import { useState } from 'react';
import { Search, Lightbulb, MessageSquare, FileEdit, TrendingUp, User, ChevronDown } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { TiltCard } from '@/components/TiltCard';
import { cn } from '@/lib/utils';

const tools = [
  {
    icon: Lightbulb,
    title: 'Idea Generator',
    description: 'Get fresh content ideas based on trends and your niche',
    color: 'pink' as const,
  },
  {
    icon: MessageSquare,
    title: 'Caption Writer',
    description: 'Create engaging captions for any platform instantly',
    color: 'violet' as const,
  },
  {
    icon: FileEdit,
    title: 'Script Rewriter',
    description: 'Transform and polish your scripts with AI magic',
    color: 'peach' as const,
  },
  {
    icon: TrendingUp,
    title: 'Trend Finder',
    description: 'Discover what\'s trending in your industry right now',
    color: 'pink' as const,
  },
];

export default function GeneralMode() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-space text-3xl font-bold">
                <span className="gradient-text">General Mode</span>
              </h1>
              <p className="mt-2 text-muted-foreground">
                Your AI-powered creative toolkit
              </p>
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 rounded-xl border border-border bg-card/50 px-4 py-2 transition-colors hover:bg-card"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neon-pink to-secondary">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <ChevronDown className={cn(
                  'h-4 w-4 text-muted-foreground transition-transform',
                  showDropdown && 'rotate-180'
                )} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-border bg-card p-2 shadow-lg animate-slide-up">
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    user@creaimon.com
                  </div>
                  <hr className="my-2 border-border" />
                  <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted">
                    Settings
                  </button>
                  <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <div className="glass-card group relative overflow-hidden p-1">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 via-secondary/20 to-peach/20 opacity-0 transition-opacity group-focus-within:opacity-100" />
              <div className="relative flex items-center gap-4 rounded-xl bg-card/80 px-6 py-4">
                <Search className="h-6 w-6 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask CreAIman anything..."
                  className="flex-1 bg-transparent text-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button className="rounded-lg bg-gradient-to-r from-neon-pink to-secondary px-4 py-2 font-medium text-primary-foreground transition-all hover:shadow-glow-pink">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Tool Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {tools.map((tool, index) => (
              <TiltCard 
                key={tool.title} 
                glowColor={tool.color}
                className="group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    'rounded-xl p-3 transition-all duration-300',
                    tool.color === 'pink' && 'bg-neon-pink/20 group-hover:bg-neon-pink/30',
                    tool.color === 'violet' && 'bg-secondary/20 group-hover:bg-secondary/30',
                    tool.color === 'peach' && 'bg-peach/20 group-hover:bg-peach/30',
                  )}>
                    <tool.icon className={cn(
                      'h-6 w-6',
                      tool.color === 'pink' && 'text-neon-pink',
                      tool.color === 'violet' && 'text-secondary',
                      tool.color === 'peach' && 'text-peach',
                    )} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-space text-xl font-semibold">{tool.title}</h3>
                    <p className="mt-1 text-muted-foreground">{tool.description}</p>
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="mt-4 flex justify-end">
                  <div className="rounded-full bg-muted/50 p-2 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="mt-12 rounded-2xl border border-border/50 bg-card/30 p-6">
            <h3 className="mb-4 font-space text-lg font-semibold">
              <span className="gradient-text">Quick Tips</span>
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>💡 Try asking "Give me 5 viral video ideas for tech reviews"</li>
              <li>✍️ Use Caption Writer for platform-specific formatting</li>
              <li>📈 Check Trend Finder daily for fresh content opportunities</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
