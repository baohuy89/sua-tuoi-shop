export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateVietQrUrl(params: {
  bankId: string;
  accountNo: string;
  accountName: string;
  amount: number;
  memo: string;
}): string {
  const { bankId, accountNo, accountName, amount, memo } = params;
  return `https://api.vietqr.io/image/${bankId}-${accountNo}-compact2.jpg?amount=${amount}&addInfo=${encodeURIComponent(
    memo
  )}&accountName=${encodeURIComponent(accountName)}`;
}
