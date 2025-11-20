export default function Services(){
  const items = [
    {t:'تأجير عقارات', d:'شقق، فلل، مكاتب، وقاعات فعاليات بمعايير فاخرة.'},
    {t:'تأجير فعاليات', d:'خدمات مخصصة للفعاليات والمناسبات الخاصة.'},
    {t:'عقود طويلة الأجل', d:'خيارات مرنة للإقامات الممتدة بأسعار تنافسية.'},
    {t:'وحدات مؤثثة', d:'تجهيز كامل مع إنترنت وتجهيزات متكاملة.'},
    {t:'حجوزات VIP', d:'خدمة خاصة لكبار الشخصيات بإشراف مباشر.'},
  ]
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">الخدمات</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((i,idx)=> (
          <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
            <p className="text-xl font-semibold text-yellow-400">{i.t}</p>
            <p className="text-white/70 mt-2">{i.d}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
