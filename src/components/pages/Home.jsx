import { Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Lazy load three.js only on capable devices
function useThreeCapability() {
  const [capable, setCapable] = useState(false)
  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent)
    const hasWebGL = (() => {
      try {
        const canvas = document.createElement('canvas')
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        )
      } catch (e) { return false }
    })()
    setCapable(hasWebGL && !isMobile)
  }, [])
  return capable
}

function ThreeHero() {
  const canvasRef = useRef(null)
  useEffect(() => {
    let renderer, scene, camera, mesh, frame
    import('three').then(THREE => {
      const { WebGLRenderer, Scene, PerspectiveCamera, Color, AmbientLight, DirectionalLight, MeshStandardMaterial, Mesh, BoxGeometry } = THREE
      renderer = new WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true })
      const w = canvasRef.current.clientWidth
      const h = canvasRef.current.clientHeight
      renderer.setSize(w, h, false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))

      scene = new Scene()
      scene.background = null

      camera = new PerspectiveCamera(45, w / h, 0.1, 100)
      camera.position.set(2.5, 1.8, 3.5)

      const amb = new AmbientLight(0xffffff, 0.8)
      scene.add(amb)
      const dir = new DirectionalLight(0xffffff, 1)
      dir.position.set(5, 10, 7)
      scene.add(dir)

      const material = new MeshStandardMaterial({ color: 0xc9a227, metalness: 0.6, roughness: 0.35 })
      const geo = new BoxGeometry(1.4, 2.2, 1.4)
      mesh = new Mesh(geo, material)
      scene.add(mesh)

      const onResize = () => {
        const w2 = canvasRef.current.clientWidth
        const h2 = canvasRef.current.clientHeight
        renderer.setSize(w2, h2, false)
        camera.aspect = w2 / h2
        camera.updateProjectionMatrix()
      }
      window.addEventListener('resize', onResize)

      const animate = () => {
        frame = requestAnimationFrame(animate)
        mesh.rotation.y += 0.01
        mesh.rotation.x = 0.1
        renderer.render(scene, camera)
      }
      animate()

      return () => {
        cancelAnimationFrame(frame)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
      }
    })
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

export default function Home() {
  const capable = useThreeCapability()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,#fde68a20,transparent_60%),radial-gradient(circle_at_80%_20%,#1e3a8a40,transparent_50%)]" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center px-4 sm:px-6 py-20">
          <div className="order-2 lg:order-1">
            <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              تأجير عقارات فاخرة في ليبيا
            </motion.h1>
            <p className="mt-4 text-white/80 text-lg">
              Promparty Rent — خيارك الموثوق لتأجير الشقق، الفلل، المكاتب وقاعات الفعاليات بمعايير راقية وخدمة سريعة.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/properties" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg">
                استكشف العقارات
              </Link>
              <Link to="/booking" className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg border border-white/10">
                احجز الآن
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-yellow-400">+500</p>
                <p className="text-sm text-white/60">عقار مُدار</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-400">+1200</p>
                <p className="text-sm text-white/60">حجز ناجح</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-400">24/7</p>
                <p className="text-sm text-white/60">دعم مستمر</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 h-[420px] md:h-[520px] rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/60 border border-white/10 overflow-hidden relative">
            {capable ? (
              <Suspense fallback={<img src="/hero-fallback.jpg" alt="عقار فاخر" className="w-full h-full object-cover" /> }>
                <ThreeHero />
                {/* Hotspots */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-6 top-10 bg-black/60 text-white text-xs px-3 py-2 rounded-full border border-yellow-500/40">تشطيب فاخر</div>
                  <div className="absolute right-8 bottom-10 bg-black/60 text-white text-xs px-3 py-2 rounded-full border border-yellow-500/40">إضاءة ذكية</div>
                </div>
              </Suspense>
            ) : (
              <img src="/hero-fallback.jpg" alt="عقار فاخر" className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {t:"عقود آمنة", d:"إجراءات تعاقد موثقة لحماية حقوق الطرفين."},
            {t:"خدمة موثوقة", d:"فريق محترف وتجربة راقية من البداية للنهاية."},
            {t:"حجز سريع", d:"تأكيد فوري عبر الهاتف أو الواتساب."},
          ].map((i,idx)=> (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
              <p className="text-xl font-semibold text-yellow-400">{i.t}</p>
              <p className="text-white/70 mt-2">{i.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured properties */}
      <Featured />

      {/* Testimonials */}
      <Testimonials />
    </div>
  )
}

function Featured(){
  const [items,setItems]=useState([])
  useEffect(()=>{
    const load=async()=>{
      try{
        const base= import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res= await fetch(`${base}/properties`)
        const data = await res.json()
        setItems(data.slice(0,6))
      }catch(e){
        setItems([])
      }
    }
    load()
  },[])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">عقارات مميزة</h2>
        <Link to="/properties" className="text-yellow-400 hover:text-yellow-300">عرض الكل</Link>
      </div>
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
    </section>
  )
}

function Testimonials(){
  const [items,setItems]=useState([])
  useEffect(()=>{
    const load=async()=>{
      try{
        const base= import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res= await fetch(`${base}/testimonials`)
        const data = await res.json()
        setItems(data)
      }catch(e){setItems([])}}
    load()
  },[])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <h2 className="text-2xl font-bold mb-6">آراء عملائنا</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((t)=> (
          <div key={t.id} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
            <p className="text-white/80">“{t.content}”</p>
            <div className="mt-4 text-sm text-white/60">{t.name} • {t.city || 'ليبيا'}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
