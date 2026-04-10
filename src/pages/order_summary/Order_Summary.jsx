import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../../component/layouts/MainLayout";
import Icons from "../../utills/Icons";
import { Button } from "../../component/form_components/Buttons";
import axios from "axios";
import configCenter from "../../lib/config";
import endPoint from "../../lib/endpoint";
import { formatIndianAmount } from "../../lib/date_formator";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    if (!product) {
      navigate("/explore/products");
    }
  }, [product, navigate]);

  if (!product) return null;

  const subtotal = product.price * quantity;
  const total = subtotal;

  const handlePlaceOrder = async () => {
    try {
      setIsPlacingOrder(true);
      const token = sessionStorage.getItem("token");
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const response = await axios.post(
        `${configCenter.urls.base}${endPoint.place_order}`,
        {
          product_id: product.id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data?.status) {
        setOrderStatus("success");
        setTimeout(() => navigate("/explore/products"), 3000);
      } else {
        setOrderStatus("error");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setOrderStatus("error");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <MainLayout>
      <div className="h-full bg-rose-50 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            id="Header"
            className="flex items-center gap-4 mb-6 group cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-md border border-zinc-100 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all">
              <Icons.CheronLeft className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
              Order Summary
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div id="ProductDetailsSection" className="lg:col-span-3 space-y-8">
              <div className="bg-white rounded-[32px] p-6 shadow-2xl shadow-zinc-200/50 border border-zinc-100 relative overflow-hidden group">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-40 aspect-square rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100">
                    <img
                      src={product.image_url || "/placeholder-product.jpg"}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 mb-2 block">
                        {product.category?.name || "Product Category"}
                      </span>
                      <h2 className="text-2xl font-bold text-zinc-900 mb-2 line-clamp-2">
                        {product.title}
                      </h2>
                      <p className="text-zinc-500 text-sm line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 md:mt-0">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                          Price
                        </span>
                        <span className="text-xl font-black text-zinc-900">
                          ₹ {formatIndianAmount(product.price)}
                        </span>
                      </div>

                      <div
                        id="QuantityControl"
                        className="flex items-center bg-zinc-50 rounded-2xl p-1 border border-zinc-100"
                      >
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-zinc-600"
                        >
                          <span className="text-xl font-bold">−</span>
                        </button>
                        <span className="w-12 text-center font-bold text-zinc-900">
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            setQuantity(Math.min(product.stock, quantity + 1))
                          }
                          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-zinc-600"
                          disabled={quantity >= product.stock}
                        >
                          <span className="text-xl font-bold">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id="DecorativeElement"
                  className="absolute -top-10 -right-10 w-24 h-24 bg-rose-500/5 blur-2xl rounded-full group-hover:bg-rose-500/10 transition-all duration-700"
                />
              </div>
            </div>

            <div id="PriceSummarySection" className="lg:col-span-2">
              <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-rose-900/5 border border-zinc-100 sticky top-10">
                <h3 className="text-xl font-black text-zinc-900 mb-8 tracking-tight">
                  Price Summary
                </h3>

                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 font-medium">Subtotal</span>
                    <span className="text-zinc-900 font-bold">
                      ₹{formatIndianAmount(subtotal)}
                    </span>
                  </div>
                  <div className="pt-6 border-t border-zinc-100 flex justify-between items-center">
                    <span className="text-lg font-bold text-zinc-900">
                      Total
                    </span>
                    <span className="text-2xl font-black text-rose-600">
                      ₹{formatIndianAmount(total)}
                    </span>
                  </div>
                </div>

                <Button
                  className={`w-full py-5 rounded-[24px] text-lg font-black flex items-center justify-center gap-3 shadow-2xl transition-all duration-300 ${
                    orderStatus === "success"
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "bg-rose-600 hover:bg-rose-700 shadow-rose-200"
                  }`}
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder || orderStatus === "success"}
                >
                  {isPlacingOrder ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : orderStatus === "success" ? (
                    <>
                      <Icons.Checked className="w-6 h-6" />
                      Ordered!
                    </>
                  ) : (
                    <>
                      Place Order
                      <Icons.CheronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                {orderStatus === "error" && (
                  <p className="text-center text-rose-500 text-sm font-bold mt-4 animate-bounce">
                    Something went wrong. Please try again.
                  </p>
                )}

                {orderStatus === "success" && (
                  <p className="text-center text-emerald-600 text-sm font-bold mt-4">
                    Order placed successfully! Redirecting...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderSummary;
