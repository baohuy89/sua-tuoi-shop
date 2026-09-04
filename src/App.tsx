import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Flame,
  Search,
  Filter,
  Check,
  Plus,
  ArrowRight,
  BookOpen,
  Phone,
  Truck,
  Snowflake,
  ShieldCheck,
} from 'lucide-react';

import { JellyfishProduct, CartItem, OrderInfo } from './types';
import { PRODUCTS, SAUCE_OPTIONS, TOPPING_OPTIONS } from './data/products';
import { formatVND } from './utils/format';

import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { CustomizeModal } from './components/CustomizeModal';
import { CartDrawer } from './components/CartDrawer';
import { FastCheckoutModal } from './components/FastCheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { SauceGuideModal } from './components/SauceGuideModal';
import { CommitmentBanner } from './components/CommitmentBanner';
import { Footer } from './components/Footer';

export default function App() {
  // Pre-seed with 1 set so customer sees active cart and can immediately try checkout!
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sua_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cart storage', e);
      }
    }
    // Default welcome item: Set Sứa Đỏ Hải Phòng kèm Mắm tôm
    const defaultProduct = PRODUCTS[0];
    const defaultSauce = SAUCE_OPTIONS[0]; // Mắm tôm đánh bông
    return [
      {
        cartItemId: `seed-${Date.now()}`,
        product: defaultProduct,
        quantity: 1,
        selectedSauce: defaultSauce,
        extraSauces: [],
        selectedToppings: [
          { topping: TOPPING_OPTIONS[1], quantity: 1 }, // Đậu Mơ nướng
        ],
        spicyPreference: 'Cay vừa',
        note: 'Ướp nhiều đá gel, tặng quất ớt tươi nhé quán',
        totalPrice: defaultProduct.price + TOPPING_OPTIONS[1].price,
      },
    ];
  });

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem('sua_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [customizingProduct, setCustomizingProduct] = useState<JellyfishProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderInfo | null>(null);

  // Voucher
  const [voucherCode, setVoucherCode] = useState<string>('SUATUOI10');

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: JellyfishProduct) => {
    // Quick add for items without customization required
    const cartItem: CartItem = {
      cartItemId: `${product.id}-${Date.now()}`,
      product,
      quantity: 1,
      selectedSauce: product.includesSauceCount > 0 ? SAUCE_OPTIONS[0] : null,
      extraSauces: [],
      selectedToppings: [],
      spicyPreference: 'Cay vừa',
      totalPrice: product.price,
    };
    setCartItems((prev) => [...prev, cartItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          const unitPrice = item.totalPrice / item.quantity;
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: unitPrice * newQuantity,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Voucher validation
  const handleApplyVoucher = (code: string): { success: boolean; message: string } => {
    if (code === 'SUATUOI10') {
      setVoucherCode('SUATUOI10');
      return { success: true, message: 'Đã áp dụng giảm 10% trên tổng món!' };
    }
    if (code === 'FREESHIP') {
      setVoucherCode('FREESHIP');
      return { success: true, message: 'Đã áp dụng Miễn Phí Vận Chuyển ướp đá gel!' };
    }
    return { success: false, message: 'Mã ưu đãi không hợp lệ hoặc đã hết hạn.' };
  };

  // Calculate discount amount
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountAmount = useMemo(() => {
    if (voucherCode === 'SUATUOI10') {
      return Math.round(subtotal * 0.1);
    }
    return 0;
  }, [voucherCode, subtotal]);

  // Checkout handling
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: OrderInfo) => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    setCompletedOrder(order);
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-stone-800">
      {/* Navbar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Banner */}
      <HeroBanner
        onExploreProducts={scrollToProducts}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Product Showcase Section */}
      <main id="products-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Category Filters and Search Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/80 pb-5 text-left">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Thực đơn tươi hôm nay
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900 mt-1">
              Sứa Tươi Giòn & Sốt Chấm Ăn Kèm
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none">
            {[
              { id: 'all', label: 'Tất Cả' },
              { id: 'ready-to-eat', label: 'Set Sứa Ăn Liền' },
              { id: 'fresh-pack', label: 'Khay Sứa Tươi' },
              { id: 'sauce', label: 'Chai Sốt Gia Truyền' },
              { id: 'topping', label: 'Topping Ăn Kèm' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-200/70 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search status if searching */}
        {searchQuery && (
          <div className="flex items-center justify-between bg-stone-100 px-4 py-2 rounded-xl text-xs text-stone-600">
            <span>
              Kết quả tìm kiếm cho: <strong className="text-stone-900">&ldquo;{searchQuery}&rdquo;</strong> (
              {filteredProducts.length} món)
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-red-600 font-bold hover:underline"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
            <Search className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="text-base font-bold text-stone-700">Không tìm thấy món sứa nào phù hợp</h3>
            <p className="text-xs text-stone-500">
              Hãy thử tìm kiếm từ khóa khác như &ldquo;sứa đỏ&rdquo;, &ldquo;sốt Thái&rdquo;, hoặc xem lại tất cả món.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl"
            >
              Xem Tất Cả Món Sứa
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={(p) => setCustomizingProduct(p)}
                onQuickAdd={handleQuickAdd}
              />
            ))}
          </div>
        )}

        {/* Featured Combo Callout */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-left relative overflow-hidden">
          <div className="space-y-2 max-w-xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full text-amber-200">
              Ưu đãi nhóm bạn & Gia đình
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
              Đặt 2 Set Sứa Bất Kỳ — Tặng Ngay 1 Chai Sốt Thái Hoặc Mắm Tôm Bông!
            </h3>
            <p className="text-xs sm:text-sm text-red-100 font-light leading-relaxed">
              Tặng kèm đá gel ướp lạnh và rổ rau thơm tía tô kinh giới sạch. Giao nhanh 30 - 45 phút,
              thanh toán trực tuyến VietQR / MoMo tiện lợi.
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToProducts}
            className="shrink-0 px-6 py-3.5 bg-white text-red-700 font-black text-sm rounded-xl shadow-lg hover:bg-stone-100 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            Chọn Sứa Ngay
          </button>
        </div>
      </main>

      {/* Freshness & Quality Commitments & Real Reviews */}
      <CommitmentBanner />

      {/* Footer */}
      <Footer />

      {/* Floating Bottom Cart Bar for Mobile */}
      {totalCartCount > 0 && !isCartOpen && !isCheckoutOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:hidden z-40">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-stone-900 text-white rounded-2xl p-3.5 shadow-2xl flex items-center justify-between border border-stone-700/80 active:scale-98 transition-transform"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                {totalCartCount}
              </div>
              <div className="text-left">
                <div className="text-[11px] text-stone-400">Xem giỏ sứa tươi</div>
                <div className="text-xs font-bold text-white">{formatVND(subtotal)}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-300">
              <span>Thanh toán ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      )}

      {/* Modals */}
      {customizingProduct && (
        <CustomizeModal
          product={customizingProduct}
          onClose={() => setCustomizingProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        voucherCode={voucherCode}
        onApplyVoucher={handleApplyVoucher}
        discountAmount={discountAmount}
      />

      <FastCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        voucherCode={voucherCode}
        discountAmount={discountAmount}
        onOrderSuccess={handleOrderSuccess}
      />

      {completedOrder && (
        <OrderSuccessModal
          order={completedOrder}
          onClose={() => setCompletedOrder(null)}
        />
      )}

      <SauceGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
