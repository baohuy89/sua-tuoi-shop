import React from 'react';
import { X, Sparkles, BookOpen, Flame, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { SAUCE_OPTIONS } from '../data/products';

interface SauceGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SauceGuideModal: React.FC<SauceGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-100 overflow-hidden text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif text-white">
                Bí Quyết Thưởng Thức Sứa Chuẩn Sành
              </h2>
              <p className="text-xs text-stone-400">
                Kinh nghiệm ẩm thực từ nghệ nhân sứa biển cổ truyền
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-left text-xs sm:text-sm">
          {/* Step-by-step eat guide */}
          <div className="space-y-4">
            <h3 className="font-bold text-stone-900 text-base font-serif flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span>4 Bước Cuốn Sứa Đỏ Hải Phòng Chuẩn Vị Nhất</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-1.5">
                <div className="w-7 h-7 rounded-lg bg-red-600 text-white font-black text-xs flex items-center justify-center">
                  1
                </div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Trải lá thơm làm đế</h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Đặt 1 lá tía tô to làm đế, xếp thêm 1-2 ngọn kinh giới tươi lên trên. Hương tinh
                  dầu lá tía tô khử tính hàn của sứa cực kỳ hòa quyện.
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-1.5">
                <div className="w-7 h-7 rounded-lg bg-red-600 text-white font-black text-xs flex items-center justify-center">
                  2
                </div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Đặt sứa mọng giòn</h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Gắp miếng sứa đỏ mọng nước hoặc lát chân sứa sần sật đặt ngay ngắn chính giữa lớp
                  rau thơm tươi non.
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-1.5">
                <div className="w-7 h-7 rounded-lg bg-red-600 text-white font-black text-xs flex items-center justify-center">
                  3
                </div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Kẹp đậu nướng & dừa bánh tẻ</h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Kẹp 1 miếng đậu phụ Mơ nướng vàng ruộm béo ngậy và 1 lát dừa non cắt mỏng. Vị bùi
                  béo của dừa đậu sẽ tôn vị giòn mát của sứa.
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-1.5">
                <div className="w-7 h-7 rounded-lg bg-red-600 text-white font-black text-xs flex items-center justify-center">
                  4
                </div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Chấm ngập sốt thần thánh</h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Cuộn tròn lại, chấm ngập vào bát mắm tôm cốt sủi bọt bông quất ớt hoặc sốt tương bơ
                  đậu phộng. Cắn một miếng cảm nhận tiếng sần sật bùng nổ!
                </p>
              </div>
            </div>
          </div>

          {/* Sốt nào hợp với món nào */}
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-stone-900 text-base font-serif flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Gợi Ý Kết Hợp Sốt Chấm Đúng Điệu</span>
            </h3>

            <div className="space-y-2.5">
              {SAUCE_OPTIONS.map((sauce) => (
                <div
                  key={sauce.id}
                  className="p-3 bg-stone-50 border border-stone-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-xs sm:text-sm">
                        {sauce.name}
                      </span>
                      <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">
                        {sauce.flavorProfile}
                      </span>
                    </div>
                    <p className="text-stone-500 text-xs mt-0.5">{sauce.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cách bảo quản */}
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 space-y-2">
            <h4 className="font-bold text-sky-950 text-xs sm:text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>Cách bảo quản sứa tại nhà không bị teo nhũn:</span>
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sky-900 text-xs">
              <li>
                Sứa tươi gửi đến có sẵn đá gel, nếu chưa ăn ngay hãy cất vào ngăn mát tủ lạnh (2-5°C).
              </li>
              <li>
                <strong>Tuyệt đối không bỏ ngăn đá</strong> (làm đông lạnh sẽ làm sứa vỡ tế bào nước
                và bị dai teo).
              </li>
              <li>Ăn ngon và giòn sần sật nhất trong vòng 24 - 48 giờ sau khi nhận.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Đã Hiểu, Mua Sứa Ngay
          </button>
        </div>
      </div>
    </div>
  );
};
