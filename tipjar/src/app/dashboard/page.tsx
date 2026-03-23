import styles from './dashboard.module.css';

export default function DashboardPage() {
  return (
    <main className={styles.dashboardPage}>
      <div className={styles.dashboardContainer}>

        {/* ── Status Banner ── */}
        <div className={styles.statusBanner}>
          <div className={styles.statusIconWrapper}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.20837 7.18333C3.08674 6.63544 3.10542 6.0657 3.26267 5.52695C3.41992 4.9882 3.71066 4.49787 4.10793 4.10143C4.5052 3.705 4.99613 3.41529 5.53521 3.25916C6.07429 3.10304 6.64407 3.08555 7.19171 3.20833C7.49313 2.73692 7.90837 2.34897 8.39916 2.08024C8.88995 1.81151 9.44049 1.67065 10 1.67065C10.5596 1.67065 11.1101 1.81151 11.6009 2.08024C12.0917 2.34897 12.5069 2.73692 12.8084 3.20833C13.3568 3.08502 13.9276 3.10242 14.4675 3.25893C15.0075 3.41543 15.4991 3.70595 15.8966 4.10346C16.2941 4.50097 16.5846 4.99256 16.7411 5.5325C16.8976 6.07244 16.915 6.64319 16.7917 7.19167C17.2631 7.49309 17.6511 7.90834 17.9198 8.39912C18.1885 8.88991 18.3294 9.44046 18.3294 10C18.3294 10.5595 18.1885 11.1101 17.9198 11.6009C17.6511 12.0917 17.2631 12.5069 16.7917 12.8083C16.9145 13.356 16.897 13.9257 16.7409 14.4648C16.5848 15.0039 16.295 15.4948 15.8986 15.8921C15.5022 16.2894 15.0118 16.5801 14.4731 16.7374C13.9343 16.8946 13.3646 16.9133 12.8167 16.7917C12.5157 17.2649 12.1001 17.6545 11.6085 17.9244C11.1168 18.1944 10.5651 18.3359 10.0042 18.3359C9.44335 18.3359 8.89156 18.1944 8.39993 17.9244C7.90831 17.6545 7.49274 17.2649 7.19171 16.7917C6.64407 16.9144 6.07429 16.897 5.53521 16.7408C4.99613 16.5847 4.5052 16.295 4.10793 15.8986C3.71066 15.5021 3.41992 15.0118 3.26267 14.473C3.10542 13.9343 3.08674 13.3646 3.20837 12.8167C2.73334 12.516 2.34205 12.1001 2.07091 11.6077C1.79977 11.1152 1.65759 10.5622 1.65759 10C1.65759 9.43783 1.79977 8.88479 2.07091 8.39232C2.34205 7.89985 2.73334 7.48396 3.20837 7.18333Z" stroke="#8EC5FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 6.66663V9.99996" stroke="#8EC5FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 13.3334H10.0083" stroke="#8EC5FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.statusContent}>
            <p className={styles.statusMessage}>
              There is now a head available for you to access and below is the current state of your head
            </p>
            <div className={styles.statusRow}>
              <span className={styles.statusLabel}>Status:</span>
              <span className={styles.statusBadge}>IDLE</span>
            </div>
          </div>
        </div>

        {/* ── Main Content Grid ── */}
        <section className={styles.contentGrid}>

          {/* Form Panel */}
          <div className={styles.formPanel}>
            <form className={styles.registerForm}>

              {/* Title */}
              <div className={styles.fieldWrapper}>
                <span className={styles.floatingLabel}>Title</span>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter your title"
                  className={styles.formInput}
                />
              </div>

              {/* Description */}
              <div className={styles.fieldWrapper}>
                <span className={styles.floatingLabel}>Description</span>
                <textarea
                  id="description"
                  placeholder="Enter your description"
                  className={styles.formTextarea}
                />
              </div>

              {/* Author */}
              <div className={styles.fieldWrapper}>
                <span className={styles.floatingLabel}>Author</span>
                <input
                  id="author"
                  type="text"
                  placeholder="Enter your author name"
                  className={styles.formInput}
                />
              </div>

              {/* Image URL */}
              <div className={styles.fieldWrapper}>
                <span className={styles.floatingLabel}>Image URL</span>
                <input
                  id="imageUrl"
                  type="url"
                  placeholder="Enter your image URL"
                  className={styles.formInput}
                />
              </div>

              {/* Start Date */}
              <div className={styles.fieldWrapper}>
                <span className={styles.floatingLabel}>Start Date</span>
                <input
                  id="startDate"
                  type="date"
                  className={styles.formInput}
                />
              </div>

              {/* End Date */}
              <div className={styles.fieldWrapper}>
                <span className={styles.floatingLabel}>End Date</span>
                <input
                  id="endDate"
                  type="date"
                  className={styles.formInput}
                />
              </div>

              {/* Max Participants */}
              <div className={styles.fieldWrapper}>
                <span className={styles.floatingLabel}>Max Participants</span>
                <input
                  id="participants"
                  type="number"
                  defaultValue={2}
                  min={1}
                  className={styles.formInput}
                />
              </div>

              {/* Select ADA Commit */}
              <div className={styles.fieldWrapper}>
                <span className={styles.floatingLabel}>Select ADA Commit</span>
                <select id="adaCommit" className={styles.formSelect} defaultValue="">
                  <option value="" disabled>-- Select amount --</option>
                  <option value="10">10 ADA</option>
                  <option value="25">25 ADA</option>
                  <option value="50">50 ADA</option>
                  <option value="100">100 ADA</option>
                </select>
              </div>

              {/* Submit */}
              <div className={styles.submitWrapper}>
                <button type="submit" className={styles.registerButton}>
                  Register
                </button>
              </div>

            </form>
          </div>

          {/* Project Card */}
          <div className={styles.projectCard}>
            <div className={styles.projectImagePlaceholder}>
              <svg viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                <rect width="500" height="300" fill="#071020"/>
                <ellipse cx="380" cy="80" rx="200" ry="200" fill="#0e6fc0" opacity="0.7"/>
                <ellipse cx="300" cy="200" rx="220" ry="140" fill="#0a4fa0" opacity="0.6"/>
                <path d="M100 260 Q200 80 400 120 Q480 150 520 80" stroke="#1a9fe8" strokeWidth="40" fill="none" opacity="0.8"/>
                <path d="M-20 180 Q120 60 300 140 Q420 200 500 100" stroke="#0d7fd4" strokeWidth="55" fill="none" opacity="0.7"/>
                <path d="M60 300 Q180 120 360 180 Q460 220 520 160" stroke="#1abbf0" strokeWidth="30" fill="none" opacity="0.5"/>
              </svg>
            </div>
            <div className={styles.projectCardBody}>
              <h2 className={styles.projectTitle}>
                Open source dynamic assets (Token/NFT) generator (CIP68)
              </h2>
              <div className={styles.projectMeta}>
                <div className={styles.projectMetaLeft}>
                  <span className={styles.projectDate}>09/03/2026, 11:37</span>
                  <span className={styles.projectAuthor}>by Cardano2vn</span>
                  <span className={styles.projectParticipants}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.00001 2.66675C7.29277 2.66675 6.61449 2.9477 6.11439 3.4478C5.6143 3.94789 5.33334 4.62617 5.33334 5.33341C5.33334 6.04066 5.6143 6.71894 6.11439 7.21903C6.61449 7.71913 7.29277 8.00008 8.00001 8.00008C8.70725 8.00008 9.38553 7.71913 9.88563 7.21903C10.3857 6.71894 10.6667 6.04066 10.6667 5.33341C10.6667 4.62617 10.3857 3.94789 9.88563 3.4478C9.38553 2.9477 8.70725 2.66675 8.00001 2.66675ZM8.00001 9.33341C5.42668 9.33341 3.33334 10.5267 3.33334 12.0001V13.3334H12.6667V12.0001C12.6667 10.5267 10.5733 9.33341 8.00001 9.33341Z" stroke="#99A1AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    2 participants
                  </span>
                </div>
                <a href="#" className={styles.readMoreLink}>
                  Read More
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 3.33325L10.6667 7.99992L6 12.6666" stroke="#51A2FF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </section>
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
            <div className={styles.footerColumnAccent} />
            <h3 className={styles.footerColumnTitle}>Legal</h3>
            <ul className={styles.footerLegalLinks}>
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

          {/* Bottom bar */}
          <div className={styles.footerBottomBar}>
            <div className={styles.footerBrand}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 3.25C11.7071 4.54293 10.9807 6.29652 10.9807 8.125C10.9807 9.95348 11.7071 11.7071 13 13C14.2929 14.2929 16.0465 15.0193 17.875 15.0193C19.7035 15.0193 21.4571 14.2929 22.75 13C22.75 14.9284 22.1782 16.8134 21.1068 18.4168C20.0355 20.0202 18.5127 21.2699 16.7312 22.0078C14.9496 22.7458 12.9892 22.9389 11.0979 22.5627C9.20656 22.1865 7.46927 21.2579 6.10571 19.8943C4.74215 18.5307 3.81355 16.7934 3.43735 14.9021C3.06114 13.0108 3.25422 11.0504 3.99218 9.26884C4.73013 7.48726 5.97982 5.96452 7.58319 4.89317C9.18657 3.82183 11.0716 3.25 13 3.25Z" fill="#8B9DC1" stroke="#8B9DC1" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className={styles.footerBrandText}>Trust Protocol for Distributed Work</span>
            </div>

            <div className={styles.footerCopyright}>
              <div className={styles.footerThemeIcons}>
                {/* Sun icon */}
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="13" cy="13" r="4.33333" fill="#D1DFFA" stroke="#D1DFFA" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 2.16675V4.33341" stroke="#D1DFFA" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 21.6667V23.8334" stroke="#D1DFFA" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.34082 5.34082L6.86832 6.86832" stroke="#D1DFFA" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.1317 19.1316L20.6592 20.6591" stroke="#D1DFFA" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.16666 13H4.33332" stroke="#D1DFFA" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21.6667 13H23.8333" stroke="#D1DFFA" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.86832 19.1316L5.34082 20.6591" stroke="#D1DFFA" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20.6592 5.34082L19.1317 6.86832" stroke="#D1DFFA" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {/* Moon icon */}
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
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
