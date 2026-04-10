import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../component/layouts/MainLayout";
import ProductCard from "../../component/pages_related_component/Explore_Product_Component/ProductCard";
import configCenter from "../../lib/config";
import endPoint from "../../lib/endpoint";
import useSearchHook from "../../hooks/useSearchHook";
import Icons from "../../utills/Icons";
import Loader from "../../component/resuable_components/Loader";

const ExploreProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const { searchTerm, debouncedSearchTerm, handleSearchChange } =
    useSearchHook();
  const categories = ["All", "Electronics", "Fashion"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const token = sessionStorage.getItem("token");

        const response = await axios.get(
          `${configCenter.urls.base}${endPoint.get_products}`,
          {
            params: {
              search: debouncedSearchTerm,
              filter: activeCategory === "All" ? "" : activeCategory,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data?.status) {
          setProducts(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearchTerm, activeCategory]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#FDFDFF]">
        <section
          id="HeroSection"
          className="relative py-10 px-6 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-black text-zinc-900 tracking-tight mb-6">
              Find Your Next <br />
              <span className="text-rose-600">Favorite Product.</span>
            </h1>

            <div id="Search Bar" className="max-w-2xl mx-auto relative group">
              <div className="absolute inset-0 bg-rose-500/10 blur-3xl group-hover:bg-rose-500/20 transition-all duration-500 -z-10" />
              <div className="relative flex items-center bg-white border border-zinc-100 p-2 rounded-3xl shadow-2xl shadow-rose-900/5 focus-within:ring-2 focus-within:ring-rose-500/20 transition-all">
                <div className="pl-4">
                  <Icons.Search className="w-6 h-6 text-zinc-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products"
                  className="w-full px-4 py-3 outline-none text-zinc-800 placeholder:text-zinc-400 bg-transparent"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
        </section>

        <div id="ContentSection" className="max-w-7xl mx-auto px-6 py-10">
          <div
            id="FiltersBar"
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6"
          >
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 cursor-pointer rounded-2xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-rose-600 text-white shadow-lg shadow-rose-200"
                      : "bg-white text-zinc-500 hover:bg-zinc-50 border border-zinc-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="h-[400px] flex items-center justify-center">
              <Loader />
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-zinc-200">
              <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icons.Search className="w-10 h-10 text-zinc-300" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">
                No products found
              </h3>
              <p className="text-zinc-500">
                Wait, try adjusting your search or category filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ExploreProducts;
