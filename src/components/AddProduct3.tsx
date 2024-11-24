"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Loader2 } from "lucide-react";

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
  const [filteredVendors, setFilteredVendors] = useState<VendorProductData[]>(
    []
  );
  const [products, setProducts] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<string[]>([]);
  const [versions, setVersions] = useState<string[]>([]);
  const [filteredVersions, setFilteredVersions] = useState<string[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>("");

  const [vendorSearch, setVendorSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [versionSearch, setVersionSearch] = useState("");

  const [debouncedVendorSearch, setDebouncedVendorSearch] =
    useState(vendorSearch);

  const { user } = useKindeBrowserClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // console.log(isLoading);

  // Function to fetch vendors based on the vendor search query
  const fetchData = async () => {
    setIsLoading(true);
    const res = await fetch("/api/vendors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Metadata: JSON.stringify(debouncedVendorSearch),
      },
    });
    setIsLoading(false);
    const data = await res.json();
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const productData = {
      authId: user?.id,
      authEmailId: user?.email,
      userFirstName: user?.given_name,
      userLastName: user?.family_name,
      vendorName,
      productName,
      selectedVersion,
    };

    // Add Products
    const response = await fetch("/api/add-product-v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const result = await response.json();
    if (result.success) {
      // toast.success("Product added successfully.");
      toast.success(result.message);   // For v2 api only
    } else {
      // toast.error("Couldn't add product.\nPlaese try again!");
      toast.error(result.message);    // For v2 api only
    }
    console.log(`Products: ${JSON.stringify(productData)}`);
    setIsSubmitting(false);
    window.location.reload()
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="">
        <div className="space-y-4">
          {/* Vendor Dropdown with Search */}
          <div className="w-full">
            <label htmlFor="vendorName">Vendor Name</label>
            <input
              type="text"
              placeholder="Search Vendor"
              value={vendorSearch}
              onChange={(e) => setVendorSearch(e.target.value)}
              className="border p-2 mb-2 w-full rounded-md"
            />
            <select
              id="vendorName"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              className="border p-2 w-full rounded-md"
            >
              {isLoading ? (
                <option value="" disabled>
                  <h1>Loading...</h1>
                </option>
              ) : (
                <option value="">Select Vendor</option>
              )}
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
                className="border p-2 mb-2 w-full rounded-md"
              />
              <select
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="border p-2 w-full rounded-md"
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
                className="border p-2 mb-2 w-full rounded-md"
              />
              <select
                id="version"
                className="border p-2 w-full rounded-md"
                onChange={(e) => setSelectedVersion(e.target.value)}
              >
                <option value="">Select Version</option>
                {filteredVersions.map((version, index) => (
                  <option key={index} value={version}>
                    {version}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Button className="" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
