const TIME_NEW = 30 * 24 * 60 * 60 * 1000;

export const isNewProduct = (createdAt: string | Date) => {
  const createdDate = new Date(createdAt).getTime();
  const now = Date.now();
  return now - createdDate < TIME_NEW;
};

export const discountPrice = (price: number, percentage: number) => {
  return price - (price * (percentage / 100))
}

export const getOriginalPrice = (priceWithDiscount: number, discountPercentage: number) => {
  if (discountPercentage <= 0) return priceWithDiscount
  return priceWithDiscount / (1 - discountPercentage / 100)
}