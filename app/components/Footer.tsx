import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-primary-light text-white pt-20 pb-24">
      <Container>
        {/* <img src="" alt="Logo" /> */}
        <nav>
          <ul>
            <li>
              <a href="./">Facebook</a>
              <a href="./">Instagram</a>
              <a href="./">Youtube</a>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
