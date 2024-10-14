"use client";
import { useEffect, useState } from "react";

export default function AddProduct3() {
  const [vendorName, setVendorName] = useState("");
  const [productName, setProductName] = useState("");
  const [vendors, setVendors] = useState<string[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<string[]>([]);
  const [products, setProducts] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<string[]>([]);
  const [versions, setVersions] = useState<string[]>([]);
  const [filteredVersions, setFilteredVersions] = useState<string[]>([]);

  const [vendorSearch, setVendorSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [versionSearch, setVersionSearch] = useState("");

  // Fetch vendors on component mount
  useEffect(() => {
    fetch("/api/vendors")
      .then((response) => response.json())
      .then((data) => {
        setVendors(data.data);
        setFilteredVendors(data.data); // Initialize filtered vendors
      });
  }, []);

  // Fetch products when vendor is selected
  useEffect(() => {
    if (vendorName) {
      fetch(`/api/products/${vendorName}`)
        .then((response) => response.json())
        .then((data) => {
          const productList = Object.keys(data.data);
          setProducts(productList);
          setFilteredProducts(productList); // Initialize filtered products
        });
    }
  }, [vendorName]);

  // Fetch versions when product is selected
  useEffect(() => {
    if (vendorName && productName) {
      fetch(`/api/products/${vendorName}/${productName}`)
        .then((response) => response.json())
        .then((data) => {
          setVersions(data.data);
          setFilteredVersions(data.data); // Initialize filtered versions
        });
    }
  }, [vendorName, productName]);

  // Handle vendor search
  useEffect(() => {
    setFilteredVendors(
      vendors.filter((vendor) =>
        vendor.toLowerCase().includes(vendorSearch.toLowerCase())
      )
    );
  }, [vendorSearch, vendors]);

  // Handle product search
  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.toLowerCase().includes(productSearch.toLowerCase())
      )
    );
  }, [productSearch, products]);

  // Handle version search
  useEffect(() => {
    setFilteredVersions(
      versions.filter((version) =>
        version.toLowerCase().includes(versionSearch.toLowerCase())
      )
    );
  }, [versionSearch, versions]);

  return (
    <div className="p-4">
      <form className="space-y-4">
        {/* Vendor Dropdown with Search */}
        <div>
          <label htmlFor="vendorName">Vendor Name</label>
          <input
            type="text"
            placeholder="Search Vendor"
            value={vendorSearch}
            onChange={(e) => setVendorSearch(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <select
            id="vendorName"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select Vendor</option>
            {filteredVendors.map((vendor) => (
              <option key={vendor} value={vendor}>
                {vendor}
              </option>
            ))}
          </select>
        </div>

        {/* Product Dropdown with Search */}
        {vendorName && (
          <div>
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              placeholder="Search Product"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            <select
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="">Select Product</option>
              {filteredProducts.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Version Dropdown with Search */}
        {productName && (
          <div>
            <label htmlFor="version">Version</label>
            <input
              type="text"
              placeholder="Search Version"
              value={versionSearch}
              onChange={(e) => setVersionSearch(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            <select id="version" className="border p-2 w-full">
              <option value="">Select Version</option>
              {filteredVersions.map((version, index) => (
                <option key={index} value={version}>
                  {version}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="bg-black text-white p-2">
          Add
        </button>
      </form>
    </div>
  );
}
