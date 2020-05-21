// import url from './URL';

export const flattenProducts = (data) => {
  return data.map((item) => {
    // cloudinary
    let image = item.image.url;

    // local setup - no deployment
    // let image = `${url}${item.image.url}`;

    return { ...item, image };
  });
};

export const featuredProducts = (data) => {
  return data.filter((item) => {
    return item.featured === true;
  });
};

// *******************
// *******************
// paginate
export const paginate = (products) => {
  // code here
  // console.log(products);
  const itemsPerPage = 3;
  const numberOfPages = Math.ceil(products.length / itemsPerPage);

  // SPLICE
  // const newProducts = Array.from({ length: numberOfPages }, () => {
  //   return products.splice(0, itemsPerPage);
  // });

  // SLICE
  const newProducts = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  });

  // console.log(newProducts);

  return newProducts;
};
