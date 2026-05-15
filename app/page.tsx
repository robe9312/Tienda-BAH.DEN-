import { Header as Navbar } from '@/components/header';
import { Hero } from '@/components/hero';
import { CategoryScroll } from '@/components/category-scroll';
import { ProductCard } from '@/components/product-card';
import { Footer } from '@/components/footer';
import { demoProducts } from '@/lib/products';

export default function Home() {
  const featuredProducts = demoProducts.filter(p => p.is_featured);
  const otherProducts = demoProducts.filter(p => !p.is_featured);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <Hero />
      
      <div id="catalog" className="relative z-10">
        <CategoryScroll />

        {/* Featured Section */}
        <section className="py-20 px-6 bg-obsidian text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 blur-[100px] -z-10" />
          
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="space-y-4">
                <span className="text-primary font-accent tracking-[0.5em] text-xs uppercase">Premium Selection</span>
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter">
                  Productos <span className="text-primary-foreground underline decoration-primary underline-offset-8">Highlight</span>
                </h2>
              </div>
              <p className="max-w-xs text-xs text-muted-foreground tracking-widest font-light leading-relaxed">
                Ingeniería de vanguardia seleccionada para los líderes del mañana. Rendimiento superior sin compromisos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Full Collection Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 border-l-4 border-primary pl-8">
              <h2 className="font-display text-3xl font-bold tracking-widest uppercase">Ecosistema Completo</h2>
              <p className="text-muted-foreground text-sm tracking-widest mt-2 uppercase font-accent">Explora la gama completa de tecnología futurista</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Brand Banner */}
        <section className="py-40 bg-mesh relative flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 space-y-8 px-6">
            <h2 className="font-display text-4xl md:text-7xl font-bold tracking-[0.2em] text-white">
              FUTURE <span className="text-primary glow-primary">IS NOW</span>
            </h2>
            <p className="max-w-xl mx-auto text-sm md:text-lg text-white/60 tracking-[0.3em] font-light italic">
              &quot;La tecnología es el arte de lo posible. En BAH.DAN, hacemos lo imposible, cotidiano.&quot;
            </p>
            <div className="h-[1px] w-40 bg-primary mx-auto" />
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
