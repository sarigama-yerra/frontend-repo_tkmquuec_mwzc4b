import { useState } from 'react'

export default function Contact(){
  const [form, setForm] = useState({name:'', email:'', phone:'', message:''})
  const [status, setStatus] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    setStatus('جار الإرسال...')
    try{
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/contact`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)})
      const data = await res.json()
      setStatus(data.message || 'تم الاستلام')
      setForm({name:'', email:'', phone:'', message:''})
    }catch(e){ setStatus('حدث خطأ.. حاول لاحقًا') }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">تواصل معنا</h1>
      <p className="text-white/70 mb-6">يسعدنا تواصلكم للاستفسار عن أي عقار أو خدمة.</p>
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
        <input required className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2" placeholder="الاسم" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2" placeholder="البريد الإلكتروني" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2" placeholder="رقم الهاتف" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
        <textarea required rows={5} className="md:col-span-2 bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2" placeholder="رسالتك" value={form.message} onChange={e=>setForm({...form, message:e.target.value})}/>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg">إرسال</button>
      </form>
      {status && <p className="mt-4 text-sm text-white/70">{status}</p>}
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">الهاتف: +218 91 000 0000</div>
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">البريد: info@promparty.ly</div>
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">الموقع: ليبيا</div>
      </div>
    </div>
  )
}
