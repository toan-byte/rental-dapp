"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Mock dữ liệu nhà cho thuê
    setProperties([
      { id: 1, name: "Căn hộ cao cấp", price: "0.1 ETH", location: "Hà Nội" },
      { id: 2, name: "Nhà phố", price: "0.08 ETH", location: "TP HCM" },
    ]);
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } else {
      alert("Vui lòng cài đặt MetaMask");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ứng dụng Thuê Nhà Thông Minh</h1>
      {!account ? (
        <Button onClick={connectWallet}>Kết nối MetaMask</Button>
      ) : (
        <p>Đã kết nối: {account}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {properties.map((property) => (
          <div key={property.id} className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">{property.name}</h2>
            <p>Địa điểm: {property.location}</p>
            <p>Giá thuê: {property.price}</p>
            <Button className="mt-2">Thuê ngay</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

