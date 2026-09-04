import React from 'react';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Package,
  Snowflake,
  Printer,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { OrderInfo } from '../types';
import { formatVND } from '../utils/format';

interface OrderSuccessModalProps {
  order: OrderInfo;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-100 overflow-hidden text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Success State */}
        <div className="p-6 bg-gradient-to-b from-emerald-600 to-teal-700 text-white text-center space-y-2 relative">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center mx-auto shadow-inner border border-white/30">
            <CheckCircle2 className="w-10 h-10 text-emerald-100 stroke-[2.2]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-serif tracking-tight">
            Đặt Hàng & Thanh Toán Thành Công!
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-md mx-auto">
            Cảm ơn quý khách. Đơn hàng sứa tươi ướp đá gel đang được chuẩn bị hỏa tốc.
          </p>
          <div className="inline-block mt-1 bg-white/15 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider">
            Mã vận đơn: #{order.orderId}
          </div>
        </div>

        {/* Live Delivery Progress Tracker */}
        <div className="p-4 bg-stone-900 text-stone-200">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Clock className="w-3.5 h-3.5" />
              Dự kiến giao: {order.estimatedDeliveryMinutes} phút nữa
            </span>
            <span className="text-[11px] text-emerald-400 font-bold">Đang chuẩn bị</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
            <div className="space-y-1">
              <div className="h-1.5 bg-emerald-500 rounded-full" />
              <div className="font-bold text-emerald-400">1. Đã nhận</div>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <div className="font-bold text-white">2. Bếp ướp đá</div>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 bg-stone-700 rounded-full" />
              <div className="text-stone-500">3. Shipper giao</div>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 bg-stone-700 rounded-full" />
              <div className="text-stone-500">4. Thưởng thức</div>
            </div>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-left text-xs divide-y divide-stone-100">
          {/* Receiver Box */}
          <div className="space-y-1.5 pt-1">
            <div className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-red-600" />
              <span>Địa chỉ giao hàng sứa tươi</span>
            </div>
            <p className="text-stone-800 font-semibold text-sm">{order.customerName}</p>
            <p className="text-stone-600 flex items-center gap-1">
              <Phone className="w-3 h-3 text-stone-400" />
              <span>{order.customerPhone}</span>
            </p>
            <p className="text-stone-600">
              {order.deliveryAddress}, {order.district}
            </p>
            {order.note && (
              <p className="text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200/60 mt-1">
                Ghi chú: &ldquo;{order.note}&rdquo;
              </p>
            )}
          </div>

          {/* Itemized List */}
          <div className="pt-4 space-y-2.5">
            <div className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
              <Package className="w-4 h-4 text-stone-700" />
              <span>Danh sách món trong đơn:</span>
            </div>

            <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
              {order.items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-start justify-between gap-3 bg-stone-50 p-2.5 rounded-xl border border-stone-100"
                >
                  <div>
                    <div className="font-bold text-stone-900 text-xs">
                      {item.quantity}x {item.product.name}
                    </div>
                    {item.selectedSauce && (
                      <div className="text-[11px] text-red-700 font-semibold mt-0.5">
                        Sốt kèm: {item.selectedSauce.name} ({item.spicyPreference})
                      </div>
                    )}
                    {item.selectedToppings.length > 0 && (
                      <div className="text-[10px] text-stone-500">
                        + {item.selectedToppings.map((t) => t.topping.name).join(', ')}
                      </div>
                    )}
                    {item.extraSauces.length > 0 && (
                      <div className="text-[10px] text-amber-700">
                        + {item.extraSauces.map((s) => `${s.quantity}x ${s.sauce.name}`).join(', ')}
                      </div>
                    )}
                  </div>
                  <span className="font-extrabold text-stone-900 shrink-0">
                    {formatVND(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Breakdown */}
          <div className="pt-4 space-y-1.5 text-stone-600">
            <div className="flex justify-between">
              <span>Phương thức thanh toán:</span>
              <span className="font-bold text-stone-900 uppercase">
                {order.paymentMethod === 'vietqr'
                  ? 'VietQR Ngân hàng'
                  : order.paymentMethod === 'momo'
                  ? 'Ví MoMo'
                  : order.paymentMethod === 'card'
                  ? 'Thẻ ngân hàng'
                  : 'Tiền mặt (COD)'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Trạng thái:</span>
              <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                {order.paymentStatus === 'paid' ? 'Đã thanh toán trực tuyến' : 'Thanh toán khi nhận'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tạm tính:</span>
              <span>{formatVND(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Phí giao đá gel:</span>
              <span>{order.shippingFee === 0 ? 'Miễn phí' : formatVND(order.shippingFee)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Ưu đãi voucher:</span>
                <span>-{formatVND(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-900 font-extrabold text-sm pt-2 border-t border-stone-200">
              <span>Tổng số tiền:</span>
              <span className="text-red-600 text-base font-black">{formatVND(order.total)}</span>
            </div>
          </div>

          {/* Guarantee tip */}
          <div className="pt-3 flex items-start gap-2 text-[11px] text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Mọi thắc mắc về đơn hàng, quý khách vui lòng liên hệ Hotline:{' '}
              <strong className="text-stone-900">0988.776.655</strong> để được hỗ trợ tức thì.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>In hóa đơn</span>
          </button>

          <button
            id="finish-order-btn"
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/20 transition-all text-center cursor-pointer"
          >
            Tiếp Tục Mua Thêm Sứa
          </button>
        </div>
      </div>
    </div>
  );
};
