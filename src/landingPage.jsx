import { useEffect, useRef, useState } from "react";
import HomeFeedVideo from "./assets/HomeFeed.mp4";

// ── Scroll-reveal hook
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── Navbar ───────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container navbar-inner">
          <a href="#" className="navbar-logo">Sizzl<span>it</span></a>

          <ul className="navbar-links">
            <li><a href="#discover">Discover</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#restaurants">For Restaurants</a></li>
          </ul>

          <div className="navbar-actions">
            <button className="btn login-btn" onClick={() => (window.location.href = "/")}>
              Login on App
            </button>
            <button className="btn btn-primary" onClick={() => (window.location.href = "/")}>Get Web App</button>
            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        <a href="#discover" onClick={() => setMenuOpen(false)}>Discover</a>
        <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</a>
        <a href="#restaurants" onClick={() => setMenuOpen(false)}>For Restaurants</a>
        <button className="btn btn-primary" onClick={() => setMenuOpen(false)}>Get Web App</button>
      </div>
    </>
  );
}

// ── Hero ─────────────
function Hero() {
   const videoRef = useRef(null);
 
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-overlay" />
        <div className="hero-glow" />
      </div>

      <div className="container">
        <div className="hero-inner">
          {/* Left content */}
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Food discovery, reimagined
            </div>

            <h1 className="hero-title">
             Where Cravings.<br />
              <span className="accent">Discover You.</span>
            </h1>

            <p className="hero-desc">
              Discover dishes through short-form food reels from nearby
              restaurants before you decide what to eat.
            </p>

            <div className="hero-actions">
              <button className="btn btn-primary">
                ▶ Start Exploring
              </button>
              <button className="btn btn-secondary">Ceck Out Web app</button>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value">10k+</span>
                <span className="stat-label">Food Lovers</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">500+</span>
                <span className="stat-label">Restaurants</span>
              </div>
              <div className="stat-item">
                <div className="stat-live">
                  <span className="live-dot" />
                  <span style={{ fontSize: 13, color: "#4caf7d" }}>Live Stories</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right – phone mockup */}
          <div className="hero-visual">
            <div style={{ position: "relative" }}>
              <div className="phone-mockup">
                <div className="phone-screen">
                  <div className="phone-video-wrap">
                    <video
                      ref={videoRef}
                      src={HomeFeedVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400&q=80"
                    >
                    </video>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="phone-floating-badge">
                <span className="badge-count">🍔 340</span>
                <span>craving now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Discover Section ──
function Discover() {
  return (
    <section className="discover" id="discover">
      <div className="container">
        <div className="discover-inner reveal">
          <div className="discover-content">
            <div className="section-tag">🍽️ Visual Menu</div>
            <h2>Discover Food Like Never Before</h2>
            <p>
              Watch short dish videos from nearby restaurants before ordering.
              No more guessing what your food looks like.
            </p>
          </div>
          <div className="discover-visual">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"
              alt="Food discovery"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Features ──────────
function Features() {
  return (
    <section className="features" id="restaurants">
      <div className="container">
        {/* Section heading */}
        <div className="features-heading reveal">
          <h2>
            Not just features.<br />
            <span className="accent">A new way to eat.</span>
          </h2>
          <p>
            Experience food discovery through intelligent signals, seamless social
            planning, and a hub that turns cravings into reality.
          </p>
        </div>
 
        {/* Bento grid */}
        <div className="bento-grid">
 
          {/* ── Foody Meter (wide) ── */}
          <div className="bento-card wide foody-meter-card reveal">
            <div className="foody-meter-layout">
              <div className="foody-meter-text">
                <div className="bento-icon">📊</div>
                <h3>The Foody Meter</h3>
                <p>
                  Our AI analyzes your taste profile and nearby trending dishes to
                  predict your next craving with 98% accuracy.
                </p>
              </div>
              <div className="foody-meter-widget">
                <div className="meter-header">
                  <span className="meter-header-label">Match Score</span>
                  <span className="meter-badge">Based on past orders</span>
                </div>
                <div className="meter-circle-wrap">
                  <div className="meter-circle">
                    <svg viewBox="0 0 110 110">
                      <circle className="meter-circle-track" cx="55" cy="55" r="45" />
                      <circle className="meter-circle-fill" cx="55" cy="55" r="45" />
                    </svg>
                    <div className="meter-circle-label">
                      <span className="meter-pct">96%</span>
                      <span className="meter-sub">High Craving</span>
                    </div>
                  </div>
                </div>
                <div className="meter-spicy-row">
                  <span className="spicy-icon">🌶️</span>
                  <span className="spicy-label">Spicy Level Match</span>
                  <div className="spicy-bar-wrap">
                    <div className="spicy-bar" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Sizzle Hub ── */}
          <div className="bento-card sizzle-hub-card reveal reveal-delay-1">
            <div className="bento-icon muted">⚡</div>
            <h3>Sizzle Hub</h3>
            <p>
              One tap to rule them all. Order, share, or save for later from our
              unified floating action center.
            </p>
            <div className="sizzle-hub-actions">
              {[
                { icon: "🔖", label: "Save" },
                { icon: "📍", label: "Visit"},
                { icon: "↗️", label: "Share" },
              ].map((a) => (
                <div className="hub-action-btn" key={a.label}>
                  <div className="hub-action-icon" >
                    {a.icon}
                  </div>
                  <span className="hub-action-label">
                    {a.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Food Plans ── */}
          <div className="bento-card food-plans-card reveal reveal-delay-2">
            <div className="bento-icon muted">👥</div>
            <h3>Food Plans</h3>
            <p>
              Turn shared cravings into real dinner plans. Invite friends, vote
              on dishes, and book tables seamlessly.
            </p>
            <div className="plans-preview">
              <div className="plans-header">
                <div className="plans-header-left">
                  <span>🗓️</span>
                  <span>Friday Dinner</span>
                </div>
                <div className="plans-avatars">
                  <div className="plans-avatar" />
                  <div className="plans-avatar" />
                  <div className="plans-avatar" />
                </div>
              </div>
              <div className="plans-row">
                <span>Truffle Pasta at Luigi's</span>
                <span className="plans-vote">✓ 3 Votes</span>
              </div>
              <div className="plans-row">
                <span>Spicy Ramen at Koku</span>
                <span className="plans-vote">✓ 1 Vote</span>
              </div>
            </div>
          </div>
 
          {/* ── Vibrant Discussions ── */}
          <div className="bento-card wide discussions-card reveal reveal-delay-1">
            <div className="discussions-layout">
              <div className="discussions-text">
                <div className="bento-icon muted">💬</div>
                <h3>Vibrant Discussions</h3>
                <p>
                  Join the local foodie community. Discuss flavors, hidden menu
                  items, and share your own reviews directly on dish reels.
                </p>
              </div>
              <div className="discussion-comments">
                {[
                  {
                    name: "@spice_queen",
                    time: "2h ago",
                    text: "Ask for the secret chili oil! Makes it 10x better 🔥",
                    color: "#ff6b6b",
                  },
                  {
                    name: "@ramen_guy",
                    time: "6h ago",
                    text: "Is this available for delivery today? Need it ASAP.",
                    color: "#6b8cff",
                  },
                ].map((c, i) => (
                  <div className="discussion-comment" key={i}>
                    <div
                      className="dc-avatar"
                      style={{ background: c.color }}
                    />
                    <div className="dc-content">
                      <div className="dc-header">
                        <span className="dc-name">{c.name}</span>
                        <span className="dc-time">{c.time}</span>
                      </div>
                      <p className="dc-text">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
 
        </div>
      </div>
    </section>
  );
}

// ── How It Works ───────
function HowItWorks() {
  const howSteps = [
    {
      emoji: "📱",
      title: "See It",
      desc: "Scroll through mouth-watering local food reels.",
    },
    {
      emoji: "❤️",
      title: "Crave It",
      desc: "Find the perfect dish and let the craving hit.",
    },
    {
      emoji: "🛵",
      title: "Find It",
      desc: "FInd the hidden gem instantly with one tap.",
    },
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <h2 className="section-heading reveal">How It Works</h2>
        <p className="section-sub reveal reveal-delay-1">
          Three simple steps from craving to eating.
        </p>
        <div className="steps-row">
          {howSteps.map((s, i) => (
            <div className={`step-card reveal reveal-delay-${i + 1}`} key={i}>
              <div className="step-number">{s.emoji}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Feed Section ───────
function FeedSection() {
  const feedItems = [
    {
      img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80",
      label: "Pasta Palace",
      main: false,
    },
    {
      img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80",
      label: "Luigi's Pizzeria",
      main: true,
    },
    {
      img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
      label: "Lazy's Brownie",
      main: false,
    },
  ];

  return (
    <section className="feed-section">
      <div className="container feed-inner">
        <div className="feed-header">
          <div className="section-tag">Food discovery, reimagined</div>
          <h2 className="section-heading">The Feed that Feeds</h2>
        </div>

        <div className="feed-phones">
          {feedItems.map((item, i) => (
            <div
              key={i}
              className={`feed-phone reveal ${item.main ? "main" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="feed-phone-screen">
                <img src={item.img} alt={item.label} />
                <div className="feed-phone-ui">
                  <div className="feed-tabs">
                    <span className="feed-tab active">Following</span>
                    <span className="feed-tab">Nearby</span>
                  </div>
                  <div className="feed-bottom-info">
                    <div className="feed-restaurant">{item.label}</div>
                    {item.main && (
                      <div className="feed-order-btn">Visit Now →</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Partner Section ────
function PartnerSection() {
  const perks = [
    "Upload dish reels in seconds",
    "Reach nearby food lovers looking to eat",
    "Track cravings, saves, and conversions",
    "Turn views into real footfall & orders",
  ];

  return (
    <section className="partner-section">
      <div className="container">
        <div className="partner-inner reveal">
          <div className="partner-content">
            <div className="section-tag">🤝 Partner Program</div>
            <h2>Turn Every Dish Into Discovery</h2>
            <div className="partner-perks">
              {perks.map((p, i) => (
                <div className="perk-item" key={i}>
                  <div className="perk-icon">✓</div>
                  <span>{p}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" onClick={() => (window.location.href = "/register")} >Become a Partner</button>
          </div>

          {/* Dashboard card */}
          <div>
            <div className="dashboard-preview">
              <div className="dashboard-header">
                <h4>Today's Impact</h4>
                <span className="partner-badge">Partner App</span>
              </div>
              <div className="dashboard-stats-row">
                <div className="dash-stat">
                  <div className="dash-stat-label">Reel Views</div>
                  <div className="dash-stat-value">12.4k</div>
                  <div className="dash-stat-change">↑ 34% today</div>
                </div>
                <div className="dash-stat">
                  <div className="dash-stat-label">Orders</div>
                  <div className="dash-stat-value">842</div>
                  <div className="dash-stat-change">↑ 18% today</div>
                </div>
              </div>
              <div className="top-dish">
                <div className="top-dish-label">Top Dish</div>
                <div className="top-dish-name">Spicy Tuna Roll · 5.2k views</div>
                <div className="top-dish-bar-wrap">
                  <div className="top-dish-bar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ───────
function Testimonials() {
  const reviews = [
    {
      quote:
        "Found my favourite hidden ramen spot here. The video discovery makes it so much better than just looking at photos.",
      name: "Alex Chen",
      role: "Food Lover",
      color: "#ff6b1a",
    },
    {
      quote:
        "Instagram reels for food but actually useful. I love that I can instantly order what I see without leaving the app.",
      name: "Sarah Jenkins",
      role: "Foodie & Blogger",
      color: "#4caf7d",
    },
    {
      quote:
        "The Crave Meter is surprisingly accurate. If a dish is trending on Sizzlt, you know it's going to be amazing.",
      name: "Marcus Doe",
      role: "Restaurant Critic",
      color: "#6b8cff",
    },
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials-header">
          <h2 className="section-heading reveal">Loved by foodies</h2>
        </div>
        <div className="testimonials-grid">
          {reviews.map((r, i) => (
            <div
              className={`testimonial-card reveal reveal-delay-${i + 1}`}
              key={i}
            >
              <p className="testimonial-quote">"{r.quote}"</p>
              <div className="testimonial-author">
                <div
                  className="author-avatar"
                  style={{ background: r.color }}
                />
                <div className="author-info">
                  <h5>{r.name}</h5>
                  <p>{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ────────────────
function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-inner reveal">
          <h2>
            Ready to discover what to eat <span className="accent">differently?</span>
          </h2>
          <p>Join thousands of food lovers already using Sizzlt.</p>
          <div className="cta-actions">
            <button className="btn btn-primary" onClick={() => (window.location.href = "/register")} >Join Sizzlt</button>
            <button className="btn btn-outline">Partner With Us</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-logo">Sizzl<span>it</span></div>
        <ul className="footer-links">
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Instagram</a></li>
        </ul>
        <div className="footer-credit">Made for food lovers ✦</div>
      </div>
    </footer>
  );
}

// ── Main Export ─────────────────────────
export default function Landing() {
  useReveal();

  return (
    <>
      <Navbar />
      <Hero />
      <Discover />
      <Features />
      <HowItWorks />
      <FeedSection />
      <PartnerSection />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}