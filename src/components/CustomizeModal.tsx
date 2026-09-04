import React, { useState } from 'react';
import { X, Flame, Check, Plus, Minus, Info, Sparkles, ShieldCheck } from 'lucide-react';
import { JellyfishProduct, SauceOption, ToppingOption, CartItem } from '../types';
import { SAUCE_OPTIONS, TOPPING_OPTIONS } from '../data/products';
import { formatVND } from '../utils/format';

interface CustomizeModalProps {
  product: JellyfishProduct;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  // Available sauces for this product
  const availableSauceList = product.availableSauces
    ? SAUCE_OPTIONS.filter((s) => product.availableSauces?.includes(s.id))
    : SAUCE_OPTIONS;

  // Selected default sauce (free if includesSauceCount > 0)
  const [selectedSauceId, setSelectedSauceId] = useState<string>(
    availableSauceList[0]?.id || ''
  );

  // Spicy preference
  const [spicyPreference, setSpicyPreference] = useState<
    'Không cay' | 'Cay vừa' | 'Cay nồng đậm vị'
  >('Cay vừa');

  // Selected toppings
  const [selectedToppingIds, setSelectedToppingIds] = useState<string[]>([]);

  // Extra sauces
  const [extraSauceCounts, setExtraSauceCounts] = useState<{ [id: string]: number }>({});

  // Quantity
  const [quantity, setQuantity] = useState<number>(1);

  // Special Note
  const [note, setNote] = useState<string>('');

  const toggleTopping = (toppingId: string) => {
    if (selectedToppingIds.includes(toppingId)) {
      setSelectedToppingIds(selectedToppingIds.filter((id) => id !== toppingId));
    } else {
      setSelectedToppingIds([...selectedToppingIds, toppingId]);
    }
  };

  const handleExtraSauceChange = (sauceId: string, delta: number) => {
    const current = extraSauceCounts[sauceId] || 0;
    const next = Math.max(0, current + delta);
    setExtraSauceCounts({
      ...extraSauceCounts,
      [sauceId]: next,
    });
  };

  // Calculate unit price
  const basePrice = product.price;

  const toppingsTotal = selectedToppingIds.reduce((sum, topId) => {
    const top = TOPPING_OPTIONS.find((t) => t.id === topId);
    return sum + (top ? top.price : 0);
  }, 0);

  const extraSaucesTotal = Object.entries(extraSauceCounts).reduce((sum, [sId, count]) => {
    const sauce = SAUCE_OPTIONS.find((s) => s.id === sId);
    const countNum = Number(count) || 0;
    return sum + (sauce ? sauce.price * countNum : 0);
  }, 0);

  const singleItemTotal = basePrice + toppingsTotal + extraSaucesTotal;
  const grandTotal = singleItemTotal * quantity;

  const handleConfirmAddToCart = () => {
    const chosenSauce = SAUCE_OPTIONS.find((s) => s.id === selectedSauceId) || null;

    const extraSaucesList: { sauce: SauceOption; quantity: number }[] = [];
    Object.entries(extraSauceCounts).forEach(([sId, count]) => {
      const countNum = Number(count) || 0;
      if (countNum > 0) {
        const s = SAUCE_OPTIONS.find((item) => item.id === sId);
        if (s) extraSaucesList.push({ sauce: s, quantity: countNum });
      }
    });

    const selectedToppingsList: { topping: ToppingOption; quantity: number }[] = [];
    selectedToppingIds.forEach((tId) => {
      const top = TOPPING_OPTIONS.find((t) => t.id === tId);
      if (top) selectedToppingsList.push({ topping: top, quantity: 1 });
    });

    const cartItem: CartItem = {
      cartItemId: `${product.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      product,
      quantity,
      selectedSauce: chosenSauce,
      extraSauces: extraSaucesList,
      selectedToppings: selectedToppingsList,
      spicyPreference,
      note: note.trim() || undefined,
      totalPrice: grandTotal,
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-5 border-b border-stone-100 flex items-start gap-4 bg-stone-50/50">
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 rounded-2xl object-cover border border-stone-200 shadow-xs shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 text-left pr-8">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase">
                {product.weight}
              </span>
              {product.badge && (
                <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {product.badge}
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-stone-900 mt-1 font-serif leading-snug">
              {product.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-base font-extrabold text-red-600">
                {formatVND(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  {formatVND(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-left text-sm divide-y divide-stone-100">
          {/* Serving Suggestion Tip */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 leading-relaxed font-medium">
              <strong>Mẹo chuẩn vị:</strong> {product.servingSuggestion}
            </p>
          </div>

          {/* 1. Chọn sốt ăn kèm (NẾU combo có tặng sốt) */}
          {product.includesSauceCount > 0 && (
            <div className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <label className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                  <span>1. Chọn Sốt Chấm Ăn Kèm</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Miễn phí (Tặng 1 chai)
                  </span>
                </label>
                <span className="text-[11px] text-stone-500 font-medium">Bắt buộc</span>
              </div>

              <div className="space-y-2.5">
                {availableSauceList.map((sauce) => {
                  const isSelected = selectedSauceId === sauce.id;
                  return (
                    <div
                      key={sauce.id}
                      onClick={() => setSelectedSauceId(sauce.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-red-500 bg-red-50/50 ring-1 ring-red-500 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full mt-0.5 flex items-center justify-center border transition-colors ${
                            isSelected
                              ? 'border-red-600 bg-red-600 text-white'
                              : 'border-stone-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-stone-900 text-xs sm:text-sm">
                              {sauce.name}
                            </span>
                            {sauce.popular && (
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                                Khuyên dùng
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            {sauce.flavorProfile}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-emerald-600">0₫</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Cấp độ cay */}
          <div className="pt-4">
            <label className="font-bold text-stone-900 text-sm block mb-2">
              2. Độ cay mong muốn cho sốt & gia vị:
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {(['Không cay', 'Cay vừa', 'Cay nồng đậm vị'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSpicyPreference(level)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                    spicyPreference === level
                      ? 'border-red-600 bg-red-600 text-white shadow-xs'
                      : 'border-stone-200 text-stone-700 bg-stone-50 hover:bg-stone-100'
                  }`}
                >
                  {level === 'Cay nồng đậm vị' && <Flame className="w-3.5 h-3.5" />}
                  <span>{level}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Thêm Topping Ăn Kèm */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-2.5">
              <label className="font-bold text-stone-900 text-sm">
                3. Thêm Topping Ăn Kèm (Tùy chọn)
              </label>
              <span className="text-[11px] text-stone-400">Chọn nhiều món</span>
            </div>

            <div className="space-y-2">
              {TOPPING_OPTIONS.map((topping) => {
                const isChecked = selectedToppingIds.includes(topping.id);
                return (
                  <div
                    key={topping.id}
                    onClick={() => toggleTopping(topping.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isChecked
                        ? 'border-stone-800 bg-stone-50 shadow-2xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'border-stone-900 bg-stone-900 text-white'
                            : 'border-stone-300'
                        }`}
                      >
                        {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-stone-800">
                          {topping.name}
                        </div>
                        <p className="text-[11px] text-stone-500">{topping.description}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-900 shrink-0">
                      +{formatVND(topping.price)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Mua thêm chai sốt lẻ */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-stone-900 text-sm">
                4. Mua thêm Chai Sốt Riêng (Tùy chọn)
              </label>
              <span className="text-[11px] text-stone-400">Đựng chai nắp seal</span>
            </div>

            <div className="space-y-2">
              {SAUCE_OPTIONS.slice(0, 3).map((sauce) => {
                const count = extraSauceCounts[sauce.id] || 0;
                return (
                  <div
                    key={sauce.id}
                    className="p-2.5 rounded-xl border border-stone-200 flex items-center justify-between gap-3 bg-white"
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-800">{sauce.name}</div>
                      <div className="text-[11px] text-red-600 font-semibold">
                        +{formatVND(sauce.price)} <span className="text-stone-400 font-normal">({sauce.bottleSize})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => handleExtraSauceChange(sauce.id, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center bg-white hover:bg-stone-200 text-stone-700 shadow-2xs font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold">{count}</span>
                      <button
                        type="button"
                        onClick={() => handleExtraSauceChange(sauce.id, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center bg-white hover:bg-stone-200 text-stone-700 shadow-2xs font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ghi chú */}
          <div className="pt-4">
            <label className="font-bold text-stone-900 text-sm block mb-1.5">
              Ghi chú cho bếp (Tùy chọn)
            </label>
            <input
              type="text"
              placeholder="VD: Ướp nhiều đá, ăn lúc 12h trưa, cho thêm quất ớt..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            />
          </div>
        </div>

        {/* Modal Footer: Quantity & Add button */}
        <div className="p-4 sm:p-5 border-t border-stone-200/80 bg-stone-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 bg-white border border-stone-200 rounded-xl p-1.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-stone-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            id="confirm-add-cart-btn"
            type="button"
            onClick={handleConfirmAddToCart}
            className="flex-1 py-3 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-between cursor-pointer"
          >
            <span>Thêm Vào Giỏ Hàng</span>
            <span className="text-white font-black bg-red-700/60 px-2.5 py-1 rounded-lg">
              {formatVND(grandTotal)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
