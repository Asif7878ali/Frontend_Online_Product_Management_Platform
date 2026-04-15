import Icons from "../../../utills/Icons";
import { Button } from "../../form_components/Buttons";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { id, title, description, price, image_url, category, stock } = product;

  return (
    <div
      id="ProductCard"
      className="group relative bg-white rounded-3xl p-4 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(225,29,72,0.1)] border border-gray-100 hover:border-rose-100 overflow-hidden"
    >
      <div id="Badge" className="absolute top-6 left-6 z-10">
        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/90 backdrop-blur-md text-rose-600 shadow-sm border border-rose-50/50">
          {category?.name || "Product"}
        </span>
      </div>

      <div
        id="Image Container"
        className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50"
      >
        <img
          src={image_url || "/placeholder-product.jpg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div
          id="Hover Overlay"
          className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      <div id="Content" className="mt-6 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-zinc-800 line-clamp-1 group-hover:text-rose-600 transition-colors duration-300">
            {title}
          </h3>
          <span className="text-lg font-black text-zinc-900">
            ₹ {parseFloat(price).toLocaleString()}
          </span>
        </div>

        <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed min-h-[40px]">
          {description}
        </p>

        <div id="Footerinfo" className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Stock
            </span>
            <span
              className={`text-sm font-semibold ${stock < 5 ? "text-amber-500" : "text-emerald-500"}`}
            >
              {stock > 0 ? `${stock} Available` : "Out of Stock"}
            </span>
          </div>

          <Button
            variant="primary"
            className="rounded-2xl! px-6! py-3! shadow-rose-200 group-hover:shadow-rose-300 flex items-center gap-2 group/btn"
            onClick={() => navigate("/order/summary", { state: { product } })}
          >
            <span className="text-sm font-bold">Buy Now</span>
            <Icons.CheronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>

      <div
        id="Decorative Blur"
        className="absolute -bottom-20 -right-20 w-40 h-40 bg-rose-500/5 blur-[80px] rounded-full group-hover:bg-rose-500/10 transition-colors duration-500"
      />
    </div>
  );
};

export default ProductCard;
