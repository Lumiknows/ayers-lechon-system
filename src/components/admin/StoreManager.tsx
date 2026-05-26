"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardContent } from "@/components/ui/Card";

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapEmbedUrl: string;
  mapLink: string;
  city: string;
  region: string;
  isActive: boolean;
  sortOrder: number;
}

const emptyStore = {
  name: "",
  address: "",
  phone: "",
  hours: "",
  mapEmbedUrl: "",
  mapLink: "",
  city: "Cebu City",
  region: "Central Visayas",
  isActive: true,
  sortOrder: 0,
};

export function StoreManager({ initialStores }: { initialStores: Store[] }) {
  const [stores, setStores] = useState(initialStores);
  const [editing, setEditing] = useState<Store | null>(null);
  const [form, setForm] = useState(emptyStore);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function refreshStores() {
    const res = await fetch("/api/admin/stores");
    if (res.ok) setStores(await res.json());
  }

  function openCreate() {
    setEditing(null);
    setForm(emptyStore);
    setShowForm(true);
  }

  function openEdit(store: Store) {
    setEditing(store);
    setForm({
      name: store.name,
      address: store.address,
      phone: store.phone,
      hours: store.hours,
      mapEmbedUrl: store.mapEmbedUrl,
      mapLink: store.mapLink,
      city: store.city,
      region: store.region,
      isActive: store.isActive,
      sortOrder: store.sortOrder,
    });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editing ? `/api/stores/${editing.id}` : "/api/stores";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setShowForm(false);
        await refreshStores();
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this store? This will also remove associated feedback.")) return;
    const res = await fetch(`/api/stores/${id}`, { method: "DELETE" });
    if (res.ok) await refreshStores();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-charcoal">Store Branches</h2>
        <Button onClick={openCreate} variant="primary" size="sm">
          <Plus className="h-4 w-4" />
          Add Branch
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent>
            <form onSubmit={handleSave} className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Branch Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Input
                label="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
              <div className="sm:col-span-2">
                <Textarea
                  label="Address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  required
                />
              </div>
              <Input
                label="Opening Hours"
                value={form.hours}
                onChange={(e) => setForm({ ...form, hours: e.target.value })}
                required
              />
              <Input
                label="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
              <Input
                label="Region"
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
              />
              <Input
                label="Google Maps Link"
                value={form.mapLink}
                onChange={(e) => setForm({ ...form, mapLink: e.target.value })}
                required
              />
              <div className="sm:col-span-2">
                <Textarea
                  label="Google Maps Embed URL"
                  value={form.mapEmbedUrl}
                  onChange={(e) => setForm({ ...form, mapEmbedUrl: e.target.value })}
                  required
                />
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                />
                <label htmlFor="isActive" className="text-sm text-charcoal">
                  Active branch
                </label>
              </div>
              <div className="flex gap-3 sm:col-span-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : editing ? "Update Branch" : "Add Branch"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {stores.map((store) => (
          <Card key={store.id}>
            <CardContent className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  {store.city}, {store.region}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-charcoal">
                  {store.name}
                </h3>
                <p className="mt-2 text-sm text-charcoal-light">{store.address}</p>
                <p className="mt-1 text-sm text-charcoal-light">{store.phone}</p>
                <p className="mt-1 text-sm text-charcoal-light">{store.hours}</p>
                {!store.isActive && (
                  <span className="mt-2 inline-block rounded-full bg-charcoal/10 px-3 py-1 text-xs font-medium">
                    Inactive
                  </span>
                )}
              </div>
              <div className="flex gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => openEdit(store)}
                  className="rounded-lg p-2 text-charcoal-light hover:bg-cream"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(store.id)}
                  className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
