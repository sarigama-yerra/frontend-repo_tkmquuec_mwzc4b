import { useState, useEffect } from 'react'

export default function Booking(){
  const params = new URLSearchParams(window.location.search)
  const [form, setForm] = useState({property_id: params.get('property') || '', name:'', phone:'', start_date:'', end_date:'', notes:''})
  const [status, setStatus] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    setStatus('جار الإرسال...')
    try{
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/book`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)})
      const data = await res.json()
      setStatus(data.message || 'تم الاستلام')
      setForm({property_id:'', name:'', phone:'', start_date:'', end_date:'', notes:''})
    }catch(e){ setStatus('حدث خطأ.. حاول لاحقًا') }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">طلب حجز</h1>
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
        <input required className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2" placeholder="معرف العقار" value={form.property_id} onChange={e=>setForm({...form, property_id:e.target.value})}/>
        <input required className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2" placeholder="الاسم" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input required className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2" placeholder="الهاتف" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
        <input required type="date" className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2" value={form.start_date} onChange={e=>setForm({...form, start_date:e.target.value})}/>
        <input required type="date" className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2" value={form.end_date} onChange={e=>setForm({...form, end_date:e.target.value})}/>
        <textarea rows={5} className="md:col-span-2 bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2" placeholder="ملاحظات" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})}/>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg">إرسال الطلب</button>
      </form>
      {status && <p className="mt-4 text-sm text-white/70">{status}</p>}
    </div>
  )
}
