'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { networks } from '@/constants/networks.constant';
import { wallets } from '@/constants/wallets.constant';
import { images } from '../../../public/images';

// ── Social Icon Components ─────────────────────────────────────────────────

function TelegramIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#tg-clip)">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0H36V36H0V0ZM0 0V36H36V0H0ZM6.68644 18.8308C8.78456 17.6749 11.1268 16.7102 13.3155 15.7387C17.0814 14.1502 20.8609 12.5904 24.6797 11.1375C25.4244 10.89 26.7581 10.6481 26.8903 11.7489C26.8172 13.3087 26.523 14.8579 26.3211 16.407C25.8069 19.8129 25.2135 23.2099 24.6358 26.6068C24.4356 27.7363 23.0186 28.3224 22.1113 27.5974C19.9339 26.1276 17.7362 24.6684 15.5874 23.1637C14.8821 22.4471 15.5346 21.4189 16.1651 20.907C17.9584 19.1379 19.8636 17.6355 21.564 15.7764C22.023 14.6666 20.6674 15.6004 20.2196 15.8889C17.7626 17.5804 15.3653 19.3776 12.7749 20.8654C11.4519 21.5949 9.90956 20.9706 8.58712 20.5644C7.40025 20.0745 5.66212 19.5801 6.68587 18.8308" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0V36H36V0H0ZM6.68644 18.8308C8.78456 17.6749 11.1268 16.7102 13.3155 15.7387C17.0814 14.1502 20.8609 12.5904 24.6797 11.1375C25.4244 10.89 26.7581 10.6481 26.8903 11.7489C26.8172 13.3087 26.523 14.8579 26.3211 16.407C25.8069 19.8129 25.2135 23.2099 24.6358 26.6068C24.4356 27.7363 23.0186 28.3224 22.1113 27.5974C19.9339 26.1276 17.7362 24.6684 15.5874 23.1637C14.8821 22.4471 15.5346 21.4189 16.1651 20.907C17.9584 19.1379 19.8636 17.6355 21.564 15.7764C22.023 14.6666 20.6674 15.6004 20.2196 15.8889C17.7626 17.5804 15.3653 19.3776 12.7749 20.8654C11.4519 21.5949 9.90956 20.9706 8.58712 20.5644C7.40025 20.0745 5.66212 19.5801 6.68587 18.8308" fill="#49A9E9" />
      </g>
      <defs><clipPath id="tg-clip"><rect width="36" height="36" fill="white" /></clipPath></defs>
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#dc-clip)">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0H36V36H0V0ZM0 0V36H36V0H0ZM20.7579 10.4062C22.1903 10.6489 23.5848 11.078 24.9058 11.6826C27.1811 15.0092 28.3118 18.7616 27.8944 23.0917C26.3566 24.2285 24.6346 25.0918 22.8038 25.6438C22.3918 25.0906 22.0275 24.5035 21.7148 23.8888C22.3105 23.6659 22.8855 23.3911 23.4332 23.0676C23.2887 22.9682 23.1485 22.8627 23.013 22.7514C21.422 23.4994 19.6855 23.8872 17.9274 23.8872C16.1693 23.8872 14.4329 23.4994 12.8419 22.7514C12.7057 22.8561 12.5651 22.9635 12.4211 23.0676C12.9675 23.3912 13.5417 23.6654 14.1368 23.8871C13.8232 24.502 13.4587 25.0897 13.0472 25.6438C11.218 25.0898 9.4975 24.226 7.9605 23.0901C7.60444 19.3562 8.316 15.5694 10.9412 11.6854C12.2636 11.0808 13.6591 10.6508 15.0924 10.4062C15.2882 10.7569 15.4652 11.1169 15.6234 11.4862C17.1492 11.2567 18.7006 11.2567 20.2264 11.4862C20.3846 11.1169 20.5618 10.7569 20.7579 10.4062ZM14.5873 20.7939C13.5962 20.7939 12.7772 19.8939 12.7772 18.7869C12.7772 17.6799 13.5675 16.7726 14.5845 16.7726C15.6009 16.7726 16.4137 17.6805 16.3969 18.7869C16.3794 19.8939 15.5976 20.7939 14.5873 20.7939ZM21.2676 20.7939C20.2747 20.7939 19.4586 19.8939 19.4586 18.7869C19.4586 17.6799 20.2494 16.7726 21.2676 16.7726C22.2857 16.7726 23.0923 17.6805 23.0749 18.7869C23.058 19.8939 22.2778 20.7939 21.2676 20.7939Z" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0V36H36V0H0ZM20.7579 10.4062C22.1903 10.6489 23.5848 11.078 24.9058 11.6826C27.1811 15.0092 28.3118 18.7616 27.8944 23.0917C26.3566 24.2285 24.6346 25.0918 22.8038 25.6438C22.3918 25.0906 22.0275 24.5035 21.7148 23.8888C22.3105 23.6659 22.8855 23.3911 23.4332 23.0676C23.2887 22.9682 23.1485 22.8627 23.013 22.7514C21.422 23.4994 19.6855 23.8872 17.9274 23.8872C16.1693 23.8872 14.4329 23.4994 12.8419 22.7514C12.7057 22.8561 12.5651 22.9635 12.4211 23.0676C12.9675 23.3912 13.5417 23.6654 14.1368 23.8871C13.8232 24.502 13.4587 25.0897 13.0472 25.6438C11.218 25.0898 9.4975 24.226 7.9605 23.0901C7.60444 19.3562 8.316 15.5694 10.9412 11.6854C12.2636 11.0808 13.6591 10.6508 15.0924 10.4062C15.2882 10.7569 15.4652 11.1169 15.6234 11.4862C17.1492 11.2567 18.7006 11.2567 20.2264 11.4862C20.3846 11.1169 20.5618 10.7569 20.7579 10.4062ZM14.5873 20.7939C13.5962 20.7939 12.7772 19.8939 12.7772 18.7869C12.7772 17.6799 13.5675 16.7726 14.5845 16.7726C15.6009 16.7726 16.4137 17.6805 16.3969 18.7869C16.3794 19.8939 15.5976 20.7939 14.5873 20.7939ZM21.2676 20.7939C20.2747 20.7939 19.4586 19.8939 19.4586 18.7869C19.4586 17.6799 20.2494 16.7726 21.2676 16.7726C22.2857 16.7726 23.0923 17.6805 23.0749 18.7869C23.058 19.8939 22.2778 20.7939 21.2676 20.7939Z" fill="#5865F2" />
      </g>
      <defs><clipPath id="dc-clip"><rect width="36" height="36" fill="white" /></clipPath></defs>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#gh-clip)">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0H36V36H0V0ZM0 0V36H36V0H0ZM20.8687 26.55C20.4187 26.6625 20.25 26.3813 20.25 26.1V23.625C20.25 22.7812 19.9688 22.2188 19.6313 21.9375C21.6562 21.7125 23.7375 20.9813 23.7375 17.4937C23.7375 16.5375 23.4 15.6937 22.8375 15.075C22.95 14.85 23.2313 13.95 22.725 12.7125C22.725 12.7125 21.9937 12.4875 20.25 13.6125C19.5187 13.3875 18.7875 13.3313 18 13.3313C17.2125 13.3313 16.4813 13.4438 15.75 13.6125C14.0063 12.4313 13.275 12.7125 13.275 12.7125C12.7688 13.95 13.1062 14.85 13.1625 15.075C12.6 15.6937 12.2625 16.4813 12.2625 17.4937C12.2625 20.925 14.3438 21.7125 16.3687 21.9375C16.0875 22.1625 15.8625 22.5562 15.8063 23.1187C15.3 23.3438 14.0062 23.7375 13.1625 22.3875C13.1625 22.3875 12.7125 21.5438 11.7562 21.4875C11.7562 21.4875 10.8562 21.4875 11.7 22.05C11.7 22.05 12.2625 22.3312 12.7125 23.3438C12.7125 23.3438 13.2188 25.0875 15.75 24.525V26.0437C15.75 26.2687 15.5813 26.55 15.1312 26.4937C11.5875 25.3687 9 21.9937 9 18C9 13.05 13.05 9 18 9C22.95 9 27 13.05 27 18C27 21.9937 24.4125 25.3687 20.8687 26.55Z" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0V36H36V0H0ZM20.8687 26.55C20.4187 26.6625 20.25 26.3813 20.25 26.1V23.625C20.25 22.7812 19.9688 22.2188 19.6313 21.9375C21.6562 21.7125 23.7375 20.9813 23.7375 17.4937C23.7375 16.5375 23.4 15.6937 22.8375 15.075C22.95 14.85 23.2313 13.95 22.725 12.7125C22.725 12.7125 21.9937 12.4875 20.25 13.6125C19.5187 13.3875 18.7875 13.3313 18 13.3313C17.2125 13.3313 16.4813 13.4438 15.75 13.6125C14.0063 12.4313 13.275 12.7125 13.275 12.7125C12.7688 13.95 13.1062 14.85 13.1625 15.075C12.6 15.6937 12.2625 16.4813 12.2625 17.4937C12.2625 20.925 14.3438 21.7125 16.3687 21.9375C16.0875 22.1625 15.8625 22.5562 15.8063 23.1187C15.3 23.3438 14.0062 23.7375 13.1625 22.3875C13.1625 22.3875 12.7125 21.5438 11.7562 21.4875C11.7562 21.4875 10.8562 21.4875 11.7 22.05C11.7 22.05 12.2625 22.3312 12.7125 23.3438C12.7125 23.3438 13.2188 25.0875 15.75 24.525V26.0437C15.75 26.2687 15.5813 26.55 15.1312 26.4937C11.5875 25.3687 9 21.9937 9 18C9 13.05 13.05 9 18 9C22.95 9 27 13.05 27 18C27 21.9937 24.4125 25.3687 20.8687 26.55Z" fill="#24292E" />
      </g>
      <defs><clipPath id="gh-clip"><rect width="36" height="36" fill="white" /></clipPath></defs>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#x-clip)">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0H36V36H0V0ZM0 0V36H36V0H0ZM9 9.86456H14.6953L18.6283 15.0632L23.1756 9.86456H25.9363L19.9069 16.7569L27 26.1354H21.4453L17.0949 20.448L12.1168 26.1349H9.35606L15.8051 18.7633L9 9.86456ZM12.2231 11.43L22.2075 24.4828H23.7375L13.8639 11.43H12.2231Z" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0V36H36V0H0ZM9 9.86456H14.6953L18.6283 15.0632L23.1756 9.86456H25.9363L19.9069 16.7569L27 26.1354H21.4453L17.0949 20.448L12.1168 26.1349H9.35606L15.8051 18.7633L9 9.86456ZM12.2231 11.43L22.2075 24.4828H23.7375L13.8639 11.43H12.2231Z" fill="black" />
      </g>
      <defs><clipPath id="x-clip"><rect width="36" height="36" fill="white" /></clipPath></defs>
    </svg>
  );
}

// ── Page Component ─────────────────────────────────────────────────────────

export default function LoginPage() {
  const [selectedNetwork, setSelectedNetwork] = useState(networks[2]); // Preview by default
  const [walletAvailability, setWalletAvailability] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function checkWallets() {
      const availability: Record<string, boolean> = {};
      for (const wallet of wallets) {
        try {
          availability[wallet.name] = await wallet.isDownload();
        } catch {
          availability[wallet.name] = false;
        }
      }
      setWalletAvailability(availability);
    }
    checkWallets();
  }, []);

  const handleWalletConnect = async (wallet: (typeof wallets)[0]) => {
    try {
      await wallet.enable();
    } catch (err) {
      console.error('Failed to connect wallet:', err);
    }
  };

  return (
    <div className="login-page-root">
      {/* Blue top-gradient overlay */}
      <div className="login-blue-overlay" aria-hidden="true" />

      {/* ── Header ── */}
      <header className="login-header">
        <div className="login-header-inner">
          <a href="/" className="login-brand">
            <Image
              src={images.logo}
              alt="Tipjar Hydra Logo"
              width={46}
              height={48}
              className="login-brand-logo"
            />
            <span className="login-brand-name">Tipjar Hydra</span>
          </a>

          <nav className="login-header-socials">
            <a href="#" aria-label="Telegram" className="social-icon-link"><TelegramIcon /></a>
            <a href="#" aria-label="Discord" className="social-icon-link"><DiscordIcon /></a>
            <a href="#" aria-label="GitHub" className="social-icon-link"><GitHubIcon /></a>
            <a href="#" aria-label="X (Twitter)" className="social-icon-link"><XIcon /></a>
          </nav>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="login-main">

        {/* Wallet connect card */}
        <section className="wallet-card">
          <div className="wallet-card-heading">
            <h2 className="wallet-card-title">Connect Wallet</h2>
            <span className="wallet-card-network-label">{selectedNetwork.name}</span>
          </div>

          <div className="wallet-card-panels">
            {/* Network selector */}
            <div className="network-selector-panel">
              {networks.map((network) => (
                <button
                  key={network.id}
                  className={`network-selector-btn${selectedNetwork.id === network.id ? ' network-selector-btn--active' : ''}`}
                  onClick={() => setSelectedNetwork(network)}
                >
                  <Image
                    src={network.image}
                    alt={network.name}
                    width={28}
                    height={28}
                    className="network-selector-icon"
                  />
                  <span className="network-selector-name">{network.name}</span>
                </button>
              ))}
            </div>

            {/* Wallet list */}
            <div className="wallet-options-list">
              {wallets.map((wallet) => {
                const isAvailable = walletAvailability[wallet.name] === true;
                return (
                  <button
                    key={wallet.name}
                    className={`wallet-option-btn${!isAvailable ? ' wallet-option-btn--unavailable' : ''}`}
                    onClick={() => isAvailable && handleWalletConnect(wallet)}
                  >
                    <span className="wallet-option-name">{wallet.name}</span>
                    <Image
                      src={wallet.image}
                      alt={wallet.name}
                      width={30}
                      height={30}
                      className="wallet-option-icon"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Web2 login section */}
        <div className="web2-login-section">
          <p className="web2-login-label">Web2 Login Powered by Particle Network</p>
          <div className="web2-social-row">
            <a href="#" aria-label="X (Twitter)" className="web2-social-link"><XIcon /></a>
            <a href="#" aria-label="GitHub" className="web2-social-link"><GitHubIcon /></a>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="login-footer">
        <a href="#" className="login-help-link">Help Center</a>
        <p className="login-footer-tagline">Traceability Network Foundation Independence</p>
      </footer>
    </div>
  );
}
