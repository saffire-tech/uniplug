import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner';

interface ContactSellerDialogProps {
  sellerId: string;
  sellerName: string;
  storeId?: string;
  storeName?: string;
  productId?: string;
  productName?: string;
  trigger?: React.ReactNode;
}

const ContactSellerDialog = ({
  sellerId,
  sellerName,
  storeId,
  storeName,
  productId,
  productName,
  trigger
}: ContactSellerDialogProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const defaultMessage = productName 
    ? `Hi, I'm interested in "${productName}". Is it still available?`
    : `Hi, I'd like to know more about your products.`;

  const handleSend = async () => {
    if (!user) {
      toast.error('Please sign in to send messages');
      navigate('/auth');
      return;
    }

    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setSending(true);
    const { error } = await supabase
      .from('messages')
      .insert({
        sender_id: user.id,
        receiver_id: sellerId,
        content: message.trim(),
        store_id: storeId || null,
        product_id: productId || null
      });

    if (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } else {
      toast.success('Message sent!');
      setOpen(false);
      setMessage('');
      // Navigate to messages
      navigate(`/messages?with=${sellerId}`);
    }
    setSending(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && !user) {
      toast.error('Please sign in to contact sellers');
      navigate('/auth');
      return;
    }
    setOpen(isOpen);
    if (isOpen && !message) {
      setMessage(defaultMessage);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Contact Seller
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact {sellerName}</DialogTitle>
          <DialogDescription>
            {storeName && `Store: ${storeName}`}
            {productName && ` • Product: ${productName}`}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSend} disabled={sending || !message.trim()}>
              <Send className="h-4 w-4 mr-2" />
              {sending ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSellerDialog;
