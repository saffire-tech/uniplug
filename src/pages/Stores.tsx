import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Store, MapPin, Verified, X, SlidersHorizontal } from 'lucide-react';
import { StoreGridSkeleton } from '@/components/ui/skeletons';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface StoreData {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  cover_url: string | null;
  location: string | null;
  is_verified: boolean | null;
  product_count?: number;
}

const LOCATIONS = [
  'All Locations',
  'Main Campus',
  'North Campus',
  'South Campus',
  'Online Only'
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'top-sales', label: 'Top Sales' },
];

const fetchAllStores = async (): Promise<StoreData[]> => {
  const { data, error } = await supabase
    .from('stores')
    .select('id, name, description, logo_url, cover_url, location, is_verified')
    .eq('is_active', true)
    .eq('is_verified', true)
    .eq('is_suspended', false);

  if (error) throw error;

  // Fetch product counts for each store in parallel
  const storesWithCounts = await Promise.all(
    (data || []).map(async (store) => {
      const { count } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('store_id', store.id)
        .eq('is_active', true);
      
      return { ...store, product_count: count || 0 };
    })
  );
  
  return storesWithCounts;
};

const ITEMS_PER_PAGE = 9;

const Stores = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'All Locations');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [showFilters, setShowFilters] = useState(false);

  // Sync URL params with state
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedLocation !== 'All Locations') params.set('location', selectedLocation);
    if (sortBy !== 'newest') params.set('sort', sortBy);
    if (currentPage > 1) params.set('page', String(currentPage));
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedLocation, sortBy, currentPage, setSearchParams]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLocation, sortBy]);

  const { data: stores = [], isLoading } = useQuery({
    queryKey: ['all-stores'],
    queryFn: fetchAllStores,
    staleTime: 1000 * 60 * 5,
  });

  const filteredAndSortedStores = useMemo(() => {
    let result = [...stores];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.description?.toLowerCase().includes(query) ||
        s.location?.toLowerCase().includes(query)
      );
    }

    // Filter by location
    if (selectedLocation !== 'All Locations') {
      result = result.filter(s => s.location === selectedLocation);
    }

    // Sort
    switch (sortBy) {
      case 'oldest':
        result.reverse();
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'top-sales':
        // Already sorted by product count as proxy for sales
        result.sort((a, b) => (b.product_count || 0) - (a.product_count || 0));
        break;
    }

    return result;
  }, [stores, searchQuery, selectedLocation, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedStores.length / ITEMS_PER_PAGE);
  const paginatedStores = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedStores.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedStores, currentPage]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('All Locations');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || selectedLocation !== 'All Locations' || sortBy !== 'newest';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse Stores</h1>
          <p className="text-muted-foreground">
            Discover amazing stores from campus sellers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              variant="outline" 
              className="md:hidden gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Desktop Filters */}
          <div className={`flex flex-wrap gap-4 ${showFilters ? 'block' : 'hidden md:flex'}`}>
            {/* Location Filter */}
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border">
                {LOCATIONS.map(loc => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border">
                {SORT_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                <X className="h-4 w-4" />
                Clear filters
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedLocation !== 'All Locations' && (
                <Badge variant="secondary" className="gap-1">
                  {selectedLocation}
                  <button onClick={() => setSelectedLocation('All Locations')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6">
          {filteredAndSortedStores.length} {filteredAndSortedStores.length === 1 ? 'store' : 'stores'} found
        </p>

        {/* Stores Grid */}
        {isLoading ? (
          <StoreGridSkeleton count={6} />
        ) : filteredAndSortedStores.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-xl">
            <Store className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">No stores found</h3>
            <p className="text-muted-foreground mb-6">
              {hasActiveFilters 
                ? 'Try adjusting your filters or search query'
                : 'Be the first to create your store on UniPlug!'}
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters}>Clear Filters</Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedStores.map((store) => (
                <div
                  key={store.id}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover"
                >
                  {/* Cover Image */}
                  <div className="relative h-40 overflow-hidden bg-muted">
                    {store.cover_url ? (
                      <img
                        src={store.cover_url}
                        alt={store.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Store className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative p-5 pt-0">
                    {/* Avatar */}
                    <div className="relative -mt-10 mb-4">
                      <div className="w-20 h-20 rounded-xl border-4 border-card shadow-lg bg-muted flex items-center justify-center overflow-hidden">
                        {store.logo_url ? (
                          <img
                            src={store.logo_url}
                            alt={store.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Store className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                      {store.is_verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
                          <Verified className="h-3.5 w-3.5 text-primary-foreground" />
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {store.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {store.description || 'No description'}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm mb-4">
                      {store.location && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{store.location}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {store.product_count} {store.product_count === 1 ? 'product' : 'products'}
                      </span>
                      <Link to={`/store/${store.id}`}>
                        <Button size="sm">Visit Store</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <PaginationEllipsis key={page} />;
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Stores;