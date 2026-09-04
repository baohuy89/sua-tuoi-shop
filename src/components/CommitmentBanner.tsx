import React from 'react';
import { ShieldCheck, Snowflake, Award, Clock, Star, Quote } from 'lucide-react';

export const CommitmentBanner: React.FC = () => {
  return (
    <section className="bg-stone-100/70 border-y border-stone-200/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* 4 Guarantees */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
              Uy Tín & Chất Lượng Hàng Đầu
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mt-2">
              Cam Kết 4 Vàng Của Tiệm Sứa Phố Biển
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm">100% Sứa Tươi Tự Nhiên</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Vớt mới trong ngày, khử mặn bằng nước ngọt thanh trùng. Cam kết không hàn the, không chất tẩy trắng.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Snowflake className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm">Đá Gel Ướp Lạnh 12H</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Mỗi đơn hàng đều được đóng kèm túi đá gel sinh học giữ nhiệt, đảm bảo từng lát sứa luôn giòn sần sật.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm">Sốt Chấm Gia Truyền Độc Quyền</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Mắm tôm đánh bông quất ớt, sốt Thái cốt me rim, sốt tương bơ đậu phộng được nấu thủ công tỉ mỉ mỗi sáng.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm">Giao Hỏa Tốc 30 - 45 Phút</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Đội ngũ shipper riêng bảo quản cẩn thận, giao đến tận bàn ăn cho khách bữa trưa hoặc bữa xế chiều.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-6">
            <h3 className="text-xl font-bold font-serif text-stone-900">
              Khách Hàng Nói Gì Về Sứa & Sốt Chấm?
            </h3>
            <div className="flex items-center justify-center gap-1.5 text-amber-400 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
              <span className="text-xs text-stone-600 font-bold ml-1">4.92 / 5.0 (1.420+ đánh giá)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <Quote className="w-6 h-6 text-stone-300 mb-2" />
                <p className="text-xs text-stone-700 leading-relaxed italic">
                  &ldquo;Sứa đỏ mọng nước, giòn sần sật mướt mát không bị tanh hay mặn tí nào. Đậu nướng vàng thơm, cuộn với lá tía tô kinh giới chấm bát mắm tôm bông quất ớt đúng chuẩn vị Hải Phòng quê mình!&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-stone-900">Chị Thu Thảo</span>
                  <span className="text-[11px] text-stone-400 block">Hoàn Kiếm, Hà Nội</span>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Đã mua 6 lần</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <Quote className="w-6 h-6 text-stone-300 mb-2" />
                <p className="text-xs text-stone-700 leading-relaxed italic">
                  &ldquo;Nghiện nhất hộp gỏi sứa sen sốt Thái chua cay! Sốt me rim sả ớt quyện sánh đặc, cay tê bùng nổ, cóc non dưa chuột giòn rụm. Quét VietQR thanh toán 10 giây xong đơn giao tới vẫn còn đá lạnh ngắt.&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-stone-900">Anh Hoàng Nam</span>
                  <span className="text-[11px] text-stone-400 block">Quận 1, TP.HCM</span>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Đã mua 4 lần</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <Quote className="w-6 h-6 text-stone-300 mb-2" />
                <p className="text-xs text-stone-700 leading-relaxed italic">
                  &ldquo;Chân sứa cực dày và giòn, không hề dai. Sốt tương bơ đậu phộng mè rang béo ngậy chấm vào là hết nước chấm luôn. Đóng gói rất sạch sẽ, có cả túi đá gel tái sử dụng được.&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-stone-900">Bạn Bích Ngọc</span>
                  <span className="text-[11px] text-stone-400 block">Bình Thạnh, TP.HCM</span>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Đã mua 3 lần</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
