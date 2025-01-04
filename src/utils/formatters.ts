const currencyFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

export const formatCurrency = (amount: number): string => {
  return currencyFormatter.format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
};
