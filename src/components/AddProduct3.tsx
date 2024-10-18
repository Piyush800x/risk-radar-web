"use client";
import { useEffect, useState } from "react";

interface VendorProductData {
  _id: string; // Assuming this will be a string when returned from MongoDB
  vendorName: string;
  Products: {
    [productName: string]: string[]; // Each key in Products is a product name, and the value is an array of strings
  };
}

export default function AddProduct3() {
  const [vendorName, setVendorName] = useState("");
  const [productName, setProductName] = useState("");
  const [vendors, setVendors] = useState<string[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<VendorProductData[]>([]);
  const [products, setProducts] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<string[]>([]);
  const [versions, setVersions] = useState<string[]>([]);
  const [filteredVersions, setFilteredVersions] = useState<string[]>([]);

  const [vendorSearch, setVendorSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [versionSearch, setVersionSearch] = useState("");

  const [debouncedVendorSearch, setDebouncedVendorSearch] = useState(vendorSearch);

  // Function to fetch vendors based on the vendor search query
  const fetchData = async () => {
    const res = await fetch("/api/vendors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Metadata": JSON.stringify(debouncedVendorSearch),
      },
    });
    const data = await res.json();
    setVendors(data.data || []);
    setFilteredVendors(data.data || []); // Initialize filtered vendors
  };


  // Debounce effect: Update debounced search value after 500ms of no typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVendorSearch(vendorSearch);
    }, 500);

    return () => {
      clearTimeout(handler); // Clear timeout if vendorSearch changes again
    };
  }, [vendorSearch]);

  // Fetch vendors when debounced search changes
  useEffect(() => {
    if (debouncedVendorSearch) {
      fetchData();
    }
  }, [debouncedVendorSearch]);


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


  // useEffect(() => {
  //     setFilteredVendors(
  //       vendors.filter((vendor) =>
  //         vendor.toLowerCase().includes(vendorSearch.toLowerCase())
  //       )
  //   );
  // }, [vendorSearch, vendors]);

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

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
  }

  const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
          
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
              <option key={vendor._id} value={vendor.vendorName}>
                {vendor.vendorName}
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
          <button 
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      
      <div className="flex items-center justify-center">
      <button 
        onClick={openPopup} 
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Add products
      </button>

      <Popup isOpen={isPopupOpen} onClose={closePopup} />
    </div>

      
    </div>
  );
}
