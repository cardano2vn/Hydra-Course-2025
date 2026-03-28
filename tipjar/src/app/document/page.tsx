'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './document.module.css';

/* ── Icons ───────────────────────────────────────── */
const IconCopyMarkdown = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#cm-clip)">
      <path d="M11.6667 4.66663H5.83341C5.18908 4.66663 4.66675 5.18896 4.66675 5.83329V11.6666C4.66675 12.311 5.18908 12.8333 5.83341 12.8333H11.6667C12.3111 12.8333 12.8334 12.311 12.8334 11.6666V5.83329C12.8334 5.18896 12.3111 4.66663 11.6667 4.66663Z" stroke="#8B9DC1" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.33341 9.33329C1.69175 9.33329 1.16675 8.80829 1.16675 8.16663V2.33329C1.16675 1.69163 1.69175 1.16663 2.33341 1.16663H8.16675C8.80841 1.16663 9.33341 1.69163 9.33341 2.33329" stroke="#8B9DC1" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs><clipPath id="cm-clip"><rect width="14" height="14" fill="white"/></clipPath></defs>
  </svg>
);

const IconChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#8B9DC1" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconOnThisPage = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12H2" stroke="#8B9DC1" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.3333 4H2" stroke="#8B9DC1" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 8H2" stroke="#8B9DC1" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconCopy = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.0002 1.33325H6.00016C5.63197 1.33325 5.3335 1.63173 5.3335 1.99992V3.33325C5.3335 3.70144 5.63197 3.99992 6.00016 3.99992H10.0002C10.3684 3.99992 10.6668 3.70144 10.6668 3.33325V1.99992C10.6668 1.63173 10.3684 1.33325 10.0002 1.33325Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.6665 2.66675H11.9998C12.3535 2.66675 12.6926 2.80722 12.9426 3.05727C13.1927 3.30732 13.3332 3.64646 13.3332 4.00008V13.3334C13.3332 13.687 13.1927 14.0262 12.9426 14.2762C12.6926 14.5263 12.3535 14.6667 11.9998 14.6667H3.99984C3.64622 14.6667 3.30708 14.5263 3.05703 14.2762C2.80698 14.0262 2.6665 13.687 2.6665 13.3334V4.00008C2.6665 3.64646 2.80698 3.30732 3.05703 3.05727C3.30708 2.80722 3.64622 2.66675 3.99984 2.66675H5.33317" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── CopyButton ──────────────────────────────────── */
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <button
      onClick={handleCopy}
      className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
      aria-label="Copy code"
    >
      {copied ? <IconCheck /> : <IconCopy />}
    </button>
  );
}

/* ── Code Block ──────────────────────────────────── */
function CodeBlock({ code, lines }: { code: string; lines: React.ReactNode[] }) {
  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeScrollArea}>
        <div className={styles.codeInner}>
          {lines}
        </div>
      </div>
      <CopyButton code={code} />
    </div>
  );
}

/* ── TOC data ────────────────────────────────────── */
const tocItems = [
  { id: 'introduction-to-mdx-magic', label: 'Introduction to MDX Magic', indent: false },
  { id: 'introduction-to-mdx-magic-sub', label: 'Introduction to MDX Magic', indent: true },
  { id: 'why-mdx-is-awesome', label: 'Why MDX is Awesome', indent: false },
  { id: 'setting-up-your-mdx-environment', label: 'Setting Up Your MDX Environment', indent: false },
  { id: 'advanced-mdx-techniques', label: 'Advanced MDX Techniques', indent: false },
  { id: 'deep-dive-into-mdx-imports', label: 'Deep Dive into MDX Imports', indent: false },
  { id: 'lorem-ipsum-content-exploration', label: 'Lorem Ipsum Content Exploration', indent: false },
  { id: 'performance-considerations-in-mdx', label: 'Performance Considerations in MDX', indent: false },
  { id: 'the-future-of-technical-writing', label: 'The Future of Technical Writing', indent: false },
];

/* ── Page ────────────────────────────────────────── */
export default function DocumentPage() {
  const [activeId, setActiveId] = useState<string>('introduction-to-mdx-magic');

  /* Intersection observer for active TOC highlighting */
  useEffect(() => {
    const sectionIds = tocItems.map((t) => t.id);
    const observers: IntersectionObserver[] = [];

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(observerCallback, {
        rootMargin: '-20% 0px -70% 0px',
      });
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── Code content strings (for copy) ── */
  const code1 = `import React from "react";

const CalloutBox = ({ children, type = "info" }) => {
    return { children };
};

export default CalloutBox;`;

  const code2 = `module.exports = {
    module: {
        rules: [
            {
                test: /\\.mdx?$/,
                use: ["babel-loader", "@mdx-js/loader"],
            },
        ],
        plugins: {
            new MDXPlugin({
                remarkPlugins: [remarkGfm, remarkFrontmatter],
            }),
        },
    },
};`;

  const code3 = `import React, { useState } from 'react';

const InteractiveCounter = () => {
  const [count, setCount] = useState(0);

  return (
      Current Count: {count}
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
  );
};

export default InteractiveCounter;`;

  const code4 = `// Import multiple components
import Button from "./components/Button";
import CodeHighlighter from "./components/CodeHighlighter";
import DataVisualization from "./components/DataVisualization";

// Dynamic imports for performance
const LazyLoadedComponent = React.lazy(() => import("./components/HeavyComponent"));`;

  const code5 = `// Memoization for complex components
const MemoizedComponent = React.memo(ExpensiveComponent, (prevProps, nextProps) => {
  // Custom comparison logic
  return prevProps.data === nextProps.data;
});`;

  /* ── Rendered code lines ── */
  const codeLines1 = [
    <div key="1" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenKeyword}>import</span><span className={styles.tokenDefault}> React </span><span className={styles.tokenKeyword}>from</span><span className={styles.tokenString}> &quot;react&quot;</span><span className={styles.tokenDefault}>;</span></span></div>,
    <div key="2" className={styles.codeLineEmpty} />,
    <div key="3" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenKeyword}>const</span><span className={styles.tokenPurple}> CalloutBox</span><span className={styles.tokenKeyword}> =</span><span className={styles.tokenDefault}> (&#123; </span><span className={styles.tokenOrange}>children</span><span className={styles.tokenDefault}>, </span><span className={styles.tokenOrange}>type</span><span className={styles.tokenKeyword}> =</span><span className={styles.tokenString}> &quot;info&quot;</span><span className={styles.tokenDefault}> &#125;) </span><span className={styles.tokenKeyword}>=&gt;</span><span className={styles.tokenDefault}> &#123;</span></span></div>,
    <div key="4" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenKeyword}>    return</span><span className={styles.tokenDefault}> &#123; children &#125;;</span></span></div>,
    <div key="5" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>&#125;;</span></span></div>,
    <div key="6" className={styles.codeLineEmpty} />,
    <div key="7" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenKeyword}>export default</span><span className={styles.tokenDefault}> CalloutBox;</span></span></div>,
  ];

  const codeLines2 = [
    <div key="1" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenBlue}>module</span><span className={styles.tokenDefault}>.</span><span className={styles.tokenBlue}>exports</span><span className={styles.tokenKeyword}> =</span><span className={styles.tokenDefault}> &#123;</span></span></div>,
    <div key="2" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>    module: &#123;</span></span></div>,
    <div key="3" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>        rules: [</span></span></div>,
    <div key="4" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>            &#123;</span></span></div>,
    <div key="5" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>                test: </span><span className={styles.tokenKeyword}>/</span><span className={styles.tokenString}>\.mdx?$</span><span className={styles.tokenKeyword}>/</span><span className={styles.tokenDefault}>,</span></span></div>,
    <div key="6" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>                use: [</span><span className={styles.tokenString}>&quot;babel-loader&quot;</span><span className={styles.tokenDefault}>, </span><span className={styles.tokenString}>&quot;@mdx-js/loader&quot;</span><span className={styles.tokenDefault}>],</span></span></div>,
    <div key="7" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>            &#125;,</span></span></div>,
    <div key="8" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>        ],</span></span></div>,
    <div key="9" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>    &#125;,</span></span></div>,
    <div key="10" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>    plugins: &#123;</span></span></div>,
    <div key="11" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>        </span><span className={styles.tokenKeyword}>new</span><span className={styles.tokenPurple}> MDXPlugin</span><span className={styles.tokenDefault}>(&#123;</span></span></div>,
    <div key="12" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>            remarkPlugins: [remarkGfm, remarkFrontmatter],</span></span></div>,
    <div key="13" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>        &#125;),</span></span></div>,
    <div key="14" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>    &#125;,</span></span></div>,
    <div key="15" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>&#125;;</span></span></div>,
  ];

  const codeLines3 = [
    <div key="1" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenKeyword}>import</span><span className={styles.tokenDefault}> React, &#123; useState &#125; </span><span className={styles.tokenKeyword}>from</span><span className={styles.tokenString}> &apos;react&apos;</span><span className={styles.tokenDefault}>;</span></span></div>,
    <div key="2" className={styles.codeLineEmpty} />,
    <div key="3" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenKeyword}>const</span><span className={styles.tokenPurple}> InteractiveCounter</span><span className={styles.tokenKeyword}> =</span><span className={styles.tokenDefault}> () </span><span className={styles.tokenKeyword}>=&gt;</span><span className={styles.tokenDefault}> &#123;</span></span></div>,
    <div key="4" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenKeyword}>  const</span><span className={styles.tokenDefault}> [</span><span className={styles.tokenBlue}>count</span><span className={styles.tokenDefault}>, </span><span className={styles.tokenBlue}>setCount</span><span className={styles.tokenDefault}>] </span><span className={styles.tokenKeyword}>=</span><span className={styles.tokenPurple}> useState</span><span className={styles.tokenDefault}>(0);</span></span></div>,
    <div key="5" className={styles.codeLineEmpty} />,
    <div key="6" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenKeyword}>  return</span><span className={styles.tokenDefault}> (</span></span></div>,
    <div key="7" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>      Current Count: &#123;count&#125;</span></span></div>,
    <div key="8" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>      &lt;</span><span className={styles.tokenKeyword}>button</span><span className={styles.tokenDefault}> onClick=&#123;() </span><span className={styles.tokenKeyword}>=&gt;</span><span className={styles.tokenPurple}> setCount</span><span className={styles.tokenDefault}>(count </span><span className={styles.tokenKeyword}>+</span><span className={styles.tokenDefault}> 1)&#125;&gt;</span></span></div>,
    <div key="9" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>        Increment</span></span></div>,
    <div key="10" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>      &lt;/</span><span className={styles.tokenKeyword}>button</span><span className={styles.tokenDefault}>&gt;</span></span></div>,
    <div key="11" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>  );</span></span></div>,
    <div key="12" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>&#125;;</span></span></div>,
    <div key="13" className={styles.codeLineEmpty} />,
    <div key="14" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenKeyword}>export default</span><span className={styles.tokenDefault}> InteractiveCounter;</span></span></div>,
  ];

  const codeLines4 = [
    <div key="1" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenComment}>// Import multiple components</span></span></div>,
    <div key="2" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenKeyword}>import</span><span className={styles.tokenDefault}> Button </span><span className={styles.tokenKeyword}>from</span><span className={styles.tokenString}> &quot;./components/Button&quot;</span><span className={styles.tokenDefault}>;</span></span></div>,
    <div key="3" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenKeyword}>import</span><span className={styles.tokenDefault}> CodeHighlighter </span><span className={styles.tokenKeyword}>from</span><span className={styles.tokenString}> &quot;./components/CodeHighlighter&quot;</span><span className={styles.tokenDefault}>;</span></span></div>,
    <div key="4" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenKeyword}>import</span><span className={styles.tokenDefault}> DataVisualization </span><span className={styles.tokenKeyword}>from</span><span className={styles.tokenString}> &quot;./components/DataVisualization&quot;</span><span className={styles.tokenDefault}>;</span></span></div>,
    <div key="5" className={styles.codeLineEmpty} />,
    <div key="6" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenComment}>// Dynamic imports for performance</span></span></div>,
    <div key="7" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenKeyword}>const</span><span className={styles.tokenBlue}> LazyLoadedComponent</span><span className={styles.tokenKeyword}> =</span><span className={styles.tokenDefault}> React.</span><span className={styles.tokenPurple}>lazy</span><span className={styles.tokenDefault}>(() </span><span className={styles.tokenKeyword}>=&gt;</span><span className={styles.tokenPurple}> import</span><span className={styles.tokenDefault}>(</span><span className={styles.tokenString}>&quot;./components/HeavyComponent&quot;</span><span className={styles.tokenDefault}>));</span></span></div>,
  ];

  const codeLines5 = [
    <div key="1" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenComment}>// Memoization for complex components</span></span></div>,
    <div key="2" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenKeyword}>const</span><span className={styles.tokenBlue}> MemoizedComponent</span><span className={styles.tokenKeyword}> =</span><span className={styles.tokenDefault}> React.</span><span className={styles.tokenPurple}>memo</span><span className={styles.tokenDefault}>(ExpensiveComponent, (</span><span className={styles.tokenOrange}>prevProps</span><span className={styles.tokenDefault}>, </span><span className={styles.tokenOrange}>nextProps</span><span className={styles.tokenDefault}>) </span><span className={styles.tokenKeyword}>=&gt;</span><span className={styles.tokenDefault}> &#123;</span></span></div>,
    <div key="3" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenComment}>  // Custom comparison logic</span></span></div>,
    <div key="4" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenKeyword}>  return</span><span className={styles.tokenDefault}> prevProps.</span><span className={styles.tokenBlue}>data</span><span className={styles.tokenKeyword}> ===</span><span className={styles.tokenDefault}> nextProps.</span><span className={styles.tokenBlue}>data</span><span className={styles.tokenDefault}>;</span></span></div>,
    <div key="5" className={styles.codeLine}><span className={styles.codeText}><span className={styles.tokenDefault}>&#125;);</span></span></div>,
  ];

  return (
    <main className={styles.docPage}>
      <div className={styles.docsLayout}>
        <div className={styles.docsPage}>
          {/* ── Article ── */}
          <article className={styles.article}>
            {/* Page header */}
            <h1 className={styles.pageTitle}>Introduction</h1>
            <p className={styles.pageSubtitle}>This is just example of the blog post</p>

            {/* Action buttons */}
            <div className={styles.actionBar}>
              <button className={styles.actionBtn}>
                <IconCopyMarkdown />
                Copy Markdown
              </button>
              <button className={styles.actionBtn}>
                Open
                <IconChevronDown />
              </button>
            </div>

            {/* Prose content */}
            <div className={styles.prose}>

              {/* Section: Introduction to MDX Magic (h2) */}
              <div className={styles.section}>
                <h2 id="introduction-to-mdx-magic" className={styles.sectionH2}>
                  Introduction to MDX Magic
                </h2>

                {/* Sub-section: Introduction to MDX Magic (h3) */}
                <h3 id="introduction-to-mdx-magic-sub" className={styles.sectionH3}>
                  Introduction to MDX Magic
                </h3>

                <p className={styles.bodyText}>
                  Welcome to the world of <strong className={styles.boldWord}>MDX</strong>, a revolutionary way to write technical documentation and blog posts. MDX seamlessly blends Markdown&apos;s simplicity with the power of React components.
                </p>
              </div>

              {/* Section: Why MDX is Awesome */}
              <div className={styles.section}>
                <h2 id="why-mdx-is-awesome" className={styles.sectionH2}>
                  Why MDX is Awesome
                </h2>
                <p className={styles.bodyText}>
                  MDX transforms how we create content by allowing full React component integration. Here&apos;s a simple component example:
                </p>
                <CodeBlock code={code1} lines={codeLines1} />
                <p className={styles.bodyText}>
                  You can use this component directly in your MDX file, creating dynamic and interactive content that goes far beyond traditional markdown.
                </p>
              </div>

              {/* Section: Setting Up */}
              <div className={styles.section}>
                <h2 id="setting-up-your-mdx-environment" className={styles.sectionH2}>
                  Setting Up Your MDX Environment
                </h2>
                <p className={styles.bodyText}>
                  Configuring MDX involves several steps. Here&apos;s a comprehensive webpack configuration:
                </p>
                <CodeBlock code={code2} lines={codeLines2} />
              </div>

              {/* Section: Advanced MDX Techniques */}
              <div className={styles.section}>
                <h2 id="advanced-mdx-techniques" className={styles.sectionH2}>
                  Advanced MDX Techniques
                </h2>
                <p className={styles.bodyText}>
                  React hooks work beautifully with MDX. Consider this interactive counter component:
                </p>
                <CodeBlock code={code3} lines={codeLines3} />
              </div>

              {/* Section: Deep Dive */}
              <div className={styles.section}>
                <h2 id="deep-dive-into-mdx-imports" className={styles.sectionH2}>
                  Deep Dive into MDX Imports
                </h2>
                <p className={styles.bodyText}>
                  Managing complex imports becomes straightforward with MDX:
                </p>
                <CodeBlock code={code4} lines={codeLines4} />
              </div>

              {/* Section: Lorem Ipsum */}
              <div className={styles.section}>
                <h2 id="lorem-ipsum-content-exploration" className={styles.sectionH2}>
                  Lorem Ipsum Content Exploration
                </h2>
                <p className={styles.bodyText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc eget ultricies tincidunt, velit velit bibendum velit, vel bibendum velit velit sit amet velit.
                </p>
                <p className={styles.bodyText}>
                  Donec euismod, nisl eget ultricies tincidunt, velit velit bibendum velit, vel bibendum velit velit sit amet velit. Sed euismod, nisl eget ultricies tincidunt, velit velit bibendum velit, vel bibendum velit velit sit amet velit.
                </p>
              </div>

              {/* Section: Performance */}
              <div className={styles.section}>
                <h2 id="performance-considerations-in-mdx" className={styles.sectionH2}>
                  Performance Considerations in MDX
                </h2>
                <p className={styles.bodyText}>
                  Performance matters! Here&apos;s an optimization technique:
                </p>
                <CodeBlock code={code5} lines={codeLines5} />
              </div>

              {/* Section: Future */}
              <div className={styles.section}>
                <h2 id="the-future-of-technical-writing" className={styles.sectionH2}>
                  The Future of Technical Writing
                </h2>
                <p className={styles.bodyText}>
                  MDX represents a <strong className={styles.boldWord}>paradigm shift</strong> in documentation. By combining markdown&apos;s readability with React&apos;s interactivity, we&apos;re creating a new standard for technical communication.
                </p>
                <p className={styles.bodyText}>
                  Embrace the <strong className={styles.boldWord}>MDX revolution</strong>! Write documentation that&apos;s not just informative, but truly interactive. 🚀📝
                </p>
              </div>

            </div>
          </article>

          {/* ── Right TOC Sidebar ── */}
          <aside className={styles.tocSidebar}>
            <div className={styles.tocInner}>
              <div className={styles.tocHeader}>
                <IconOnThisPage />
                <p className={styles.tocHeaderLabel}>On this page</p>
              </div>
              <div className={styles.tocNavWrapper}>
                <nav className={styles.tocNavList}>
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={[
                        styles.tocLink,
                        item.indent ? styles.tocLinkIndented : '',
                        activeId === item.id ? styles.active : '',
                      ].join(' ')}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                        setActiveId(item.id);
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
