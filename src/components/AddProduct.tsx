'use client';
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
  
import { ChevronsUpDown, Check } from "lucide-react";
  
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";  


export default function AddProduct() {
    const [vendorName, setVendorName] = useState('');
    const [productName, setProductName] = useState('');
    const [vendors, setVendors] = useState<string[]>([]);
    const [products, setProducts] = useState<string[]>([]);
    const [versions, setVersions] = useState<string[]>([]);

    // Fetch vendors on component mount
    useEffect(() => {
        fetch('/api/vendors')
        .then((response) => response.json())
        .then((data) => setVendors(data.data));
    }, []);

    // Fetch products when vendor is selected
    useEffect(() => {
        if (vendorName) {
        fetch(`/api/products/${vendorName}`)
            .then((response) => response.json())
            .then((data) => setProducts(Object.keys(data.data)));
        }
    }, [vendorName]);

    // Fetch versions when product is selected
    useEffect(() => {
        if (vendorName && productName) {
        fetch(`/api/products/${vendorName}/${productName}`)
            .then((response) => response.json())
            .then((data) => setVersions(data.data));
        }
    }, [vendorName, productName]);

    return (
        <div className="p-4">
            <form className="space-y-4">
                {/* Vendor Dropdown */}
                <div>
                <label htmlFor="vendorName">Vendor Name</label>
                <select
                    id="vendorName"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    className="border p-2"
                >
                    <option value="">Select Vendor</option>
                    {vendors.map((vendor) => (
                    <option key={vendor} value={vendor}>
                        {vendor}
                    </option>
                    ))}
                </select>
                </div>

                {/* Product Dropdown */}
                {vendorName && (
                <div>
                    <label htmlFor="productName">Product Name</label>
                    <select
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="border p-2"
                    >
                    <option value="">Select Product</option>
                    {products.map((product) => (
                        <option key={product} value={product}>
                        {product}
                        </option>
                    ))}
                    </select>
                </div>
                )}

                {/* Version Dropdown */}
                {productName && (
                <div>
                    <label htmlFor="version">Version</label>
                    <select
                    id="version"
                    className="border p-2"
                    >
                    <option value="">Select Version</option>
                    {versions.map((version, index) => (
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
    )
}