interface RouteProps {
  path?: string;
}

export function Home(_props: RouteProps) {
  return (
    <div class="page">
      <div class="page-header">
        <h1>Home</h1>
        <p>Selamat datang di MoniKu</p>
      </div>
      <div class="page-content">
        <p>Halaman Home - akan diisi di fase berikutnya</p>
      </div>
    </div>
  );
}
