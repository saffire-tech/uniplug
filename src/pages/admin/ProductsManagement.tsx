import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MobileCard, MobileCardRow } from '@/components/admin/MobileCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, MoreHorizontal, Star, StarOff, Eye, EyeOff, Trash2, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useIsMobile } from '@/hooks/use-mobile';

const ITEMS_PER_PAGE = 10;

export default function ProductsManagement() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['admin-products', search, categoryFilter],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`*, stores(name)`)
        .order('created_at', { ascending: false });

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      if (categoryFilter && categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ['product-categories'],
    queryFn: async () => {
      const { data } = await supabase
        .from('products')
        .select('category')
        .not('category', 'is', null);
      const uniqueCategories = [...new Set(data?.map((p) => p.category))];
      return uniqueCategories.filter(Boolean);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ productId, updates }: { productId: string; updates: Record<string, boolean> }) => {
      const { error } = await supabase.from('products').update(updates).eq('id', productId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast({ title: 'Product Updated', description: 'Product has been updated successfully.' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update product.', variant: 'destructive' });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase.from('products').delete().eq('id', productId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast({ title: 'Product Deleted', description: 'Product has been permanently deleted.' });
      setDeleteProductId(null);
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to delete product.', variant: 'destructive' });
    },
  });

  const products = productsData || [];
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const ProductActions = ({ product }: { product: typeof paginatedProducts[0] }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover">
        <DropdownMenuItem asChild>
          <Link to={`/product/${product.id}`} className="flex items-center">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {product.is_featured ? (
          <DropdownMenuItem onClick={() => updateProductMutation.mutate({ productId: product.id, updates: { is_featured: false } })}>
            <StarOff className="mr-2 h-4 w-4" />
            Remove Featured
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => updateProductMutation.mutate({ productId: product.id, updates: { is_featured: true } })}>
            <Star className="mr-2 h-4 w-4" />
            Mark Featured
          </DropdownMenuItem>
        )}
        {product.is_active ? (
          <DropdownMenuItem onClick={() => updateProductMutation.mutate({ productId: product.id, updates: { is_active: false } })}>
            <EyeOff className="mr-2 h-4 w-4" />
            Hide Product
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => updateProductMutation.mutate({ productId: product.id, updates: { is_active: true } })}>
            <Eye className="mr-2 h-4 w-4" />
            Show Product
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" onClick={() => setDeleteProductId(product.id)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <AdminLayout title="Products Management" description="Manage all platform products">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9"
            />
          </div>
          <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Badge variant="secondary" className="self-start sm:self-center">{products.length} products</Badge>
        </div>

        {isMobile ? (
          <div className="space-y-3">
            {isLoading ? (
              <p className="text-center py-8 text-muted-foreground">Loading...</p>
            ) : paginatedProducts.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No products found</p>
            ) : (
              paginatedProducts.map((product) => (
                <MobileCard key={product.id} actions={<ProductActions product={product} />}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-base line-clamp-1">{product.name}</span>
                    {product.is_featured && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 shrink-0" />}
                  </div>
                  <MobileCardRow label="Store" value={product.stores?.name || '-'} />
                  <MobileCardRow label="Category" value={<Badge variant="outline">{product.category}</Badge>} />
                  <MobileCardRow label="Price" value={`₵${Number(product.price).toFixed(2)}`} />
                  <MobileCardRow label="Stock" value={product.is_service ? 'N/A' : product.stock} />
                  <MobileCardRow
                    label="Status"
                    value={
                      product.is_active ? (
                        <Badge variant="outline" className="text-green-600 border-green-600">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Hidden</Badge>
                      )
                    }
                  />
                  <MobileCardRow label="Created" value={format(new Date(product.created_at), 'MMM d, yyyy')} />
                </MobileCard>
              ))
            )}
          </div>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">Loading...</TableCell>
                  </TableRow>
                ) : paginatedProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No products found</TableCell>
                  </TableRow>
                ) : (
                  paginatedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium line-clamp-1">{product.name}</span>
                          {product.is_featured && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{product.stores?.name || '-'}</TableCell>
                      <TableCell><Badge variant="outline">{product.category}</Badge></TableCell>
                      <TableCell>₵{Number(product.price).toFixed(2)}</TableCell>
                      <TableCell>{product.is_service ? 'N/A' : product.stock}</TableCell>
                      <TableCell>
                        {product.is_active ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Hidden</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{format(new Date(product.created_at), 'MMM d, yyyy')}</TableCell>
                      <TableCell><ProductActions product={product} /></TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent className="flex-wrap justify-center">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page} className={totalPages > 5 && Math.abs(page - currentPage) > 1 ? 'hidden sm:block' : ''}>
                  <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page} className="cursor-pointer">
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      <AlertDialog open={!!deleteProductId} onOpenChange={() => setDeleteProductId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteProductId && deleteProductMutation.mutate(deleteProductId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
