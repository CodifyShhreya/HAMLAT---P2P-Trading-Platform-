 "use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowDownUp, ArrowRight, BarChart3, Bell, ChevronDown,
  CircleHelp, Clock3, Compass, Copy, CreditCard, Filter, Globe2,
  LayoutDashboard, Menu, MoreHorizontal, Plus, Search, Settings,
  ShieldCheck, Sparkles, Store, Wallet, X, Zap
} from "lucide-react";

type Section = "Overview" | "P2P Marketplace" | "Trading Terminal" | "Portfolio" | "Networks" | "Analytics" | "Activity" | "Security";
type Listing = { id: number; asset: string; network: string; side: "Buy" | "Sell"; price: string; available: string; limit: string; seller: string; status: string };

const initialListings: Listing[] = [
  { id: 1, asset: "USDC", network: "Polygon", side: "Sell", price: "$1.00", available: "2,500 USDC", limit: "$50 – $1,000", seller: "0x8a…91c2", status: "Active" },
  { id: 2, asset: "ETH", network: "Ethereum", side: "Buy", price: "$3,420.00", available: "1.25 ETH", limit: "$100 – $2,000", seller: "0x32…a4d1", status: "Active" },
  { id: 3, asset: "SOL", network: "Solana", side: "Sell", price: "$148.20", available: "18 SOL", limit: "$25 – $1,500", seller: "7xQ…pK3", status: "Active" },
  { id: 4, asset: "BNB", network: "BNB Chain", side: "Sell", price: "$612.50", available: "6 BNB", limit: "$100 – $2,500", seller: "0x51…b03f", status: "Paused" },
];

const nav: { label: Section; icon: typeof LayoutDashboard }[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "P2P Marketplace", icon: Store },
  { label: "Trading Terminal", icon: BarChart3 },
  { label: "Portfolio", icon: Wallet },
  { label: "Networks", icon: Globe2 },
  { label: "Analytics", icon: Activity },
  { label: "Activity", icon: Clock3 },
  { label: "Security", icon: ShieldCheck },
];

const networks = [
  { name: "Ethereum", symbol: "ETH", color: "#8b9cff", state: "Connected", latency: "42 ms", chain: "EVM" },
  { name: "Polygon", symbol: "POL", color: "#a78bfa", state: "Connected", latency: "28 ms", chain: "EVM" },
  { name: "Solana", symbol: "SOL", color: "#6ee7b7", state: "Read-only demo", latency: "36 ms", chain: "Solana" },
  { name: "BNB Chain", symbol: "BNB", color: "#fbbf24", state: "Read-only demo", latency: "51 ms", chain: "EVM" },
];

function Logo() {
  return <div className="brand"><div className="brand-mark">H</div><div><strong>HAMLAT</strong><span>DECENTRALIZED EXCHANGE</span></div></div>;
}

function MiniChart() {
  return (
    <div className="chart-wrap">
      <div className="chart-grid"><span>$3,500</span><span>$3,400</span><span>$3,300</span><span>$3,200</span></div>
      <svg viewBox="0 0 700 230" preserveAspectRatio="none" className="chart-svg" role="img" aria-label="Illustrative ETH price chart">
        <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#6d8cff" stopOpacity=".28"/><stop offset="100%" stopColor="#6d8cff" stopOpacity="0"/></linearGradient></defs>
        {[35, 85, 135, 185].map(y => <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="#263047" strokeDasharray="4 6" />)}
        <path d="M0 165 C35 155 45 170 75 145 S125 120 150 138 S195 115 225 126 S260 95 290 110 S330 80 360 94 S400 72 430 89 S470 50 500 72 S540 54 570 68 S620 38 650 53 S680 40 700 28 L700 230 L0 230Z" fill="url(#area)"/>
        <path d="M0 165 C35 155 45 170 75 145 S125 120 150 138 S195 115 225 126 S260 95 290 110 S330 80 360 94 S400 72 430 89 S470 50 500 72 S540 54 570 68 S620 38 650 53 S680 40 700 28" fill="none" stroke="#8ba3ff" strokeWidth="3" strokeLinecap="round"/>
      </svg>
      <div className="chart-labels"><span>09:00</span><span>11:00</span><span>13:00</span><span>15:00</span><span>17:00</span><span>19:00</span></div>
    </div>
  );
}

function StatCard({ title, value, note, icon: Icon, positive }: { title: string; value: string; note: string; icon: typeof Wallet; positive?: boolean }) {
  return <div className="stat-card"><div className="stat-top"><span>{title}</span><div className="stat-icon"><Icon size={17}/></div></div><strong>{value}</strong><small className={positive ? "positive" : ""}>{note}</small></div>;
}

export default function Home() {
  const [section, setSection] = useState<Section>("Overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [listings, setListings] = useState(initialListings);
  const [query, setQuery] = useState("");
  const [networkFilter, setNetworkFilter] = useState("All networks");
  const [sideFilter, setSideFilter] = useState("All");
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState("");
  const [newAsset, setNewAsset] = useState("USDC");
  const [newNetwork, setNewNetwork] = useState("Polygon");
  const [newSide, setNewSide] = useState<"Buy" | "Sell">("Sell");
  const [newPrice, setNewPrice] = useState("1.00");
  const [newQuantity, setNewQuantity] = useState("500");

  const filteredListings = useMemo(() => listings.filter(item =>
    (item.asset.toLowerCase().includes(query.toLowerCase()) || item.seller.toLowerCase().includes(query.toLowerCase())) &&
    (networkFilter === "All networks" || item.network === networkFilter) &&
    (sideFilter === "All" || item.side === sideFilter)
  ), [listings, query, networkFilter, sideFilter]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  }

  function createListing(e: React.FormEvent) {
    e.preventDefault();
    const item: Listing = {
      id: Date.now(), asset: newAsset, network: newNetwork, side: newSide,
      price: `$${Number(newPrice || 0).toLocaleString("en-US", { maximumFractionDigits: 2 })}`,
      available: `${newQuantity} ${newAsset}`, limit: "$25 – $1,000",
      seller: "You · demo", status: "Active"
    };
    setListings(current => [item, ...current]);
    setShowCreate(false);
    setSection("P2P Marketplace");
    notify("Demo listing published locally.");
  }

  const title = section === "Overview" ? "Overview" : section;
  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-head"><Logo/><button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={18}/></button></div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="nav-list">
          {nav.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${section === label ? "active" : ""}`} onClick={() => { setSection(label); setMobileOpen(false); }}><Icon size={18}/><span>{label}</span>{label === "P2P Marketplace" && <i>4</i>}</button>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="network-mini"><div className="online-dot"/><div><b>Demo environment</b><span>All systems operational</span></div></div>
          <button className="nav-item" onClick={() => setSection("Security")}><Settings size={18}/><span>Settings</span></button>
          <div className="profile"><div className="avatar">HC</div><div><b>HAMLAT Creator</b><span>Demo account</span></div><MoreHorizontal size={18}/></div>
        </div>
      </aside>

      {mobileOpen && <button className="scrim" onClick={() => setMobileOpen(false)} aria-label="Close navigation"/>}
      <section className="main-area">
        <header className="topbar">
          <div className="topbar-left"><button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={20}/></button><div className="breadcrumbs">Workspace <span>/</span> <b>{title}</b></div></div>
          <div className="topbar-actions"><div className="demo-pill"><span/> DEMO MODE</div><button className="icon-button" aria-label="Notifications" onClick={() => notify("You're all caught up.")}><Bell size={18}/></button><button className="network-select" onClick={() => setSection("Networks")}><Globe2 size={16}/> Multi-chain <ChevronDown size={14}/></button></div>
        </header>

        <div className="content">
          <div className="page-heading"><div><div className="eyebrow">HAMLAT ECOSYSTEM</div><h1>{title}</h1><p>{section === "Overview" ? "Your multi-chain P2P workspace at a glance." : `Explore and manage your HAMLAT ${section.toLowerCase()} workspace.`}</p></div><div className="heading-actions"><button className="secondary-button" onClick={() => notify("Demo data refreshed.")}><Activity size={16}/> Refresh</button><button className="primary-button" onClick={() => setShowCreate(true)}><Plus size={17}/> Create listing</button></div></div>

          {section === "Overview" && <>
            <div className="stats-grid">
              <StatCard title="Demo portfolio value" value="$25,480.00" note="Illustrative sample balance" icon={Wallet}/>
              <StatCard title="Marketplace listings" value={String(listings.length + 32)} note="+8.2% vs. prior demo period" icon={Store} positive/>
              <StatCard title="Networks configured" value="04" note="EVM + Solana adapters" icon={Globe2}/>
              <StatCard title="Demo orders" value="128" note="Sample activity records" icon={ArrowDownUp}/>
            </div>
            <div className="overview-grid">
              <div className="panel chart-panel"><div className="panel-head"><div><h2>Market overview</h2><p>Illustrative ETH/USD market data</p></div><button className="select-button">ETH / USD <ChevronDown size={14}/></button></div><div className="price-row"><strong>$3,420.80</strong><span className="positive">↗ 2.45%</span><small>Past 24 hours · demo data</small></div><MiniChart/><div className="time-filters"><button>1H</button><button className="chosen">24H</button><button>7D</button><button>1M</button><button>1Y</button></div></div>
              <div className="panel network-panel"><div className="panel-head"><div><h2>Network status</h2><p>Configured connections</p></div><button className="more-button" onClick={() => setSection("Networks")}><ArrowRight size={17}/></button></div>{networks.map(n => <div className="network-row" key={n.name}><div className="coin-icon" style={{ color: n.color }}>{n.symbol.slice(0,1)}</div><div className="network-name"><b>{n.name}</b><span>{n.chain} network</span></div><div className="network-state"><span className="tiny-dot"/>{n.state}</div></div>)}</div>
            </div>
            <div className="panel table-panel"><div className="panel-head"><div><h2>Recent P2P listings</h2><p>Latest activity across supported networks</p></div><button className="text-button" onClick={() => setSection("P2P Marketplace")}>View marketplace <ArrowRight size={15}/></button></div><ListingTable items={listings.slice(0, 4)} onSelect={() => notify("Listing details are in demo preview mode.")}/></div>
          </>}

          {section === "P2P Marketplace" && <div className="panel table-panel"><div className="market-toolbar"><div><h2>Marketplace listings</h2><p>Browse sample peer-to-peer offers.</p></div><button className="primary-button" onClick={() => setShowCreate(true)}><Plus size={16}/> New listing</button></div><div className="filters"><div className="search-box"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search asset or seller"/></div><select value={networkFilter} onChange={e => setNetworkFilter(e.target.value)}><option>All networks</option>{networks.map(n => <option key={n.name}>{n.name}</option>)}</select><select value={sideFilter} onChange={e => setSideFilter(e.target.value)}><option>All</option><option>Buy</option><option>Sell</option></select><button className="secondary-button" onClick={() => { setQuery(""); setNetworkFilter("All networks"); setSideFilter("All"); }}><Filter size={15}/> Reset</button></div><ListingTable items={filteredListings} onSelect={() => notify("This is a simulated listing. No order or payment will be created.")}/></div>}

          {section === "Trading Terminal" && <div className="terminal-grid"><div className="panel chart-panel"><div className="panel-head"><div><h2>ETH / USD</h2><p>Ethereum · simulated market</p></div><span className="demo-pill"><span/> SIMULATED</span></div><div className="price-row"><strong>$3,420.80</strong><span className="positive">+2.45%</span></div><MiniChart/><div className="terminal-note"><Sparkles size={16}/> Sample chart only. Connect a market-data provider for live prices.</div></div><div className="panel order-panel"><h2>Order preview</h2><p>Explore the order-entry experience.</p><div className="segmented"><button className="selected">Buy</button><button>Sell</button></div><label>Asset<select><option>ETH — Ethereum</option><option>USDC — USD Coin</option><option>SOL — Solana</option></select></label><label>Amount<input type="number" placeholder="0.00"/></label><label>Network<select><option>Ethereum</option><option>Polygon</option><option>Solana</option><option>BNB Chain</option></select></label><button className="primary-button full" onClick={() => notify("Demo only: no order has been submitted.")}>Preview demo order</button><small className="muted">No real order execution or asset transfer is enabled.</small></div></div>}

          {section === "Portfolio" && <div className="stats-grid"><StatCard title="Demo portfolio value" value="$25,480.00" note="Illustrative only" icon={Wallet}/><StatCard title="Sample assets" value="04" note="ETH, USDC, SOL, BNB" icon={CreditCard}/><StatCard title="Networks" value="04" note="Configured demo networks" icon={Globe2}/><StatCard title="Allocation" value="Balanced" note="Illustrative sample allocation" icon={BarChart3}/><div className="panel table-panel wide-panel"><div className="panel-head"><div><h2>Asset allocation</h2><p>Sample portfolio composition</p></div></div>{[["ETH","42%","42"],["USDC","28%","28"],["SOL","18%","18"],["BNB","12%","12"]].map(([a,p,w]) => <div className="allocation-row" key={a}><b>{a}</b><div className="allocation-track"><span style={{width: `${w}%`}}/></div><span>{p}</span></div>)}</div></div>}

          {section === "Networks" && <div className="network-cards">{networks.map(n => <div className="panel network-card" key={n.name}><div className="network-card-top"><div className="coin-icon large" style={{color:n.color}}>{n.symbol[0]}</div><span className="status-tag"><i/>Configured</span></div><h2>{n.name}</h2><p>{n.chain} integration adapter</p><div className="network-meta"><span>Connection</span><b>{n.state}</b></div><div className="network-meta"><span>Sample latency</span><b>{n.latency}</b></div><button className="secondary-button full" onClick={() => notify(`${n.name}: demo network details.`)}>View network details <ArrowRight size={15}/></button></div>)}</div>}

          {section === "Analytics" && <><div className="stats-grid"><StatCard title="Sample 24h volume" value="$1.82M" note="Illustrative metric" icon={BarChart3}/><StatCard title="Active listings" value={String(listings.filter(x=>x.status==="Active").length)} note="Local demo records" icon={Store}/><StatCard title="Network coverage" value="4 chains" note="Configured adapters" icon={Globe2}/><StatCard title="System status" value="Healthy" note="Frontend demo" icon={Zap}/></div><div className="panel chart-panel"><div className="panel-head"><div><h2>Marketplace activity</h2><p>Illustrative activity trend</p></div></div><MiniChart/></div></>}

          {section === "Activity" && <div className="panel table-panel"><div className="panel-head"><div><h2>Activity history</h2><p>Sample events generated for the prototype.</p></div></div>{[["Listing published","Polygon","Just now"],["Demo order previewed","Ethereum","2 hours ago"],["Network status checked","Solana","Yesterday"],["Portfolio overview opened","BNB Chain","Yesterday"]].map((r,i)=><div className="activity-row" key={i}><div className="activity-icon"><Activity size={17}/></div><div><b>{r[0]}</b><span>{r[1]}</span></div><time>{r[2]}</time></div>)}</div>}

          {section === "Security" && <div className="security-grid"><div className="panel security-card"><ShieldCheck size={28} className="security-main-icon"/><h2>Security center</h2><p>Prototype security posture and recommended production controls.</p><div className="security-check"><span>✓</span><div><b>Demo mode enabled</b><small>No live transaction signing</small></div></div><div className="security-check"><span>✓</span><div><b>No seed phrase collection</b><small>Wallet secrets are not requested</small></div></div><div className="security-check"><span>!</span><div><b>Production review pending</b><small>Independent security assessment required</small></div></div></div><div className="panel security-card"><h2>Before production</h2><p>Complete these controls before enabling any real-value functionality.</p><ul className="security-list"><li>Threat modeling and penetration testing</li><li>Smart contract audit, if contracts are added</li><li>Secrets management and key isolation</li><li>Abuse monitoring and incident response</li><li>Legal and jurisdictional review</li></ul></div></div>}
          <footer className="footer"><span>© 2026 HAMLAT Ecosystem</span><span><ShieldCheck size={13}/> Prototype · Demo data only</span><button onClick={() => notify("Help center content can be added in the next release.")}><CircleHelp size={14}/> Help center</button></footer>
        </div>
      </section>

      {showCreate && <div className="modal-backdrop" onClick={() => setShowCreate(false)}><form className="modal" onClick={e => e.stopPropagation()} onSubmit={createListing}><div className="modal-head"><div><span className="eyebrow">MARKETPLACE</span><h2>Create demo listing</h2></div><button type="button" className="icon-button" onClick={() => setShowCreate(false)}><X size={18}/></button></div><p className="modal-description">Create a local sample listing to preview the marketplace workflow. Nothing is broadcast to a blockchain.</p><label>Asset<select value={newAsset} onChange={e=>setNewAsset(e.target.value)}><option>USDC</option><option>ETH</option><option>SOL</option><option>BNB</option></select></label><label>Network<select value={newNetwork} onChange={e=>setNewNetwork(e.target.value)}>{networks.map(n=><option key={n.name}>{n.name}</option>)}</select></label><label>Listing type<select value={newSide} onChange={e=>setNewSide(e.target.value as "Buy"|"Sell")}><option>Sell</option><option>Buy</option></select></label><div className="form-two"><label>Display price (USD)<input required min="0.01" step="0.01" type="number" value={newPrice} onChange={e=>setNewPrice(e.target.value)}/></label><label>Demo quantity<input required min="1" type="number" value={newQuantity} onChange={e=>setNewQuantity(e.target.value)}/></label></div><div className="notice"><ShieldCheck size={16}/> Demo only — no payments, escrow or asset transfers.</div><button className="primary-button full" type="submit">Publish demo listing <ArrowRight size={16}/></button></form></div>}
      {toast && <div className="toast"><Copy size={15}/>{toast}</div>}
    </main>
  );
}

function ListingTable({ items, onSelect }: { items: Listing[]; onSelect: () => void }) {
  if (!items.length) return <div className="empty-state">No matching listings. Try changing your filters.</div>;
  return <div className="table-scroll"><table><thead><tr><th>ASSET / NETWORK</th><th>TYPE</th><th>PRICE</th><th>AVAILABLE</th><th>LIMIT</th><th>SELLER</th><th>STATUS</th><th></th></tr></thead><tbody>{items.map(item=><tr key={item.id}><td><div className="asset-cell"><div className="asset-icon">{item.asset.slice(0,1)}</div><div><b>{item.asset}</b><span>{item.network}</span></div></div></td><td><span className={`side-tag ${item.side.toLowerCase()}`}>{item.side}</span></td><td className="strong-cell">{item.price}</td><td>{item.available}</td><td>{item.limit}</td><td>{item.seller}</td><td><span className={`listing-status ${item.status.toLowerCase()}`}><i/>{item.status}</span></td><td><button className="row-action" onClick={onSelect} aria-label="Preview listing"><ArrowRight size={16}/></button></td></tr>)}</tbody></table></div>;
}
