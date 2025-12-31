export default function Hero() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-background">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 pt-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-primary font-medium tracking-widest uppercase text-sm">
                Authentic African Cuisine
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight">
                A Journey Through
                <span className="block text-primary">African Flavors</span>
              </h1>
              <p className="text-foreground-muted text-lg leading-relaxed max-w-lg">
                Experience the rich culinary heritage of Africa. From the aromatic
                spices of Ethiopia to the bold flavors of West Africa, every dish
                tells a story of tradition and passion.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#menu"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-background font-medium rounded-none hover:bg-primary-hover transition-colors"
              >
                View Menu
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground font-medium rounded-none hover:border-primary hover:text-primary transition-colors"
              >
                Our Story
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-light text-primary">15+</div>
                <div className="text-sm text-foreground-muted mt-1">African Countries</div>
              </div>
              <div>
                <div className="text-3xl font-light text-primary">50+</div>
                <div className="text-sm text-foreground-muted mt-1">Signature Dishes</div>
              </div>
              <div>
                <div className="text-3xl font-light text-primary">10k+</div>
                <div className="text-sm text-foreground-muted mt-1">Happy Guests</div>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative hidden lg:block">
            <div className="aspect-[4/5] bg-gradient-to-br from-card to-background-secondary border border-border relative">
              {/* Decorative frame */}
              <div className="absolute inset-4 border border-primary/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-8xl">🍲</div>
                  <p className="text-foreground-muted text-sm tracking-widest uppercase">
                    Crafted with Love
                  </p>
                </div>
              </div>
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 border border-primary/20" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-foreground-muted">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-foreground-muted to-transparent" />
        </div>
      </div>
    </section>
  );
}
