import {PageHeader} from "@/components/common/page-header";
import {MarketChart} from "@/components/charts/market-chart";
import {StatCard} from "@/components/dashboard/stat-card";
import {stats} from "@/lib/demo-data";
export default function Analytics(){return <div className="stack"><PageHeader eyebrow="INSIGHTS" title="Analytics" description="Sample marketplace and network indicators, not live market data."/><div className="stats">{stats.map(x=><StatCard key={x.label} {...x}/>)}</div><MarketChart/></div>}
