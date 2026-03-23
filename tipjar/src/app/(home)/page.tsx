"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="home-page">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="home-header">
        <div className="home-header-inner">
          <Link href="/" className="home-brand">
            <div className="home-brand-logo-wrap">
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/154e0a997d1a2c34c1381b6c408eff3acb9ae278?width=76"
                alt="Tipjar Hydra logo"
                width={38}
                height={40}
                className="home-brand-logo"
              />
            </div>
            <span className="home-brand-name">Tipjar Hydra</span>
          </Link>

          <nav className="home-nav">
            <div className="home-nav-item home-nav-item--active">
              <Link href="/" className="home-nav-link home-nav-link--active">Home</Link>
              <span className="home-nav-active-bar" />
              <span className="home-nav-active-dot" />
            </div>
            <div className="home-nav-item">
              <Link href="/dashboard" className="home-nav-link">Dashboard</Link>
            </div>
            <div className="home-nav-item">
              <Link href="/tipper" className="home-nav-link">Tipper</Link>
            </div>
            <div className="home-nav-item">
              <Link href="/documents" className="home-nav-link">Documents</Link>
            </div>
          </nav>

          <div className="home-header-social">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="#D1D5DC" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="4" stroke="#D1D5DC" strokeWidth="1.5"/>
              <circle cx="17.5" cy="6.5" r="1" fill="#D1D5DC"/>
            </svg>
            <span className="home-header-social-text">add_testjgy_eozD</span>
            <span className="home-header-social-amount">42.000000 ₳</span>
          </div>
        </div>
      </header>

      {/* ── Hero Section ───────────────────────────────────────── */}
      <section className="home-hero" id="landing">
        {/* Background watermark text */}
        <div className="home-hero-watermark" aria-hidden="true">
          <div className="home-hero-watermark-text home-hero-watermark-text--xl">HYDRA</div>
          <div className="home-hero-watermark-text home-hero-watermark-text--lg">TIPJAR</div>
          <div className="home-hero-watermark-text home-hero-watermark-text--md">MICROPAYMENTS FOR CARDAN</div>
        </div>

        <div className="home-hero-content">
          <div className="home-hero-grid">
            {/* Left: text + CTA */}
            <div className="home-hero-text-col">
              <h1 className="home-hero-heading">
                <span className="home-hero-heading-white">Decentralized</span>
                <span className="home-hero-heading-gradient">Tippin</span>
                <span className="home-hero-powered">Powered by Cardano Hydra</span>
              </h1>

              <div className="home-hero-desc-wrap">
                <p className="home-hero-desc-bold">
                  <strong>Send and receive tips instantly</strong> with negligible fees using
                  Cardano Layer 2 Hydra protocol. Empower creators an communities with fast,
                  secure, and open-source micropayments
                </p>
                <p className="home-hero-desc-sub">Open participation. Global opportunity</p>
              </div>

              <div className="home-hero-cta">
                <Link href="/dashboard" className="home-cta-primary">Go to Dashboard</Link>
                <Link href="#trust" className="home-cta-secondary">Learn More</Link>
              </div>
            </div>

            {/* Right: screenshot cards */}
            <div className="home-hero-images">
              <div className="home-screenshot-card home-screenshot-card--back">
                <Image
                  src="https://api.builder.io/api/v1/image/assets/TEMP/4fcae44ec4b7be62cd4c2f262d0f3f3fd340e549?width=416"
                  alt="Dashboard preview"
                  fill
                  className="home-screenshot-img"
                />
                <div className="home-screenshot-overlay home-screenshot-overlay--blue" />
                <div className="home-screenshot-content">
                  <div className="home-screenshot-bar" />
                  <div className="home-screenshot-lines">
                    <div className="home-screenshot-line home-screenshot-line--wide" />
                    <div className="home-screenshot-line home-screenshot-line--narrow" />
                  </div>
                </div>
              </div>

              <div className="home-screenshot-card home-screenshot-card--front">
                <Image
                  src="https://api.builder.io/api/v1/image/assets/TEMP/c02df10a404664a8f8463b98ab3cd33dc2f72c8d?width=480"
                  alt="Tipper preview"
                  fill
                  className="home-screenshot-img"
                />
                <div className="home-screenshot-overlay home-screenshot-overlay--purple" />
              </div>
            </div>
          </div>
        </div>

        {/* NEXT scroll indicator */}
        <div className="home-scroll-indicator home-scroll-indicator--next">
          <span className="home-scroll-label">NEXT</span>
          <div className="home-scroll-line" />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6666 9.33333L7.99992 14M7.99992 14L3.33325 9.33333M7.99992 14V2" stroke="white" strokeOpacity="0.6" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ── Three Pillars Section ──────────────────────────────── */}
      <section className="home-pillars" id="trust">
        <div className="home-pillars-content">
          {/* Header */}
          <div className="home-pillars-header">
            <div className="home-pillars-title-row">
              <div className="home-pillars-accent-bar" />
              <h2 className="home-pillars-title">Three Pillars of Hydra TipJar</h2>
            </div>
            <p className="home-pillars-subtitle">
              Hydra TipJar empowers decentralized tipping on Cardano, fostering trust through transparency,
              community engagement, and verifiable contributions.
            </p>
          </div>

          {/* Timeline */}
          <div className="home-pillars-timeline">
            {/* Vertical gradient line */}
            <div className="home-pillars-vline" aria-hidden="true" />

            {/* Pillar 1 — Transparency (left) */}
            <div className="home-pillar-row">
              <div className="home-pillar-card-wrap home-pillar-card-wrap--left">
                <div className="home-pillar-glow home-pillar-glow--violet" />
                <div className="home-pillar-card">
                  <div className="home-pillar-card-header">
                    <div className="home-pillar-icon home-pillar-icon--violet">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.6668 16V29.3333H5.3335V16" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M29.3332 9.33325H2.6665V15.9999H29.3332V9.33325Z" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 29.3333V9.33325" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.9998 9.33341H9.99984C9.11578 9.33341 8.26794 8.98223 7.64281 8.3571C7.01769 7.73198 6.6665 6.88414 6.6665 6.00008C6.6665 5.11603 7.01769 4.26818 7.64281 3.64306C8.26794 3.01794 9.11578 2.66675 9.99984 2.66675C14.6665 2.66675 15.9998 9.33341 15.9998 9.33341Z" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 9.33341H22C22.8841 9.33341 23.7319 8.98223 24.357 8.3571C24.9821 7.73198 25.3333 6.88414 25.3333 6.00008C25.3333 5.11603 24.9821 4.26818 24.357 3.64306C23.7319 3.01794 22.8841 2.66675 22 2.66675C17.3333 2.66675 16 9.33341 16 9.33341Z" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="home-pillar-title-wrap">
                      <h3 className="home-pillar-name">Transparency</h3>
                      <div className="home-pillar-underline home-pillar-underline--violet" />
                    </div>
                  </div>
                  <p className="home-pillar-question home-pillar-question--violet">Can we trust the tipping process?</p>
                  <p className="home-pillar-body">
                    Hydra TipJar leverages Cardano&apos;s blockchain to ensure <strong>transparent and auditable tipping</strong>, so every contribution is trackable and secure.
                  </p>
                </div>
              </div>

              {/* Node */}
              <div className="home-pillar-node-wrap">
                <div className="home-pillar-node-ring home-pillar-node-ring--violet" />
                <div className="home-pillar-node home-pillar-node--violet" />
              </div>

              {/* Number label */}
              <div className="home-pillar-number-wrap home-pillar-number-wrap--right">
                <span className="home-pillar-number home-pillar-number--violet">01</span>
                <span className="home-pillar-number-label home-pillar-number-label--violet">Clarity</span>
              </div>
            </div>

            {/* Pillar 2 — Community (right) */}
            <div className="home-pillar-row home-pillar-row--reverse">
              {/* Number label */}
              <div className="home-pillar-number-wrap home-pillar-number-wrap--left">
                <span className="home-pillar-number home-pillar-number--blue">02</span>
                <span className="home-pillar-number-label home-pillar-number-label--blue">Engagement</span>
              </div>

              {/* Node */}
              <div className="home-pillar-node-wrap">
                <div className="home-pillar-node-ring home-pillar-node-ring--blue" />
                <div className="home-pillar-node home-pillar-node--blue" />
              </div>

              <div className="home-pillar-card-wrap home-pillar-card-wrap--right">
                <div className="home-pillar-glow home-pillar-glow--blue" />
                <div className="home-pillar-card">
                  <div className="home-pillar-card-header">
                    <div className="home-pillar-icon home-pillar-icon--blue">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.3334 28V25.3333C21.3334 23.9188 20.7715 22.5623 19.7713 21.5621C18.7711 20.5619 17.4146 20 16.0001 20H8.00008C6.58559 20 5.22904 20.5619 4.22885 21.5621C3.22865 22.5623 2.66675 23.9188 2.66675 25.3333V28" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12.0001 14.6667C14.9456 14.6667 17.3334 12.2789 17.3334 9.33333C17.3334 6.38781 14.9456 4 12.0001 4C9.05456 4 6.66675 6.38781 6.66675 9.33333C6.66675 12.2789 9.05456 14.6667 12.0001 14.6667Z" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M29.3333 28V25.3333C29.3324 24.1516 28.9391 23.0037 28.2151 22.0698C27.4911 21.1358 26.4774 20.4688 25.3333 20.1733" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21.3333 4.17334C22.4805 4.46707 23.4973 5.13427 24.2234 6.06975C24.9496 7.00523 25.3437 8.15578 25.3437 9.34001C25.3437 10.5242 24.9496 11.6748 24.2234 12.6103C23.4973 13.5457 22.4805 14.2129 21.3333 14.5067" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="home-pillar-title-wrap">
                      <h3 className="home-pillar-name">Community</h3>
                      <div className="home-pillar-underline home-pillar-underline--blue" />
                    </div>
                  </div>
                  <p className="home-pillar-question home-pillar-question--blue">Do we trust the contributors we support?</p>
                  <p className="home-pillar-body">
                    Hydra TipJar enables seamless onboarding and <strong>community-driven tipping</strong>, rewarding creators and fostering collaborative ecosystems.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 3 — Verification (left) */}
            <div className="home-pillar-row">
              <div className="home-pillar-card-wrap home-pillar-card-wrap--left">
                <div className="home-pillar-glow home-pillar-glow--green" />
                <div className="home-pillar-card">
                  <div className="home-pillar-card-header">
                    <div className="home-pillar-icon home-pillar-icon--green">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.6668 17.3334C26.6668 24.0001 22.0002 27.3334 16.4535 29.2668C16.1646 29.3695 15.8491 29.3695 15.5602 29.2668C10.0002 27.3334 5.3335 24.0001 5.3335 17.3334V8.0001C5.3335 7.64648 5.47397 7.30734 5.72402 7.05729C5.97407 6.80724 6.31321 6.66676 6.66683 6.66676C9.3335 6.66676 12.6668 6.0001 16.0002 3.6001C19.3335 6.0001 22.6668 6.66676 25.3335 6.66676C25.6871 6.66676 26.0263 6.80724 26.2763 7.05729C26.5264 7.30734 26.6668 7.64648 26.6668 8.0001V17.3334Z" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 14.6667L14.6667 17.3333L20 12" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="home-pillar-title-wrap">
                      <h3 className="home-pillar-name">Verification</h3>
                      <div className="home-pillar-underline home-pillar-underline--green" />
                    </div>
                  </div>
                  <p className="home-pillar-question home-pillar-question--green">Can we trust the integrity of contributions?</p>
                  <p className="home-pillar-body">
                    Blockchain-based verification ensures tips are <strong>secure and authentic</strong>, enabling creators to build trust through verified contributions.
                  </p>
                </div>
              </div>

              {/* Node */}
              <div className="home-pillar-node-wrap">
                <div className="home-pillar-node-ring home-pillar-node-ring--green" />
                <div className="home-pillar-node home-pillar-node--green" />
              </div>

              {/* Number label */}
              <div className="home-pillar-number-wrap home-pillar-number-wrap--right">
                <span className="home-pillar-number home-pillar-number--green">03</span>
                <span className="home-pillar-number-label home-pillar-number-label--green">Security</span>
              </div>
            </div>
          </div>
        </div>

        {/* SCROLL indicator */}
        <div className="home-scroll-indicator">
          <span className="home-scroll-label">SCROLL</span>
          <div className="home-scroll-line" />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6666 9.33333L7.99992 14M7.99992 14L3.33325 9.33333M7.99992 14V2" stroke="white" strokeOpacity="0.6" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ── Join Our Team Section ──────────────────────────────── */}
      <section className="home-contact" id="contact">
        <div className="home-contact-content">
          {/* Heading */}
          <div className="home-contact-header">
            <div className="home-contact-title-row">
              <div className="home-contact-accent-bar home-contact-accent-bar--left" />
              <h2 className="home-contact-title">Join Our Team</h2>
              <div className="home-contact-accent-bar home-contact-accent-bar--right" />
            </div>
            <p className="home-contact-subtitle">
              Ready to contribute to the Cardano ecosystem? We are always looking for passionate individuals who want to make a difference in the blockchain space.
            </p>
          </div>

          {/* Form card */}
          <div className="home-contact-card">
            <form className="home-contact-form">
              <div className="home-form-row">
                <div className="home-form-field">
                  <label className="home-form-label">Full Name *</label>
                  <input
                    type="text"
                    className="home-form-input"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="home-form-field">
                  <label className="home-form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="home-form-input"
                    placeholder="+84 123 456 789"
                  />
                </div>
              </div>
              <div className="home-form-field">
                <label className="home-form-label">Email Address</label>
                <input
                  type="email"
                  className="home-form-input"
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="home-form-field">
                <label className="home-form-label">Message</label>
                <textarea
                  className="home-form-textarea"
                  placeholder="Tell us about your inquiry..."
                  rows={4}
                />
              </div>
              <button type="submit" className="home-form-submit">Send Message</button>
            </form>
          </div>

          {/* Back to top */}
          <div className="home-back-top">
            <Link href="#landing" className="home-back-top-link">
              <span>BACK TO HOME</span>
              <div className="home-scroll-line" />
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33325 6.66667L7.99992 2M7.99992 2L12.6666 6.66667M7.99992 2V14" stroke="white" strokeOpacity="0.6" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="home-footer">
        <div className="home-footer-inner">
          <div className="home-footer-top-line" aria-hidden="true" />

          <div className="home-footer-grid">
            {/* Col 1: Stay Connected */}
            <div className="home-footer-col">
              <div className="home-footer-col-accent" />
              <h3 className="home-footer-col-title">Stay Connected with Cardano2VN</h3>
              <ul className="home-footer-links">
                <li><Link href="#" className="home-footer-link"><span className="home-footer-link-dash" />Support</Link></li>
                <li><Link href="#" className="home-footer-link"><span className="home-footer-link-dash" />Contact Us</Link></li>
                <li><Link href="#" className="home-footer-link"><span className="home-footer-link-dash" />Docs</Link></li>
              </ul>
            </div>

            {/* Col 2: Follow Us */}
            <div className="home-footer-col">
              <h3 className="home-footer-col-title">Follow Us</h3>
              <ul className="home-footer-links">
                <li><Link href="#" className="home-footer-link"><span className="home-footer-link-dash" />LinkedIn</Link></li>
                <li><Link href="#" className="home-footer-link"><span className="home-footer-link-dash" />Twitter</Link></li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div className="home-footer-col">
              <h3 className="home-footer-col-title">Company</h3>
              <ul className="home-footer-links">
                <li><Link href="#" className="home-footer-link"><span className="home-footer-link-dash" />About</Link></li>
                <li><Link href="#" className="home-footer-link"><span className="home-footer-link-dash" />Roadmap</Link></li>
              </ul>
            </div>
          </div>

          {/* Legal */}
          <div className="home-footer-legal-section">
            <h4 className="home-footer-legal-title">Legal</h4>
            <ul className="home-footer-links">
              <li><Link href="#" className="home-footer-link"><span className="home-footer-link-dash" />Privacy Policy</Link></li>
              <li><Link href="#" className="home-footer-link"><span className="home-footer-link-dash" />Terms of Use</Link></li>
            </ul>
          </div>

          {/* Bottom bar */}
          <div className="home-footer-bottom">
            <div className="home-footer-bottom-brand">
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/154e0a997d1a2c34c1381b6c408eff3acb9ae278?width=76"
                alt="Tipjar Hydra"
                width={24}
                height={26}
                className="home-footer-bottom-logo"
              />
              <span className="home-footer-tagline">Trust Protocol for Distributed Work</span>
            </div>
            <div className="home-footer-bottom-right">
              <div className="home-footer-theme-icons">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="13" cy="13" r="4.333" fill="#D1DFFA" stroke="#D1DFFA" strokeWidth="2.167" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 2.167V4.333" stroke="#D1DFFA" strokeWidth="2.167" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 21.667V23.833" stroke="#D1DFFA" strokeWidth="2.167" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.341 5.341L6.868 6.868" stroke="#D1DFFA" strokeWidth="2.167" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.132 19.132L20.659 20.659" stroke="#D1DFFA" strokeWidth="2.167" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.167 13H4.333" stroke="#D1DFFA" strokeWidth="2.167" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21.667 13H23.833" stroke="#D1DFFA" strokeWidth="2.167" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.868 19.132L5.341 20.659" stroke="#D1DFFA" strokeWidth="2.167" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20.659 5.341L19.132 6.868" stroke="#D1DFFA" strokeWidth="2.167" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 3.25C11.707 4.543 10.981 6.297 10.981 8.125C10.981 9.953 11.707 11.707 13 13C14.293 14.293 16.047 15.019 17.875 15.019C19.704 15.019 21.457 14.293 22.75 13C22.75 14.928 22.178 16.813 21.107 18.417C20.036 20.02 18.513 21.27 16.731 22.008C14.95 22.746 12.989 22.939 11.098 22.563C9.207 22.187 7.469 21.258 6.106 19.894C4.742 18.531 3.814 16.793 3.437 14.902C3.061 13.011 3.254 11.05 3.992 9.269C4.73 7.487 5.98 5.965 7.583 4.893C9.187 3.822 11.072 3.25 13 3.25Z" fill="#8B9DC1" stroke="#8B9DC1" strokeWidth="2.167" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="home-footer-divider">|</span>
              <span className="home-footer-copyright">© 2025 Cardano2VN. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
