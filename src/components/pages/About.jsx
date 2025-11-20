export default function About(){
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">من نحن</h1>
      <p className="text-white/80 leading-8">
        Promparty Rent شركة ليبية متخصصة في تأجير العقارات الراقية عبر مدن ليبيا. رؤيتنا تقديم تجربة سكن وعمل راقية تعتمد على الجودة، الشفافية، والالتزام. رسالتنا توفير خيارات متنوعة تلائم الأفراد والشركات مع خدمة سريعة ودعم متواصل.
      </p>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {[
          {t:'رسالتنا', d:'تمكين العملاء من العثور على عقارهم المثالي بسرعة وموثوقية.'},
          {t:'رؤيتنا', d:'أن نكون منصة التأجير الأولى بمعايير فاخرة في ليبيا.'},
          {t:'قيمنا', d:'النزاهة، الجودة، الاحترام، خدمة العملاء.'},
        ].map((i,idx)=> (
          <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
            <p className="text-xl font-semibold text-yellow-400">{i.t}</p>
            <p className="text-white/70 mt-2">{i.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 p-6 rounded-2xl bg-slate-900/60 border border-white/10">
        <p className="font-semibold mb-2">لماذا Promparty Rent؟</p>
        <ul className="list-disc list-inside text-white/80 space-y-1">
          <li>شبكة واسعة من العقارات الموثوقة في المدن الرئيسية.</li>
          <li>عمليات حجز سهلة وسريعة عبر الهاتف والواتساب.</li>
          <li>تقييمات ممتازة وتجربة عملاء مميزة.</li>
        </ul>
      </div>
    </div>
  )
}
