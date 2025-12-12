import { useState, useEffect } from 'react';
import { 
  Youtube, Instagram, Check, Search, User, ChevronDown,
  TrendingUp, Users, Eye, ThumbsUp, Clock, AlertCircle, CheckCircle
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { TiltCard } from '@/components/TiltCard';
import { MagneticButton } from '@/components/MagneticButton';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const growthData = [
  { month: 'Jan', subscribers: 12000, views: 45000 },
  { month: 'Feb', subscribers: 15000, views: 52000 },
  { month: 'Mar', subscribers: 18500, views: 61000 },
  { month: 'Apr', subscribers: 22000, views: 78000 },
  { month: 'May', subscribers: 28000, views: 95000 },
  { month: 'Jun', subscribers: 35000, views: 120000 },
];

const demographicsData = [
  { name: '18-24', value: 35, color: 'hsl(330, 100%, 65%)' },
  { name: '25-34', value: 40, color: 'hsl(252, 100%, 69%)' },
  { name: '35-44', value: 15, color: 'hsl(30, 100%, 71%)' },
  { name: '45+', value: 10, color: 'hsl(270, 50%, 70%)' },
];

const topVideos = [
  { title: 'How I Made $10K in One Month', views: '245K', engagement: '8.2%' },
  { title: 'The Ultimate Productivity Setup', views: '189K', engagement: '7.8%' },
  { title: 'Why Most Creators Fail', views: '156K', engagement: '9.1%' },
];

const insights = {
  working: [
    'Tutorial content performs 40% better',
    'Videos posted at 6 PM get more views',
    'Thumbnails with faces drive 25% more clicks',
  ],
  notWorking: [
    'Long-form content (>20 min) has lower retention',
    'Weekend posts underperform by 15%',
    'Generic titles reduce CTR significantly',
  ],
};

export default function ManagerMode() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [youtubeConnected, setYoutubeConnected] = useState(false);
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleConnect = (platform: 'youtube' | 'instagram') => {
    if (platform === 'youtube' && youtubeUrl) {
      setYoutubeConnected(true);
    } else if (platform === 'instagram' && instagramHandle) {
      setInstagramConnected(true);
    }
  };

  const handleAskAI = () => {
    if (!searchQuery) return;
    
    setIsTyping(true);
    setAiResponse('');
    
    const response = `Based on your analytics, I recommend posting a tutorial video about "Quick Productivity Hacks" tomorrow at 6 PM. Your audience engages most with educational content, and Tuesday evenings have shown 23% higher view rates. Consider using a thumbnail with your face for maximum click-through rate.`;
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < response.length) {
        setAiResponse(prev => prev + response[i]);
        i++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 20);
  };

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-space text-3xl font-bold">
                <span className="gradient-text">Manager Mode</span>
              </h1>
              <p className="mt-2 text-muted-foreground">
                Your AI-powered command center
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
                    manager@creaimon.com
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

          {/* Social Connect Section */}
          <section className="mb-12">
            <h2 className="mb-6 font-space text-xl font-semibold">Connect Your Channels</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* YouTube */}
              <TiltCard glowColor="pink">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-lg bg-red-500/20 p-2">
                    <Youtube className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="font-space text-lg font-semibold">YouTube</h3>
                  {youtubeConnected && (
                    <span className="ml-auto flex items-center gap-1 text-sm text-green-400">
                      <Check className="h-4 w-4" /> Connected
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="Enter channel URL"
                    disabled={youtubeConnected}
                    className={cn(
                      'flex-1 rounded-lg border border-border bg-input px-4 py-2',
                      'text-foreground placeholder:text-muted-foreground',
                      'focus:border-neon-pink focus:outline-none',
                      youtubeConnected && 'opacity-50'
                    )}
                  />
                  <MagneticButton
                    variant={youtubeConnected ? 'ghost' : 'primary'}
                    size="sm"
                    onClick={() => handleConnect('youtube')}
                  >
                    {youtubeConnected ? 'Connected' : 'Connect'}
                  </MagneticButton>
                </div>
              </TiltCard>

              {/* Instagram */}
              <TiltCard glowColor="violet">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-2">
                    <Instagram className="h-6 w-6 text-pink-400" />
                  </div>
                  <h3 className="font-space text-lg font-semibold">Instagram</h3>
                  {instagramConnected && (
                    <span className="ml-auto flex items-center gap-1 text-sm text-green-400">
                      <Check className="h-4 w-4" /> Connected
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                    placeholder="@username"
                    disabled={instagramConnected}
                    className={cn(
                      'flex-1 rounded-lg border border-border bg-input px-4 py-2',
                      'text-foreground placeholder:text-muted-foreground',
                      'focus:border-neon-pink focus:outline-none',
                      instagramConnected && 'opacity-50'
                    )}
                  />
                  <MagneticButton
                    variant={instagramConnected ? 'ghost' : 'secondary'}
                    size="sm"
                    onClick={() => handleConnect('instagram')}
                  >
                    {instagramConnected ? 'Connected' : 'Connect'}
                  </MagneticButton>
                </div>
              </TiltCard>
            </div>
          </section>

          {/* Analytics Dashboard */}
          <section className="mb-12">
            <h2 className="mb-6 font-space text-xl font-semibold">Analytics Dashboard</h2>
            
            {/* Stats Grid */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Users, label: 'Subscribers', value: '35.2K', change: '+12.5%' },
                { icon: Eye, label: 'Total Views', value: '1.2M', change: '+8.3%' },
                { icon: ThumbsUp, label: 'Engagement Rate', value: '7.8%', change: '+2.1%' },
                { icon: Clock, label: 'Watch Time', value: '45K hrs', change: '+15.2%' },
              ].map((stat) => (
                <TiltCard key={stat.label} className="text-center">
                  <stat.icon className="mx-auto mb-2 h-6 w-6 text-neon-pink" />
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="font-space text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-400">{stat.change}</p>
                </TiltCard>
              ))}
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Growth Chart */}
              <div className="glass-card p-6 lg:col-span-2">
                <h3 className="mb-4 font-space text-lg font-semibold">Growth Overview</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(280 40% 25%)" />
                      <XAxis dataKey="month" stroke="hsl(270 30% 70%)" />
                      <YAxis stroke="hsl(270 30% 70%)" />
                      <Tooltip
                        contentStyle={{
                          background: 'hsl(280 60% 12%)',
                          border: '1px solid hsl(280 40% 25%)',
                          borderRadius: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="subscribers"
                        stroke="hsl(330 100% 65%)"
                        strokeWidth={3}
                        dot={{ fill: 'hsl(330 100% 65%)' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="views"
                        stroke="hsl(252 100% 69%)"
                        strokeWidth={3}
                        dot={{ fill: 'hsl(252 100% 69%)' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Demographics */}
              <div className="glass-card p-6">
                <h3 className="mb-4 font-space text-lg font-semibold">Audience Demographics</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={demographicsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {demographicsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: 'hsl(280 60% 12%)',
                          border: '1px solid hsl(280 40% 25%)',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {demographicsData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ background: item.color }} />
                        <span>{item.name}</span>
                      </div>
                      <span className="text-muted-foreground">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Videos & Insights */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {/* Top Videos */}
              <div className="glass-card p-6">
                <h3 className="mb-4 font-space text-lg font-semibold">Top Performing Videos</h3>
                <div className="space-y-4">
                  {topVideos.map((video, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/30 p-4 transition-colors hover:bg-card/50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-neon-pink/20 to-secondary/20">
                        <TrendingUp className="h-5 w-5 text-neon-pink" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{video.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {video.views} views • {video.engagement} engagement
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insights */}
              <div className="glass-card p-6">
                <h3 className="mb-4 font-space text-lg font-semibold">Performance Insights</h3>
                
                {/* What's Working */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2 text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">What's Working</span>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {insights.working.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-green-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What's Not Working */}
                <div>
                  <div className="mb-2 flex items-center gap-2 text-peach">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Areas to Improve</span>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {insights.notWorking.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-peach" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* AI Manager Search */}
          <section>
            <h2 className="mb-6 font-space text-xl font-semibold">Manager Intelligence</h2>
            <div className="glass-card p-6">
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
                      placeholder="Ask your AI Manager: What should I post next?"
                      className={cn(
                        'w-full rounded-xl border border-border bg-input py-4 pl-12 pr-4',
                        'text-foreground placeholder:text-muted-foreground',
                        'focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/20'
                      )}
                    />
                  </div>
                  <MagneticButton variant="primary" size="lg" onClick={handleAskAI}>
                    Ask AI
                  </MagneticButton>
                </div>
              </div>

              {/* AI Response */}
              {(aiResponse || isTyping) && (
                <div className="relative rounded-xl border border-neon-pink/30 bg-neon-pink/5 p-6">
                  <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-neon-pink/20 via-transparent to-secondary/20 blur-sm" />
                  <div className="relative">
                    <p className="font-space text-sm font-medium text-neon-pink mb-2">
                      AI Manager Response
                    </p>
                    <p className="text-foreground leading-relaxed">
                      {aiResponse}
                      {isTyping && <span className="inline-block w-2 h-4 ml-1 bg-neon-pink animate-pulse" />}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
