import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import Data from "../products.json";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import Search from "./Search";
import ShopCategory from "./ShopCategory";

const showResults = "Showing 01 - 12 of 139 results";

const Shop = () => {
  const [GridList, setGridList] = useState(true);
  const [products, setproducts] = useState(Data);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 12;

  const indexofLastProduct = currentPage * productPerPage;
  const indexofFirstProduct = indexofLastProduct - productPerPage;
  const currentProduct = products.slice(
    indexofFirstProduct,
    indexofLastProduct
  );

  // change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // filter products based on category
  const [selectedCategory, setSelectedCategory] = useState("All");
  const menuItem = [...new Set(Data.map((val) => val.category))];

  const filterItem = (currentCate) => {
    const newItem = Data.filter((newVal) => {
      return newVal.category === currentCate;
    });

    setSelectedCategory(currentCate);
    setproducts(newItem);
  };

  return (
    <div>
      <PageHeader title="Our Shop Page" currPage="Shop" />
      {/* shop main content */}
      <div className="shop-page padding-tb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                {/* title & product view mode */}
                <div className="shop-title d-flex flex-wrap justify-content-between">
                  <p>{showResults}</p>
                  <div
                    className={`product-view-mode ${
                      GridList ? "gridActive" : "listActive"
                    }`}
                  >
                    <a className="grid" onClick={() => setGridList(!GridList)}>
                      <i className="icofont-ghost"></i>
                    </a>
                    <a className="list" onClick={() => setGridList(!GridList)}>
                      <i className="icofont-listine-dots"></i>
                    </a>
                  </div>
                </div>
                {/* product card */}
                <div>
                  <ProductCard GridList={GridList} products={currentProduct} />
                </div>

                <Pagination
                  productPerPage={productPerPage}
                  totalProducts={products.length}
                  paginate={paginate}
                  activePage={currentPage}
                />
              </article>
            </div>
            <div className="col-lg-4 col-12">
              <aside>
                <Search products={products} GridList={GridList} />
                <ShopCategory
                  filterItem={filterItem}
                  setItem={setproducts}
                  menuItem={menuItem}
                  setProducts={setproducts}
                  selectedCategory={selectedCategory}
                />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
