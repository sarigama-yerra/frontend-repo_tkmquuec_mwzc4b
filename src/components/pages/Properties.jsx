import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Properties(){
  const [items,setItems]=useState([])
  const [filters,setFilters]=useState({city:'',type:'',min:'',max:''})

  const load=async()=>{
    const base= import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const params = new URLSearchParams()
    if(filters.city) params.append('city', filters.city)
    if(filters.type) params.append('type', filters.type)
    if(filters.min) params.append('min_price', filters.min)
    if(filters.max) params.append('max_price', filters.max)
    const res= await fetch(`${base}/properties?${params.toString()}`)
    const data = await res.json()
    setItems(data)
  }

  useEffect(()=>{ load() },[])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">العقارات</h1>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <input className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2" placeholder="المدينة" value={filters.city} onChange={e=>setFilters({...filters, city:e.target.value})}/>
        <select className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2" value={filters.type} onChange={e=>setFilters({...filters, type:e.target.value})}>
          <option value="">النوع</option>
          <option>شقة</option>
          <option>فيلا</option>
          <option>مكتب</option>
          <option>قاعة</option>
        </select>
        <input className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2" placeholder="أدنى سعر" value={filters.min} onChange={e=>setFilters({...filters, min:e.target.value})}/>
        <input className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2" placeholder="أقصى سعر" value={filters.max} onChange={e=>setFilters({...filters, max:e.target.value})}/>
      </div>
      <button onClick={load} className="mb-8 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg">تطبيق الفلاتر</button>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(p=> (
          <Link to={`/properties/${p.id}`} key={p.id} className="group rounded-2xl overflow-hidden bg-slate-900/60 border border-white/10">
            <div className="h-48 overflow-hidden">
              <img src={p.images?.[0] || '/hero-fallback.jpg'} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
            </div>
            <div className="p-4">
              <p className="font-semibold">{p.title}</p>
              <p className="text-sm text-white/60 mt-1">{p.city} • {p.type}</p>
              <p className="text-yellow-400 font-bold mt-2">{p.price} د.ل / {p.price_unit}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
