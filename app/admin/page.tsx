'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Package, 
  Users, 
  Settings, 
  DollarSign, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  ShoppingCart,
  Zap,
  Globe
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const data = [
  { name: 'Lun', sales: 4000, users: 2400 },
  { name: 'Mar', sales: 3000, users: 1398 },
  { name: 'Mie', sales: 2000, users: 9800 },
  { name: 'Jue', sales: 2780, users: 3908 },
  { name: 'Vie', sales: 1890, users: 4800 },
  { name: 'Sab', sales: 2390, users: 3800 },
  { name: 'Dom', sales: 3490, users: 4300 },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] font-sans selection:bg-primary/30">
      {/* Sidebar HUD */}
      <aside className="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-8 border-r border-white/5 bg-[#0a0a0a] z-50">
        <div className="size-10 bg-primary/20 border border-primary flex items-center justify-center mb-12">
          <Zap className="size-6 text-primary glow-primary" />
        </div>
        
        <nav className="flex flex-col space-y-8">
          {[LineChart, Package, ShoppingCart, Users, Globe, Settings].map((Icon, i) => (
            <button key={i} className={cn(
              "p-3 rounded-none transition-all group",
              i === 0 ? "bg-primary text-white shadow-[0_0_15px_rgba(197,160,89,0.3)]" : "text-muted-foreground hover:text-primary"
            )}>
              <Icon className="size-5" />
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 border-t border-white/5 w-full flex justify-center">
          <Activity className="size-4 text-accent animate-pulse" />
        </div>
      </aside>

      {/* Main Command Center */}
      <main className="pl-20">
        {/* Top Header HUD */}
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center space-x-4">
            <h1 className="font-display text-sm tracking-[0.4em] font-bold text-primary">HUD :: COMMAND_CENTER v2.6</h1>
            <span className="text-[10px] text-muted-foreground tracking-[0.2em] font-mono border border-white/5 px-2 py-0.5">MALABO_SERVER_ONLINE</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Global Operations</span>
              <span className="text-xs font-mono font-bold text-accent">+14.2%</span>
            </div>
            <div className="size-8 rounded-none border border-white/10 p-0.5">
              <div className="w-full h-full bg-primary/20" />
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="p-8 space-y-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Revenue XAF', value: '12,450,000', trend: '+12.5%', icon: DollarSign },
              { label: 'Avg Order', value: '850,200', trend: '-2.1%', icon: TrendingUp },
              { label: 'Active Sessions', value: '1,240', trend: '+45%', icon: Activity },
              { label: 'Conversion', value: '3.8%', trend: '+0.5%', icon: Zap },
            ].map((stat, i) => (
              <div key={i} className="glass p-6 border-l-2 border-primary group hover:bg-white/5 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <stat.icon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className={cn(
                    "text-[10px] font-mono",
                    stat.trend.startsWith('+') ? "text-accent" : "text-destructive"
                  )}>{stat.trend}</span>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-accent">{stat.label}</p>
                <h3 className="text-xl font-display font-bold tracking-tighter mt-1">{stat.value}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sales Chart */}
            <div className="lg:col-span-2 glass p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-xs tracking-[0.3em] font-bold uppercase flex items-center gap-2">
                  <BarChart3 className="size-4 text-primary" /> Visual Logic :: Sales Activity
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="size-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-[10px] uppercase font-mono">Live Monitoring</span>
                </div>
              </div>
              
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#c5a059" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#c5a059" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#444" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                      tick={{ fill: '#666' }}
                    />
                    <YAxis 
                      stroke="#444" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      tick={{ fill: '#666' }}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '0', fontSize: '10px' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#c5a059" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorSales)" 
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Orders HUD */}
            <div className="glass p-8 flex flex-col">
              <h3 className="font-display text-xs tracking-[0.3em] font-bold uppercase mb-8 flex items-center gap-2">
                <ShoppingCart className="size-4 text-primary" /> System Logs :: Orders
              </h3>
              
              <div className="space-y-6 flex-1">
                {[
                  { id: '#8822', customer: 'M. Obiang', total: '1,200,000', status: 'Pending' },
                  { id: '#8821', customer: 'A. Nguema', total: '450,000', status: 'Paid' },
                  { id: '#8820', customer: 'E. Mba', total: '85,000', status: 'Shipped' },
                  { id: '#8819', customer: 'J. Ndong', total: '2,400,500', status: 'Delivered' },
                  { id: '#8818', customer: 'L. Oyono', total: '150,000', status: 'Cancelled' },
                ].map((order, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-4 last:border-0">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-muted-foreground group-hover:text-primary transition-colors">{order.id}</span>
                      <p className="text-xs font-bold tracking-widest uppercase">{order.customer}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-xs font-mono font-bold">{order.total} <span className="text-[10px]">XAF</span></p>
                      <span className={cn(
                        "text-[9px] uppercase tracking-tighter px-1 border",
                        order.status === 'Paid' || order.status === 'Delivered' ? "border-accent text-accent" : "border-muted-foreground text-muted-foreground"
                      )}>{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="mt-8 w-full border border-white/5 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all font-bold">
                Access All System Logs
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
