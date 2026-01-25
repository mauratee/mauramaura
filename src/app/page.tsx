import { Header, Footer } from "@/components/layout";
import { Hero, Work, About, Contact } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
