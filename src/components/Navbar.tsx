import React from 'react';
import { ShoppingBag, Sparkles, BookOpen, ShieldCheck, Clock, Phone } from 'lucide-react';
import { CartItem } from '../types';
import { formatVND } from '../utils/format';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenGuide: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onOpenGuide,
  searchQuery,
  onSearchChange,
}) => {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Sứa biển tươi 100% vớt trong ngày • Khử mặn tiệt trùng
            </span>
            <span className="hidden md:inline text-stone-400">•</span>
            <span className="hidden md:inline-flex items-center gap-1 text-amber-300">
              <Clock className="w-3.5 h-3.5" />
              Ướp đá gel lạnh giao hỏa tốc 30-45 phút
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] sm:text-xs text-stone-300">
            <span className="text-amber-400 font-semibold">Freeship đơn từ 250.000₫</span>
            <span className="text-stone-600">|</span>
            <a
              href="tel:0988776655"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-red-400" />
              Hotline: <strong className="text-white">0988.776.655</strong>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-red-900/10 border border-red-500/30">
            <span>S</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-stone-900 text-lg sm:text-xl tracking-tight font-serif">
                SỨA TƯƠI PHỐ BIỂN
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-red-100 text-red-700 tracking-wider">
                Gia Truyền
              </span>
            </div>
            <p className="text-[11px] text-stone-500 hidden sm:block font-medium">
              Sứa đỏ Hải Phòng & 5 Vị sốt chấm ăn kèm thần thánh
            </p>
          </div>
        </div>

        {/* Search input */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <input
              id="search-products-input"
              type="text"
              placeholder="Tìm kiếm sứa đỏ, sốt Thái, mắm tôm, chân sứa..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-stone-100/90 border border-stone-200 text-stone-800 text-sm rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-stone-400"
            />
            {searchQuery && (
              <button
                id="clear-search-btn"
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="open-guide-btn"
            type="button"
            onClick={onOpenGuide}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200/80 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Bí quyết ăn sứa</span>
            <span className="sm:hidden">Mẹo ăn</span>
          </button>

          {/* Cart Trigger button */}
          <button
            id="open-cart-btn"
            type="button"
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-amber-400 text-stone-900 font-extrabold text-[10px] flex items-center justify-center border-2 border-white shadow-xs">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden lg:inline">Giỏ hàng:</span>
            <span className="font-bold">
              {totalItems > 0 ? formatVND(cartSubtotal) : 'Giỏ hàng'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
