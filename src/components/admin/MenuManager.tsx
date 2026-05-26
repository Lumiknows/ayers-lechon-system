"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MENU_CATEGORIES } from "@/lib/constants";
import { formatPrice, getCategoryLabel } from "@/lib/utils";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string | null;
  imageUrl: string;
  isAvailable: boolean;
  sortOrder: number;
}

const emptyItem = {
  name: "",
  description: "",
  price: 0,
  category: "WHOLE_LECHON",
  sizes: "",
  imageUrl: "",
  isAvailable: true,
  sortOrder: 0,
};

export function MenuManager({ initialItems }: { initialItems: MenuItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [form, setForm] = useState(emptyItem);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const categoryOptions = MENU_CATEGORIES.map((c) => ({
    value: c.id,
    label: c.label,
  }));

  async function refreshItems() {
    const res = await fetch("/api/admin/menu");
    if (res.ok) setItems(await res.json());
  }

  function openCreate() {
    setEditing(null);
    setForm(emptyItem);
    setShowForm(true);
  }

  function openEdit(item: MenuItem) {
    setEditing(item);
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      sizes: item.sizes ?? "",
      imageUrl: item.imageUrl,
      isAvailable: item.isAvailable,
      sortOrder: item.sortOrder,
    });
    setShowForm(true);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (res.ok) {
        const { url } = await res.json();
        setForm({ ...form, imageUrl: url });
      }
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        sizes: form.sizes || null,
      };

      const url = editing ? `/api/menu/${editing.id}` : "/api/menu";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowForm(false);
        await refreshItems();
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this menu item?")) return;
    const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
    if (res.ok) await refreshItems();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-charcoal">Menu Items</h2>
        <Button onClick={openCreate} variant="primary" size="sm">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent>
            <form onSubmit={handleSave} className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Select
                label="Category"
                options={categoryOptions}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                />
              </div>
              <Input
                label="Price (PHP)"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                required
              />
              <Input
                label="Sizes / Options"
                value={form.sizes}
                onChange={(e) => setForm({ ...form, sizes: e.target.value })}
              />
              <Input
                label="Image URL"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                required
              />
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="text-sm"
                />
                {uploading && <p className="text-xs text-charcoal-light mt-1">Uploading...</p>}
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <input
                  type="checkbox"
                  id="isAvailable"
                  checked={form.isAvailable}
                  onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
                />
                <label htmlFor="isAvailable" className="text-sm text-charcoal">
                  Available for ordering
                </label>
              </div>
              <div className="flex gap-3 sm:col-span-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : editing ? "Update Item" : "Add Item"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
            <CardContent>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Badge variant="gold" className="mb-2">
                    {getCategoryLabel(item.category)}
                  </Badge>
                  <h3 className="font-semibold text-charcoal">{item.name}</h3>
                  <p className="mt-1 text-sm font-bold text-brown">
                    {formatPrice(item.price)}
                  </p>
                  {!item.isAvailable && (
                    <Badge variant="default" className="mt-2">Unavailable</Badge>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="rounded-lg p-2 text-charcoal-light hover:bg-cream"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
