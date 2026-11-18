import {PageHeader} from "@/components/common/page-header";
import {NetworkStatus} from "@/components/network/network-status";
export default function Networks(){return <div className="stack"><PageHeader eyebrow="MULTI-CHAIN" title="Networks" description="Configured network adapters and illustrative connection states."/><NetworkStatus expanded/></div>}
