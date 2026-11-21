import {PageHeader} from "@/components/common/page-header";
import {MarketChart} from "@/components/charts/market-chart";
import {OrderPreview} from "@/components/marketplace/order-preview";
export default function Terminal(){return <div className="stack"><PageHeader eyebrow="MARKET DATA" title="Trading terminal" description="Simulated market view. No live order execution is connected."/><div className="columns terminal"><MarketChart/><OrderPreview/></div></div>}
