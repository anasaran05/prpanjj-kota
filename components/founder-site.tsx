'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Check, Diamond, ExternalLink, Menu, Send, Sparkles, X } from 'lucide-react'
import { content } from '@/lib/content'
import { IntroSplash } from '@/components/intro-splash'

const reveal = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }
const transition = { duration: 0.65, ease: 'easeOut' as const }

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label">{children}</p>
}

export function FacetGlint({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`facet-glint ${className}`} />
}

export function SiteHeader({ isReady = false }: { isReady?: boolean }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const navLinks = [
    { href: '#origin', label: 'Story' },
    { href: '#reia', label: 'Réia' },
    { href: '#craft', label: 'Craft' },
    { href: '#journey', label: 'Journey' },
    { href: '#journal', label: 'Journal' },
    { href: '#press', label: 'Press' },
  ]

  const handleNavClick = () => {
    setIsMobileNavOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="site-header"
      >
        <div className="header-inner">
          <a href="#" className="brand-logo" aria-label="Prapanjj Kota Homepage">
            <span className="brand-icon">❖</span>
            <span className="brand-name">
              Prapanjj<span className="brand-dot" />
            </span>
          </a>

          <nav className="header-nav" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <span className="location-pill">BLR, IN 🇮🇳</span>
            <a
              href="https://www.linkedin.com/in/prapanjj-s-k-kota/"
              target="_blank"
              rel="noreferrer"
              className="header-cta-btn diamond-btn"
            >
              <Diamond size={11} className="diamond-btn-icon" strokeWidth={2.4} />
              <span>Connect</span>
            </a>

            <button
              type="button"
              className="mobile-nav-toggle-btn"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              aria-label={isMobileNavOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileNavOpen}
            >
              {isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Drawer / Overlay */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-nav-overlay"
          >
            <div className="mobile-nav-backdrop" onClick={() => setIsMobileNavOpen(false)} />
            <div className="mobile-nav-inner">
              <div className="mobile-nav-header">
                <a href="#" onClick={handleNavClick} className="brand-logo" aria-label="Prapanjj Kota Homepage">
                  <span className="brand-icon">❖</span>
                  <span className="brand-name">
                    Prapanjj<span className="brand-dot" />
                  </span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="mobile-nav-close-btn"
                  aria-label="Close Navigation"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="mobile-nav-links">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.04 }}
                    className="mobile-nav-link"
                  >
                    <span className="mobile-nav-idx">0{idx + 1}</span>
                    <span className="mobile-nav-text">{link.label}</span>
                    <ArrowUpRight size={16} className="mobile-nav-arrow" />
                  </motion.a>
                ))}
              </div>

              <div className="mobile-nav-footer">
                <div className="mobile-nav-location">
                  <span className="location-dot" />
                  <span>BLR, IN 🇮🇳 · Available Globally</span>
                </div>
                <a
                  href="https://www.linkedin.com/in/prapanjj-s-k-kota/"
                  target="_blank"
                  rel="noreferrer"
                  className="mobile-nav-cta-btn diamond-primary-btn"
                  onClick={handleNavClick}
                >
                  <span className="diamond-shimmer-sweep" />
                  <Diamond size={13} className="diamond-btn-sparkle" strokeWidth={2.4} />
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight size={14} className="diamond-btn-arrow" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function Hero({ isReady = false }: { isReady?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  function move(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - r.left - r.width / 2)
    y.set(e.clientY - r.top - r.height / 2)
  }

  const sx = useSpring(x, { stiffness: 80, damping: 25 })
  const sy = useSpring(y, { stiffness: 80, damping: 25 })

  return (
    <section id="hero" ref={ref} onMouseMove={move} className="hero-reference-wrapper">
      <SiteHeader isReady={isReady} />

      <div className="hero-editorial-container">
        {/* Floating subtle ambient diamond optics */}
        <motion.div
          style={{
            x: useTransform(sx, [-500, 500], [-25, 25]),
            y: useTransform(sy, [-400, 400], [-18, 18]),
          }}
          className="hero-glint"
        >
          <FacetGlint />
        </motion.div>

        {/* Split Stage: Left Display Typography & CTAs, Right Portrait */}
        <div className="hero-split-stage">
          {/* Left Column: Headlines, CTAs */}
          <div className="hero-left-content">
            {/* Display Headlines */}
            <div className="hero-display-typography">
              <motion.h1
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={isReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.96 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
                className="hero-line-solid"
              >
                {content.hero.titleLine1}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={isReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.96 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
                className="hero-line-outline"
              >
                {content.hero.titleLine2}
              </motion.div>
            </div>

            {/* Step 5: Dual Action Buttons */}
            <div className="hero-cta-button-group">
              <motion.a
                href="https://reia.diamonds"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={isReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
                className="hero-primary-btn diamond-primary-btn"
              >
                <span className="diamond-shimmer-sweep" />
                <Diamond size={13} className="diamond-btn-sparkle" strokeWidth={2.4} />
                <span>Explore Réia</span>
              </motion.a>
              <motion.a
                href="#origin"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={isReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.78 }}
                className="hero-secondary-btn diamond-secondary-btn"
              >
                <span className="diamond-shimmer-sweep" />
                <span>How I Started</span>
                <ArrowUpRight size={14} className="diamond-btn-arrow" />
              </motion.a>
            </div>
          </div>

          {/* Step 4: Cutout Portrait Layer */}
          <motion.div
            initial={{ opacity: 0, y: 55, scale: 0.92 }}
            animate={isReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 55, scale: 0.92 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.52 }}
            className="hero-right-portrait"
          >
            <Image
              src="/prapanj.png"
              alt="Prapanjj Kota — Diamantaire & Investor"
              width={540}
              height={640}
              priority
              className="hero-portrait-img"
            />
          </motion.div>
        </div>

        {/* Step 6 & 7: Bottom Information & Sequential Badges */}
        <div className="hero-bottom-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.88 }}
            className="hero-position-col"
          >
            <p className="hero-tagline-text">{content.hero.tagline}</p>
            <span className="hero-location-text">{content.hero.location}</span>
          </motion.div>

          <div className="hero-badges-col">
            {content.hero.badges.map((badge) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, y: 16, x: -8 }}
                animate={isReady ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 16, x: -8 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: badge.delay }}
                className="credential-badge-item"
              >
                <span className="badge-name">{badge.name}</span>
                <span className="badge-sub">{badge.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const voiceStatements = [
  'Do things differently.',
  'Build something intentional.',
  'Entrepreneur by heart.',
  'Ready to talk your ear off about something new.',
]

export function VoiceStrip() {
  return (
    <section className="voice-strip" aria-label="In my own words">
      <div className="marquee-track">
        <div className="marquee-segment">
          {voiceStatements.map((text, i) => (
            <span key={i}>
              {text}
              <Diamond size={14} />
            </span>
          ))}
        </div>
        <div className="marquee-segment" aria-hidden="true">
          {voiceStatements.map((text, i) => (
            <span key={`clone-${i}`}>
              {text}
              <Diamond size={14} />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Origin() {
  return (
    <section id="origin" className="section-frame section-space origin-section">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={reveal}
        transition={transition}
        className="section-intro"
      >
        <SectionLabel>{content.origin.label}</SectionLabel>
        <h2>{content.origin.title}</h2>
      </motion.div>

      <div className="origin-grid">
        <div className="origin-narrative-col">
          <p className="origin-lead-text">{content.origin.lead}</p>
          <div className="origin-paragraphs">
            {content.origin.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <div className="origin-path-track">
            <span className="path-track-label">The Lineage</span>
            <div className="path-nodes-flow">
              {content.origin.progression.map((step, idx) => (
                <span key={step} className="path-node-item">
                  <strong>{step}</strong>
                  {idx < content.origin.progression.length - 1 && (
                    <span className="path-arrow">→</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="origin-visual-col">
          <div className="origin-legacy-badge">
            <span className="legacy-diamond-icon">❖</span>
            <div className="legacy-badge-meta">
              <span className="legacy-years">100+ YEARS</span>
              <span className="legacy-title">Family Diamond Heritage</span>
            </div>
            <p className="legacy-quote">
              “From my family’s roots in Kota Diamonds to building Réia — understanding the stone before building the brand.”
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Reia() {
  return (
    <section id="reia" className="section-frame section-space reia-editorial-section">
      <div className="reia-editorial-grid">
        {/* Left Column: Title + Narrative + CTA */}
        <div className="reia-editorial-col-left">
          <div className="section-intro">
            <SectionLabel>{content.reia.label}</SectionLabel>
            <p className="section-subtitle-tag">{content.reia.subtitle}</p>
            <div className="reia-logo-mobile-wrap">
              <Image
                src="/reia logo.avif"
                alt="Réia Diamonds"
                width={260}
                height={84}
                className="reia-mobile-logo-img"
              />
            </div>
            <h2>{content.reia.title}</h2>
          </div>

          <div className="reia-editorial-main">
            <p className="reia-lead-body">{content.reia.body}</p>

            <div className="reia-store-showcase">
              <div className="reia-store-img-wrap">
                <Image
                  src="/store.png"
                  alt="Réia Diamonds Flagship Studio"
                  width={785}
                  height={440}
                  className="reia-store-img"
                />
              </div>
              <p className="reia-flagship-note">{content.reia.flagshipNote}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Centered Logo above Card + Promises Deck + CTA */}
        <div className="reia-editorial-col-right">
          <div className="reia-logo-hero-wrap">
            <Image
              src="/reia logo.avif"
              alt="Réia Diamonds"
              width={320}
              height={102}
              className="reia-top-logo-img"
            />
          </div>

          <div className="reia-promises-deck">
            <h3 className="promises-deck-heading">The Réia Standard</h3>
            <div className="promise-grid">
              {content.reia.promises.map((promise, i) => (
                <div key={promise} className="promise-item-card">
                  <Diamond size={16} className="promise-diamond" />
                  <span className="promise-index">0{i + 1}</span>
                  <p>{promise}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reia-cta-wrapper reia-cta-right">
            <a
              href="https://reia.diamonds"
              target="_blank"
              rel="noreferrer"
              className="hero-primary-btn diamond-primary-btn"
            >
              <span className="diamond-shimmer-sweep" />
              <Diamond size={13} className="diamond-btn-sparkle" strokeWidth={2.4} />
              <span>Explore Réia Diamonds</span>
              <ArrowUpRight size={14} className="diamond-btn-arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Craft() {
  return (
    <section id="craft" className="section-frame section-space craft-section">
      <div className="section-intro">
        <SectionLabel>{content.craft.label}</SectionLabel>
        <p className="section-subtitle-tag">{content.craft.subtitle}</p>
        <h2>{content.craft.title}</h2>
      </div>

      <div className="craft-pillars-grid">
        {content.craft.pillars.map((pillar, index) => (
          <motion.article
            key={pillar.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: index * 0.08 }}
            className="craft-pillar-card"
          >
            <div className="craft-card-top">
              <span className="craft-number-badge">{pillar.number}</span>
              <Diamond size={15} className="craft-spark" />
            </div>

            {pillar.image && (
              <div className="craft-card-img-wrap">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  width={600}
                  height={380}
                  className="craft-card-img"
                />
              </div>
            )}

            <div className="craft-card-body">
              <h3 className="craft-card-title">{pillar.title}</h3>
              <p className="craft-card-desc">{pillar.desc}</p>
            </div>
            <div className="craft-card-border" />
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export function Journey() {
  return (
    <section id="journey" className="section-frame section-space journey-editorial-section">
      <div className="section-intro">
        <SectionLabel>{content.journey.label}</SectionLabel>
        <p className="section-subtitle-tag">{content.journey.subtitle}</p>
        <h2>{content.journey.title}</h2>
      </div>

      <div className="timeline-editorial">
        {content.journey.milestones.map(([date, event], index) => (
          <motion.div
            key={date}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
            transition={{ ...transition, delay: index * 0.05 }}
            className="timeline-row"
          >
            <span className="timeline-date">{date}</span>
            <p className="timeline-event-text">{event}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function Journal() {
  return (
    <section id="journal" className="section-frame section-space journal-section">
      <div className="section-intro">
        <SectionLabel>{content.journal.label}</SectionLabel>
        <p className="section-subtitle-tag">{content.journal.subtitle}</p>
        <h2>{content.journal.title}</h2>
      </div>

      <div className="journal-cards-grid">
        {content.journal.entries.map((entry, index) => (
          <motion.article
            key={entry.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: index * 0.08 }}
            className="journal-entry-card"
          >
            <div className="journal-card-header">
              <span className="journal-tag">{entry.tag}</span>
              <span className="journal-read-time">{entry.readTime}</span>
            </div>
            <h3 className="journal-entry-title">“{entry.title}”</h3>
            <p className="journal-entry-excerpt">{entry.excerpt}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export function Press() {
  return (
    <section id="press" className="press section-space">
      <div className="section-frame">
        <SectionLabel>{content.press.label}</SectionLabel>
        <p className="section-subtitle-tag">{content.press.subtitle}</p>
        <h2>{content.press.title}</h2>

        {/* Curated Media Publications Ticker */}
        <div className="press-ticker-wrapper" aria-label="Media Outlets">
          <div className="press-marquee">
            <div className="press-marquee-segment">
              {content.pressOutlets.map((outlet, i) => (
                <span key={i} className="press-marquee-outlet">
                  {outlet}
                  <Diamond size={10} className="press-outlet-spark" />
                </span>
              ))}
            </div>
            <div className="press-marquee-segment" aria-hidden="true">
              {content.pressOutlets.map((outlet, i) => (
                <span key={`clone-${i}`} className="press-marquee-outlet">
                  {outlet}
                  <Diamond size={10} className="press-outlet-spark" />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Press Articles */}
        <div className="press-list">
          {content.press.articles.map((item) => (
            <a
              key={item.headline}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="press-list-row"
            >
              <div className="press-row-info">
                <span className="press-outlet-tag">{item.outlet}</span>
                <strong className="press-article-title">{item.headline}</strong>
              </div>
              <span className="press-read-action">
                Read story <ArrowUpRight size={15} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Closing() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle')
  const [topic, setTopic] = useState('Partnership')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const topics = ['Partnership', 'Investment', 'Speaking / Press', 'General']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return
    setFormStatus('submitting')
    setTimeout(() => {
      setFormStatus('submitted')
    }, 900)
  }

  return (
    <section id="contact" className="closing dark-section">
      <div className="section-frame section-space closing-inner">
        <FacetGlint />
        
        <div className="closing-grid">
          <div className="closing-content">
            <SectionLabel>{content.connect.label}</SectionLabel>
            <h2>{content.connect.title}</h2>
            <p>{content.connect.body}</p>

            <div className="closing-actions">
              <a
                className="cta diamond-cta-btn"
                href={content.connect.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <span className="diamond-shimmer-sweep" />
                <Diamond size={15} className="diamond-btn-sparkle" strokeWidth={2.2} />
                <span>Connect on LinkedIn</span>
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>

          <div className="closing-form-container">
            <div className="contact-form-card">
              <div className="contact-form-header">
                <div className="contact-badge">
                  <span className="contact-badge-dot" />
                  <span>Direct Message</span>
                </div>
                <h3 className="contact-form-title">Start a Conversation</h3>
              </div>

              {formStatus === 'submitted' ? (
                <motion.div 
                  className="contact-success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="contact-success-icon">
                    <Check size={28} />
                  </div>
                  <h4>Message Dispatched</h4>
                  <p>Thank you, {formData.name || 'there'}. I’ll review your note and get back to you shortly.</p>
                  <button 
                    type="button" 
                    className="contact-reset-btn"
                    onClick={() => {
                      setFormStatus('idle')
                      setFormData({ name: '', email: '', message: '' })
                    }}
                  >
                    Send another note
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-topics-wrapper">
                    <span className="contact-field-label">Topic</span>
                    <div className="contact-topic-chips" role="radiogroup" aria-label="Select inquiry topic">
                      {topics.map((t) => (
                        <button
                          key={t}
                          type="button"
                          className={`contact-topic-chip ${topic === t ? 'active' : ''}`}
                          onClick={() => setTopic(t)}
                          role="radio"
                          aria-checked={topic === t}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="contact-fields-row">
                    <div className="contact-form-group">
                      <label htmlFor="contact-name">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="contact-form-input"
                      />
                    </div>
                    <div className="contact-form-group">
                      <label htmlFor="contact-email">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="contact-form-input"
                      />
                    </div>
                  </div>

                  <div className="contact-form-group">
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      placeholder="Tell me about your idea or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="contact-form-textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="contact-submit-btn"
                  >
                    {formStatus === 'submitting' ? (
                      <span className="contact-btn-loader">Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Massive Editorial Wordmark */}
        <div className="footer-wordmark-container" aria-hidden="true">
          <span className="footer-wordmark">PRAPANJJ KOTA</span>
        </div>

        <footer>
          <span>© {new Date().getFullYear()} Prapanjj Kota</span>
          <span>Diamantaire & Investor · Founder & CEO, Réia</span>
        </footer>
      </div>
    </section>
  )
}

export function FounderSite() {
  const [isReady, setIsReady] = useState(false)

  return (
    <>
      <IntroSplash
        onStartExit={() => setIsReady(true)}
        onComplete={() => setIsReady(true)}
      />
      <main>
        <Hero isReady={isReady} />
        <VoiceStrip />
        <Origin />
        <Reia />
        <Craft />
        <Journey />
        <Journal />
        <Press />
        <Closing />
      </main>
    </>
  )
}



