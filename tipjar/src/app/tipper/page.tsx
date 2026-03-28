import styles from './tipper.module.css';

export default function TipperPage() {
  return (
    <main className={styles.tipperPage}>
      <div className={styles.container}>
        {/* ── Hero Header ── */}
        <section className={styles.heroSection}>
          <div className={styles.heroAccentTop} />
          <div className={styles.heroAccentSecondary} />

          <div className={styles.titleRow}>
            <div className={styles.titleAccentBar} />
            <h1 className={styles.pageTitle}>Tippers</h1>
          </div>

          <p className={styles.heroDescription}>
            Discover creators and communities thriving with Cardano Hydra-powered tipping. Join
            the decentralized revolution in rewarding talent.
          </p>
        </section>

        {/* ── Post Card ── */}
        <article className={styles.postCard}>
          <div className={styles.postCardInner}>
            <div className={styles.postImageWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.postImage}
                src="https://api.builder.io/api/v1/image/assets/TEMP/600386d05c0ece07eae26a1ea72d2ba65da7eeae?width=1093"
                alt="[C2VN]: Hydra on Cardano – Complete Step-by-Step DApp Guide"
              />
            </div>

            <div className={styles.postBody}>
              <h2 className={styles.postTitle}>
                [C2VN]: Hydra on Cardano – Complete Step-by-Step DApp Guide
              </h2>

              <div className={styles.postMeta}>
                <div className={styles.postMetaLeft}>
                  <span className={styles.postDate}>03/12/2025, 09:36</span>
                  <span className={styles.postAuthor}>by cardano2vn</span>
                  <span className={styles.postParticipants}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M7.99998 2.66675C7.29274 2.66675 6.61446 2.9477 6.11436 3.4478C5.61426 3.94789 5.33331 4.62617 5.33331 5.33341C5.33331 6.04066 5.61426 6.71894 6.11436 7.21903C6.61446 7.71913 7.29274 8.00008 7.99998 8.00008C8.70722 8.00008 9.3855 7.71913 9.8856 7.21903C10.3857 6.71894 10.6666 6.04066 10.6666 5.33341C10.6666 4.62617 10.3857 3.94789 9.8856 3.4478C9.3855 2.9477 8.70722 2.66675 7.99998 2.66675ZM7.99998 9.33341C5.42665 9.33341 3.33331 10.5267 3.33331 12.0001V13.3334H12.6666V12.0001C12.6666 10.5267 10.5733 9.33341 7.99998 9.33341Z" stroke="#99A1AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    2 participants
                  </span>
                </div>

                <a href="#" className={styles.readMoreLink}>
                  Read More
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M6 3.33325L10.6667 7.99992L6 12.6666" stroke="#51A2FF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* ── Footer ── */}
      <div className={styles.footerWrapper}>
        <footer className={styles.footer}>
          <div className={styles.footerDivider} />

          <div className={styles.footerLinksGrid}>
            {/* Stay Connected */}
            <div className={styles.footerColumn}>
              <div className={styles.footerColumnAccent} />
              <h3 className={styles.footerColumnTitle}>Stay Connected with Cardano2VN</h3>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#" className={styles.footerLink}>
                    <span className={styles.footerLinkDash} />
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    <span className={styles.footerLinkDash} />
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    <span className={styles.footerLinkDash} />
                    Docs
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className={styles.footerColumn}>
              <div className={styles.footerColumnAccent} />
              <h3 className={styles.footerColumnTitle}>Follow Us</h3>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#" className={styles.footerLink}>
                    <span className={styles.footerLinkDash} />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    <span className={styles.footerLinkDash} />
                    Twitter
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className={styles.footerColumn}>
              <div className={styles.footerColumnAccent} />
              <h3 className={styles.footerColumnTitle}>Company</h3>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#" className={styles.footerLink}>
                    <span className={styles.footerLinkDash} />
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    <span className={styles.footerLinkDash} />
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal */}
          <div className={styles.footerLegalSection}>
            <div className={styles.footerLegalAccent} />
            <h3 className={styles.footerLegalTitle}>Legal</h3>
            <ul className={styles.footerLinks}>
              <li>
                <a href="#" className={styles.footerLink}>
                  <span className={styles.footerLinkDash} />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  <span className={styles.footerLinkDash} />
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>

          {/* Bottom Bar */}
          <div className={styles.footerBottomBar}>
            <div className={styles.footerBrand}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Cardano2VN logo">
                <circle cx="13" cy="13" r="12" stroke="#2B7FFF" strokeWidth="2"/>
                <circle cx="13" cy="13" r="6" fill="#2B7FFF" fillOpacity="0.3"/>
                <circle cx="13" cy="13" r="3" fill="#2B7FFF"/>
              </svg>
              <span className={styles.footerBrandText}>Trust Protocol for Distributed Work</span>
            </div>

            <div className={styles.footerCopyright}>
              <div className={styles.footerThemeIcons}>
                {/* Sun icon */}
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M13 17.3334C15.3932 17.3334 17.3333 15.3933 17.3333 13.0001C17.3333 10.6068 15.3932 8.66675 13 8.66675C10.6067 8.66675 8.66663 10.6068 8.66663 13.0001C8.66663 15.3933 10.6067 17.3334 13 17.3334Z" fill="#D1DFFA" stroke="#D1DFFA" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 2.16675V4.33341" stroke="#D1DFFA" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 21.6667V23.8334" stroke="#D1DFFA" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.34082 5.34082L6.86832 6.86832" stroke="#D1DFFA" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.1317 19.1316L20.6592 20.6591" stroke="#D1DFFA" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.16663 13H4.33329" stroke="#D1DFFA" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21.6666 13H23.8333" stroke="#D1DFFA" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.86832 19.1316L5.34082 20.6591" stroke="#D1DFFA" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20.6592 5.34082L19.1317 6.86832" stroke="#D1DFFA" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {/* Moon icon */}
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M13 3.25C11.7071 4.54293 10.9807 6.29652 10.9807 8.125C10.9807 9.95348 11.7071 11.7071 13 13C14.2929 14.2929 16.0465 15.0193 17.875 15.0193C19.7035 15.0193 21.4571 14.2929 22.75 13C22.75 14.9284 22.1782 16.8134 21.1068 18.4168C20.0355 20.0202 18.5127 21.2699 16.7312 22.0078C14.9496 22.7458 12.9892 22.9389 11.0979 22.5627C9.20656 22.1865 7.46927 21.2579 6.10571 19.8943C4.74215 18.5307 3.81355 16.7934 3.43735 14.9021C3.06114 13.0108 3.25422 11.0504 3.99218 9.26884C4.73013 7.48726 5.97982 5.96452 7.58319 4.89317C9.18657 3.82183 11.0716 3.25 13 3.25Z" fill="#8B9DC1" stroke="#8B9DC1" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={styles.footerSeparator}>|</span>
              <span className={styles.footerCopyrightText}>© 2025 Cardano2VN. All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
