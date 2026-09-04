import React, { useState, useEffect } from 'react';
import {
  X,
  QrCode,
  CreditCard,
  Wallet,
  Truck,
  CheckCircle2,
  Copy,
  Clock,
  ShieldCheck,
  Snowflake,
  AlertCircle,
  Sparkles,
  Phone,
  MapPin,
  User,
  ArrowRight,
} from 'lucide-react';
import { CartItem, OrderInfo, PaymentMethod } from '../types';
import { formatVND, generateVietQrUrl } from '../utils/format';

interface FastCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  voucherCode: string;
  discountAmount: number;
  onOrderSuccess: (order: OrderInfo) => void;
}

export const FastCheckoutModal: React.FC<FastCheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  voucherCode,
  discountAmount,
  onOrderSuccess,
}) => {
  // Generate random order code for this session
  const [orderCode] = useState(() => `SUA${Math.floor(1000 + Math.random() * 9000)}`);

  // Form states
  const [customerName, setCustomerName] = useState('Đặng Huy Bảo');
  const [customerPhone, setCustomerPhone] = useState('0988776655');
  const [deliveryAddress, setDeliveryAddress] = useState('128 Nguyễn Trãi, Phường Bến Thành');
  const [district, setDistrict] = useState('Quận 1, TP. Hồ Chí Minh');
  const [deliveryTime, setDeliveryTime] = useState<'instant' | 'scheduled'>('instant');
  const [deliveryNote, setDeliveryNote] = useState('Ướp nhiều đá gel giúp mình, có kèm thìa đũa sạch');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('vietqr');

  // Copy state feedback
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Processing simulation
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Countdown timer 15 mins
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const FREE_SHIPPING_THRESHOLD = 250000;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || voucherCode === 'FREESHIP' ? 0 : 25000;
  const finalTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  // Bank Info for VietQR
  const bankConfig = {
    bankId: 'MB', // MB Bank
    bankName: 'MB Bank (Ngân hàng Quân Đội)',
    accountNo: '0988776655',
    accountName: 'TIEM SUA BIEN GIA TRUYEN',
    memo: `${orderCode} SUA TUOI`,
  };

  const vietQrUrl = generateVietQrUrl({
    bankId: bankConfig.bankId,
    accountNo: bankConfig.accountNo,
    accountName: bankConfig.accountName,
    amount: finalTotal,
    memo: bankConfig.memo,
  });

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTimer = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      alert('Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ giao hàng.');
      return;
    }

    setIsSubmitting(true);

    // Simulate fast online payment verification & order processing
    setTimeout(() => {
      const order: OrderInfo = {
        orderId: orderCode,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        deliveryAddress: deliveryAddress.trim(),
        district,
        deliveryTime,
        scheduledTimeNote: deliveryTime === 'scheduled' ? 'Giao trong ngày' : undefined,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        items: cartItems,
        subtotal,
        shippingFee,
        discount: discountAmount,
        voucherCode: voucherCode || undefined,
        total: finalTotal,
        note: deliveryNote.trim(),
        createdAt: new Date().toISOString(),
        estimatedDeliveryMinutes: deliveryTime === 'instant' ? 35 : 120,
      };

      setIsSubmitting(false);
      onOrderSuccess(order);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-stone-100 overflow-hidden text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Thanh toán online 1 chạm
              </span>
              <span className="text-xs text-stone-400">Mã đơn: #{orderCode}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-serif text-white mt-1">
              Thanh Toán & Xác Nhận Đơn Hàng
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Countdown Badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-stone-800 border border-stone-700 px-3 py-1.5 rounded-xl text-xs text-amber-300">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>
                Giữ sứa tươi: <strong className="font-mono">{formattedTimer}</strong>
              </span>
            </div>

            <button
              id="close-checkout-btn"
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-left text-sm">
          {/* Cold storage pledge banner */}
          <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-3.5 flex items-start gap-3">
            <Snowflake className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900">
              <strong className="font-bold">Cam kết sứa tươi đóng hộp vô trùng:</strong> Sứa được
              chắt ráo, ướp cùng 2 túi đá gel giữ nhiệt đóng gói kín đáo. Giao đến tay vẫn mát lạnh,
              giòn tan sần sật.
            </div>
          </div>

          {/* Section 1: Receiver Information */}
          <div className="space-y-3">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>Thông tin người nhận & Địa chỉ giao</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Họ và tên người nhận <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="checkout-name-input"
                    type="text"
                    required
                    placeholder="VD: Đặng Huy Bảo"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium"
                  />
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Số điện thoại nhận hàng <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="checkout-phone-input"
                    type="tel"
                    required
                    placeholder="VD: 0988 776 655"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium"
                  />
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Địa chỉ chi tiết (Số nhà, ngõ/ngách, tên đường) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="checkout-address-input"
                    type="text"
                    required
                    placeholder="VD: 128 Nguyễn Trãi, Phường Bến Thành"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium"
                  />
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Khu vực / Quận Huyện
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-medium"
                >
                  <option value="Quận 1, TP. Hồ Chí Minh">Quận 1, TP. Hồ Chí Minh (Giao 25-35p)</option>
                  <option value="Quận 3, TP. Hồ Chí Minh">Quận 3, TP. Hồ Chí Minh (Giao 25-35p)</option>
                  <option value="Quận Bình Thạnh, TP. Hồ Chí Minh">Quận Bình Thạnh, TP. Hồ Chí Minh (Giao 30-40p)</option>
                  <option value="Quận Phú Nhuận, TP. Hồ Chí Minh">Quận Phú Nhuận, TP. Hồ Chí Minh (Giao 30-40p)</option>
                  <option value="Quận Cầu Giấy, Hà Nội">Quận Cầu Giấy, Hà Nội (Giao 30-40p)</option>
                  <option value="Quận Đống Đa, Hà Nội">Quận Đống Đa, Hà Nội (Giao 30-40p)</option>
                  <option value="Quận Ba Đình, Hà Nội">Quận Ba Đình, Hà Nội (Giao 30-40p)</option>
                  <option value="Quận Hoàn Kiếm, Hà Nội">Quận Hoàn Kiếm, Hà Nội (Giao 25-35p)</option>
                  <option value="Khu vực khác">Khu vực khác (Giao đóng thùng xốp đá gel)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Speed */}
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>Thời gian nhận hàng ướp lạnh</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setDeliveryTime('instant')}
                className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                  deliveryTime === 'instant'
                    ? 'border-red-600 bg-red-50/50 ring-1 ring-red-500'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-red-600" />
                    <span>Giao hỏa tốc 30 - 45 phút</span>
                  </div>
                  <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                    Khuyên chọn
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Bếp ướp đá chuyển shipper ngay lập tức để ăn trưa/tối chuẩn tươi.
                </p>
              </div>

              <div
                onClick={() => setDeliveryTime('scheduled')}
                className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                  deliveryTime === 'scheduled'
                    ? 'border-red-600 bg-red-50/50 ring-1 ring-red-500'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Hẹn giờ giao trong ngày</span>
                  </div>
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Đóng thùng xốp bảo quản đá gel 12 tiếng, giao đúng khung giờ hẹn.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Online Payment Methods */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <span>Phương thức thanh toán trực tuyến</span>
              </h3>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Mã hóa bảo mật 100%
              </span>
            </div>

            {/* Payment Method Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* VietQR */}
              <button
                type="button"
                onClick={() => setPaymentMethod('vietqr')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1.5 ${
                  paymentMethod === 'vietqr'
                    ? 'border-red-600 bg-red-50/70 ring-2 ring-red-500 text-red-900 font-bold shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-xs">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold">VietQR Ngân hàng</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">Tự động 24/7</div>
                </div>
              </button>

              {/* MoMo */}
              <button
                type="button"
                onClick={() => setPaymentMethod('momo')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1.5 ${
                  paymentMethod === 'momo'
                    ? 'border-pink-600 bg-pink-50/70 ring-2 ring-pink-500 text-pink-900 font-bold shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-black text-xs">
                  M
                </div>
                <div>
                  <div className="text-xs font-bold">Ví MoMo</div>
                  <div className="text-[10px] text-stone-500">Quét mã tiện lợi</div>
                </div>
              </button>

              {/* VNPay / Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1.5 ${
                  paymentMethod === 'card'
                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500 text-blue-900 font-bold shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold">Thẻ ATM / Visa</div>
                  <div className="text-[10px] text-stone-500">Nội địa & QT</div>
                </div>
              </button>

              {/* COD */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1.5 ${
                  paymentMethod === 'cod'
                    ? 'border-stone-800 bg-stone-100 ring-2 ring-stone-700 text-stone-900 font-bold shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center font-black text-xs">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold">Tiền mặt (COD)</div>
                  <div className="text-[10px] text-stone-500">Nhận hàng trả tiền</div>
                </div>
              </button>
            </div>

            {/* Dynamic Payment Details Area */}
            {paymentMethod === 'vietqr' && (
              <div className="bg-gradient-to-br from-blue-50/80 via-white to-stone-50 border border-blue-200 rounded-2xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-blue-600" />
                    Quét mã VietQR bằng bất kỳ App Ngân Hàng nào
                  </span>
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-md">
                    Khớp tiền tự động
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Real Dynamic QR Code image */}
                  <div className="sm:col-span-5 flex flex-col items-center bg-white p-3 rounded-xl border border-stone-200 shadow-xs">
                    <img
                      src={vietQrUrl}
                      alt="Mã VietQR thanh toán nhanh đơn hàng sứa tươi"
                      className="w-44 h-44 object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[10px] text-stone-500 mt-1 font-mono font-medium">
                      Mở app ngân hàng để quét mã
                    </span>
                  </div>

                  {/* Transfer Details with One-Click Copy buttons */}
                  <div className="sm:col-span-7 space-y-2.5 text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                      <div className="text-stone-400 text-[10px]">Ngân hàng thụ hưởng</div>
                      <div className="font-bold text-stone-900">{bankConfig.bankName}</div>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-stone-200 flex items-center justify-between">
                      <div>
                        <div className="text-stone-400 text-[10px]">Số tài khoản</div>
                        <div className="font-mono font-bold text-stone-900 text-sm tracking-wider">
                          {bankConfig.accountNo}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(bankConfig.accountNo, 'stk')}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        {copiedField === 'stk' ? 'Đã chép!' : 'Sao chép'}
                      </button>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-stone-200 flex items-center justify-between">
                      <div>
                        <div className="text-stone-400 text-[10px]">Số tiền chính xác</div>
                        <div className="font-bold text-red-600 text-sm">
                          {formatVND(finalTotal)}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(finalTotal.toString(), 'amount')}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        {copiedField === 'amount' ? 'Đã chép!' : 'Sao chép'}
                      </button>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-stone-200 flex items-center justify-between">
                      <div>
                        <div className="text-stone-400 text-[10px]">Nội dung chuyển khoản</div>
                        <div className="font-mono font-bold text-blue-700 text-xs tracking-wide">
                          {bankConfig.memo}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(bankConfig.memo, 'memo')}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        {copiedField === 'memo' ? 'Đã chép!' : 'Sao chép'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'momo' && (
              <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4 text-center space-y-3">
                <div className="font-bold text-pink-900 text-xs flex items-center justify-center gap-2">
                  <span>Thanh toán siêu tốc qua Ví MoMo</span>
                  <span className="text-[10px] bg-pink-200 text-pink-800 px-2 py-0.5 rounded-full font-bold">
                    Khuyên dùng
                  </span>
                </div>
                <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl border border-pink-200 shadow-2xs flex items-center justify-center">
                  <img
                    src={vietQrUrl}
                    alt="Mã MoMo thanh toán sứa tươi"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-[11px] text-pink-700 max-w-sm mx-auto">
                  Mở ứng dụng MoMo trên điện thoại, chọn <strong>Quét Mã</strong> để thanh toán số
                  tiền <strong>{formatVND(finalTotal)}</strong>.
                </p>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 space-y-3">
                <div className="font-bold text-blue-900 text-xs">
                  Cổng thanh toán thẻ ATM / Visa / Mastercard nội địa
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    placeholder="Số thẻ (VD: 9704 2200 ....)"
                    className="col-span-2 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Tên in trên thẻ (không dấu)"
                    className="bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 uppercase"
                  />
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 font-mono"
                  />
                </div>
                <p className="text-[10px] text-stone-500">
                  Hệ thống kết nối cổng bảo mật đạt chuẩn PCI-DSS 256-bit.
                </p>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex items-start gap-3">
                <Wallet className="w-5 h-5 text-stone-700 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-700 leading-relaxed">
                  <strong className="text-stone-900">Thanh toán khi nhận hàng (COD):</strong> Quý
                  khách kiểm tra sứa tươi mát lạnh, đầy đủ sốt và topping rồi thanh toán đúng{' '}
                  <strong className="text-red-600">{formatVND(finalTotal)}</strong> cho nhân viên giao hàng.
                </div>
              </div>
            )}
          </div>

          {/* Special note */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Ghi chú thêm cho Shipper
            </label>
            <input
              type="text"
              placeholder="VD: Gọi trước khi đến 5 phút, để lễ tân tòa nhà..."
              value={deliveryNote}
              onChange={(e) => setDeliveryNote(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            />
          </div>

          {/* Order items recap */}
          <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/80 space-y-2 text-xs">
            <div className="font-bold text-stone-800 text-xs">
              Tóm tắt đơn hàng ({cartItems.length} món):
            </div>
            <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex justify-between items-center text-[11px]">
                  <span className="truncate pr-2 text-stone-700">
                    {item.quantity}x {item.product.name}
                    {item.selectedSauce && ` (${item.selectedSauce.name})`}
                  </span>
                  <span className="font-semibold text-stone-900 shrink-0">
                    {formatVND(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-200 space-y-1">
              <div className="flex justify-between text-stone-500">
                <span>Tạm tính:</span>
                <span>{formatVND(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Phí vận chuyển ướp lạnh:</span>
                <span>{shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Giảm giá:</span>
                  <span>-{formatVND(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between font-extrabold text-stone-900 text-sm pt-1 border-t border-stone-200">
                <span>Tổng cộng thanh toán:</span>
                <span className="text-red-600 text-base font-black">{formatVND(finalTotal)}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            id="confirm-checkout-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-red-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Đang kết nối cổng thanh toán & xuất mã đơn...</span>
              </div>
            ) : (
              <>
                <span>
                  {paymentMethod === 'cod'
                    ? 'Xác Nhận Đặt Hàng & Giao Sứa Ngay'
                    : 'Tôi Đã Chuyển Khoản / Hoàn Tất Thanh Toán'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
