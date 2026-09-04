import React from 'react';
import { Flame, Sparkles, CheckCircle2, ChevronRight, Snowflake, Award } from 'lucide-react';
const imgSuaDo = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';

interface HeroBannerProps {
  onExploreProducts: () => void;
  onOpenGuide: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreProducts,
  onOpenGuide,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white pt-8 pb-12 sm:pt-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Heading, description & call-to-actions */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/80 border border-red-500/30 text-red-300 text-xs font-semibold">
            <Flame className="w-4 h-4 text-red-400 fill-red-400" />
            <span>Mùa sứa đỏ rộ giòn nhất trong năm • Đặt giao ngay</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white leading-tight">
            Sứa Biển Tươi Mọng <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">
              Giòn Sần Sật
            </span>{' '}
            Ăn Kèm 5 Vị Sốt Thần Thánh
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
            Tuyển chọn sứa tươi vớt trong ngày từ đảo Cô Tô & Hải Phòng. Khử mặn sạch tinh khiết,
            giòn tan mướt mát. Đầy đủ đậu phụ Mơ nướng than, dừa bánh tẻ, tía tô kinh giới cùng các loại
            sốt chấm gia truyền: <strong className="text-white font-semibold">Mắm tôm bông quất ớt</strong>,{' '}
            <strong className="text-white font-semibold">Sốt Thái chua cay</strong>,{' '}
            <strong className="text-white font-semibold">Tương bơ đậu phộng</strong> béo ngậy.
          </p>

          {/* Value propositions */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
            <div className="flex items-start gap-2.5 bg-stone-800/60 border border-stone-700/50 rounded-xl p-2.5">
              <Snowflake className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Ướp Đá Gel 12H</h4>
                <p className="text-[11px] text-stone-400">Giữ lạnh sần sật</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-stone-800/60 border border-stone-700/50 rounded-xl p-2.5">
              <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">5 Vị Sốt Tự Chọn</h4>
                <p className="text-[11px] text-stone-400">Tặng kèm mỗi set</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-stone-800/60 border border-stone-700/50 rounded-xl p-2.5 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Thanh Toán 1 Chạm</h4>
                <p className="text-[11px] text-stone-400">VietQR, MoMo, COD</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="hero-order-now-btn"
              type="button"
              onClick={onExploreProducts}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <span>Xem Menu & Đặt Ngay</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              id="hero-guide-btn"
              type="button"
              onClick={onOpenGuide}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-stone-200 font-semibold text-sm border border-stone-700 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Cách cuốn sứa ngon đúng điệu</span>
            </button>
          </div>
        </div>

        {/* Right Column: Visual hero card showcase */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-700/60 bg-stone-800 aspect-4/3 group">
              <img
                src={imgSuaDo}
                alt="Set sứa đỏ Hải Phòng mọng giòn kèm đậu Mơ nướng mắm tôm"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Floating review chip */}
              <div className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur-md border border-white/10 rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-stone-200">Đã bán 1.850+ set tuần này</span>
              </div>

              {/* Bottom detail pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-stone-900/90 backdrop-blur-md border border-stone-700/80 rounded-xl p-3 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Mẹt Sứa Đỏ Hải Phòng Truyền Thống</h3>
                    <p className="text-[11px] text-amber-300 font-medium">
                      Kèm Đậu Mơ nướng • Dừa tươi bánh tẻ • Mắm tôm đánh bông
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400 line-through">150.000₫</span>
                    <div className="text-sm font-black text-rose-400">125.000₫</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
