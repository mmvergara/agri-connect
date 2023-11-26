export type ProductData = {
  productID: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productPricePer: string;
  productImageUrl: string;
  productOwnerId: string;
  productEndorsers: any;
  productOwner: UserData;
  createdAt: Date;
};