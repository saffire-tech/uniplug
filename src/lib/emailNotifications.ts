import { supabase } from "@/integrations/supabase/client";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface LowStockProduct {
  name: string;
  stock: number;
}

export const sendNewOrderEmailNotification = async (
  storeOwnerId: string,
  orderId: string,
  orderAmount: number,
  items: OrderItem[],
  buyerName?: string
) => {
  try {
    const { error } = await supabase.functions.invoke("send-email-notification", {
      body: {
        type: "new_order",
        recipientUserId: storeOwnerId,
        data: {
          orderId,
          orderAmount,
          items,
          buyerName: buyerName || "A customer",
        },
      },
    });

    if (error) {
      console.error("Error sending new order email:", error);
    } else {
      console.log("New order email sent successfully");
    }
  } catch (error) {
    console.error("Error sending new order email notification:", error);
  }
};

export const sendOrderStatusEmailNotification = async (
  buyerId: string,
  orderId: string,
  status: string,
  storeName: string
) => {
  try {
    const { error } = await supabase.functions.invoke("send-email-notification", {
      body: {
        type: "order_status",
        recipientUserId: buyerId,
        data: {
          orderId,
          status,
          storeName,
        },
      },
    });

    if (error) {
      console.error("Error sending order status email:", error);
    } else {
      console.log("Order status email sent successfully");
    }
  } catch (error) {
    console.error("Error sending order status email notification:", error);
  }
};

export const sendMessageEmailNotification = async (
  receiverId: string,
  senderName: string,
  messagePreview: string
) => {
  try {
    const { error } = await supabase.functions.invoke("send-email-notification", {
      body: {
        type: "new_message",
        recipientUserId: receiverId,
        data: {
          senderName,
          messagePreview,
        },
      },
    });

    if (error) {
      console.error("Error sending message email:", error);
    } else {
      console.log("Message email sent successfully");
    }
  } catch (error) {
    console.error("Error sending message email notification:", error);
  }
};

export const sendLowStockEmailNotification = async (
  storeOwnerId: string,
  products: LowStockProduct[]
) => {
  try {
    const { error } = await supabase.functions.invoke("send-email-notification", {
      body: {
        type: "low_stock",
        recipientUserId: storeOwnerId,
        data: {
          products,
        },
      },
    });

    if (error) {
      console.error("Error sending low stock email:", error);
    } else {
      console.log("Low stock email sent successfully");
    }
  } catch (error) {
    console.error("Error sending low stock email notification:", error);
  }
};
