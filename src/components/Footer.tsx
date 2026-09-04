import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-400 text-xs pt-12 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5 text-white font-bold font-serif text-base">
              <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                S
              </div>
              <span>SỨA TƯƠI PHỐ BIỂN</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Thương hiệu sứa tươi Cô Tô & Hải Phòng gia truyền. Chuyên cung cấp các set sứa đỏ,
              chân sứa sần sật và 5 loại sốt chấm độc quyền giao hỏa tốc ướp lạnh.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Chứng nhận ATTP & Khử mặn tiệt trùng</span>
            </div>
          </div>

          {/* Col 2: Chi nhánh & Kho hàng */}
          <div className="space-y-2">
            <h4 className="text-stone-200 font-bold text-xs uppercase tracking-wider">
              Hệ Thống Bếp & Kho Lạnh
            </h4>
            <div className="space-y-1.5 text-[11px]">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Hà Nội:</strong> 88 Phố Hàng Chiếu, Hoàn Kiếm (Chuyên sứa đỏ & mắm tôm)
                </span>
              </p>
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span>
                  <strong>TP.HCM:</strong> 128 Nguyễn Trãi, P. Bến Thành, Quận 1 (Kho lạnh sứa sốt Thái)
                </span>
              </p>
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Hải Phòng:</strong> Bến Cảng Vạn Hoa, Đồ Sơn (Cơ sở vớt sứa & sơ chế)
                </span>
              </p>
            </div>
          </div>

          {/* Col 3: Giờ phục vụ & Liên hệ */}
          <div className="space-y-2">
            <h4 className="text-stone-200 font-bold text-xs uppercase tracking-wider">
              Thời Gian Phục Vụ
            </h4>
            <div className="space-y-1.5 text-[11px]">
              <p className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Mở cửa: 08:00 - 22:30 mỗi ngày</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-red-400" />
                <span>Hotline: 0988.776.655 (Zalo/Call)</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>suatuoiphobien@gmail.com</span>
              </p>
              <p className="text-stone-500 text-[10px]">
                Nhận giao sỉ nhà hàng, quán nhậu, quán ốc toàn quốc (đóng thùng xốp 20kg).
              </p>
            </div>
          </div>

          {/* Col 4: Hướng dẫn thanh toán */}
          <div className="space-y-2">
            <h4 className="text-stone-200 font-bold text-xs uppercase tracking-wider">
              Thanh Toán Trực Tuyến Nhanh
            </h4>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              Hỗ trợ thanh toán bảo mật tức thì qua VietQR tự động khớp tiền, Ví MoMo, VNPay và COD khi
              nhận hàng kiểm tra độ giòn.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5">
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-[10px] text-stone-300 font-mono">
                VietQR 24/7
              </span>
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-[10px] text-stone-300 font-mono">
                Ví MoMo
              </span>
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-[10px] text-stone-300 font-mono">
                Thẻ ATM/Visa
              </span>
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-[10px] text-stone-300 font-mono">
                COD Nhận hàng
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Sứa Tươi Phố Biển & Sốt Chấm Thần Thánh. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Tươi ngon giòn rụm từ biển cả Việt Nam</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
