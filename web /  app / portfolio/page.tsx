import {PageHeader} from "@/components/common/page-header";
import {PortfolioAllocation} from "@/components/dashboard/portfolio-allocation";
import {StatCard} from "@/components/dashboard/stat-card";
import {stats} from "@/lib/demo-data";
export default function Portfolio(){return <div className="stack"><PageHeader eyebrow="ASSET OVERVIEW" title="Portfolio" description="Illustrative sample portfolio data."/><div className="stats">{stats.slice(0,2).map(x=><StatCard key={x.label} {...x}/>)}</div><PortfolioAllocation/></div>}
