import styles from './tipper-id.module.css';

export default function TipperIdPage() {
  return (
    <main className={styles.tipperIdPage}>
      <div className={styles.pageContainer}>

        {/* ── Status Banner ── */}
        <div className={styles.statusBanner}>
          <div className={styles.statusLeft}>
            <div className={styles.statusIconWrapper}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3.20837 7.18333C3.08674 6.63544 3.10542 6.0657 3.26267 5.52695C3.41992 4.9882 3.71066 4.49787 4.10793 4.10143C4.5052 3.705 4.99613 3.41529 5.53521 3.25916C6.07429 3.10304 6.64407 3.08555 7.19171 3.20833C7.49313 2.73692 7.90837 2.34897 8.39916 2.08024C8.88995 1.81151 9.44049 1.67065 10 1.67065C10.5596 1.67065 11.1101 1.81151 11.6009 2.08024C12.0917 2.34897 12.5069 2.73692 12.8084 3.20833C13.3568 3.08502 13.9276 3.10242 14.4675 3.25893C15.0075 3.41543 15.4991 3.70595 15.8966 4.10346C16.2941 4.50097 16.5846 4.99256 16.7411 5.5325C16.8976 6.07244 16.915 6.64319 16.7917 7.19167C17.2631 7.49309 17.6511 7.90834 17.9198 8.39912C18.1885 8.88991 18.3294 9.44046 18.3294 10C18.3294 10.5595 18.1885 11.1101 17.9198 11.6009C17.6511 12.0917 17.2631 12.5069 16.7917 12.8083C16.9145 13.356 16.897 13.9257 16.7409 14.4648C16.5848 15.0039 16.295 15.4948 15.8986 15.8921C15.5022 16.2894 15.0118 16.5801 14.4731 16.7374C13.9343 16.8946 13.3646 16.9133 12.8167 16.7917C12.5157 17.2649 12.1001 17.6545 11.6085 17.9244C11.1168 18.1944 10.5651 18.3359 10.0042 18.3359C9.44335 18.3359 8.89156 18.1944 8.39993 17.9244C7.90831 17.6545 7.49274 17.2649 7.19171 16.7917C6.64407 16.9144 6.07429 16.897 5.53521 16.7408C4.99613 16.5847 4.5052 16.295 4.10793 15.8986C3.71066 15.5021 3.41992 15.0118 3.26267 14.473C3.10542 13.9343 3.08674 13.3646 3.20837 12.8167C2.73334 12.516 2.34205 12.1001 2.07091 11.6077C1.79977 11.1152 1.65759 10.5622 1.65759 10C1.65759 9.43783 1.79977 8.88479 2.07091 8.39232C2.34205 7.89985 2.73334 7.48395 3.20837 7.18333Z" stroke="#8EC5FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
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
                <span className={styles.statusBadgeOpen}>OPEN</span>
              </div>
            </div>
          </div>
          <button className={styles.fanoutButton}>Fanout</button>
        </div>

        {/* ── Main Two-Column Grid ── */}
        <div className={styles.mainGrid}>

          {/* ── Left Column ── */}
          <div className={styles.leftColumn}>

            {/* Stats Cards */}
            <div className={styles.statsRow}>
              <div className={styles.statCard}>
                <div className={styles.statCardIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke="#8EC5FF" strokeWidth="1.5"/>
                    <path d="M2.5 8H17.5" stroke="#8EC5FF" strokeWidth="1.5"/>
                    <path d="M6 12.5H8" stroke="#8EC5FF" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className={styles.statCardBody}>
                  <span className={styles.statCardLabel}>Total Balance On Hydra</span>
                  <span className={styles.statCardValue}>4 802,2700 ADA</span>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statCardIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke="#8EC5FF" strokeWidth="1.5"/>
                    <path d="M2.5 8H17.5" stroke="#8EC5FF" strokeWidth="1.5"/>
                    <path d="M6 12.5H8" stroke="#8EC5FF" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className={styles.statCardBody}>
                  <span className={styles.statCardLabel}>Total ADA Tipped</span>
                  <span className={styles.statCardValue}>110,0000 ADA</span>
                </div>
              </div>
            </div>

            {/* Send Tip Panel */}
            <div className={styles.sendTipPanel}>
              <div className={styles.tokenRow}>
                <span className={styles.tokenLabel}>Top Token</span>
                <label className={styles.tokenRadioWrapper}>
                  <input type="radio" name="token" defaultChecked className={styles.tokenRadioInput} />
                  <span className={styles.tokenRadioDot} />
                  <span className={styles.tokenRadioText}>ADA</span>
                </label>
              </div>

              <div className={styles.amountFieldWrapper}>
                <label className={styles.amountLabel} htmlFor="amount">Amount (ADA)</label>
                <input
                  id="amount"
                  type="number"
                  placeholder="Enter amount in ADA"
                  className={styles.amountInput}
                />
              </div>

              <button className={styles.sendTipButton}>Send Tip</button>
            </div>

            {/* Tip Jar Panel */}
            <div className={styles.tipJarCard}>
              <div className={styles.tipJarHeader}>
                <div className={styles.tipJarHeaderIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="#8EC5FF" strokeWidth="1.5"/>
                    <path d="M12 8v4l3 3" stroke="#8EC5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h2 className={styles.tipJarTitle}>Your Tip Jar</h2>
                  <p className={styles.tipJarSubtitle}>Share your tip jar with your fans</p>
                </div>
              </div>

              <div className={styles.tipJarLinkSection}>
                <span className={styles.tipJarLinkLabel}>Your Tip Jar Link</span>
                <div className={styles.tipJarLinkRow}>
                  <div className={styles.tipJarLinkBox}>
                    <code className={styles.tipJarLinkText}>
                      https://tipjar.cardano2vn.io/tipper/addr_test1qz45qtdupp8g30lzzr684m8mc278s284cjvawna5ypwkvq7s8xszw9mgmwpxdyak17dgpfmzywctzlsaghnqrl494wnqhgsy3
                    </code>
                  </div>
                  <div className={styles.tipJarActions}>
                    <button className={styles.shareQrButton}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <rect x="1" y="1" width="5" height="5" rx="0.5" stroke="#8EC5FF" strokeWidth="1.2"/>
                        <rect x="10" y="1" width="5" height="5" rx="0.5" stroke="#8EC5FF" strokeWidth="1.2"/>
                        <rect x="1" y="10" width="5" height="5" rx="0.5" stroke="#8EC5FF" strokeWidth="1.2"/>
                        <rect x="2.5" y="2.5" width="2" height="2" fill="#8EC5FF"/>
                        <rect x="11.5" y="2.5" width="2" height="2" fill="#8EC5FF"/>
                        <rect x="2.5" y="11.5" width="2" height="2" fill="#8EC5FF"/>
                        <path d="M10 10h2v2h-2zM12 12h2v2h-2zM10 14h2" stroke="#8EC5FF" strokeWidth="1" strokeLinecap="round"/>
                      </svg>
                      Share QR
                    </button>
                    <button className={styles.copyLinkButton}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <rect x="5" y="5" width="8" height="9" rx="1" stroke="#fff" strokeWidth="1.2"/>
                        <path d="M3 11V3a1 1 0 011-1h7" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Recent Tips ── */}
          <div className={styles.rightColumn}>
            <div className={styles.recentTipsCard}>
              <div className={styles.recentTipsHeader}>
                <div className={styles.recentTipsHeaderIcon}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" stroke="#8EC5FF" strokeWidth="1.5"/>
                    <path d="M11 7v4" stroke="#8EC5FF" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M8 13c0-1.657 1.343-3 3-3s3 1.343 3 3" stroke="#8EC5FF" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h2 className={styles.recentTipsTitle}>Recent Tips</h2>
                  <p className={styles.recentTipsSubtitle}>Your latest received tips</p>
                </div>
              </div>

              <div className={styles.recentTipsTableWrapper}>
                <table className={styles.recentTipsTable}>
                  <thead>
                    <tr>
                      <th className={styles.tableHeaderCell}>Hash</th>
                      <th className={styles.tableHeaderCell}>Address</th>
                      <th className={styles.tableHeaderCell}>Amount (ADA)</th>
                      <th className={styles.tableHeaderCell}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={styles.tableRow}>
                      <td className={styles.tableCell}>
                        <span className={styles.txHashLink}>58d651...6c1d19</span>
                      </td>
                      <td className={styles.tableCell}>
                        <span className={styles.addressText}>addr_t...4843vd</span>
                      </td>
                      <td className={styles.tableCell}>
                        <span className={styles.amountPositive}>10</span>
                      </td>
                      <td className={styles.tableCell}>
                        <span className={styles.dateText}>09/03/2026, 12:09</span>
                      </td>
                    </tr>
                    <tr className={styles.tableRow}>
                      <td className={styles.tableCell}>
                        <span className={styles.txHashLink}>962a6d...ac8fd7</span>
                      </td>
                      <td className={styles.tableCell}>
                        <span className={styles.addressText}>addr_t...4843vd</span>
                      </td>
                      <td className={styles.tableCell}>
                        <span className={styles.amountPositive}>100</span>
                      </td>
                      <td className={styles.tableCell}>
                        <span className={styles.dateText}>09/03/2026, 12:08</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ── Withdrawal History ── */}
        <section className={styles.withdrawalSection}>
          <div className={styles.withdrawalHeader}>
            <div className={styles.withdrawalHeaderIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3 10h14M13 6l4 4-4 4" stroke="#8EC5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className={styles.withdrawalTitle}>Withdrawal History</h2>
          </div>

          <div className={styles.withdrawalTableWrapper}>
            <table className={styles.withdrawalTable}>
              <thead>
                <tr>
                  <th className={styles.withdrawalHeaderCell}>Date</th>
                  <th className={styles.withdrawalHeaderCell}>Transaction Hash</th>
                  <th className={styles.withdrawalHeaderCell}>Amount</th>
                  <th className={styles.withdrawalHeaderCell}>Type</th>
                  <th className={styles.withdrawalHeaderCell}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '09/03/2026, 11:37', hash: '10b45b...3761cb', amount: '$899.94 ADA', type: 'Withdraw', status: 'Complete' },
                  { date: '09/03/2026, 00:13', hash: '42a081...523138', amount: '3.01 ADA', type: 'Withdraw', status: 'Complete' },
                  { date: '08/03/2026, 23:11', hash: 'f2b1c6...4b485e', amount: '95.00 ADA', type: 'Withdraw', status: 'Complete' },
                  { date: '28/02/2026, 22:55', hash: '07fc92...69a282', amount: '1.18 ADA', type: 'Withdraw', status: 'Complete' },
                  { date: '25/02/2026, 09:23', hash: 'bdc42b...f26248', amount: '10.00 ADA', type: 'Withdraw', status: 'Complete' },
                ].map((row, i) => (
                  <tr key={i} className={styles.withdrawalRow}>
                    <td className={styles.withdrawalCell}>
                      <span className={styles.withdrawalDate}>{row.date}</span>
                    </td>
                    <td className={styles.withdrawalCell}>
                      <span className={styles.withdrawalTxHash}>{row.hash}</span>
                    </td>
                    <td className={styles.withdrawalCell}>
                      <span className={styles.withdrawalAmount}>{row.amount}</span>
                    </td>
                    <td className={styles.withdrawalCell}>
                      <span className={styles.withdrawalType}>{row.type}</span>
                    </td>
                    <td className={styles.withdrawalCell}>
                      <span className={styles.withdrawalStatus}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button className={styles.paginationBtn}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              First
            </button>
            <button className={styles.paginationBtn}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Previous
            </button>
            <span className={styles.paginationCount}>1 of 17</span>
            <button className={styles.paginationBtn}>
              Next
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className={styles.paginationBtn}>
              Last
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </section>
      </div>

      {/* ── Footer ── */}
      <div className={styles.footerWrapper}>
        <footer className={styles.footer}>
          <div className={styles.footerDivider} />

          <div className={styles.footerLinksGrid}>
            <div className={styles.footerColumn}>
              <div className={styles.footerColumnAccent} />
              <h3 className={styles.footerColumnTitle}>Stay Connected with Cardano2VN</h3>
              <ul className={styles.footerLinks}>
                <li><a href="#" className={styles.footerLink}><span className={styles.footerLinkDash} />Support</a></li>
                <li><a href="#" className={styles.footerLink}><span className={styles.footerLinkDash} />Contact Us</a></li>
                <li><a href="#" className={styles.footerLink}><span className={styles.footerLinkDash} />Docs</a></li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <div className={styles.footerColumnAccent} />
              <h3 className={styles.footerColumnTitle}>Follow Us</h3>
              <ul className={styles.footerLinks}>
                <li><a href="#" className={styles.footerLink}><span className={styles.footerLinkDash} />LinkedIn</a></li>
                <li><a href="#" className={styles.footerLink}><span className={styles.footerLinkDash} />Twitter</a></li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <div className={styles.footerColumnAccent} />
              <h3 className={styles.footerColumnTitle}>Company</h3>
              <ul className={styles.footerLinks}>
                <li><a href="#" className={styles.footerLink}><span className={styles.footerLinkDash} />About</a></li>
                <li><a href="#" className={styles.footerLink}><span className={styles.footerLinkDash} />Roadmap</a></li>
              </ul>
            </div>
          </div>

          <div className={styles.footerLegalSection}>
            <div className={styles.footerColumnAccent} />
            <h3 className={styles.footerColumnTitle}>Legal</h3>
            <ul className={styles.footerLinks}>
              <li><a href="#" className={styles.footerLink}><span className={styles.footerLinkDash} />Privacy Policy</a></li>
              <li><a href="#" className={styles.footerLink}><span className={styles.footerLinkDash} />Terms of Use</a></li>
            </ul>
          </div>

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
