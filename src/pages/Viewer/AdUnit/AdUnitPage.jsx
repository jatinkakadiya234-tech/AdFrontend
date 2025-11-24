import React, { useState, useEffect } from 'react';
import { Plus, Moon, Sun } from 'lucide-react';
import AdUnitCard from '../../../components/AdUnit/AdUnitCard';
import AdUnitModal from '../../../components/AdUnit/AdUnitModal';
import CodeModal from '../../../components/AdUnit/CodeModal';
import FilterBar from '../../../components/AdUnit/FilterBar';
import { useToast } from '../../../context/ToastProvider';

const initialAdUnits = [
    {
        id: 'ca-pub-123-001',
        name: 'Homepage Header Banner',
        platform: 'web',
        format: 'banner',
        size: '728x90',
        status: 'active',
        impressions: 12450,
        revenue: 45.32,
        ctr: 2.3,
        fillRate: 94.5,
        createdAt: new Date('2025-01-15'),
        autoRefresh: 60
    },
    {
        id: 'ca-pub-123-002',
        name: 'Article Sidebar',
        platform: 'web',
        format: 'banner',
        size: '300x250',
        status: 'active',
        impressions: 8340,
        revenue: 28.90,
        ctr: 1.8,
        fillRate: 92.1,
        createdAt: new Date('2025-02-10'),
        autoRefresh: 90
    },
    {
        id: 'ca-pub-123-003',
        name: 'Mobile App Banner',
        platform: 'ios',
        format: 'banner',
        size: '320x50',
        status: 'active',
        impressions: 15230,
        revenue: 67.50,
        ctr: 3.1,
        fillRate: 96.8,
        createdAt: new Date('2025-03-05'),
        autoRefresh: 0
    },
    {
        id: 'ca-pub-123-004',
        name: 'Game Reward Ad',
        platform: 'android',
        format: 'rewarded',
        size: 'Full Screen',
        status: 'active',
        impressions: 5420,
        revenue: 89.20,
        ctr: 12.5,
        fillRate: 98.2,
        createdAt: new Date('2025-03-20'),
        autoRefresh: 0
    },
    {
        id: 'ca-pub-123-005',
        name: 'Level Complete Interstitial',
        platform: 'flutter',
        format: 'interstitial',
        size: 'Full Screen',
        status: 'paused',
        impressions: 2100,
        revenue: 15.60,
        ctr: 4.2,
        fillRate: 88.3,
        createdAt: new Date('2025-04-01'),
        autoRefresh: 0
    }
];

const AdUnitsPage = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [adUnits, setAdUnits] = useState(initialAdUnits);
    const [filteredUnits, setFilteredUnits] = useState(initialAdUnits);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [editingUnit, setEditingUnit] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        platform: '',
        status: '',
        format: ''
    });
    const { addToast } = useToast();

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    useEffect(() => {
        let filtered = [...adUnits];

        if (filters.search) {
            filtered = filtered.filter(unit =>
                unit.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                unit.id.toLowerCase().includes(filters.search.toLowerCase())
            );
        }
        if (filters.platform) {
            filtered = filtered.filter(unit => unit.platform === filters.platform);
        }
        if (filters.status) {
            filtered = filtered.filter(unit => unit.status === filters.status);
        }
        if (filters.format) {
            filtered = filtered.filter(unit => unit.format === filters.format);
        }

        setFilteredUnits(filtered);
    }, [filters, adUnits]);

    const handleCreateNew = () => {
        setEditingUnit(null);
        setIsModalOpen(true);
    };

    const handleEdit = (unit) => {
        setEditingUnit(unit);
        setIsModalOpen(true);
    };

    const handleSave = (formData) => {
        if (editingUnit) {
            setAdUnits(prev => prev.map(unit =>
                unit.id === editingUnit.id ? { ...unit, ...formData } : unit
            ));
            addToast({ title: 'Success', message: 'Ad unit updated successfully!', type: 'success' });
        } else {
            const newUnit = {
                ...formData,
                id: `ca-pub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                status: 'active',
                impressions: 0,
                revenue: 0,
                ctr: 0,
                fillRate: 0,
                createdAt: new Date()
            };
            setAdUnits(prev => [newUnit, ...prev]);
            addToast({ title: 'Success', message: 'Ad unit created successfully!', type: 'success' });
        }
        setIsModalOpen(false);
    };

    const handleToggleStatus = (id) => {
        setAdUnits(prev => prev.map(unit =>
            unit.id === id ? { ...unit, status: unit.status === 'active' ? 'paused' : 'active' } : unit
        ));
        const unit = adUnits.find(u => u.id === id);
        addToast({
            title: 'Success',
            message: `Ad unit ${unit.status === 'active' ? 'paused' : 'resumed'}`,
            type: 'success'
        });
    };

    const handleGetCode = (unit) => {
        setSelectedUnit(unit);
        setIsCodeModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this ad unit?')) {
            setAdUnits(prev => prev.filter(unit => unit.id !== id));
            addToast({ title: 'Success', message: 'Ad unit deleted successfully!', type: 'success' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* ===== HEADER ===== */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Ad Units</h1>
                        <p className="text-gray-600 text-sm mt-1">
                            Manage your ad placements, performance, and settings
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* optional: modern toggle style */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="hidden p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Toggle theme"
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <button
                            onClick={handleCreateNew}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Create Ad Unit
                        </button>
                    </div>
                </div>

                {/* ===== FILTER BAR ===== */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
                    <FilterBar filters={filters} setFilters={setFilters} />
                </div>

                {/* ===== AD UNITS GRID ===== */}
                {filteredUnits.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredUnits.map((unit) => (
                            <div className="transform transition-all hover:scale-[1.01]">
                                <AdUnitCard
                                    key={unit.id}
                                    unit={unit}
                                    onEdit={handleEdit}
                                    onToggleStatus={handleToggleStatus}
                                    onGetCode={handleGetCode}
                                    onDelete={handleDelete}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-16 text-center shadow-sm">
                        <div className="text-6xl mb-4">📢</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No Ad Units Found
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {filters.search || filters.platform || filters.status || filters.format
                                ? 'Try adjusting your filters'
                                : 'Create your first ad unit to start monetizing your app or website'}
                        </p>
                        <button
                            onClick={handleCreateNew}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Create Ad Unit
                        </button>
                    </div>
                )}

                {/* ===== MODALS ===== */}
                <AdUnitModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    editingUnit={editingUnit}
                />

                <CodeModal
                    isOpen={isCodeModalOpen}
                    onClose={() => setIsCodeModalOpen(false)}
                    unit={selectedUnit}
                />

            </div>
        </div>
    );
};

export default AdUnitsPage;