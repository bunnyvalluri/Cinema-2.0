export const getImageUrl = (path, size = 'w500') => {
  if (!path) {
    return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80';
  }
  if (path.startsWith('http')) return path;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const formatRuntime = (minutes) => {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const formatCurrency = (amount) => {
  if (!amount) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Unreleased';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const calculateDistribution = (ratings = []) => {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  if (!ratings.length) return counts;

  ratings.forEach((r) => {
    const rounded = Math.min(5, Math.max(1, Math.round(r)));
    counts[rounded] = (counts[rounded] || 0) + 1;
  });
  return counts;
};
