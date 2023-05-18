class ProductModel {
  public ID: number = 0;
  public Description: string = '';
  public Done: string = ''
  public Priority: string = ''
  public static convertToFormData(product: ProductModel): FormData {
    
    const myFormData = new FormData();
    myFormData.append('Description', product.Description);
    myFormData.append('Done', product.Done);
    myFormData.append('Priority', product.Priority);

    return myFormData;
  }
}
export default ProductModel;
