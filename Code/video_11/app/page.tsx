import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main className="mx-auto max-w-4xl p-12">
        <header className="flex items-center gap-4">
          <Image src="/loading.db59b266.png" alt="Hydra Logo" width={64} height={64} />
          <div>
            <h1 className="text-2xl font-semibold">Cardano2VN — Hydra Course</h1>
            <p className="text-sm text-muted">Môi trường phát triển smart contract & hướng dẫn chuẩn bị node</p>
          </div>
        </header>

        <section className="mt-8 rounded-lg bg-white p-8 shadow-sm">
          <h2 className="text-xl font-medium">Bắt đầu nhanh</h2>
          <p className="mt-3 text-base text-muted">
            Trang này là giao diện demo cho kho học Hydra. Xem tài liệu cấu hình và hướng dẫn
            bằng tiếng Việt trong file README.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="./README_HYDRA_VI.md"
              className="rounded-md bg-foreground px-4 py-2 text-background"
            >
              README (Vi)
            </Link>
            <Link
              href="/contract"
              className="rounded-md border border-solid px-4 py-2"
            >
              Contracts Folder
            </Link>
            <a
              href="https://hydra.family"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-solid px-4 py-2"
            >
              Hydra Official
            </a>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="font-semibold">Install Aiken</h3>
            <p className="mt-2 text-sm text-muted">Hướng dẫn cài Aiken và kiểm tra phiên bản nhanh.</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="font-semibold">Directory Structure</h3>
            <p className="mt-2 text-sm text-muted">Đề xuất cấu trúc thư mục cho project smart contract.</p>
          </div>
        </section>

        <footer className="mt-10 text-center text-sm text-muted">
          © {new Date().getFullYear()} Cardano2VN — Hydra Course
        </footer>
      </main>
    </div>
  );
}
