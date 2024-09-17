import NavBar from "@/components/NavBar";
import ProductCard from "@/components/ProductCard";

export default function Dashboard() {
  return (
    <>
      <NavBar />
      <div className="grid sm:grid-cols-4 gap-2 px-4 py-2">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
      </div>
    </>
  );
}
