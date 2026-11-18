"use client";
import {useMemo,useState} from "react";
import {PageHeader} from "@/components/common/page-header";
import {ListingFilters} from "@/components/marketplace/listing-filters";
import {ListingTable} from "@/components/marketplace/listing-table";
import {demoListings} from "@/lib/demo-data";
export default function Marketplace(){const [items,setItems]=useState(demoListings),[q,setQ]=useState(""),[net,setNet]=useState("All networks"),[side,setSide]=useState("All");const filtered=useMemo(()=>items.filter(x=>(x.asset.toLowerCase().includes(q.toLowerCase())||x.seller.toLowerCase().includes(q.toLowerCase()))&&(net==="All networks"||x.network===net)&&(side==="All"||x.side===side)),[items,q,net,side]);function add(){setItems(v=>[{id:`DEMO-${Date.now()}`,asset:"USDC",network:"Polygon",side:"Sell",price:"$1.00",available:"250 USDC",limit:"$25–$250",seller:"You · demo",status:"Active"},...v])}return <div className="stack"><PageHeader eyebrow="PEER-TO-PEER" title="Marketplace" description="Explore sample listings and preview marketplace workflows." action={<button className="primary" onClick={add}>+ Create demo listing</button>}/><section className="panel padded"><ListingFilters query={q} setQuery={setQ} network={net} setNetwork={setNet} side={side} setSide={setSide}/><ListingTable items={filtered}/></section></div>}
