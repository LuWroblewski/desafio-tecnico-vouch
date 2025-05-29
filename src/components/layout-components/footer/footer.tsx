export default function Footer() {
  return (
    <footer className='footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10'>
      <nav className='grid grid-flow-col gap-4'>
        <a className='link link-hover'>Menu</a>
        <a className='link link-hover'>Sobre Nós</a>
        <a className='link link-hover'>Contato</a>
      </nav>
      <nav></nav>
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
      </aside>
    </footer>
  );
}
