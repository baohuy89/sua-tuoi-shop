import React from 'react';
import { Star, Plus, Flame, Check, Tag } from 'lucide-react';
import { JellyfishProduct } from '../types';
import { formatVND } from '../utils/format';

interface ProductCardProps {
  product: JellyfishProduct;
  onSelectProduct: (product: JellyfishProduct) => void;
  onQuickAdd: (product: JellyfishProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickAdd,
}) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div
      id={`product-card-${product.id}`}
      className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-lg hover:border-red-200/80 transition-all duration-300 flex flex-col overflow-hidden group"
    >
      {/* Image container */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-md uppercase tracking-wider">
            {product.badge}
          </div>
        )}

        {/* Discount tag */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
            -{discountPercent}%
          </div>
        )}

        {/* Weight tag */}
        <div className="absolute bottom-3 left-3 bg-stone-900/85 backdrop-blur-xs text-stone-200 text-[11px] font-medium px-2 py-0.5 rounded-md">
          {product.weight}
        </div>
      </div>

      {/* Body content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left">
        <div>
          {/* Rating and category */}
          <div className="flex items-center justify-between gap-2 mb-1.5 text-xs">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-stone-400 font-normal">({product.reviewsCount})</span>
            </div>
            {product.includesSauceCount > 0 ? (
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Tặng 1 sốt kèm
              </span>
            ) : (
              <span className="text-[11px] text-stone-500 font-medium">Sốt / Topping</span>
            )}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-bold text-stone-900 text-base leading-snug group-hover:text-red-700 transition-colors line-clamp-2 cursor-pointer font-serif"
          >
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-stone-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {product.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-black text-red-600 leading-none">
              {formatVND(product.price)}
            </div>
            {hasDiscount && (
              <div className="text-xs text-stone-400 line-through mt-0.5">
                {formatVND(product.originalPrice!)}
              </div>
            )}
          </div>

          {product.includesSauceCount > 0 ? (
            <button
              id={`customize-btn-${product.id}`}
              type="button"
              onClick={() => onSelectProduct(product)}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Chọn sốt</span>
              <Plus className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              id={`add-btn-${product.id}`}
              type="button"
              onClick={() => onQuickAdd(product)}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>+ Thêm</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
