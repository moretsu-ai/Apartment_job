import React, { useState } from 'react';
import {
  Package,
  Search,
  Plus,
  CheckCircle2,
  AlertTriangle,
  ArrowRightLeft,
  Eye,
  Layers,
  Wrench
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import { mockInventory } from '@/data/mock';
import { InventoryItem } from '@/types';

export const InventoryManagement: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>(mockInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  // Issue item form state
  const [issueFlat, setIssueFlat] = useState('');
  const [issueQty, setIssueQty] = useState(1);

  // Add Item form state
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    itemName: '',
    category: 'Tents & Canopies',
    totalQuantity: 10,
    condition: 'Good',
  });

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.lastIssuedTo && item.lastIssuedTo.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !issueFlat) return;

    setItems(
      items.map((i) => {
        if (i.id === selectedItem.id) {
          return {
            ...i,
            availableQuantity: Math.max(0, i.availableQuantity - issueQty),
            reservedQuantity: i.reservedQuantity + issueQty,
            lastIssuedTo: `Flat ${issueFlat} (${issueQty} units issued)`,
          };
        }
        return i;
      })
    );
    setIsIssueModalOpen(false);
    setIssueFlat('');
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.itemName) return;

    const created: InventoryItem = {
      id: `INV-${Date.now()}`,
      itemName: newItem.itemName || '',
      category: (newItem.category as any) || 'Tables & Chairs',
      totalQuantity: Number(newItem.totalQuantity) || 10,
      availableQuantity: Number(newItem.totalQuantity) || 10,
      reservedQuantity: 0,
      condition: (newItem.condition as any) || 'Good',
    };

    setItems([created, ...items]);
    setIsAddItemModalOpen(false);
    setNewItem({ itemName: '', category: 'Tents & Canopies', totalQuantity: 10, condition: 'Good' });
  };

  return (
    <div className="inventory-management-page">
      <PageHeader
        title="Society Asset & Event Equipment Inventory"
        description="Shamiana tents, banquet chairs, sound amplifiers, halogen floodlights, and issue/return ledger"
        breadcrumbs={[{ label: 'Community Management' }, { label: 'Inventory Management' }]}
        actions={
          <button
            type="button"
            className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
            onClick={() => setIsAddItemModalOpen(true)}
          >
            <Plus size={16} />
            <span>Add Equipment</span>
          </button>
        }
      />

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Asset Stock Items</span>
            <h3 className="fw-bold text-teal-primary my-1">{items.length} Asset Types</h3>
            <span className="text-muted font-size-12">Society-owned equipment</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Total Units in Store</span>
            <h3 className="fw-bold text-success my-1">
              {items.reduce((sum, i) => sum + i.totalQuantity, 0)} Units
            </h3>
            <span className="text-muted font-size-12">Total physical count</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Reserved / In Use</span>
            <h3 className="fw-bold text-warning my-1">
              {items.reduce((sum, i) => sum + i.reservedQuantity, 0)} Units
            </h3>
            <span className="text-muted font-size-12">Issued for festivals / flats</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Maintenance Flagged</span>
            <h3 className="fw-bold text-danger my-1">
              {items.filter((i) => i.condition !== 'Good').length} Items
            </h3>
            <span className="text-muted font-size-12">Needs repair / replacement</span>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <Search size={16} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search equipment item, last issued flat or event..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-6 col-md-3">
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All">All Equipment Categories</option>
                <option value="Tents & Canopies">Tents & Canopies</option>
                <option value="Audio Visual">Audio Visual & Sound</option>
                <option value="Tables & Chairs">Tables & Chairs</option>
                <option value="Lighting & Electrical">Lighting & Electrical</option>
                <option value="Catering Utensils">Catering Utensils</option>
              </select>
            </div>
            <div className="col-6 col-md-3 text-md-end">
              <span className="badge bg-light text-muted border py-2 px-3 w-100 text-center">
                {filteredItems.length} Equipment SKUs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Inventory & Asset Register</h5>
          <span className="card-subtitle">Track available stock, reserve equipment for functions, and record damages</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Equipment Item</th>
                  <th>Category</th>
                  <th>Total Units</th>
                  <th>Available</th>
                  <th>Reserved / Out</th>
                  <th>Condition</th>
                  <th>Last Issued Location</th>
                  <th className="text-end">Issue / Return</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="fw-semibold text-dark font-size-13">{item.itemName}</div>
                      <div className="text-muted font-size-11">SKU: {item.id}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">{item.category}</span>
                    </td>
                    <td>
                      <strong className="text-dark font-size-13">{item.totalQuantity}</strong>
                    </td>
                    <td>
                      <span className="badge bg-success-subtle text-success font-size-12 fw-bold">
                        {item.availableQuantity} Avail
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-warning-subtle text-warning font-size-12 fw-bold">
                        {item.reservedQuantity} Out
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          item.condition === 'Good'
                            ? 'bg-success-subtle text-success'
                            : 'bg-warning-subtle text-warning'
                        }`}
                      >
                        {item.condition}
                      </span>
                    </td>
                    <td>
                      <span className="font-size-12 text-muted">{item.lastIssuedTo || 'In Warehouse'}</span>
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-custom d-inline-flex align-items-center gap-1"
                        onClick={() => {
                          setSelectedItem(item);
                          setIsIssueModalOpen(true);
                        }}
                      >
                        <ArrowRightLeft size={13} />
                        <span>Issue / Return</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: Issue Equipment */}
      {selectedItem && (
        <Modal
          isOpen={isIssueModalOpen}
          onClose={() => setIsIssueModalOpen(false)}
          title={`Issue Equipment: ${selectedItem.itemName}`}
          footer={
            <>
              <button
                type="button"
                className="btn btn-sm btn-light border"
                onClick={() => setIsIssueModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary-custom"
                onClick={handleIssueSubmit}
              >
                Confirm Issue
              </button>
            </>
          }
        >
          <form onSubmit={handleIssueSubmit}>
            <div className="p-3 bg-light rounded border mb-3 font-size-13">
              <div><strong>Available in Store:</strong> {selectedItem.availableQuantity} units</div>
              <div><strong>Condition:</strong> {selectedItem.condition}</div>
            </div>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Issue to Resident / Event</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Flat A-201 or Diwali Lawn Stage"
                value={issueFlat}
                onChange={(e) => setIssueFlat(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Quantity to Issue</label>
              <input
                type="number"
                className="form-control"
                min={1}
                max={selectedItem.availableQuantity}
                value={issueQty}
                onChange={(e) => setIssueQty(Number(e.target.value))}
                required
              />
            </div>
          </form>
        </Modal>
      )}

      {/* Modal: Add Equipment */}
      <Modal
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        title="Add Asset Equipment to Inventory"
        footer={
          <>
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsAddItemModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom"
              onClick={handleAddItem}
            >
              Add Item
            </button>
          </>
        }
      >
        <form onSubmit={handleAddItem}>
          <div className="mb-3">
            <label className="form-label small fw-semibold">Equipment Item Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. High-Pressure Water Jet Sprayer"
              value={newItem.itemName}
              onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-semibold">Category</label>
            <select
              className="form-select"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
            >
              <option value="Tents & Canopies">Tents & Canopies</option>
              <option value="Audio Visual">Audio Visual</option>
              <option value="Tables & Chairs">Tables & Chairs</option>
              <option value="Lighting & Electrical">Lighting & Electrical</option>
              <option value="Catering Utensils">Catering Utensils</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label small fw-semibold">Total Stock Units</label>
            <input
              type="number"
              className="form-control"
              min={1}
              value={newItem.totalQuantity}
              onChange={(e) => setNewItem({ ...newItem, totalQuantity: Number(e.target.value) })}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

