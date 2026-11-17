import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { MarketChart } from "@/components/charts/market-chart";
import { NetworkStatus } from "@/components/network/network-status";
import { RecentListings } from "@/components/dashboard/recent-listings";
import { stats } from "@/lib/demo-data";
export default function Dashboard(){return <div className="stack"><PageHeader eyebrow="HAMLAT ECOSYSTEM" title="Overview" description="Your multi-chain P2P workspace at a glance."/><div className="stats">{stats.map(x=><StatCard key={x.label} {...x}/>)}</div><div className="columns"><MarketChart/><NetworkStatus/></div><RecentListings/></div>}
