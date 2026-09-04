import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Tag, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { formatVND } from '../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  voucherCode: string;
  onApplyVoucher: (code: string) => { success: boolean; message: string };
  discountAmount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  voucherCode,
  onApplyVoucher,
  discountAmount,
}) => {
  const [inputVoucher, setInputVoucher] = useState('');
  const [voucherMessage, setVoucherMessage] = useState<{ text: string; isError: boolean } | null>(
    null
  );

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const FREE_SHIPPING_THRESHOLD = 250000;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || voucherCode === 'FREESHIP' ? 0 : 25000;
  const missingForFreeship = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeshipPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const total = Math.max(0, subtotal + shippingFee - discountAmount);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVoucher.trim()) return;
    const res = onApplyVoucher(inputVoucher.trim().toUpperCase());
    setVoucherMessage({
      text: res.message,
      isError: !res.success,
    });
    if (res.success) {
      setInputVoucher('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-stone-900 font-serif">Giỏ Hàng Sứa Tươi</h2>
                <p className="text-xs text-stone-500">
                  {cartItems.length} món ăn kèm sốt đang ướp lạnh
                </p>
              </div>
            </div>
            <button
              id="close-cart-btn"
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Freeship Progress Bar */}
          <div className="bg-stone-900 text-stone-200 px-4 py-3 text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span className="flex items-center gap-1.5 text-stone-300">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                  <strong className="text-emerald-400">Chúc mừng! Bạn được Miễn Phí Ship ướp lạnh</strong>
                ) : (
                  <span>
                    Mua thêm <strong className="text-amber-300">{formatVND(missingForFreeship)}</strong> để Freeship
                  </span>
                )}
              </span>
              <span className="text-[11px] font-bold text-stone-400">{freeshipPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-stone-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${freeshipPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-stone-100">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="font-bold text-stone-700 text-base">Giỏ hàng của bạn đang trống</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Hãy chọn một set sứa tươi giòn sần sật và loại sốt chấm bạn yêu thích nhé!
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold shadow-xs hover:bg-red-700 transition-colors"
                >
                  Chọn Món Ngay
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.cartItemId} className="pt-3 first:pt-0 flex gap-3 text-left">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-xl object-cover border border-stone-200 shrink-0 mt-0.5"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1"
                        title="Xóa món"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Sốt đã chọn */}
                    {item.selectedSauce && (
                      <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                          Sốt: {item.selectedSauce.name}
                        </span>
                        <span className="text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                          {item.spicyPreference}
                        </span>
                      </div>
                    )}

                    {/* Topping kèm theo */}
                    {item.selectedToppings.length > 0 && (
                      <div className="mt-1 text-[11px] text-stone-500 line-clamp-1">
                        + {item.selectedToppings.map((t) => t.topping.name).join(', ')}
                      </div>
                    )}

                    {/* Extra sauce */}
                    {item.extraSauces.length > 0 && (
                      <div className="text-[11px] text-amber-700 font-medium">
                        + {item.extraSauces.map((s) => `${s.quantity}x ${s.sauce.name}`).join(', ')}
                      </div>
                    )}

                    {/* Ghi chú */}
                    {item.note && (
                      <div className="text-[10px] text-stone-400 italic">
                        Ghi chú: &ldquo;{item.note}&rdquo;
                      </div>
                    )}

                    {/* Price and quantity stepper */}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-extrabold text-red-600">
                        {formatVND(item.totalPrice)}
                      </span>

                      <div className="flex items-center gap-2 bg-stone-100 border border-stone-200 rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 rounded flex items-center justify-center bg-white hover:bg-stone-200 text-stone-700 font-bold text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-4 text-center text-xs font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 rounded flex items-center justify-center bg-white hover:bg-stone-200 text-stone-700 font-bold text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer: Voucher, Summary & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50/80 space-y-3.5">
              {/* Voucher code form */}
              <form onSubmit={handleApplyCode} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Mã ưu đãi (VD: SUATUOI10)"
                      value={inputVoucher}
                      onChange={(e) => setInputVoucher(e.target.value)}
                      className="w-full bg-white border border-stone-300 text-xs rounded-xl pl-8 pr-3 py-2 uppercase font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
                  >
                    Áp dụng
                  </button>
                </div>
                {voucherMessage && (
                  <p
                    className={`text-[11px] font-medium text-left ${
                      voucherMessage.isError ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    {voucherMessage.text}
                  </p>
                )}
                <div className="flex gap-2 text-[10px] text-stone-500 pt-0.5">
                  <span>Gợi ý:</span>
                  <button
                    type="button"
                    onClick={() => {
                      onApplyVoucher('SUATUOI10');
                      setVoucherMessage({ text: 'Đã áp dụng mã giảm 10%!', isError: false });
                    }}
                    className="underline text-red-600 font-bold"
                  >
                    SUATUOI10
                  </button>
                  <span>hoặc</span>
                  <button
                    type="button"
                    onClick={() => {
                      onApplyVoucher('FREESHIP');
                      setVoucherMessage({ text: 'Đã áp dụng mã Miễn phí ship!', isError: false });
                    }}
                    className="underline text-red-600 font-bold"
                  >
                    FREESHIP
                  </button>
                </div>
              </form>

              {/* Price Calculation details */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200/60">
                <div className="flex justify-between">
                  <span>Tạm tính ({cartItems.length} món):</span>
                  <span className="font-semibold text-stone-900">{formatVND(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí ship ướp đá gel:</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">Miễn phí (Freeship)</span>
                    ) : (
                      formatVND(shippingFee)
                    )}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Giảm giá ({voucherCode}):</span>
                    <span>-{formatVND(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm sm:text-base font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Tổng thanh toán:</span>
                  <span className="text-red-600 text-lg font-black">{formatVND(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="checkout-now-btn"
                type="button"
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Thanh Toán Trực Tuyến Nhanh</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
