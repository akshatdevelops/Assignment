import React, { useEffect, useState } from 'react'
 import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid,
} from "recharts";  
 import './Dashboard.css'

 const revenueData = [
  { day: "Monday", online: 15000, offline: 12000 },
  { day: "Tuesday", online: 22000, offline: 9000 },
  { day: "Wednesday", online: 10000, offline: 7000 },
  { day: "Thursday", online: 18000, offline: 11000 },
  { day: "Friday", online: 8000, offline: 6000 },
  { day: "Saturday", online: 14000, offline: 10000 },
  { day: "Sunday", online: 20000, offline: 13000 },
];
const visitorData = [
  { m: "Jan", loyal: 200, new: 250, unique: 300 },
  { m: "Feb", loyal: 250, new: 200, unique: 280 },
  { m: "Mar", loyal: 220, new: 260, unique: 250 },
  { m: "Apr", loyal: 280, new: 300, unique: 260 },
  { m: "May", loyal: 260, new: 340, unique: 300 },
  { m: "Jun", loyal: 300, new: 380, unique: 330 },
  { m: "Jul", loyal: 340, new: 360, unique: 380 },
  { m: "Aug", loyal: 310, new: 320, unique: 340 },
  { m: "Sep", loyal: 280, new: 290, unique: 310 },
  { m: "Oct", loyal: 260, new: 270, unique: 290 },
  { m: "Nov", loyal: 240, new: 260, unique: 270 },
  { m: "Dec", loyal: 220, new: 250, unique: 260 },
];
const satisfactionData = [
  { m: "Jan", last: 3500, curr: 4200 },
  { m: "Feb", last: 3300, curr: 4000 },
  { m: "Mar", last: 3800, curr: 4400 },
  { m: "Apr", last: 3600, curr: 4700 },
  { m: "May", last: 3400, curr: 4300 },
  { m: "Jun", last: 3900, curr: 4800 },
  { m: "Jul", last: 3700, curr: 4600 },
];
const targetData = [
  { m: "Jan", reality: 6, target: 8 },
  { m: "Feb", reality: 7, target: 9 },
  { m: "Mar", reality: 8, target: 7 },
  { m: "Apr", reality: 6, target: 10 },
  { m: "May", reality: 9, target: 12 },
  { m: "Jun", reality: 10, target: 11 },
  { m: "Jul", reality: 8, target: 13 },
];
const volumeData = [
  { m: "Jan", volume: 800, service: 400 },
  { m: "Feb", volume: 600, service: 500 },
  { m: "Mar", volume: 900, service: 350 },
  { m: "Apr", volume: 700, service: 450 },
  { m: "May", volume: 850, service: 500 },
];
const topProducts = [
  { rank: "01", name: "Home Decor Range", pop: 45, sales: "45%", color: "#3b82f6" },
  { rank: "02", name: "Disney Princess Pink Bag 18'", pop: 29, sales: "29%", color: "#22c55e" },
  { rank: "03", name: "Bathroom Essentials", pop: 18, sales: "18%", color: "#8b5cf6" },
  { rank: "04", name: "Apple Smartwatches", pop: 25, sales: "25%", color: "#f59e0b" },
];
const navItems = [
  { label: "Dashboard", icon: "▦", active: true },
  { label: "Leaderboard", icon: "☰" },
  { label: "Order", icon: "🛒" },
  { label: "Products", icon: "📦" },
  { label: "Sales Report", icon: "📈" },
  { label: "Messages", icon: "💬" },
  { label: "Settings", icon: "⚙" },
  { label: "Sign Out", icon: "⇦" },
];
const stats = [
  { label: "Total Sales", value: "$1k", delta: "+8% from yesterday", icon: "🛍", color: "red" },
  { label: "Total Order", value: "300", delta: "+5% from yesterday", icon: "📦", color: "orange" },
  { label: "Product Sold", value: "5", delta: "+1.2% from yesterday", icon: "✓", color: "green" },
  { label: "New Customers", value: "8", delta: "+0.5% from yesterday", icon: "👥", color: "purple" },
];
const Dashboard = () => {
  const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const [city, setCity] = useState("");
    const [sortDir, setSortDir] = useState("asc");
    useEffect(() => {
      let cancelled = false;
      setLoading(true);
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((r) => {
          if (!r.ok) throw new Error("Failed to fetch users");
          return r.json();
        })
        .then((data) => {
          if (!cancelled) {
            setUsers(data);
            setLoading(false);
          }
        })
        .catch((e) => {
          if (!cancelled) {
            setError(e.message);
            setLoading(false);
          }
        });
      return () => { cancelled = true; };
    }, []);
    const cities = useMemo(
      () => Array.from(new Set(users.map((u) => u.address?.city).filter(Boolean))).sort(),
      [users],
    );
    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      let list = users.filter((u) => {
        const matchQ =
          !q ||
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q);
        const matchC = !city || u.address?.city === city;
        return matchQ && matchC;
      });
      list = list.slice().sort((a, b) =>
        sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      );
      return list;
    }, [users, query, city, sortDir]);



  return (
    <div className='dashboard'>
        <aside className="sidebar">
        <div className="logo">
          <div className="logo-mark" />
          <span>Dabang</span>
        </div>
        {navItems.map((n) => (
          <div key={n.label} className={n.active ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">{n.icon}</span>
            <span>{n.label}</span>
          </div>
        ))}
        <div className='pro-card'>
            <h4>Dabang Pro</h4>
            <p>Get access to all features</p>
            <button>Get Pro</button>
        </div>
      </aside>
      <main className='main'>
        <div className='topbar'>
         <h1 className='page-title'>Dashboard</h1>
         <div className='search'>
           <input placeholder='Search here...'/>
         </div>
         <div className='top-right'>
            <div className='chip'>
                Eng (US)
            </div>
            <div className='bell'>🔔</div>
            <div className='user'>
                <div className='avatar'>M</div>
            </div>
            <div>
                <div className='user-name'>Musfiq</div>
                <div className='user-role'>Admin</div>
            </div>
  
         </div>
        </div>
         <div className="grid">
                  <div className="card">
                    <div className="card-header">
                      <div>
                        <h3 className="card-title">Today's Sales</h3>
                        <div className="card-sub">Sales Summary</div>
                      </div>
                      <button className="export-btn">⬇ Export</button>
                    </div>
                    <div className="stats">
                      {stats.map((s) => (
                        <div key={s.label} className={`stat ${s.color}`}>
                          <div className="stat-icon">{s.icon}</div>
                          <p className="stat-value">{s.value}</p>
                          <p className="stat-label">{s.label}</p>
                          <p className="stat-delta">{s.delta}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Visitor Insights</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart data={visitorData}>
                        <CartesianGrid stroke="#f1f3f6" vertical={false} />
                        <XAxis dataKey="m" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: 11 }} />
                        <Line type="monotone" dataKey="loyal" stroke="#8b5cf6" strokeWidth={2} dot={false} name="Loyal Customers" />
                        <Line type="monotone" dataKey="new" stroke="#ef4444" strokeWidth={2} dot={false} name="New Customers" />
                        <Line type="monotone" dataKey="unique" stroke="#22c55e" strokeWidth={2} dot={false} name="Unique Customers" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
        
        <div className='card table-card'>
            <div className='card-header'>
                <div>
                    <h3>Users Directory</h3>
                    <div className='card-sub'>Data from API</div>
                </div>
            </div>
            <div className='controls'>
                <input placeholder='Search by name or email...' value={query}
                onChange={(e)=>setQuery(e.target.value)}/>
                <select value={city} onChange={(e)=>setCity(e.target.value)}>
                    <option value="">All Cities</option>
                    {cities.map((c)=><option key={c} value={c}>{c}</option>)}
                </select>
                <select value={sortDir} onChange={(e)=>setSortDir(e.target.value)}>
                    <option value="asc">Name A-Z</option>
                    <option value="asc">Name Z-A</option> 
                </select>
            </div>
            {loading && <div className='loading'>Loading Users...</div>}
            {error && <div className='error'>Error:{error}</div>}
            {!loading && !error && (

                <table className='users'>
                    <thead>
                        <tr>
                            <th onClick={()=>setSortDir(sortDir==="asc"?"desc":"asc")}>
                                Name {sortDir==="asc"?"🔼":"🔽"}
                            </th>
                            <th>Email</th>
                            <th>Company Name</th>
                            <th>City</th>

                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((u)=>(
                            <tr key={u.id}>
                               <td>{u.name}</td>
                               <td>{u.email}</td>
                               <td>{u.company?.name}</td>
                                <td>{u.company?.city}</td>
                            </tr>
                        ))}
                        {filtered.length===0 && (
                            <tr>
                                <td colSpan={4}> No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

        </div>
      </main>


    </div>
  )
}

export default Dashboard