import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function PropertyDetails(){
  const { id } = useParams()
  const [item, setItem] = useState(null)

  useEffect(()=>{
    const load=async()=>{
      const base= import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res= await fetch(`${base}/properties/${id}`)
      const data = await res.json()
      setItem(data)
    }
    load()
  },[id])

  if(!item) return <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">...جار التحميل</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="rounded-2xl overflow-hidden bg-slate-900/60 border border-white/10">
          {/* Fallback gallery */}
          <div className="grid grid-cols-3 gap-1 p-1">
            {(item.images || []).map((src, idx)=> (
              <img key={idx} src={src} alt={item.title} className="w-full h-40 object-cover"/>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
          <p className="text-white/70 mb-4">{item.city} • {item.type} • {item.size ? `${item.size} م²` : ''}</p>
          <p className="text-yellow-400 font-bold text-xl mb-6">{item.price} د.ل / {item.price_unit}</p>

          <h3 className="font-semibold mb-2">الوصف</h3>
          <p className="text-white/80 mb-4">{item.description}</p>

          <h3 className="font-semibold mb-2">المزايا</h3>
          <ul className="flex flex-wrap gap-2 mb-6">
            {(item.amenities||[]).map((a, i)=> (
              <li key={i} className="text-sm bg-slate-800/60 border border-white/10 rounded-full px-3 py-1">{a}</li>
            ))}
          </ul>

          <div className="flex gap-3">
            <a href={item.location_map || '#'} target="_blank" rel="noreferrer" className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-white/10">الموقع على الخريطة</a>
            <Link to={`/booking?property=${item.id}`} className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg">حجز الآن</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
