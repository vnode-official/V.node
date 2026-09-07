import { Drop } from "@/components/sections/Drop";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Nav } from "@/components/sections/Nav";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { Seal } from "@/components/sections/Seal";
import { StoreProvider } from "@/components/store/StoreProvider";

export default function Page(): JSX.Element {
  return (
    <StoreProvider>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <ProductGrid />
        <Seal />
        <Drop />
      </main>
      <Footer />
    </StoreProvider>
  );
}
